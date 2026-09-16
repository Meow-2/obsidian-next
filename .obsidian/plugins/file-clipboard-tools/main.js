const {
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  TFile,
  normalizePath,
  setIcon,
} = require("obsidian");

const IMAGE_EXTENSIONS = new Set([
  "avif", "bmp", "gif", "heic", "heif", "ico", "jpeg", "jpg", "png", "svg", "tif", "tiff", "webp"
]);

const SIZE_PATTERN = /^\d+(?:x\d+)?$/i;
const DEFAULT_SETTINGS = {
  targetNotePath: "元数据/剪切板/共享剪切板.md",
  enableSaveAs: true,
  enableCopyFile: true,
  enableCtrlCCopy: true,
  enableCaptionEdit: true,
  enableRevealInExplorer: true,
  enableEditLink: true,
  enableClickSelectionToolbar: true,
  enableSharedClipboardFormatting: true,
  showSharedClipboardRibbon: true,
};

module.exports = class FileClipboardToolsPlugin extends Plugin {
  async onload() {
    await this.loadSettings();
    this.pendingNativeFileCreations = [];
    this.addSettingTab(new FileClipboardToolsSettingTab(this.app, this));
    this.sharedClipboardRibbonEl = this.addRibbonIcon("clipboard", "打开共享剪切板", () => {
      void this.openClipboardNote();
    });
    this.syncRibbonVisibility();
    this.addCommand({
      id: "open-shared-clipboard",
      name: "打开共享剪切板",
      callback: () => void this.openClipboardNote(),
    });
    this.registerSharedClipboardHandlers();

    this.resourceFileIndex = new Map();
    this.rebuildResourceFileIndex();
    this.registerEvent(this.app.vault.on("create", () => this.rebuildResourceFileIndex()));
    this.registerEvent(this.app.vault.on("delete", () => this.rebuildResourceFileIndex()));
    this.registerEvent(this.app.vault.on("rename", () => this.rebuildResourceFileIndex()));

    this.registerDomEvent(
      this.app.workspace.containerEl,
      "pointerdown",
      (event) => this.rememberAttachmentTarget(event),
      { capture: true }
    );
    this.registerDomEvent(
      this.app.workspace.containerEl,
      "pointerover",
      (event) => this.handleAttachmentHover(event),
      { capture: true }
    );
    this.registerDomEvent(
      this.app.workspace.containerEl,
      "pointerout",
      (event) => this.handleAttachmentHoverEnd(event),
      { capture: true }
    );
    this.registerDomEvent(
      this.app.workspace.containerEl,
      "click",
      (event) => this.handleAttachmentClick(event),
      { capture: true }
    );
    this.registerDomEvent(
      this.app.workspace.containerEl,
      "keydown",
      (event) => this.handleCopyShortcut(event),
      { capture: true }
    );
    this.register(() => {
      this.activeCaptionEditor?.cancel();
      this.clearAttachmentSelection();
    });
  }

  getAttachmentContext(target) {
    if (!(target instanceof Element)) return null;

    let image = target.closest("img");
    if (!image) {
      const imageContainer = target.closest(".image-embed, .internal-embed");
      image = imageContainer ? imageContainer.querySelector("img") : null;
    }
    const linkElement = target.closest("a.internal-link, .internal-embed, .image-embed");
    if (!image && !linkElement) return null;

    const view = this.findMarkdownView(target);
    if (!view || !view.file) return null;
    const sourceFile = view.file;
    const file = this.resolveFile(linkElement || image, image, sourceFile);
    if (!file) return null;

    const host = image?.closest(".image-embed, .internal-embed") || linkElement;
    const mode = target.closest(".markdown-source-view.mod-cm6")
      ? "live-preview"
      : target.closest(".markdown-rendered")
        ? "reading"
        : "unknown";
    return { view, sourceFile, file, image, linkElement, host, mode };
  }

  rememberAttachmentTarget(event) {
    if (event.button !== 0) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (this.isToolbarControlTarget(target)) return;

    const context = this.getAttachmentContext(target);
    if (!this.isLivePreviewContext(context) || !this.settings.enableClickSelectionToolbar) return;
    this.lastAttachmentContext = context;
    // Leave pointer gestures on images to Obsidian so its bottom-right resize
    // handle can start dragging. Image clicks are still selected and cancelled
    // by handleAttachmentClick; early interception is only needed for file cards.
    if (context.image) return;
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (!this.showAttachmentToolbar(context, true)) return;

    // CodeMirror opens rendered file widgets during pointerdown, before the
    // regular click handler can cancel navigation.
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  handleAttachmentHover(event) {
    if (!this.settings.enableClickSelectionToolbar || this.selectedAttachmentHost) return;
    const target = event.target;
    if (!(target instanceof Element) || this.isToolbarControlTarget(target)) return;
    const context = this.getAttachmentContext(target);
    if (this.isLivePreviewContext(context)) this.showAttachmentToolbar(context, false);
  }

  handleAttachmentHoverEnd(event) {
    if (!this.toolbarAttachmentHost || this.selectedAttachmentHost) return;
    const target = event.target;
    if (!(target instanceof Node) || !this.toolbarAttachmentHost.contains(target)) return;
    const relatedTarget = event.relatedTarget;
    if (relatedTarget instanceof Node && this.toolbarAttachmentHost.contains(relatedTarget)) return;
    this.clearAttachmentToolbar();
  }

  handleAttachmentClick(event) {
    if (!this.settings.enableClickSelectionToolbar) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (this.isToolbarControlTarget(target)) return;

    const context = this.getAttachmentContext(target);
    if (!context) {
      this.clearAttachmentSelection();
      return;
    }
    if (!this.isLivePreviewContext(context)) return;

    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (!this.showAttachmentToolbar(context, true)) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    this.lastAttachmentContext = context;
  }

  showAttachmentToolbar(context, select = true) {
    if (!this.isLivePreviewContext(context)) return false;
    const host = context.host;
    if (!(host instanceof Element)) return false;
    if (this.toolbarAttachmentHost === host) {
      if (select) {
        this.selectedAttachmentHost = host;
        host.addClass("file-clipboard-selection-host");
      }
      return true;
    }

    this.clearAttachmentToolbar();
    if (select) host.focus?.({ preventScroll: true });

    const nativePanel = this.findNativeActionPanel(host);
    if (!nativePanel) return false;
    const { toolbar, insertionPoint, ownsToolbar = false, anchor = null } = nativePanel;

    this.toolbarAttachmentHost = host;
    if (select) {
      this.selectedAttachmentHost = host;
      host.addClass("file-clipboard-selection-host");
    }
    toolbar.addClass("file-clipboard-toolbar");
    if (anchor) anchor.addClass("file-clipboard-floating-toolbar-host");
    this.selectedAttachmentToolbar = toolbar;
    this.ownedAttachmentToolbar = ownsToolbar ? toolbar : null;
    this.ownedAttachmentToolbarHost = anchor;
    const iconAppearance = ownsToolbar ? null : this.getNativeIconAppearance(toolbar, insertionPoint);
    const insertBefore = ownsToolbar ? null : insertionPoint;
    this.addToolbarAction(toolbar, "external-link", "打开文件", () => void this.openLinkedFile(context.file), insertBefore, iconAppearance);
    if (this.settings.enableSaveAs) {
      this.addToolbarAction(toolbar, "download", "另存为", () => void this.saveAs(context.file), insertBefore, iconAppearance);
    }
    if (this.settings.enableCopyFile) {
      this.addToolbarAction(toolbar, "copy", "复制到系统剪贴板", () => void this.copyFile(context.file), insertBefore, iconAppearance);
    }
    if (this.settings.enableCaptionEdit) {
      this.addToolbarAction(toolbar, "pencil", "编辑题注", () =>
        void this.editCaption(context.view, context.sourceFile, context.file, context.image || context.linkElement), insertBefore, iconAppearance);
    }
    if (this.settings.enableRevealInExplorer) {
      this.addToolbarAction(toolbar, "folder-open", "在系统资源管理器中显示", () =>
        this.revealInSystemExplorer(context.file), insertBefore, iconAppearance);
    }
    if (ownsToolbar && this.settings.enableEditLink) {
      this.addToolbarAction(toolbar, "code-2", "编辑链接", () =>
        void this.editAttachmentLink(context), insertBefore, iconAppearance);
    }
    return true;
  }

  isToolbarControlTarget(target) {
    if (!(target instanceof Element)) return false;
    if (target.closest(".file-clipboard-toolbar-button, .file-clipboard-caption-input")) return true;

    const toolbar = target.closest(".file-clipboard-toolbar");
    return toolbar instanceof Element;
  }

  isLivePreviewContext(context) {
    return Boolean(context && context.mode === "live-preview");
  }

  findNativeActionPanel(host) {
    const fileEmbed = host.matches(".file-embed") ? host : host.querySelector(":scope > .file-embed");
    if (fileEmbed instanceof Element && !fileEmbed.matches(".image-embed")) {
      const toolbar = fileEmbed.createDiv({ cls: "file-clipboard-floating-toolbar" });
      return { toolbar, insertionPoint: null, ownsToolbar: true, anchor: fileEmbed };
    }

    const editButton = host.querySelector(".edit-block-button");
    if (editButton instanceof Element) {
      if (editButton.parentElement && editButton.parentElement !== host) {
        return { toolbar: editButton.parentElement, insertionPoint: editButton };
      }

      // Non-image file embeds often expose only the native edit button. Reuse
      // that element itself as the group instead of creating another panel.
      const sourceIcon = editButton.querySelector(":scope > svg");
      return { toolbar: editButton, insertionPoint: sourceIcon };
    }

    const toolbarSelectors = [
      ".pdf-toolbar",
      ":scope > [role='toolbar']",
      ":scope > .view-actions",
      ":scope > [class*='toolbar']",
    ];
    for (const selector of toolbarSelectors) {
      const toolbar = host.querySelector(selector);
      if (toolbar instanceof Element && !toolbar.matches(".file-clipboard-caption-input")) {
        return { toolbar, insertionPoint: toolbar.firstElementChild };
      }
    }
    return null;
  }

  getNativeIconAppearance(toolbar, insertionPoint) {
    const referenceIcon = insertionPoint?.matches?.("svg")
      ? insertionPoint
      : insertionPoint?.querySelector?.("svg") || toolbar.querySelector("svg");
    if (!(referenceIcon instanceof Element) || typeof window.getComputedStyle !== "function") return null;

    const style = window.getComputedStyle(referenceIcon);
    return {
      color: style.color,
      stroke: style.stroke && style.stroke !== "none" ? style.stroke : style.color,
      strokeWidth: style.strokeWidth,
      opacity: style.opacity,
    };
  }

  addToolbarAction(toolbar, icon, label, action, beforeElement = null, appearance = null) {
    const button = toolbar.createDiv({ cls: "clickable-icon file-clipboard-toolbar-button" });
    if (beforeElement) toolbar.insertBefore(button, beforeElement);
    button.setAttribute("role", "button");
    button.setAttribute("tabindex", "0");
    button.setAttribute("aria-label", label);
    button.setAttribute("data-tooltip-position", "top");
    setIcon(button, icon);
    this.applyNativeIconAppearance(button, appearance);
    const run = (event) => {
      event.preventDefault();
      event.stopPropagation();
      action();
    };
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    });
    button.addEventListener("click", run);
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") run(event);
    });
  }

  applyNativeIconAppearance(button, appearance) {
    if (!appearance) return;
    if (appearance.color) button.style.setProperty("color", appearance.color, "important");
    const icon = button.querySelector("svg");
    if (!icon) return;
    if (appearance.color) icon.style.setProperty("color", appearance.color, "important");
    if (appearance.stroke) icon.style.setProperty("stroke", appearance.stroke, "important");
    if (appearance.strokeWidth) icon.style.setProperty("stroke-width", appearance.strokeWidth, "important");
    if (appearance.opacity) icon.style.setProperty("opacity", appearance.opacity, "important");
  }

  clearAttachmentSelection() {
    if (this.selectedAttachmentHost) {
      this.selectedAttachmentHost.removeClass("file-clipboard-selection-host");
    }
    this.selectedAttachmentHost = null;
    this.clearAttachmentToolbar();
  }

  clearAttachmentToolbar() {
    const toolbar = this.selectedAttachmentToolbar;
    if (toolbar) {
      toolbar.querySelectorAll(".file-clipboard-toolbar-button").forEach((button) => button.remove());
      if (toolbar === this.ownedAttachmentToolbar) {
        toolbar.remove();
      } else {
        toolbar.removeClass("file-clipboard-toolbar");
      }
    }
    this.ownedAttachmentToolbarHost?.removeClass("file-clipboard-floating-toolbar-host");
    this.toolbarAttachmentHost = null;
    this.selectedAttachmentToolbar = null;
    this.ownedAttachmentToolbar = null;
    this.ownedAttachmentToolbarHost = null;
  }

  async openLinkedFile(file) {
    const leaf = this.app.workspace.getLeaf(false);
    await leaf.openFile(file);
    this.app.workspace.revealLeaf?.(leaf);
  }

  async editAttachmentLink(context) {
    if (!this.isLivePreviewContext(context)) return;
    const host = context.host;
    if (!(host instanceof Element)) return;

    const embedBlock = host.closest(".cm-embed-block");
    const nativeEditButton = embedBlock?.querySelector(".edit-block-button");
    if (nativeEditButton instanceof Element && typeof nativeEditButton.click === "function") {
      this.clearAttachmentSelection();
      nativeEditButton.click();
      return;
    }

    const editor = context.view?.editor;
    if (!editor || typeof editor.getValue !== "function" || typeof editor.offsetToPos !== "function") {
      new Notice("无法进入链接编辑状态");
      return;
    }

    const references = this.parseFileReferences(editor.getValue(), context.sourceFile.path, context.file.path);
    if (!references.length) {
      new Notice("没有在当前笔记中找到这个文件的 Markdown 链接");
      return;
    }

    const referenceElement = context.image || context.linkElement || host;
    const selected = this.selectReference(context.view, referenceElement, references, context.file);
    const cursorOffset = Math.min(selected.from + 1, selected.to);
    const cursor = editor.offsetToPos(cursorOffset);
    this.clearAttachmentSelection();
    editor.setSelection(cursor, cursor);
    editor.focus?.();
  }

  handleCopyShortcut(event) {
    if (!this.settings.enableCtrlCCopy || event.defaultPrevented) return;
    if (event.key.toLowerCase() !== "c" || (!event.ctrlKey && !event.metaKey) || event.altKey || event.shiftKey) return;

    const target = event.target;
    if (target instanceof Element && target.closest("input, textarea, [contenteditable='true']:not(.cm-content)")) return;
    const selection = window.getSelection?.();
    if (selection && !selection.isCollapsed && selection.toString()) return;

    const context = this.lastAttachmentContext;
    if (!this.isLivePreviewContext(context) || !context.view?.containerEl?.isConnected) return;
    if (context.view.editor?.getSelection?.()) return;

    event.preventDefault();
    event.stopPropagation();
    void this.copyFile(context.file);
  }

  findMarkdownView(element) {
    for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
      const view = leaf.view;
      if (view && view.containerEl && view.containerEl.contains(element)) return view;
    }
    return null;
  }

  resolveFile(element, image, sourceFile) {
    const sourcePath = sourceFile ? sourceFile.path : "";
    const candidates = [];

    if (element) {
      for (const attribute of ["data-href", "src", "href"]) {
        const value = element.getAttribute && element.getAttribute(attribute);
        if (value) candidates.push(value);
      }
    }

    if (image) {
      const embed = image.closest("[data-href], .internal-embed, .image-embed");
      if (embed) {
        for (const attribute of ["data-href", "src"]) {
          const value = embed.getAttribute(attribute);
          if (value) candidates.push(value);
        }
      }
      if (image.getAttribute("src")) candidates.push(image.getAttribute("src"));
    }

    for (const candidate of candidates) {
      const file = this.resolveLinkPath(candidate, sourcePath);
      if (file) return file;
    }

    const resourceUrl = image && (image.currentSrc || image.src);
    if (resourceUrl) {
      const normalizedResource = this.normalizeResourceUrl(resourceUrl);
      return this.resourceFileIndex.get(normalizedResource) || null;
    }

    return null;
  }

  resolveLinkPath(rawPath, sourcePath) {
    if (!rawPath || /^(?:app|blob|data|https?):/i.test(rawPath)) return null;

    let linkPath = rawPath.split("#", 1)[0].trim();
    if (linkPath.startsWith("<") && linkPath.endsWith(">")) {
      linkPath = linkPath.slice(1, -1);
    }

    try {
      linkPath = decodeURIComponent(linkPath);
    } catch (_) {
      // Keep the original path when it contains malformed percent escapes.
    }

    linkPath = linkPath.replace(/\\/g, "/").replace(/^\.\//, "");
    return this.app.metadataCache.getFirstLinkpathDest(linkPath, sourcePath) || null;
  }

  normalizeResourceUrl(value) {
    try {
      const url = new URL(value);
      url.search = "";
      url.hash = "";
      return decodeURIComponent(url.toString());
    } catch (_) {
      return value.split(/[?#]/, 1)[0];
    }
  }

  rebuildResourceFileIndex() {
    const index = new Map();
    for (const file of this.app.vault.getFiles()) {
      index.set(this.normalizeResourceUrl(this.app.vault.getResourcePath(file)), file);
    }
    this.resourceFileIndex = index;
  }

  getFullPath(file) {
    const adapter = this.app.vault.adapter;
    return typeof adapter.getFullPath === "function" ? adapter.getFullPath(file.path) : null;
  }

  async saveAs(file) {
    try {
      const picker = window.showSaveFilePicker;
      if (typeof picker === "function") {
        const handle = await picker({ suggestedName: file.name });
        const writable = await handle.createWritable();
        await writable.write(await this.app.vault.readBinary(file));
        await writable.close();
        new Notice(`已另存为：${handle.name}`);
        return;
      }

      const fullPath = this.getFullPath(file);
      const electron = require("electron");
      const dialog = electron.dialog || (electron.remote && electron.remote.dialog);
      if (!fullPath || !dialog || typeof dialog.showSaveDialog !== "function") {
        throw new Error("当前 Obsidian 版本未提供文件保存对话框");
      }

      const result = await dialog.showSaveDialog({ defaultPath: file.name });
      if (result.canceled || !result.filePath) return;
      await require("fs").promises.copyFile(fullPath, result.filePath);
      new Notice(`已另存为：${result.filePath}`);
    } catch (error) {
      if (error && error.name === "AbortError") return;
      console.error("File & Clipboard Tools: save failed", error);
      new Notice(`另存失败：${this.errorMessage(error)}`);
    }
  }

  /** 立即反馈复制进度；系统剪贴板为共享资源，完成前忽略重复触发。 */
  async copyFile(file) {
    if (this.copyInProgress) return;
    // true 表示已有复制操作尚未结束，避免并发启动辅助进程争用剪贴板。
    this.copyInProgress = true;
    const notice = new Notice("正在复制到系统剪贴板…", 0);
    try {
      const fullPath = this.getFullPath(file);
      if (!fullPath) throw new Error("无法获取文件的本地路径");

      if (process.platform === "win32") {
        await this.copyFileWithWindowsHelper(fullPath);
        notice.setMessage("文件已复制到系统剪贴板，可直接粘贴");
        return;
      }

      const electron = require("electron");
      const fileUrl = require("url").pathToFileURL(fullPath).href;

      // Newer Electron versions map text/uri-list to CF_HDROP on Windows,
      // NSFilenamesPboardType on macOS, and text/uri-list on Linux.
      if (typeof electron.clipboard.write === "function" && typeof electron.ClipboardItem === "function") {
        const item = new electron.ClipboardItem({
          "text/uri-list": new Blob([`${fileUrl}\r\n`], { type: "text/uri-list" })
        });
        await electron.clipboard.write([item]);
        notice.setMessage("文件已复制到系统剪贴板，可直接粘贴");
        return;
      }

      await this.copyFileLegacy(fullPath, fileUrl, electron.clipboard);
      notice.setMessage("文件已复制到系统剪贴板，可直接粘贴");
    } catch (error) {
      console.error("File & Clipboard Tools: file copy failed", error);
      notice.setMessage(`复制失败：${this.errorMessage(error)}`);
    } finally {
      this.copyInProgress = false;
      // 进度提示不自动消失；结果展示 3 秒后收起，成功仅在写入确认后显示。
      setTimeout(() => notice.hide(), 3000);
    }
  }

  async copyFileLegacy(fullPath, fileUrl, clipboard) {
    if (process.platform === "darwin") {
      const escapedPath = this.escapeXml(fullPath);
      const plist = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
        '<plist version="1.0"><array>',
        `<string>${escapedPath}</string>`,
        "</array></plist>"
      ].join("");
      clipboard.writeBuffer("NSFilenamesPboardType", Buffer.from(plist, "utf8"));
      return;
    }

    clipboard.writeBuffer("text/uri-list", Buffer.from(`${fileUrl}\r\n`, "utf8"));
  }

  async copyFileWithWindowsHelper(fullPath) {
    const encodedPath = Buffer.from(fullPath, "utf8").toString("base64");
    const script = [
      "$ErrorActionPreference = 'Stop'",
      "Add-Type -AssemblyName System.Windows.Forms",
      "[Console]::OutputEncoding = [Text.Encoding]::UTF8",
      `$path = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${encodedPath}'))`,
      "if (-not [IO.File]::Exists($path)) { throw ('文件不存在：' + $path) }",
      "$files = New-Object System.Collections.Specialized.StringCollection",
      "[void]$files.Add($path)",
      "$lastError = $null",
      "for ($attempt = 0; $attempt -lt 8; $attempt++) {",
      "  try {",
      "    [Windows.Forms.Clipboard]::SetFileDropList($files)",
      "    $copied = [Windows.Forms.Clipboard]::GetFileDropList()",
      "    if ($copied.Count -eq 1 -and $copied[0] -eq $path) {",
      "      [Console]::Out.Write('OK')",
      "      exit 0",
      "    }",
      "    $lastError = '系统剪贴板校验失败'",
      "  } catch {",
      "    $lastError = $_.Exception.Message",
      "  }",
      "  Start-Sleep -Milliseconds 80",
      "}",
      "throw $lastError"
    ].join("\n");
    const encodedScript = Buffer.from(script, "utf16le").toString("base64");
    return new Promise((resolve, reject) => {
      require("child_process").execFile(
        "powershell.exe",
        ["-NoProfile", "-NonInteractive", "-STA", "-EncodedCommand", encodedScript],
        { windowsHide: true, timeout: 8000, encoding: "utf8" },
        (error, stdout, stderr) => {
          if (error) {
            const details = (stderr || stdout || error.message).trim();
            reject(new Error(details || "系统剪贴板写入失败"));
            return;
          }
          if (stdout.trim() !== "OK") {
            reject(new Error("系统剪贴板没有返回写入成功状态"));
            return;
          }
          resolve();
        }
      );
    });
  }

  escapeXml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  async editCaption(view, sourceFile, linkedFile, referenceElement) {
    if (!(referenceElement instanceof Element) || !referenceElement.closest(".markdown-source-view.mod-cm6")) return;
    const content = view.editor ? view.editor.getValue() : await this.app.vault.cachedRead(sourceFile);
    const references = this.parseFileReferences(content, sourceFile.path, linkedFile.path);
    if (!references.length) {
      new Notice("没有在当前笔记中找到这个文件的 Markdown 链接");
      return;
    }

    const selected = this.selectReference(view, referenceElement, references, linkedFile);
    const host = referenceElement.closest(".image-embed, .internal-embed, a.internal-link") || referenceElement;
    if (!(host instanceof Element)) {
      new Notice("无法在当前渲染内容中编辑题注");
      return;
    }

    this.activeCaptionEditor?.cancel();
    host.addClass("file-clipboard-caption-editing");
    const input = host.createEl("input", { cls: "file-clipboard-caption-input" });
    const isLivePreviewFileCaption = Boolean(
      host.matches(".internal-embed.file-embed:not(.image-embed)") &&
      host.closest(".markdown-source-view.mod-cm6")
    );
    let captionPortalCleanup = null;
    if (isLivePreviewFileCaption) {
      input.addClass("file-clipboard-portal-caption-input");
      captionPortalCleanup = this.mountLivePreviewCaptionInput(host, input);
    }
    input.type = "text";
    input.value = selected.caption;
    input.placeholder = "输入题注；留空可删除";
    let finished = false;

    const finish = async (save) => {
      if (finished) return;
      finished = true;
      const nextCaption = input.value.trim();
      captionPortalCleanup?.();
      input.remove();
      host.removeClass("file-clipboard-caption-editing");
      this.activeCaptionEditor = null;
      if (!save) return;

      try {
        await this.applyCaptionChange(view, sourceFile, linkedFile, selected, nextCaption);
        if (host.matches(".image-embed, .internal-embed")) host.setAttribute("alt", nextCaption);
      } catch (error) {
        console.error("File & Clipboard Tools: caption edit failed", error);
        new Notice(`无法编辑题注：${this.errorMessage(error)}`);
      }
    };

    this.activeCaptionEditor = { cancel: () => void finish(false) };
    input.addEventListener("pointerdown", (event) => event.stopPropagation());
    input.addEventListener("click", (event) => event.stopPropagation());
    input.addEventListener("blur", () => void finish(true));
    input.addEventListener("keydown", (event) => {
      if (event.isComposing) return;
      if (event.key === "Enter") {
        event.preventDefault();
        void finish(true);
      } else if (event.key === "Escape") {
        event.preventDefault();
        void finish(false);
      }
    });
    window.setTimeout(() => {
      input.focus();
      input.select();
    }, 0);
  }

  mountLivePreviewCaptionInput(host, input) {
    const ownerDocument = host.ownerDocument;
    const portalWindow = ownerDocument?.defaultView || window;
    if (!ownerDocument?.body || typeof host.getBoundingClientRect !== "function") return null;

    ownerDocument.body.appendChild(input);
    const reposition = () => {
      if (!input.isConnected || !host.isConnected) return;
      const rect = host.getBoundingClientRect();
      const hostStyle = portalWindow.getComputedStyle?.(host);
      const configuredGap = Number.parseFloat(hostStyle?.getPropertyValue("--size-4-2") || "");
      const gap = Number.isFinite(configuredGap) ? configuredGap : 8;
      input.style.left = `${rect.left}px`;
      input.style.top = `${rect.bottom + gap}px`;
      input.style.width = `${rect.width}px`;
    };

    reposition();
    portalWindow.addEventListener("scroll", reposition, true);
    portalWindow.addEventListener("resize", reposition);
    return () => {
      portalWindow.removeEventListener("scroll", reposition, true);
      portalWindow.removeEventListener("resize", reposition);
    };
  }

  async applyCaptionChange(view, sourceFile, linkedFile, selected, nextCaption) {
    const editor = view.editor;
    const currentContent = editor ? editor.getValue() : await this.app.vault.cachedRead(sourceFile);
    const currentReferences = this.parseFileReferences(currentContent, sourceFile.path, linkedFile.path);
    if (!currentReferences.length) throw new Error("文件链接已经发生变化");

    const current = currentReferences.reduce((best, item) =>
      Math.abs(item.from - selected.from) < Math.abs(best.from - selected.from) ? item : best
    );
    const replacement = current.build(nextCaption);

    if (editor && typeof editor.replaceRange === "function") {
      editor.replaceRange(
        replacement,
        editor.offsetToPos(current.from),
        editor.offsetToPos(current.to)
      );
      return;
    }

    await this.app.vault.process(sourceFile, (latestContent) => {
      const latestReferences = this.parseFileReferences(latestContent, sourceFile.path, linkedFile.path);
      if (!latestReferences.length) return latestContent;
      const latest = latestReferences.reduce((best, item) =>
        Math.abs(item.from - current.from) < Math.abs(best.from - current.from) ? item : best
      );
      return `${latestContent.slice(0, latest.from)}${latest.build(nextCaption)}${latestContent.slice(latest.to)}`;
    });
  }

  parseFileReferences(content, sourcePath, targetPath) {
    const results = [];
    const patterns = [
      { type: "wiki", regex: /(!?)\[\[([^\]\n]+)\]\]/g },
      { type: "markdown", regex: /(!?)\[([^\]\n]*)\]\(([^)\n]+)\)/g }
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.regex.exec(content)) !== null) {
        const parsed = pattern.type === "wiki"
          ? this.parseWikiReference(match)
          : this.parseMarkdownReference(match);
        if (!parsed) continue;

        const linkedFile = this.resolveLinkPath(parsed.linkPath, sourcePath);
        if (!linkedFile || linkedFile.path !== targetPath) continue;

        results.push({
          from: match.index,
          to: match.index + match[0].length,
          caption: parsed.caption,
          captionFrom: match.index + parsed.captionFrom,
          captionTo: match.index + parsed.captionTo,
          separatorInsertion: parsed.separatorInsertion
            ? {
                at: match.index + parsed.separatorInsertion.at,
                cursorShift: parsed.separatorInsertion.cursorShift
              }
            : null,
          build: parsed.build
        });
      }
    }

    return results.sort((a, b) => a.from - b.from);
  }

  parseWikiReference(match) {
    const embedded = match[1] === "!";
    const inner = match[2];
    const originalParts = inner.split("|");
    const parts = [...originalParts];
    const linkPath = parts.shift().trim();
    const size = embedded && this.isImageLinkPath(linkPath) && parts.length && SIZE_PATTERN.test(parts[parts.length - 1].trim())
      ? parts.pop().trim()
      : "";
    const caption = parts.join("|").trim();
    const innerOffset = embedded ? 3 : 2;
    const firstPipe = inner.indexOf("|");
    let captionFrom;
    let captionTo;
    let separatorInsertion = null;

    if (firstPipe === -1) {
      captionFrom = innerOffset + inner.length;
      captionTo = captionFrom;
      separatorInsertion = { at: captionFrom, cursorShift: 1 };
    } else {
      captionFrom = innerOffset + firstPipe + 1;
      captionTo = innerOffset + inner.length - (size ? size.length + 1 : 0);
      if (size && originalParts.length === 2) {
        captionTo = captionFrom;
        separatorInsertion = { at: captionFrom, cursorShift: 0 };
      }
    }

    return {
      linkPath,
      caption,
      captionFrom,
      captionTo,
      separatorInsertion,
      build: (nextCaption) => {
        const suffix = [nextCaption, size].filter(Boolean).join("|");
        return `${embedded ? "!" : ""}[[${linkPath}${suffix ? `|${suffix}` : ""}]]`;
      }
    };
  }

  parseMarkdownReference(match) {
    const embedded = match[1] === "!";
    const altParts = match[2].split("|");
    const destination = match[3];
    const linkPath = this.extractMarkdownDestination(destination);
    const size = embedded && this.isImageLinkPath(linkPath) && altParts.length && SIZE_PATTERN.test(altParts[altParts.length - 1].trim())
      ? altParts.pop().trim()
      : "";
    const caption = altParts.join("|").trim();
    const captionFrom = embedded ? 2 : 1;
    const captionTo = captionFrom + match[2].length - (size ? size.length + 1 : 0);

    return {
      linkPath,
      caption,
      captionFrom,
      captionTo,
      separatorInsertion: null,
      build: (nextCaption) => {
        const alt = [nextCaption, size].filter(Boolean).join("|");
        return `${embedded ? "!" : ""}[${alt}](${destination})`;
      }
    };
  }

  isImageLinkPath(linkPath) {
    const cleanPath = linkPath.split(/[?#]/, 1)[0];
    const extension = cleanPath.includes(".") ? cleanPath.split(".").pop().toLowerCase() : "";
    return IMAGE_EXTENSIONS.has(extension);
  }

  extractMarkdownDestination(destination) {
    const value = destination.trim();
    if (value.startsWith("<")) {
      const end = value.indexOf(">");
      return end === -1 ? value : value.slice(1, end);
    }
    const match = value.match(/^(\S+)/);
    return match ? match[1] : value;
  }

  selectReference(view, referenceElement, references, linkedFile) {
    const cm = view.editor && view.editor.cm;
    if (cm && typeof cm.posAtDOM === "function") {
      try {
        const position = cm.posAtDOM(referenceElement);
        if (Number.isFinite(position)) {
          return references.reduce((best, item) =>
            this.distanceToRange(position, item) < this.distanceToRange(position, best) ? item : best
          );
        }
      } catch (_) {
        // Reading view and some themes don't expose a CodeMirror DOM position.
      }
    }

    const elements = Array.from(view.containerEl.querySelectorAll("a.internal-link, .internal-embed")).filter((candidate) => {
      const image = candidate.matches("img") ? candidate : candidate.querySelector("img");
      const file = this.resolveFile(candidate, image, view.file);
      return file && file.path === linkedFile.path;
    });
    const renderedReference = referenceElement.closest("a.internal-link, .internal-embed") || referenceElement;
    const visualIndex = elements.indexOf(renderedReference);
    return references[Math.min(Math.max(visualIndex, 0), references.length - 1)] || references[0];
  }

  distanceToRange(position, range) {
    if (position < range.from) return range.from - position;
    if (position > range.to) return position - range.to;
    return 0;
  }

  registerSharedClipboardHandlers() {
    this.registerEvent(
      this.app.workspace.on("editor-paste", (event, editor, view) => {
        if (!this.settings.enableSharedClipboardFormatting) return;
        const activeFile = view?.file ?? this.app.workspace.getActiveFile();
        if (!activeFile || normalizePath(activeFile.path) !== this.getTargetNotePath()) return;

        const clipboard = event.clipboardData;
        if (!clipboard) return;

        const clipboardFiles = this.getTransferFiles(clipboard);
        if (this.hasTransferFiles(clipboard)) {
          const filePreview = this.makeFilePreview(clipboardFiles, clipboard.items);
          this.insertNativeFileEntry(editor, filePreview, clipboardFiles, clipboard.items);
          return;
        }

        const text = clipboard.getData("text/plain");
        if (text === "") return;

        event.preventDefault();
        const preview = this.makeSummary(text) || "文本";
        this.insertDailyEntry(editor, `## ${preview}\n\n${this.asCodeBlock(text)}`, false);
      })
    );

    this.registerEvent(
      this.app.workspace.on("editor-drop", (event, editor, view) => {
        if (!this.settings.enableSharedClipboardFormatting) return;
        const activeFile = view?.file ?? this.app.workspace.getActiveFile();
        if (!activeFile || normalizePath(activeFile.path) !== this.getTargetNotePath()) return;

        const transfer = event.dataTransfer;
        if (!transfer || !this.hasTransferFiles(transfer)) return;

        const files = this.getTransferFiles(transfer);
        this.insertNativeFileEntry(editor, this.makeFilePreview(files, transfer.items), files, transfer.items);
      })
    );

    this.registerEvent(
      this.app.vault.on("create", (file) => {
        if (!this.settings.enableSharedClipboardFormatting) return;
        if (!(file instanceof TFile) || file.extension.toLowerCase() === "md") return;

        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile || normalizePath(activeFile.path) !== this.getTargetNotePath()) return;
        if (this.consumePendingNativeFileCreation()) return;

        const editor = this.app.workspace.activeEditor?.editor;
        if (editor) this.insertDailyEntry(editor, `## ${this.makeFilePreview([file], [])}`, true);
      })
    );
  }

  async loadSettings() {
    const stored = await this.loadData() || {};
    if (stored.enableCopyFile === undefined && stored.enableContextMenuCopy !== undefined) {
      stored.enableCopyFile = stored.enableContextMenuCopy;
    }
    delete stored.enableContextMenuCopy;
    this.settings = Object.assign({}, DEFAULT_SETTINGS, stored);
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  syncRibbonVisibility() {
    if (this.sharedClipboardRibbonEl) {
      this.sharedClipboardRibbonEl.style.display = this.settings.showSharedClipboardRibbon ? "" : "none";
    }
  }

  getTargetNotePath() {
    const configuredPath = this.settings.targetNotePath.trim();
    return normalizePath(configuredPath || DEFAULT_SETTINGS.targetNotePath);
  }

  async openClipboardNote() {
    const targetPath = this.getTargetNotePath();
    try {
      let file = this.app.vault.getAbstractFileByPath(targetPath);
      if (!file) {
        await this.ensureParentFolder(targetPath);
        file = await this.app.vault.create(targetPath, "");
      }

      if (!(file instanceof TFile)) {
        new Notice(`无法打开共享剪切板：路径不是文件 ${targetPath}`);
        return;
      }

      const leaf = this.app.workspace.getLeaf(false);
      await leaf.openFile(file);
      this.app.workspace.revealLeaf?.(leaf);
    } catch (error) {
      new Notice(`无法打开共享剪切板：${this.errorMessage(error)}`);
    }
  }

  async ensureParentFolder(filePath) {
    const segments = filePath.split("/").slice(0, -1);
    let currentPath = "";
    for (const segment of segments) {
      currentPath = currentPath ? `${currentPath}/${segment}` : segment;
      if (!this.app.vault.getAbstractFileByPath(currentPath)) {
        await this.app.vault.createFolder(currentPath);
      }
    }
  }

  makeDateHeading() {
    const now = new Date();
    const pad = (value) => String(value).padStart(2, "0");
    return `# ${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  }

  makeSummary(text) {
    const normalized = text.replace(/\s+/g, " ").trim();
    const characters = Array.from(this.stripPreviewPrefixes(normalized));
    return characters.length <= 40 ? characters.join("") : `${characters.slice(0, 40).join("")}…`;
  }

  stripPreviewPrefixes(text) {
    const patterns = [
      /^#{1,6}\s*/,
      /^>\s*/,
      /^(?:[-+*]|\d+[.)])\s+/,
      /^\[(?: |x|X)\]\s*/,
      /^`{3,}[A-Za-z0-9_-]*\s*/,
    ];
    let cleaned = text;
    let changed = true;
    while (changed && cleaned) {
      changed = false;
      for (const pattern of patterns) {
        const next = cleaned.replace(pattern, "");
        if (next !== cleaned) {
          cleaned = next.trimStart();
          changed = true;
        }
      }
    }
    return cleaned;
  }

  hasTransferFiles(transfer) {
    return Array.from(transfer.files ?? []).length > 0 ||
      Array.from(transfer.items ?? []).some((item) => item.kind === "file");
  }

  getTransferFiles(transfer) {
    const files = Array.from(transfer.files ?? []);
    if (files.length) return files;
    return Array.from(transfer.items ?? [])
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile?.())
      .filter(Boolean);
  }

  insertNativeFileEntry(editor, filePreview, files, items) {
    const fileCount = files.length ||
      Array.from(items ?? []).filter((item) => item.kind === "file").length || 1;
    this.trackPendingNativeFileCreations(fileCount);
    this.insertDailyEntry(editor, `## ${filePreview}`, true);
  }

  trackPendingNativeFileCreations(count) {
    const expiresAt = Date.now() + 5000;
    for (let index = 0; index < count; index += 1) {
      this.pendingNativeFileCreations.push(expiresAt);
    }
  }

  consumePendingNativeFileCreation() {
    const now = Date.now();
    this.pendingNativeFileCreations = this.pendingNativeFileCreations.filter((expiresAt) => expiresAt > now);
    if (!this.pendingNativeFileCreations.length) return false;
    this.pendingNativeFileCreations.shift();
    return true;
  }

  makeFilePreview(files, items) {
    const candidates = files.length ? files : Array.from(items ?? [])
      .filter((item) => item.kind === "file")
      .map((item) => ({ name: "", type: item.type ?? "" }));
    const descriptions = [...new Set(candidates.map((file) => this.describeFileType(file)))];
    if (candidates.length > 1) {
      return `${descriptions.slice(0, 2).join("、") || "文件"}（${candidates.length} 个文件）`;
    }
    return descriptions[0] || "文件";
  }

  describeFileType(file) {
    const extension = file.name?.match(/\.([^.]+)$/)?.[1]?.toUpperCase() ?? "";
    const mimeType = (file.type ?? "").toLowerCase();
    const subtype = mimeType.split("/")[1]?.split(/[;+]/)[0]?.toUpperCase() ?? "";
    const label = extension || subtype;
    if (mimeType.startsWith("image/")) return `${label || "图片"}${label ? " 图片" : ""}`;
    if (mimeType.startsWith("video/")) return `${label || "视频"}${label ? " 视频" : ""}`;
    if (mimeType.startsWith("audio/")) return `${label || "音频"}${label ? " 音频" : ""}`;
    return `${label || "未知类型"} 文件`;
  }

  insertDailyEntry(editor, entry, prepareForNativeAttachment) {
    const { offset, needsDateHeading } = this.findDailySectionInsertion(editor.getValue());
    const position = editor.offsetToPos(offset);
    editor.setSelection(position, position);
    const content = needsDateHeading ? `${this.makeDateHeading()}\n\n${entry}` : entry;
    let insertion = this.withDocumentSpacing(editor, content);
    if (prepareForNativeAttachment && !insertion.endsWith("\n\n")) insertion += "\n\n";
    editor.replaceSelection(insertion);
  }

  findDailySectionInsertion(documentText) {
    const date = this.makeDateHeading().slice(2);
    const todayMatch = new RegExp(`^#[ \\t]+${date}[ \\t]*$`, "m").exec(documentText);
    if (!todayMatch) return { offset: documentText.length, needsDateHeading: true };

    const afterTodayHeading = todayMatch.index + todayMatch[0].length;
    const remainingText = documentText.slice(afterTodayHeading);
    const nextDateSection = /^#[ \t]+\d{4}-\d{2}-\d{2}[ \t]*$/m.exec(remainingText);
    return {
      offset: nextDateSection ? afterTodayHeading + nextDateSection.index : documentText.length,
      needsDateHeading: false,
    };
  }

  asCodeBlock(text) {
    const longest = Math.max(0, ...Array.from(text.matchAll(/`+/g), (match) => match[0].length));
    const fence = "`".repeat(Math.max(3, longest + 1));
    return `${fence}\n${text}${text.endsWith("\n") ? "" : "\n"}${fence}`;
  }

  withDocumentSpacing(editor, content) {
    const documentText = editor.getValue();
    const fromOffset = editor.posToOffset(editor.getCursor("from"));
    const toOffset = editor.posToOffset(editor.getCursor("to"));
    const before = documentText.slice(0, fromOffset);
    const after = documentText.slice(toOffset);
    return `${this.spacingBefore(before)}${content}${this.spacingAfter(after)}`;
  }

  spacingBefore(text) {
    if (!text.length || text.endsWith("\n\n")) return "";
    return text.endsWith("\n") ? "\n" : "\n\n";
  }

  spacingAfter(text) {
    if (!text.length || text.startsWith("\n\n")) return "";
    return text.startsWith("\n") ? "\n" : "\n\n";
  }

  revealInSystemExplorer(file) {
    try {
      const fullPath = this.getFullPath(file);
      const { shell } = require("electron");
      if (!fullPath) throw new Error("无法获取附件的本地路径");
      shell.showItemInFolder(fullPath);
    } catch (error) {
      console.error("File & Clipboard Tools: reveal failed", error);
      new Notice(`定位失败：${this.errorMessage(error)}`);
    }
  }

  errorMessage(error) {
    return error instanceof Error ? error.message : String(error);
  }
};

class FileClipboardToolsSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h3", { text: "Attachment toolbar actions" });
    this.addToggle("Save As", "Show the Save As action in the attachment toolbar.", "enableSaveAs");
    this.addToggle(
      "Copy file",
      "Show the toolbar action that copies a file object to the system clipboard.",
      "enableCopyFile"
    );
    this.addToggle(
      "Copy with Ctrl+C",
      "After clicking an attachment, copy its file object to the system clipboard with Ctrl+C.",
      "enableCtrlCCopy"
    );
    this.addToggle("Edit caption", "Edit captions directly in the rendered attachment or link.", "enableCaptionEdit");
    this.addToggle(
      "Reveal in File Explorer",
      "Show the action that locates an attachment in the system file manager.",
      "enableRevealInExplorer"
    );
    this.addToggle(
      "Edit file link",
      "Show a source button that reveals the Markdown link behind a rendered file card.",
      "enableEditLink"
    );
    this.addToggle(
      "Select attachments on click",
      "Select linked files instead of opening them immediately, and show an action toolbar in the upper-right corner.",
      "enableClickSelectionToolbar",
      () => {
        if (!this.plugin.settings.enableClickSelectionToolbar) this.plugin.clearAttachmentSelection();
      }
    );

    containerEl.createEl("h3", { text: "Shared clipboard note" });
    this.addToggle(
      "Format shared clipboard entries",
      "Group pasted text and attachments by date in the configured note.",
      "enableSharedClipboardFormatting"
    );
    this.addToggle(
      "Show ribbon button",
      "Show the Open Shared Clipboard button in the left ribbon.",
      "showSharedClipboardRibbon",
      () => this.plugin.syncRibbonVisibility()
    );

    new Setting(containerEl)
      .setName("Shared clipboard note path")
      .setDesc("Markdown path relative to the vault root. Only this note receives automatic clipboard formatting.")
      .addText((text) => text
        .setPlaceholder(DEFAULT_SETTINGS.targetNotePath)
        .setValue(this.plugin.settings.targetNotePath)
        .onChange(async (value) => {
          this.plugin.settings.targetNotePath = value.trim();
          await this.plugin.saveSettings();
        }));
  }

  addToggle(name, description, key, afterChange) {
    new Setting(this.containerEl)
      .setName(name)
      .setDesc(description)
      .addToggle((toggle) => toggle
        .setValue(this.plugin.settings[key])
        .onChange(async (value) => {
          this.plugin.settings[key] = value;
          await this.plugin.saveSettings();
          afterChange?.();
        }));
  }
}
