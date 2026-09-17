---
name: tracking-service-log-reader
description: 按机组、跟踪算法和日期读取跟踪服务日志；适用于需要从 Kubernetes PVC 映射到 NFS 卷目录并定位具体算法日志的查询。
---

# 跟踪服务日志读取

## 目标

在不修改 Kubernetes、NFS 或日志文件的前提下，根据查询变量定位并读取跟踪服务日志。默认使用已经配置的 SSH MCP Server；本技能不负责安装或配置新的 SSH 连接。

## 查询变量

先从用户请求中提取变量；缺少会影响定位的变量时再询问。

| 变量 | 含义 | 示例 | 约束 |
| --- | --- | --- | --- |
| `UNIT_CODE` | 机组编码 | `cp1` | 不要把 `cp1` 固化为默认目标；从用户请求获取。 |
| `ALGORITHM` | 跟踪算法编码或日志关键字 | `shear` | 通常对应 `tracking-step-{ALGORITHM}`，必须以目录中的实际文件名为准。 |
| `DATE` | 日志业务日期 | `2026-09-16` | 使用 `YYYY-MM-DD`；“昨天”按当前会话时区计算，并在结果中写明具体日期。 |
| `NAMESPACE` | Kubernetes 命名空间 | `tracking` | 用户未指定时使用 `tracking`，但仍应在命令中显式写出。 |

常见派生名称为：

- PVC：`tracking-{UNIT_CODE}-pvc`，优先查当前稳定路径配置；缺少或疑似重建时再用 Kubernetes 查询确认。
- 日志前缀：`tracking-step-{ALGORITHM}`，算法命名可能存在例外，必须先列目录核对。

## 当前稳定路径配置

以下映射来自 2026-09-17 对 `tracking` 命名空间的实际查询。普通 Deployment/Pod rollout 只会重建 Pod，不会改变同一个 PVC 绑定的 PV/CSI 目录，因此正常读取时可以直接使用这张表，不必每次 rollout 都重新查询 Kubernetes。

NFS 根目录固定为 `/mnt/nfs`；实际卷目录使用 `VOLUME_NAME`，不是 PVC 名：

| PVC | `VOLUME_NAME` | NFS 目录 |
| --- | --- | --- |
| `quality-ts-pvc` | `pvc-7a2645eb-710e-4998-914c-5f983c0196c3` | `/mnt/nfs/pvc-7a2645eb-710e-4998-914c-5f983c0196c3` |
| `tracking-baf1-pvc` | `pvc-b7c7299f-234a-41ca-b53d-452783ba3b1e` | `/mnt/nfs/pvc-b7c7299f-234a-41ca-b53d-452783ba3b1e` |
| `tracking-cbl1-pvc` | `pvc-7a223eea-34ca-470b-815b-0118e7726d08` | `/mnt/nfs/pvc-7a223eea-34ca-470b-815b-0118e7726d08` |
| `tracking-cp1-pvc` | `pvc-02e5d942-c6af-495a-abb5-75d499a0088a` | `/mnt/nfs/pvc-02e5d942-c6af-495a-abb5-75d499a0088a` |
| `tracking-csl1-pvc` | `pvc-21b7754b-1996-4ddf-a650-38120c685bc7` | `/mnt/nfs/pvc-21b7754b-1996-4ddf-a650-38120c685bc7` |
| `tracking-dcl1-pvc` | `pvc-1b362e92-2d8c-4f1a-b995-7c1d86e84aed` | `/mnt/nfs/pvc-1b362e92-2d8c-4f1a-b995-7c1d86e84aed` |
| `tracking-fcl1-pvc` | `pvc-65699ecc-cccf-416a-96ab-3a6dfaa69845` | `/mnt/nfs/pvc-65699ecc-cccf-416a-96ab-3a6dfaa69845` |
| `tracking-zrm1-pvc` | `pvc-7985345b-b9a3-4c08-9b7e-b445534a64a0` | `/mnt/nfs/pvc-7985345b-b9a3-4c08-9b7e-b445534a64a0` |

这张表只在以下情况重新核对：PVC 不在表中、NFS 目录不存在、用户明确提到 PVC/PV 重建或迁移，或命令返回的绑定关系与表不一致。PVC 被删除后重新创建时，即使名称相同，也可能获得新的 `VOLUME_NAME`，此时必须更新本表。

## 固定流程

### 1. 确认 SSH 连接

调用 `mcp__ssh_mcp_server__list_servers`，优先使用已配置的 Kubernetes 连接和 NFS 连接。常见连接名是 `k8s-deploy` 与 `nfs-logs`，但不要假设连接名一定不变。

如果连接不存在或不可用，说明缺少外部连接配置并停止远程查询；不要在本技能内代替用户安装、写入或修改 SSH 配置。

### 2. 解析 PVC 和稳定卷目录

根据 `UNIT_CODE` 先得到 PVC 名 `tracking-{UNIT_CODE}-pvc`，再查上面的稳定路径配置表。命中时直接使用表中的 NFS 目录，不必因为普通 rollout 重复执行 Kubernetes 查询。

只有表中没有该 PVC 或需要重新核对时，才在 Kubernetes 服务器上执行只读查询：

```text
kubectl get pvc -n ${NAMESPACE} -o wide
```

先返回或记录命名空间下的 PVC 列表，再定位名称为 `tracking-{UNIT_CODE}-pvc` 的条目。记录该 PVC 的 `VOLUME` 字段（通常是 `pvc-<UUID>`），并用它更新本技能的稳定路径配置。必要时使用以下只读命令补充确认：

```text
kubectl get pvc tracking-${UNIT_CODE}-pvc -n ${NAMESPACE} -o yaml
kubectl get pv <VOLUME_NAME> -o yaml
```

### 3. 定位 NFS 卷目录

NFS 目录按 PV/CSI 卷名保存，而不是按 PVC 名保存。优先使用稳定路径配置表；其路径形式为：

```text
/mnt/nfs/<VOLUME_NAME>
```

不要直接假定 `/mnt/nfs/tracking-{UNIT_CODE}-pvc` 存在；如果用户给出的 PVC 名路径不存在，使用已确认的 `VOLUME` 名继续查找，并在结果中解释这层映射。

在 NFS 上只读列出卷根目录和归档目录，确认算法日志的实际命名：

```text
ls -la /mnt/nfs/<VOLUME_NAME>
ls -la /mnt/nfs/<VOLUME_NAME>/archive
```

### 4. 按日期和算法筛选日志

优先匹配归档文件名中的日期，而不是只依赖文件系统修改时间。典型匹配形式为：

```text
tracking-step-<ALGORITHM>.<DATE>.*.log.gz
```

同一天可能有多个轮转文件（`.0.log.gz`、`.1.log.gz` 等），全部纳入目标集合。检查文件名覆盖范围和日志内容时间戳，注意跨午夜轮转：

- 目标日期当天生成的所有轮转文件都应保留。
- 若首个目标文件从当天 `00:00` 开始，通常不需要把前一天的尾文件重复加入。
- 当前未压缩日志只有在其内容确实覆盖目标日期时才纳入。

如果算法关键字在文件名中没有直接对应关系，先列出 `tracking-step-*` 文件，根据命名和内容字段（如 `trackingType`、`stage`）确认，不要凭经验猜测。

### 5. 读取和交付

使用 `mcp__ssh_mcp_server__execute_command` 做小范围、只读的元数据或摘要查询；如果远端命令白名单拒绝压缩流式命令，使用 `mcp__ssh_mcp_server__download` 下载已确认的日志，再在本地解压读取。不得通过绕过命令校验的方式执行远程命令。

结果至少包含：

1. `NAMESPACE`、`UNIT_CODE`、`ALGORITHM`、`DATE` 的实际值。
2. PVC 名称、绑定的 `VOLUME_NAME`、NFS 实际目录。
3. 匹配到的每个日志文件、是否压缩、覆盖时间范围；如做了本地下载，提供文件链接。
4. 读取摘要的行数、关键事件或异常计数；不要把大段原始日志直接贴入对话。
5. 未覆盖的风险，例如日志轮转边界、目录不存在、权限不足或日期无法从内容确认。

## 安全与边界

- 该技能只读 Kubernetes、NFS 和日志；禁止删除、移动、覆盖、清理或修改远端文件。
- 不在输出中展示密码、私钥、令牌或其他凭据。
- 生产日志可能很大；优先返回路径、摘要和按需片段，只有用户明确要求时才交付完整日志文件。
- PVC 名称、PV/CSI 卷目录名、算法日志前缀是三种不同概念，必须分别记录，不能混用。
- 当多个 PVC、算法前缀或日期文件都可能匹配时，保留候选列表并说明判定依据，不要静默选择一个不确定目标。

## 示例

用户说“找昨天 cp1 的 shear 跟踪日志”时，提取：

```text
UNIT_CODE=cp1
ALGORITHM=shear
NAMESPACE=tracking
DATE=<按当前会话时区计算的昨天>
```

预期路径推导为：

```text
PVC:         tracking-cp1-pvc
PV 目录:     /mnt/nfs/<kubectl 返回的 VOLUME>
日志前缀:    tracking-step-shear
归档匹配:    /mnt/nfs/<VOLUME>/archive/tracking-step-shear.<DATE>.*.log.gz
```

其中 `<VOLUME>` 和 `<DATE>` 必须由实际查询结果替换，不能直接照抄示例。
