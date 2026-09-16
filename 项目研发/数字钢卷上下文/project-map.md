# 项目与代码关联

## 根目录定义

| 变量            | 当前值                                     | 含义                         |
| ------------- | --------------------------------------- | -------------------------- |
| KB_ROOT       | `D:/project/obsidian-next/项目研发/数字钢卷上下文` | 本项目架构、业务、变更记录与规范所在目录       |
| QUALITY_ROOT  | `D:/project/work/aygg/quality`          | 质量分析相关五个微服务代码所在的 Git 仓库根目录 |
| TRACKING_ROOT | `D:/project/work/aygg/tracking`         | 跟踪服务代码所在得 Git 仓库目录         |

正文用 `{QUALITY_ROOT}/服务目录` 引用。目录变化时更新本表；知识库搬迁时同步代码侧 AGENTS.md 的入口地址。

## 服务与 Git 仓库

| 服务                       | 代码目录                                  | 所属 Git 仓库                    | 职责          |
| ------------------------ | ------------------------------------- | ---------------------------- | ----------- |
| quality-admin            | `{QUALITY_ROOT}/quality-admin`        | `{QUALITY_ROOT}`             | 暂时不用了解      |
| quality-calc             | `{QUALITY_ROOT}/quality-calc`         | `{QUALITY_ROOT}`             | 暂时不用了解      |
| quality-digital-coil     | `{QUALITY_ROOT}/quality-digital-coil` | `{QUALITY_ROOT}`             | 数字钢卷切片服务    |
| quality-mat              | `{QUALITY_ROOT}/quality-mat`          | `{QUALITY_ROOT}`             | 物料相关服务      |
| quality-ts（quality 目录内）  | `{QUALITY_ROOT}/quality-ts`           | `{QUALITY_ROOT}`             | 暂时不用了解      |
| quality-ts（tracking 目录内） | `{TRACKING_ROOT}/quality-ts`          | `{TRACKING_ROOT}/quality-ts` | 跟踪服务时序库存储服务 |
| tracking                 | `{TRACKING_ROOT}/tracking`            | `{TRACKING_ROOT}/tracking`   | 跟踪服务        |

- quality 下五个服务共用一个 Git 仓库；按服务确定改动范围，按仓库执行 Git 操作。
- 两个 quality-ts 属于不同仓库。
- 暂时不用了解的服务，意味着其代码库暂时不用读取和编辑。
