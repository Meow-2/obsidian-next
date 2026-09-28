# CHG-001：quality-ts 列式批量写入

- 状态：实现中；负责人：Codex；日期：2026-09-28。
- 目标：ZRM1 process 每帧含 105 个同时间戳字段时，将列式写入从逐字段 INSERT 合并为每时间戳一次 INSERT；验收以结果完整、20 帧/秒无持续积压为准。
- 范围：`{QUALITY_ROOT}/quality-ts` 的 TDengine `_column` 写入；行式写入、接口和 DTO 不变。
- 基线：`quality` 仓库 `main` 分支，提交 `ee77ca7`；已有无关未跟踪 `quality-ts/deploy/`，保持不动。

## 设计与兼容性

原实现先按字段名、再按最终时间戳分组，导致同一时间戳的多个字段分别写入。复用 `getDeviceTagDataList` 的时间戳解析，直接按最终时间戳分组，逐组调用现有 `insertBatch`。字段自带时间戳优先于帧时间戳；不同时间戳仍分别写入。调用方、SQL Mapper、失败传播方式不变。无需数据迁移；回退可恢复原分组方法。

## 验证

| 场景 | 命令或环境 | 结果 |
| --- | --- | --- |
| 同时间戳 105 字段合并一次写入；多时间戳分别写入；空列表；写入异常传播 | `mvn org.apache.maven.plugins:maven-surefire-plugin:3.2.5:test -Dtest=TdengineStoreColumnModePolicyTest`，以临时 Maven 镜像设置运行 | 4 项测试通过 |
| 模块编译 | `mvn -pl quality-ts -am test` | 编译通过；默认旧版 Surefire 未运行 JUnit 5 测试，测试数为 0 |
| 真实 ZRM1 报文持续 20 帧/秒、结果完整性与 FIFO 积压 | 需部署目标版本并使用对应环境 | 未执行；本次不部署、不切换 MQTT 数据源 |

验证状态：代码与单元测试完成；线上吞吐验收待部署后执行。当前单元测试未覆盖真实 TDengine 对 105 列单条 INSERT 的执行耗时。
