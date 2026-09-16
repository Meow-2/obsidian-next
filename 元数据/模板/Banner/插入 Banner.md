<%*
const bannerFolder = "元数据/背景/";
const imageExtensions = new Set(["png", "jpg", "jpeg", "gif", "webp", "avif", "svg"]);
const images = app.vault
  .getFiles()
  .filter((file) => file.path.startsWith(bannerFolder) && imageExtensions.has(file.extension.toLowerCase()))
  .sort((left, right) => left.basename.localeCompare(right.basename, "zh-CN"));

if (images.length === 0) {
  new Notice(`Banner 目录中没有图片：${bannerFolder}`);
  tR = "";
  return;
}

const selected = await tp.system.suggester(
  images.map((file) => file.basename),
  images,
  false,
  "选择 Banner 图片"
);

tR = selected ? `![[${selected.path}|banner]]` : "";
%>
