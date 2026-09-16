#!/usr/bin/env bash

set -Eeuo pipefail

# 只报告位置和退出码，避免将可能包含敏感信息的命令参数写入日志。
trap 'exit_code=$?; printf "错误：脚本第 %s 行执行失败（退出码 %s）。\n" "$LINENO" "$exit_code" >&2; exit "$exit_code"' ERR

DEFAULT_COMPOSE_DIR="/root/fast-note-sync-service"
DEFAULT_SERVICE="fast-note-sync-service"
DEFAULT_IMAGE="haierkeys/fast-note-sync-service:latest"

SSH_ALIAS=""
COMPOSE_DIR=""
SERVICE_NAME=""
IMAGE_NAME=""

usage() {
  cat <<'EOF'
从本机 Docker 拉取 Fast Note Sync 镜像，通过 SFTP 上传并更新远程 Compose 服务。

用法：
  update-fast-note-sync.sh [选项]

选项：
  -H, --host ALIAS       ~/.ssh/config 中的主机别名
  -d, --compose-dir DIR  远程 docker-compose.yaml 所在目录
  -s, --service NAME     Compose 服务名
  -i, --image IMAGE      要拉取的镜像，默认读取 Compose 配置
  -h, --help             显示帮助

示例：
  ./update-fast-note-sync.sh
  ./update-fast-note-sync.sh -H my-server -d /root/fast-note-sync-service

说明：
  - SSH 和 SFTP 均启用 BatchMode，只接受 SSH Key，不会退回密码登录。
  - 安装 gum 时使用交互列表；Git Bash 或未安装时使用 Bash select/read。
  - 请在交互式 Bash 终端中运行；可设置 USE_GUM=0 禁用 gum 界面。
  - 远端缺少 docker-compose.yaml 时，自动创建目录并上传脚本同目录的配置。
  - 远程账号需要有直接执行 docker 的权限，或已配置无密码 sudo（见 REMOTE_DOCKER）。
  - 如远程必须使用 sudo，可执行：REMOTE_DOCKER='sudo -n docker' ./update-fast-note-sync.sh
EOF
}

die() {
  printf '错误：%s\n' "$*" >&2
  exit 1
}

info() {
  printf '\n==> %s\n' "$*"
}

need_command() {
  command -v "$1" >/dev/null 2>&1 || die "缺少命令：$1"
}

has_gum() {
  # Windows gum 的终端界面在 Git Bash / mintty 下可能不可见，默认使用原生菜单。
  # USE_GUM=1 可供使用兼容终端的用户显式启用；USE_GUM=0 始终禁用。
  case "${OSTYPE:-}" in
    msys*|cygwin*) [[ "${USE_GUM:-0}" == 1 ]] || return 1 ;;
  esac
  [[ "${USE_GUM:-1}" != 0 ]] && command -v gum >/dev/null 2>&1
}

# 命令替换会捕获标准输出，因此用标准输入和标准错误判断交互终端。
require_terminal() {
  [[ -t 0 && -t 2 ]] \
    || die "当前操作需要交互终端。请打开 Bash 终端后运行：bash update-fast-note-sync.sh"
}

prompt_input() {
  local prompt="$1"
  local default_value="${2:-}"
  local result=""

  require_terminal
  if has_gum; then
    result="$(gum input --prompt "$prompt: " --value "$default_value")" \
      || die "输入已取消或 gum 运行失败；可设置 USE_GUM=0 重试"
  else
    read -r -p "$prompt [$default_value]: " result || die "未读取到输入"
    result="${result:-$default_value}"
  fi

  printf '%s' "$result"
}

confirm() {
  local prompt="$1"
  local answer=""

  require_terminal
  if has_gum; then
    gum confirm "$prompt"
    return
  fi

  read -r -p "$prompt [y/N]: " answer
  [[ "$answer" =~ ^[Yy]$ ]]
}

ssh_aliases() {
  local config_file="${HOME}/.ssh/config"
  [[ -f "$config_file" ]] || return 0

  awk '
    tolower($1) == "host" {
      for (i = 2; i <= NF; i++) {
        if ($i !~ /[*?!]/) print $i
      }
    }
  ' "$config_file" | awk '!seen[$0]++'
}

choose_item() {
  local prompt="$1"
  shift
  local items=("$@")
  local selected=""

  ((${#items[@]} > 0)) || return 1

  require_terminal
  printf '%s（方向键/回车；普通菜单输入序号）\n' "$prompt" >&2
  if has_gum; then
    printf '%s\n' "${items[@]}" | gum choose --header "$prompt" \
      || die "选择已取消或 gum 运行失败；可设置 USE_GUM=0 重试"
    return
  fi

  printf '%s\n' "$prompt" >&2
  select selected in "${items[@]}"; do
    [[ -n "$selected" ]] && {
      printf '%s' "$selected"
      return 0
    }
  done
  die "未选择任何项目，输入已结束"
}

remote_quote() {
  printf '%q' "$1"
}

# 仅在远端缺少配置时初始化；SSH 检查失败不能当作文件不存在。
# 配置通过 SSH 标准输入传输，临时文件完整写入后再以硬链接发布，避免覆盖已有配置。
ensure_remote_compose() {
  local remote_file="${COMPOSE_DIR%/}/docker-compose.yaml"
  local remote_file_q="$(remote_quote "$remote_file")"
  local remote_state=""
  local script_dir=""
  local local_compose=""
  local upload_script=""

  info "检查远程 docker-compose.yaml"
  remote_state="$(ssh "${SSH_OPTIONS[@]}" "$SSH_ALIAS" \
    "if [ -f $remote_file_q ]; then printf exists; elif [ -e $remote_file_q ] || [ -L $remote_file_q ]; then exit 1; else printf missing; fi")" \
    || die "检查远程配置失败：$remote_file"
  if [[ "$remote_state" == exists ]]; then
    info "远程配置已存在，保留原文件"
    return 0
  fi
  [[ "$remote_state" == missing ]] || die "远程配置检查返回了无法识别的结果"

  # 从脚本位置定位配置，允许用户在其他工作目录调用脚本。
  script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
  local_compose="$script_dir/docker-compose.yaml"
  [[ -f "$local_compose" && -r "$local_compose" ]] \
    || die "远程配置不存在，且无法读取本地配置：$local_compose"

  info "上传本地 docker-compose.yaml 到远程目录：$COMPOSE_DIR"
  upload_script='set -Eeuo pipefail
compose_dir="$1"
mkdir -p -- "$compose_dir"
cd -- "$compose_dir"
# 目录中若出现其他进程创建的配置，保留该文件。
if [[ -f docker-compose.yaml ]]; then exit 0; fi
temporary_file="$(mktemp .docker-compose.yaml.XXXXXX)"
trap '\''rm -f -- "$temporary_file"'\'' EXIT
cat > "$temporary_file"
if ! ln -- "$temporary_file" docker-compose.yaml; then
  [[ -f docker-compose.yaml ]] || exit 1
fi'
  ssh "${SSH_OPTIONS[@]}" "$SSH_ALIAS" \
    "bash -c $(remote_quote "$upload_script") -- $(remote_quote "$COMPOSE_DIR")" \
    < "$local_compose" || die "上传远程 Compose 配置失败：$remote_file"
}

while (($# > 0)); do
  case "$1" in
    -H|--host)
      (($# >= 2)) || die "$1 缺少参数"
      SSH_ALIAS="$2"
      shift 2
      ;;
    -d|--compose-dir)
      (($# >= 2)) || die "$1 缺少参数"
      COMPOSE_DIR="$2"
      shift 2
      ;;
    -s|--service)
      (($# >= 2)) || die "$1 缺少参数"
      SERVICE_NAME="$2"
      shift 2
      ;;
    -i|--image)
      (($# >= 2)) || die "$1 缺少参数"
      IMAGE_NAME="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      die "未知参数：$1"
      ;;
  esac
done

info "启动 Fast Note Sync 更新脚本，检查本地依赖"
# mapfile 需要 Bash 4+，提前提示，避免在选择服务器时才异常退出。
((BASH_VERSINFO[0] >= 4)) || die "需要 Bash 4 或更新版本，当前版本：$BASH_VERSION"

need_command docker
need_command ssh
need_command sftp
need_command awk
need_command grep
need_command gzip
need_command mktemp

SSH_OPTIONS=(-o BatchMode=yes -o ConnectTimeout=10)
REMOTE_DOCKER="${REMOTE_DOCKER:-docker}"

if [[ -z "$SSH_ALIAS" ]]; then
  info "读取 SSH 主机别名，准备选择远程服务器"
  mapfile -t HOSTS < <(ssh_aliases)
  ((${#HOSTS[@]} > 0)) || die "没有在 ~/.ssh/config 中找到可用的 Host 别名"
  SSH_ALIAS="$(choose_item '选择远程服务器' "${HOSTS[@]}")"
fi

info "验证 SSH Key 登录：$SSH_ALIAS"
ssh "${SSH_OPTIONS[@]}" "$SSH_ALIAS" true \
  || die "SSH 连接失败。请确认别名存在、SSH Key 可用且不需要密码。"

if [[ -z "$COMPOSE_DIR" ]]; then
  COMPOSE_DIR="$(prompt_input '远程 Compose 目录' "$DEFAULT_COMPOSE_DIR")"
fi

COMPOSE_DIR_Q="$(remote_quote "$COMPOSE_DIR")"
ensure_remote_compose
read -r -a REMOTE_DOCKER_PARTS <<< "$REMOTE_DOCKER"
REMOTE_DOCKER_CMD=""
printf -v REMOTE_DOCKER_CMD '%q ' "${REMOTE_DOCKER_PARTS[@]}"

info "读取远程 Compose 配置"
# 先检查 SSH 的退出状态；进程替换中的失败不会传递给 mapfile。
REMOTE_SERVICES_OUTPUT="$(
  ssh "${SSH_OPTIONS[@]}" "$SSH_ALIAS" \
    "cd $COMPOSE_DIR_Q && ${REMOTE_DOCKER_CMD}compose config --services"
)" || die "读取远程 Compose 配置失败，请检查 SSH、Docker 权限和目录：$COMPOSE_DIR"
[[ -n "$REMOTE_SERVICES_OUTPUT" ]] || die "Compose 配置未返回任何服务：$COMPOSE_DIR"
mapfile -t REMOTE_SERVICES <<< "$REMOTE_SERVICES_OUTPUT"
((${#REMOTE_SERVICES[@]} > 0)) \
  || die "未读取到 Compose 服务。请检查目录：$COMPOSE_DIR"

if [[ -z "$SERVICE_NAME" ]]; then
  if printf '%s\n' "${REMOTE_SERVICES[@]}" | grep -Fxq "$DEFAULT_SERVICE"; then
    SERVICE_NAME="$DEFAULT_SERVICE"
  else
    SERVICE_NAME="$(choose_item '选择要更新的 Compose 服务' "${REMOTE_SERVICES[@]}")"
  fi
fi

printf '%s\n' "${REMOTE_SERVICES[@]}" | grep -Fxq "$SERVICE_NAME" \
  || die "Compose 中不存在服务：$SERVICE_NAME"

if [[ -z "$IMAGE_NAME" ]]; then
  IMAGE_NAME="$(
    ssh "${SSH_OPTIONS[@]}" "$SSH_ALIAS" \
      "cd $COMPOSE_DIR_Q && ${REMOTE_DOCKER_CMD}compose config --images" \
      | awk '/fast-note-sync-service/ { print; exit }'
  )"
  IMAGE_NAME="${IMAGE_NAME:-$DEFAULT_IMAGE}"
fi

REMOTE_ARCH="$(ssh "${SSH_OPTIONS[@]}" "$SSH_ALIAS" uname -m)"
case "$REMOTE_ARCH" in
  x86_64|amd64)
    DOCKER_PLATFORM="linux/amd64"
    ;;
  aarch64|arm64)
    DOCKER_PLATFORM="linux/arm64"
    ;;
  armv7l|armv7)
    DOCKER_PLATFORM="linux/arm/v7"
    ;;
  *)
    die "不支持或无法识别的远程架构：$REMOTE_ARCH"
    ;;
esac

printf '\n服务器：%s\nCompose 目录：%s\n服务：%s\n镜像：%s\n平台：%s\n' \
  "$SSH_ALIAS" "$COMPOSE_DIR" "$SERVICE_NAME" "$IMAGE_NAME" "$DOCKER_PLATFORM"

confirm '确认开始更新？' || die "已取消"

WORK_DIR="$(mktemp -d)"
ARCHIVE_NAME="fast-note-sync-image-$(date +%Y%m%d-%H%M%S).tar.gz"
LOCAL_ARCHIVE="${WORK_DIR}/${ARCHIVE_NAME}"
REMOTE_ARCHIVE="/tmp/${ARCHIVE_NAME}"

cleanup() {
  rm -rf -- "$WORK_DIR"
}
trap cleanup EXIT

info "本地拉取镜像"
docker pull --platform "$DOCKER_PLATFORM" "$IMAGE_NAME"

info "导出并压缩镜像"
docker save "$IMAGE_NAME" | gzip -1 > "$LOCAL_ARCHIVE"

info "通过 SFTP 上传镜像"
sftp "${SSH_OPTIONS[@]}" -b - "$SSH_ALIAS" <<EOF
put "$LOCAL_ARCHIVE" "$REMOTE_ARCHIVE"
EOF

REMOTE_ARGS=""
printf -v REMOTE_ARGS '%q ' \
  "$REMOTE_ARCHIVE" "$COMPOSE_DIR" "$SERVICE_NAME" "$REMOTE_DOCKER" "$IMAGE_NAME"

info "远程加载镜像并重建服务"
ssh "${SSH_OPTIONS[@]}" "$SSH_ALIAS" "bash -s -- $REMOTE_ARGS" <<'REMOTE_SCRIPT'
set -Eeuo pipefail

archive="$1"
compose_dir="$2"
service_name="$3"
docker_command="$4"
image_name="$5"

cleanup_remote() {
  rm -f -- "$archive"
}
trap cleanup_remote EXIT

read -r -a docker_parts <<< "$docker_command"

"${docker_parts[@]}" load -i "$archive"
cd "$compose_dir"
"${docker_parts[@]}" compose up -d --pull never --force-recreate "$service_name"
"${docker_parts[@]}" compose ps "$service_name"

printf '\n更新完成：%s\n' "$image_name"
REMOTE_SCRIPT

info "Fast Note Sync 更新完成"
