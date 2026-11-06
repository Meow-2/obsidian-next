# HIB 钢性能工艺字段对应明细

核对日期：2026-11-06。覆盖原表 Sheet1!A1:FO3 的171列。一列含多区、多个仪表或多个设备时逐点展开；候选不代表已确认业务语义。

源表没有修改。以下“现有”仅指本地xlsx静态配置存在，不代表现场部署、通讯或历史数据已验证。完整源路径、唯一键、DB地址和新增建议见同目录 JSON。

## 基础信息与在线厚度/铁损

| 需求列 | 需求名称         | 源点位中文名 | 英文位号               | 源单位  | 原始位置 | 匹配结论    |
| --- | ------------ | ------ | ------------------ | ---- | ---- | ------- |
| A   | F线日期         | —      | startProdTime      | —    | —    | 物料档字段   |
| B   | 钢卷号          | —      | inMatNo / outMatNo | —    | —    | 物料档字段   |
| C   | 平整后热卷号       | —      | outMatNo           | —    | —    | 物料档字段   |
| D   | 厚度/mm        | —      | outMatThick        | —    | —    | 物料档字段   |
| E   | 成品卷号         | —      | outMatNo           | —    | —    | 物料档字段   |
| D   | 在线厚度候选：铁损仪   | 厚度     | thickness          | mm   | —    | 厚度来源待确认 |
| D   | 在线厚度候选：独立测厚仪 | 厚度     | thickness          | mm   | —    | 厚度来源待确认 |
| F   | 铁损P1.7       | 铁损     | iron_loss          | W/kg | —    | 对应明确    |
| G   | 磁感B8         | —      | —                  | —    | —    | 检化验待集成  |
| H   | 电阻 Ω.cm2     | —      | —                  | —    | —    | 检化验待集成  |

## CP1 常化酸洗

| 需求列 | 需求名称 | 源点位中文名 | 英文位号 | 源单位 | 原始位置 | 匹配结论 |
| --- | --- | --- | --- | --- | --- | --- |
| AZ | 常化酸洗 / 1#酸槽 / 酸液浓度(%) | — | — | — | — | 检化验待集成 |
| BA | 常化酸洗 / 1#酸槽 / 铁盐含量(g/L) | — | — | — | — | 检化验待集成 |
| BC | 常化酸洗 / 2#酸槽 / 酸液浓度(%) | — | — | — | — | 检化验待集成 |
| BD | 常化酸洗 / 2#酸槽 / 铁盐含量(g/L) | — | — | — | — | 检化验待集成 |
| BF | 常化酸洗 / 3#酸槽 / 酸液浓度(%) | — | — | — | — | 检化验待集成 |
| BG | 常化酸洗 / 3#酸槽 / 铁盐含量(g/L) | — | — | — | — | 检化验待集成 |
| I | 常化炉区出口板温 / NOF 出口 / 炉温 | NOF1实际值 | nof1_furnace_temp_pv | ℃ | plc-fur!A23 | 出口炉温分区待确认 |
| I | 常化炉区出口板温 / NOF 出口 / 炉温 | NOF2实际值 | nof2_furnace_temp_pv | ℃ | plc-fur!A27 | 出口炉温分区待确认 |
| I | 常化炉区出口板温 / NOF 出口 / 炉温 | NOF3实际值 | nof3_furnace_temp_pv | ℃ | plc-fur!A31 | 出口炉温分区待确认 |
| I | 常化炉区出口板温 / NOF 出口 / 炉温 | NOF4实际值 | nof4_furnace_temp_pv | ℃ | plc-fur!A35 | 出口炉温分区待确认 |
| I | 常化炉区出口板温 / NOF 出口 / 炉温 | NOF5实际值 | nof5_furnace_temp_pv | ℃ | plc-fur!A39 | 出口炉温分区待确认 |
| I | 常化炉区出口板温 / NOF 出口 / 炉温 | NOF6实际值 | nof6_furnace_temp_pv | ℃ | plc-fur!A43 | 出口炉温分区待确认 |
| I | 常化炉区出口板温 / NOF 出口 / 炉温 | NOF7实际值 | nof7_furnace_temp_pv | — | plc-fur!A47 | 出口炉温分区待确认 |
| I | 常化炉区出口板温 / NOF 出口 / 炉温 | NOF8实际值 | nof8_furnace_temp_pv | — | plc-fur!A51 | 出口炉温分区待确认 |
| K | 常化炉区出口板温 / RTF 出口 / 炉温 | RTF1实际值 | rtf1_furnace_temp_pv | ℃ | plc-fur!A55 | 出口炉温分区待确认 |
| K | 常化炉区出口板温 / RTF 出口 / 炉温 | RTF2实际值 | rtf2_furnace_temp_pv | ℃ | plc-fur!A59 | 出口炉温分区待确认 |
| M | 常化炉区出口板温 / 1#RCF 出口 / 炉温 | 1#RCF1实际值 | rcf1_1z_furnace_temp_pv | ℃ | plc-fur!A63 | 出口炉温分区待确认 |
| M | 常化炉区出口板温 / 1#RCF 出口 / 炉温 | 1#RCF2实际值 | rcf1_2z_furnace_temp_pv | ℃ | plc-fur!A67 | 出口炉温分区待确认 |
| M | 常化炉区出口板温 / 1#RCF 出口 / 炉温 | 1#RCF3实际值 | rcf1_3z_furnace_temp_pv | ℃ | plc-fur!A71 | 出口炉温分区待确认 |
| O | 常化炉区出口板温 / SF 出口 / 炉温 | SF1实际值 | sf1_furnace_temp_pv | — | plc-fur!A75 | 出口炉温分区待确认 |
| O | 常化炉区出口板温 / SF 出口 / 炉温 | SF2实际值 | sf2_furnace_temp_pv | — | plc-fur!A79 | 出口炉温分区待确认 |
| O | 常化炉区出口板温 / SF 出口 / 炉温 | SF3实际值 | sf3_furnace_temp_pv | — | plc-fur!A83 | 出口炉温分区待确认 |
| O | 常化炉区出口板温 / SF 出口 / 炉温 | SF4实际值 | sf4_furnace_temp_pv | % | plc-fur!A87 | 出口炉温分区待确认 |
| O | 常化炉区出口板温 / SF 出口 / 炉温 | SF5实际值 | sf5_furnace_temp_pv | % | plc-fur!A91 | 出口炉温分区待确认 |
| O | 常化炉区出口板温 / SF 出口 / 炉温 | SF6实际值 | sf6_furnace_temp_pv | % | plc-fur!A95 | 出口炉温分区待确认 |
| Q | 常化炉区出口板温 / 2#RCF 出口 / 炉温 | 2#RCF1实际值 | rcf2_1z_furnace_temp_pv | % | plc-fur!A99 | 出口炉温分区待确认 |
| Q | 常化炉区出口板温 / 2#RCF 出口 / 炉温 | 2#RCF2实际值 | rcf2_2z_furnace_temp_pv | % | plc-fur!A103 | 出口炉温分区待确认 |
| J | 常化炉区出口板温 / NOF 出口 / 板温 | 炉喉板温 | furnace_throat_plate_temp | ℃ | plc-fur!A7 | 对应明确 |
| L | 常化炉区出口板温 / RTF 出口 / 板温 | RTF板温 | rtf_plate_temp | ℃ | plc-fur!A8 | 对应明确 |
| N | 常化炉区出口板温 / 1#RCF 出口 / 板温 | 1#RCF板温 | rcf1_plate_temp | ℃ | plc-fur!A9 | 对应明确 |
| P | 常化炉区出口板温 / SF 出口 / 板温 | SF板温 | sf_plate_temp | ℃ | plc-fur!A10 | 对应明确 |
| R | 常化炉区出口板温 / 2#RCF 出口 / 板温 | 2#RCF板温 | rcf2_plate_temp | ℃ | plc-fur!A11 | 对应明确 |
| S | 常化炉区出口板温 / 工艺速度 m/min | 中央段速度实际值 | center_speed_pv | m/min | plc2-mpsp!A5 | 对应明确 |
| T | 常化风机管理（开口度） / 1#RCF / 1# | 1#RCF1功率 | rcf1_1z_fan_power_pv | ℃ | plc-fur!A64 | 开口度口径待确认 |
| U | 常化风机管理（开口度） / 1#RCF / 2# | 1#RCF2功率 | rcf1_2z_fan_power_pv | ℃ | plc-fur!A68 | 开口度口径待确认 |
| V | 常化风机管理（开口度） / 1#RCF / 3# | 1#RCF3功率 | rcf1_3z_fan_power_pv | ℃ | plc-fur!A72 | 开口度口径待确认 |
| W | 常化风机管理（开口度） / 2#RCF / 1# | 2#RCF1功率 | rcf2_1z_fan_power_pv | % | plc-fur!A100 | 开口度口径待确认 |
| X | 常化风机管理（开口度） / 2#RCF / 2# | 2#RCF2功率 | rcf2_2z_fan_power_pv | % | plc-fur!A104 | 开口度口径待确认 |
| Y | 常化风机管理（开口度） / AJC | AJC 风机开度 | ajc_fan_speed | — | plc-fur!A328 | 开口度口径待确认 |
| Z | 3~10组 / 气压/MPa | 气雾冷却 1 段气压 | cool1_air_pressure | — | plc-fur!A330 | 分组对应待确认 |
| AA | 3~10组 / 水压/MPa | 气雾冷却 1 段水压 | cool1_water_pressure | — | plc-fur!A331 | 分组对应待确认 |
| AB | 常化水冷管理 / 3~10组 / 流量m3/h | 气雾冷却 1 段流量 | cool1_flow | — | plc-fur!A332 | 分组对应待确认 |
| AC | 常化水冷管理 / 11~16组 / 气压 /MPa | 气雾冷却 2 段气压 | cool2_air_pressure | — | plc-fur!A334 | 分组对应待确认 |
| AD | 常化水冷管理 / 11~16组 / 水压 /MPa | 气雾冷却 2 段水压 | cool2_water_pressure | — | plc-fur!A335 | 分组对应待确认 |
| AE | 常化水冷管理 / 11~16组 / 流量 m3/h | 气雾冷却 2 段流量 | cool2_flow | — | plc-fur!A336 | 分组对应待确认 |
| AF | 常化水冷管理 / 16~22组 / 气压 /MPa | 气雾冷却 3 段气压 | cool3_air_pressure | — | plc-fur!A338 | 分组对应待确认 |
| AG | 常化水冷管理 / 16~22组 / 水压 /MPa | 气雾冷却 3 段水压 | cool3_water_pressure | — | plc-fur!A339 | 分组对应待确认 |
| AH | 常化水冷管理 / 16~22组 / 流量 m3/h | 气雾冷却 3 段流量 | cool3_flow | — | plc-fur!A340 | 分组对应待确认 |
| AI | 常化水冷管理 / 1#WSC-1 / 气压 /MPa | 1#WSC 1 段气压 | wsc1_section1_air_pressure | — | plc-fur!A342 | 原表存在但总 cube 未收录 |
| AJ | 常化水冷管理 / 1#WSC-1 / 水压 /MPa | 1#WSC 1 段水压 | wsc1_section1_water_pressure | — | plc-fur!A343 | 对应明确 |
| AK | 常化水冷管理 / 1#WSC-1 / 流量 m3/h | 1#WSC 1 段流量 | wsc1_section1_flow | — | plc-fur!A344 | 对应明确 |
| AL | 常化水冷管理 / 1#WSC-2 / 气压 /MPa | 1#WSC 2 段气压 | wsc1_section2_air_pressure | — | plc-fur!A346 | 原表存在但总 cube 未收录 |
| AM | 常化水冷管理 / 1#WSC-2 / 水压 /MPa | 1#WSC 2 段水压 | wsc1_section2_water_pressure | — | plc-fur!A347 | 对应明确 |
| AN | 常化水冷管理 / 1#WSC-2 / 流量 m3/h | 1#WSC 2 段流量 | wsc1_section2_flow | — | plc-fur!A348 | 对应明确 |
| AO | 常化水冷管理 / 水套 / 气压 /MPa | 水套气压 | water_jacket_air_pressure | — | plc-fur!A358 | 原表存在但总 cube 未收录 |
| AP | 常化水冷管理 / 水套 / 水压 /MPa | 水套水压 | water_jacket_water_pressure | — | plc-fur!A359 | 对应明确 |
| AQ | 常化水冷管理 / 水套 / 流量 m3/h | 水套流量 | water_jacket_flow | — | plc-fur!A360 | 对应明确 |
| AS | 常化水冷管理 / 2#WSC-1 / 气压 /MPa | 2#WSC 1 段气压 | wsc2_section1_air_pressure | — | plc-fur!A350 | 原表存在但总 cube 未收录 |
| AT | 常化水冷管理 / 2#WSC-1 / 水压 /MPa | 2#WSC 1 段水压 | wsc2_section1_water_pressure | — | plc-fur!A351 | 对应明确 |
| AU | 常化水冷管理 / 2#WSC-1 / 流量 m3/h | 2#WSC 1 段流量 | wsc2_section1_flow | — | plc-fur!A352 | 对应明确 |
| AV | 常化水冷管理 / 2#WSC-2 / 气压 /MPa | 2#WSC 2 段气压 | wsc2_section2_air_pressure | — | plc-fur!A354 | 原表存在但总 cube 未收录 |
| AW | 常化水冷管理 / 2#WSC-2 / 水压 /MPa | 2#WSC 2 段水压 | wsc2_section2_water_pressure | — | plc-fur!A355 | 对应明确 |
| AX | 常化水冷管理 / 2#WSC-2 / 流量 m3/h | 2#WSC 2 段流量 | wsc2_section2_flow | — | plc-fur!A356 | 对应明确 |
| AR | 常化水冷管理 / 测温 | 水套板温 | water_jacket_plate_temp | — | plc-fur!A361 | 对应明确 |
| AY | 常化酸洗 / 1#酸槽 / 酸液、漂洗水温度℃ | 1#酸循环1#石墨换热器出口管温度a | acid_loop1_graphite_hex1_outlet_pipe_temp_a | ℃ | plc4-su!A3 | 对应明确，含共享设备归属 |
| AY | 常化酸洗 / 1#酸槽 / 酸液、漂洗水温度℃ | 1#酸循环2#石墨换热器出口管温度b | acid_loop1_graphite_hex2_outlet_pipe_temp_b | ℃ | plc4-su!A4 | 对应明确，含共享设备归属 |
| BB | 常化酸洗 / 2#酸槽 / 酸液、漂洗 水温度 | 2#酸循环1#石墨换热器出口管温度a | acid_loop2_graphite_hex1_outlet_pipe_temp_a | ℃ | plc4-su!A5 | 对应明确，含共享设备归属 |
| BB | 常化酸洗 / 2#酸槽 / 酸液、漂洗 水温度 | 2#酸循环2#石墨换热器出口管温度b | acid_loop2_graphite_hex2_outlet_pipe_temp_b | ℃ | plc4-su!A6 | 对应明确，含共享设备归属 |
| BE | 常化酸洗 / 3#酸槽 / 酸液、漂洗 水温度 | 3#酸循环石墨换热器出口管温度 | acid_loop3_graphite_hex_outlet_pipe_temp | ℃ | plc4-su!A7 | 对应明确，含共享设备归属 |
| AY | 1#漂洗水温（从酸液/漂洗组合列拆出） | 漂洗冷凝水罐温度 | rinse_condensate_water_temp | ℃ | plc4-su!A8 | 对应明确 |
| BB | 2#漂洗水温（从酸液/漂洗组合列拆出） | 漂洗冷凝水罐温度 | rinse_condensate_water_temp | ℃ | plc4-su!A8 | 对应明确 |
| BE | 3#漂洗水温（从酸液/漂洗组合列拆出） | 漂洗冷凝水罐温度 | rinse_condensate_water_temp | ℃ | plc4-su!A8 | 对应明确 |

## DCL1 氧化镁

| 需求列 | 需求名称 | 源点位中文名 | 英文位号 | 源单位 | 原始位置 | 匹配结论 |
| --- | --- | --- | --- | --- | --- | --- |
| BH | D线炉区 / 工艺速度 m/min | 中央段速度实际值 | center_speed_pv | m/min | plc2-mpsp!A5 | 对应明确 |
| BI | D线炉区 / 1#RTF温度/℃ / 1# | 1#RTF1段炉温实际值 | rtf1_section1_furnace_temp_pv | — | plc-fur!A112 | 对应明确 |
| BJ | D线炉区 / 1#RTF温度/℃ / 2# | 1#RTF2段炉温实际值 | rtf1_section2_furnace_temp_pv | — | plc-fur!A116 | 对应明确 |
| BK | D线炉区 / 2#RTF温度/℃ / 1# | 2#RTF1段炉温实际值 | rtf2_section1_furnace_temp_pv | — | plc-fur!A120 | 对应明确 |
| BL | D线炉区 / 2#RTF温度/℃ / 2# | 2#RTF2段炉温实际值 | rtf2_section2_furnace_temp_pv | — | plc-fur!A124 | 对应明确 |
| BM | D线炉区 / 1#SF温度/℃ / 1~15# | 1#SF1段炉温实际值 | sf1_section1_furnace_temp_pv | — | plc-fur!A128 | 对应明确 |
| BM | D线炉区 / 1#SF温度/℃ / 1~15# | 1#SF2段炉温实际值 | sf1_section2_furnace_temp_pv | — | plc-fur!A132 | 对应明确 |
| BM | D线炉区 / 1#SF温度/℃ / 1~15# | 1#SF3段炉温实际值 | sf1_section3_furnace_temp_pv | — | plc-fur!A136 | 对应明确 |
| BM | D线炉区 / 1#SF温度/℃ / 1~15# | 1#SF4段炉温实际值 | sf1_section4_furnace_temp_pv | — | plc-fur!A140 | 对应明确 |
| BM | D线炉区 / 1#SF温度/℃ / 1~15# | 1#SF5段炉温实际值 | sf1_section5_furnace_temp_pv | — | plc-fur!A144 | 对应明确 |
| BM | D线炉区 / 1#SF温度/℃ / 1~15# | 1#SF6段炉温实际值 | sf1_section6_furnace_temp_pv | — | plc-fur!A148 | 对应明确 |
| BM | D线炉区 / 1#SF温度/℃ / 1~15# | 1#SF7段炉温实际值 | sf1_section7_furnace_temp_pv | — | plc-fur!A152 | 对应明确 |
| BM | D线炉区 / 1#SF温度/℃ / 1~15# | 1#SF8段炉温实际值 | sf1_section8_furnace_temp_pv | — | plc-fur!A156 | 对应明确 |
| BM | D线炉区 / 1#SF温度/℃ / 1~15# | 1#SF9段炉温实际值 | sf1_section9_furnace_temp_pv | — | plc-fur!A160 | 对应明确 |
| BM | D线炉区 / 1#SF温度/℃ / 1~15# | 1#SF10段炉温实际值 | sf1_section10_furnace_temp_pv | — | plc-fur!A164 | 对应明确 |
| BM | D线炉区 / 1#SF温度/℃ / 1~15# | 1#SF11段炉温实际值 | sf1_section11_furnace_temp_pv | — | plc-fur!A168 | 对应明确 |
| BM | D线炉区 / 1#SF温度/℃ / 1~15# | 1#SF12段炉温实际值 | sf1_section12_furnace_temp_pv | — | plc-fur!A172 | 对应明确 |
| BM | D线炉区 / 1#SF温度/℃ / 1~15# | 1#SF13段炉温实际值 | sf1_section13_furnace_temp_pv | — | plc-fur!A176 | 对应明确 |
| BM | D线炉区 / 1#SF温度/℃ / 1~15# | 1#SF14段炉温实际值 | sf1_section14_furnace_temp_pv | — | plc-fur!A180 | 对应明确 |
| BM | D线炉区 / 1#SF温度/℃ / 1~15# | 1#SF15段炉温实际值 | sf1_section15_furnace_temp_pv | — | plc-fur!A184 | 对应明确 |
| BN | D线炉区 / HEF温度/℃ / 1~2# | HEF1段炉温实际值 | hef_section1_furnace_temp_pv | — | plc-fur!A188 | 对应明确 |
| BN | D线炉区 / HEF温度/℃ / 1~2# | HEF2段炉温实际值 | hef_section2_furnace_temp_pv | — | plc-fur!A192 | 对应明确 |
| BO | D线炉区 / 2#SF温度/℃ / 1~2# | 2#SF1段炉温实际值 | sf2_section1_furnace_temp_pv | — | plc-fur!A196 | 对应明确 |
| BO | D线炉区 / 2#SF温度/℃ / 1~2# | 2#SF2段炉温实际值 | sf2_section2_furnace_temp_pv | — | plc-fur!A200 | 对应明确 |
| BP | D线炉区 / ATC温度/℃ / 1~2# | ATC1段炉温实际值 | atc_section1_furnace_temp_pv | — | plc-fur!A204 | 对应明确 |
| BP | D线炉区 / ATC温度/℃ / 1~2# | ATC2段炉温实际值 | atc_section2_furnace_temp_pv | — | plc-fur!A208 | 对应明确 |
| BQ | D线炉区 / 3#SF温度/℃ / 1~3# | 3#SF1段炉温实际值 | sf3_section1_furnace_temp_pv | — | plc-fur!A212 | 对应明确 |
| BQ | D线炉区 / 3#SF温度/℃ / 1~3# | 3#SF2段炉温实际值 | sf3_section2_furnace_temp_pv | — | plc-fur!A216 | 对应明确 |
| BQ | D线炉区 / 3#SF温度/℃ / 1~3# | 3#SF3段炉温实际值 | sf3_section3_furnace_temp_pv | — | plc-fur!A220 | 对应明确 |
| BR | D线炉区 / SJC5# / 开口度 | SJC5#控冷风机L1设定值 | sjc_control_cooling_fan5_l1_sv | — | plc-fur!A256 | 开口度口径待确认 |
| BS | D线炉区 / RJC / 开口度 | RJC1#冷却风机L1设定值 | rjc_cooling_fan1_l1_sv | — | plc-fur!A258 | 开口度口径待确认 |
| BS | D线炉区 / RJC / 开口度 | RJC2#冷却风机L1设定值 | rjc_cooling_fan2_l1_sv | — | plc-fur!A260 | 开口度口径待确认 |
| BS | D线炉区 / RJC / 开口度 | RJC3#冷却风机L1设定值 | rjc_cooling_fan3_l1_sv | — | plc-fur!A262 | 开口度口径待确认 |
| BS | D线炉区 / RJC / 开口度 | RJC4#冷却风机L1设定值 | rjc_cooling_fan4_l1_sv | — | plc-fur!A264 | 开口度口径待确认 |
| BT | D线加湿器工艺 / 1# / 水温/℃ | 1#加湿器出口管实际温度 | humidifier1_exit_pipe_temp_pv | — | plc-fur!A343 | 水温测点含义待确认 |
| BU | D线加湿器工艺 / 1# / 气体流量m3/h | 1#混合器气体流量 | mixer1_gas_flow | — | plc-fur!A487 | 对应明确 |
| BV | D线加湿器工艺 / 1# / H2占比/% | 1#混合器 H2 占比 | mixer1_h2_ratio | — | plc-fur!A488 | 对应明确 |
| BW | D线加湿器工艺 / 2# / 水温/℃ | 2#加湿器出口管实际温度 | humidifier2_exit_pipe_temp_pv | — | plc-fur!A345 | 水温测点含义待确认 |
| BX | D线加湿器工艺 / 2# / 气体流量m3/h | 2#混合器气体流量 | mixer2_gas_flow | — | plc-fur!A490 | 对应明确 |
| BY | D线加湿器工艺 / 2# / H2占比/% | 2#混合器 H2 占比 | mixer2_h2_ratio | — | plc-fur!A491 | 对应明确 |
| BZ | D线加湿器工艺 / 3# / 水温/℃ | 3#加湿器出口管实际温度 | humidifier3_exit_pipe_temp_pv | — | plc-fur!A347 | 水温测点含义待确认 |
| CA | D线加湿器工艺 / 3# / 气体流量m3/h | 3#混合器气体流量 | mixer3_gas_flow | — | plc-fur!A493 | 对应明确 |
| CB | D线加湿器工艺 / 3# / H2占比/% | 3#混合器 H2 占比 | mixer3_h2_ratio | — | plc-fur!A494 | 对应明确 |
| CC | D线加湿器工艺 / 4# / 水温/℃ | 4#加湿器出口管实际温度 | humidifier4_exit_pipe_temp_pv | — | plc-fur!A349 | 水温测点含义待确认 |
| CD | D线加湿器工艺 / 4# / 气体流量m3/h | 4#混合器气体流量 | mixer4_gas_flow | — | plc-fur!A496 | 对应明确 |
| CE | D线加湿器工艺 / 4# / H2占比/% | 4#混合器 H2 占比 | mixer4_h2_ratio | — | plc-fur!A497 | 对应明确 |
| CF | D线加湿器工艺 / 5# / 水温/℃ | 5#加湿器出口管实际温度 | humidifier5_exit_pipe_temp_pv | — | plc-fur!A351 | 水温测点含义待确认 |
| CG | D线加湿器工艺 / 5# / 气体流量m3/h | 5#混合器气体流量 | mixer5_gas_flow | — | plc-fur!A499 | 对应明确 |
| CH | D线加湿器工艺 / 5# / H2占比/% | 5#混合器 H2 占比 | mixer5_h2_ratio | — | plc-fur!A500 | 对应明确 |
| CI | D线加湿器工艺 / 6# / 水温/℃ | 6#加湿器出口管实际温度 | humidifier6_exit_pipe_temp_pv | — | plc-fur!A353 | 水温测点含义待确认 |
| CJ | D线加湿器工艺 / 6# / 气体流量m3/h | 6#混合器气体流量 | mixer6_gas_flow | — | plc-fur!A502 | 对应明确 |
| CK | D线加湿器工艺 / 6# / H2占比/% | 6#混合器 H2 占比 | mixer6_h2_ratio | — | plc-fur!A503 | 对应明确 |
| CL | D线加湿器工艺 / 7# / 水温/℃ | 7#加湿器出口管实际温度 | humidifier7_exit_pipe_temp_pv | — | plc-fur!A355 | 水温测点含义待确认 |
| CM | D线加湿器工艺 / 7# / 气体流量m3/h | 7#混合器气体流量 | mixer7_gas_flow | — | plc-fur!A505 | 对应明确 |
| CN | D线加湿器工艺 / 7# / H2占比/% | 7#混合器 H2 占比 | mixer7_h2_ratio | — | plc-fur!A506 | 对应明确 |
| CO | P（H2o）/P(H2)分压比 / 2#RTF | 2#RTF分压比 | rtf2_partial_pressure_ratio | — | plc-fur!A281 | 对应明确 |
| CP | P（H2o）/P(H2)分压比 / 1#SF / 1#SF-Z3 | 1#SFZ3分压比 | sf1_z3_partial_pressure_ratio | — | plc-fur!A280 | 对应明确 |
| CQ | P（H2o）/P(H2)分压比 / 1#SF / 1#SF-Z6 | 1#SFZ6分压比 | sf1_z6_partial_pressure_ratio | — | plc-fur!A279 | 对应明确 |
| CR | P（H2o）/P(H2)分压比 / 1#SF / 1#SF-Z9 | 1#SFZ9分压比 | sf1_z9_partial_pressure_ratio | — | plc-fur!A278 | 对应明确 |
| CS | P（H2o）/P(H2)分压比 / 1#SF / 1#SF-Z12 | 1#SFZ12分压比 | sf1_z12_partial_pressure_ratio | — | plc-fur!A277 | 对应明确 |
| CT | P（H2o）/P(H2)分压比 / 1#SF / 1#SF-Z15 | 1#SFZ15分压比 | sf1_z15_partial_pressure_ratio | — | plc-fur!A276 | 对应明确 |
| CU | P（H2o）/P(H2)分压比 / 2#SF | 2#SFZ1Z2分压比 | sf2_z1_z2_partial_pressure_ratio | — | plc-fur!A275 | 对应明确 |
| CV | P（H2o）/P(H2)分压比 / ATC | ATCZ2分压比 | atc_z2_partial_pressure_ratio | — | plc-fur!A274 | 对应明确 |
| CW | 氨气量 m3/h / 2#SF氨气各分管流量氨气量 m3/h（4组） | — | — | — | — | 现场实测待录入 |
| CX | 氨气量 m3/h / 3#SF氨气各分管流量氨气量 m3/h（7组） | — | — | — | — | 现场实测待录入 |
| CY | 氨气量 m3/h / 氨气总量 m3/h | 氨气实际流量 | nh3_flow_pv | — | plc-fur!A341 | 总流量边界待确认 |
| CZ | 涂氧化镁工艺 / 涂层辊压力/MPa / WS | 1#涂层机操作侧当前压力 | coating_machine1_os_pressure_pv | kN | plc3-mxsx!A82 | 单位与涂层机选择待确认 |
| CZ | 涂氧化镁工艺 / 涂层辊压力/MPa / WS | 2#涂层机操作侧当前压力 | coating_machine2_os_pressure_pv | kN | plc3-mxsx!A92 | 单位与涂层机选择待确认 |
| DA | 涂氧化镁工艺 / 涂层辊压力/MPa / DS | 1#涂层机传动侧当前压力 | coating_machine1_ds_pressure_pv | kN | plc3-mxsx!A85 | 单位与涂层机选择待确认 |
| DA | 涂氧化镁工艺 / 涂层辊压力/MPa / DS | 2#涂层机传动侧当前压力 | coating_machine2_ds_pressure_pv | kN | plc3-mxsx!A95 | 单位与涂层机选择待确认 |
| DB | 涂氧化镁工艺 / DS段温度/℃ / 1# | DS1段炉温实际值 | ds_section1_furnace_temp_pv | — | plc-fur!A224 | 对应明确 |
| DC | 涂氧化镁工艺 / DS段温度/℃ / 2# | DS2段炉温实际值 | ds_section2_furnace_temp_pv | — | plc-fur!A228 | 对应明确 |
| DD | D线各处张力设定 / 开卷机张力 N/mm2 | 1#开卷机张力单位张力值 | por1_tension_unit_tension | N/mm2 | plc1-mese!A87 | 对应明确 |
| DD | D线各处张力设定 / 开卷机张力 N/mm2 | 2#开卷机张力单位张力值 | por2_tension_unit_tension | N/mm2 | plc1-mese!A95 | 对应明确 |
| DE | D线各处张力设定 / 入口活套张力 N/mm2 | 入口活套张力单位张力值 | entry_loop_tension_unit_tension | N/mm2 | plc1-mese!A103 | 对应明确 |
| DF | D线各处张力设定 / 清洗段张力 N/mm2 | 前清洗张力单位张力值 | pre_clean_tension_unit_tension | N/mm2 | plc2-mpsp!A11 | 对应明确 |
| DG | D线各处张力设定 / 炉区张力 N/mm2 | 炉子入口张力单位张力值 | furnace_entry_tension_unit_tension | N/mm2 | plc2-mpsp!A19 | 对应明确 |
| DH | D线各处张力设定 / 出口活套张力 N/mm2 | 出口活套张力单位张力值 | exit_loop_tension_unit_tension | N/mm2 | plc3-mxsx!A118 | 对应明确 |
| DI | D线各处张力设定 / 卷取张力N/mm2 / 卷心 | 1#卷取机张力实际值 | tr1_tension_pv | KN | plc3-mxsx!A106 | 分段统计与单位换算 |
| DI | D线各处张力设定 / 卷取张力N/mm2 / 卷心 | 2#卷取机张力实际值 | tr2_tension_pv | KN | plc3-mxsx!A114 | 分段统计与单位换算 |
| DJ | D线各处张力设定 / 卷取张力N/mm2 / 卷中 | 1#卷取机张力实际值 | tr1_tension_pv | KN | plc3-mxsx!A106 | 分段统计与单位换算 |
| DJ | D线各处张力设定 / 卷取张力N/mm2 / 卷中 | 2#卷取机张力实际值 | tr2_tension_pv | KN | plc3-mxsx!A114 | 分段统计与单位换算 |
| DK | D线各处张力设定 / 卷取张力N/mm2 / 卷尾 | 1#卷取机张力实际值 | tr1_tension_pv | KN | plc3-mxsx!A106 | 分段统计与单位换算 |
| DK | D线各处张力设定 / 卷取张力N/mm2 / 卷尾 | 2#卷取机张力实际值 | tr2_tension_pv | KN | plc3-mxsx!A114 | 分段统计与单位换算 |

## BAF1 罩式炉（暂缓）

| 需求列 | 需求名称 | 源点位中文名 | 英文位号 | 源单位 | 原始位置 | 匹配结论 |
| --- | --- | --- | --- | --- | --- | --- |
| DL | 罩式退火 第一阶段升温（0-720） / 温度/℃ | — | — | — | — | 罩式炉阶段数据暂缓 |
| DM | 罩式退火 第一阶段升温（0-720） / 升温速率 | — | — | — | — | 罩式炉阶段数据暂缓 |
| DN | 罩式退火 第一阶段升温（0-720） / 保护气 m3/h | — | — | — | — | 罩式炉阶段数据暂缓 |
| DO | 罩式退火 第一阶段升温（0-720） / 炉压 | — | — | — | — | 罩式炉阶段数据暂缓 |
| DP | 罩式退火 低保温（720度 25h或 23h） / 温度/℃ | — | — | — | — | 罩式炉阶段数据暂缓 |
| DQ | 罩式退火 低保温（720度 25h或 23h） / 保温时间 | — | — | — | — | 罩式炉阶段数据暂缓 |
| DR | 罩式退火 低保温（720度 25h或 23h） / 露点 | — | — | — | — | 罩式炉阶段数据暂缓 |
| DS | 罩式退火 低保温（720度 25h或 23h） / 保护气 m3/h | — | — | — | — | 罩式炉阶段数据暂缓 |
| DT | 罩式退火 低保温（720度 25h或 23h） / 炉压 | — | — | — | — | 罩式炉阶段数据暂缓 |
| DU | 罩式退火第二阶段升温 / 700~900℃ / 升温速率 | — | — | — | — | 罩式炉阶段数据暂缓 |
| DV | 罩式退火第二阶段升温 / 700~900℃ / 保护气 m3/h | — | — | — | — | 罩式炉阶段数据暂缓 |
| DW | 罩式退火第二阶段升温 / 700~900℃ / 炉压 | — | — | — | — | 罩式炉阶段数据暂缓 |
| DX | 罩式退火第二阶段升温 / 900~1000℃ / 升温速率 | — | — | — | — | 罩式炉阶段数据暂缓 |
| DY | 罩式退火第二阶段升温 / 900~1000℃ / 保护气 m3/h | — | — | — | — | 罩式炉阶段数据暂缓 |
| DZ | 罩式退火第二阶段升温 / 900~1000℃ / 炉压 | — | — | — | — | 罩式炉阶段数据暂缓 |
| EA | 罩式退火第二阶段升温 / 1000~1200℃ / 升温速率 | — | — | — | — | 罩式炉阶段数据暂缓 |
| EB | 罩式退火第二阶段升温 / 1000~1200℃ / 保护气 m3/h | — | — | — | — | 罩式炉阶段数据暂缓 |
| EC | 罩式退火第二阶段升温 / 1000~1200℃ / 炉压 | — | — | — | — | 罩式炉阶段数据暂缓 |
| ED | 罩式退火 高保温 （时长同低保温） / 炉台温度 | — | — | — | — | 罩式炉阶段数据暂缓 |
| EE | 罩式退火 高保温 （时长同低保温） / 保温时间 | — | — | — | — | 罩式炉阶段数据暂缓 |
| EF | 罩式退火 高保温 （时长同低保温） / 保护气 m3/h | — | — | — | — | 罩式炉阶段数据暂缓 |
| EG | 罩式退火 高保温 （时长同低保温） / 炉压 | — | — | — | — | 罩式炉阶段数据暂缓 |
| EH | 罩式退火降温 / 1200~1000℃ / 冷却速率 | — | — | — | — | 罩式炉阶段数据暂缓 |
| EI | 罩式退火降温 / 1200~1000℃ / 保护气 m3/h | — | — | — | — | 罩式炉阶段数据暂缓 |
| EJ | 罩式退火降温 / 1200~1000℃ / 炉压 | — | — | — | — | 罩式炉阶段数据暂缓 |
| EK | 罩式退火降温 / 1000~600℃ / 冷却速率 | — | — | — | — | 罩式炉阶段数据暂缓 |
| EL | 罩式退火降温 / 1000~600℃ / 保护气 m3/h | — | — | — | — | 罩式炉阶段数据暂缓 |
| EM | 罩式退火降温 / 1000~600℃ / 炉压 | — | — | — | — | 罩式炉阶段数据暂缓 |
| EN | 罩式退火降温 / 600~550℃ / 保护气 m3/h | — | — | — | — | 罩式炉阶段数据暂缓 |
| EO | 罩式退火降温 / 600~550℃ / 炉压 | — | — | — | — | 罩式炉阶段数据暂缓 |
| EP | 罩式退火降温 / 550~350℃ / 保护气 m3/h | — | — | — | — | 罩式炉阶段数据暂缓 |
| EQ | 罩式退火降温 / 550~350℃ / 炉压 | — | — | — | — | 罩式炉阶段数据暂缓 |

## FCL1 热拉伸

| 需求列 | 需求名称 | 源点位中文名 | 英文位号 | 源单位 | 原始位置 | 匹配结论 |
| --- | --- | --- | --- | --- | --- | --- |
| ER | F线退火工艺 / 工艺速度m/min | 中央段速度实际值 | center_speed_pv | m/min | plc2-mpsp!A6 | 对应明确 |
| ES | F线退火工艺 / PH/℃ / 1# | PHF1炉温实际值 | phf1_furnace_temp_pv | — | plc-fur!A46 | 对应明确 |
| ET | F线退火工艺 / PH/℃ / 2# | PHF2炉温实际值 | phf2_furnace_temp_pv | — | plc-fur!A50 | 对应明确 |
| EU | F线退火工艺 / PH/℃ / 3# | PHF3炉温实际值 | phf3_furnace_temp_pv | — | plc-fur!A54 | 对应明确 |
| EV | F线退火工艺 / PH/℃ / 4# | PHF4炉温实际值 | phf4_furnace_temp_pv | — | plc-fur!A58 | 对应明确 |
| EW | F线退火工艺 / RTF/℃ / 1# | RTF1炉温实际值 | rtf1_furnace_temp_pv | — | plc-fur!A62 | 对应明确 |
| EX | F线退火工艺 / RTF/℃ / 2# | RTF2炉温实际值 | rtf2_furnace_temp_pv | — | plc-fur!A66 | 对应明确 |
| EY | F线退火工艺 / SF/℃ / 1~5# | SF1炉温实际值 | sf1_furnace_temp_pv | — | plc-fur!A70 | 对应明确 |
| EY | F线退火工艺 / SF/℃ / 1~5# | SF2炉温实际值 | sf2_furnace_temp_pv | — | plc-fur!A74 | 对应明确 |
| EY | F线退火工艺 / SF/℃ / 1~5# | SF3炉温实际值 | sf3_furnace_temp_pv | — | plc-fur!A78 | 对应明确 |
| EY | F线退火工艺 / SF/℃ / 1~5# | SF4炉温实际值 | sf4_furnace_temp_pv | — | plc-fur!A82 | 对应明确 |
| EY | F线退火工艺 / SF/℃ / 1~5# | SF5炉温实际值 | sf5_furnace_temp_pv | — | plc-fur!A86 | 对应明确 |
| EZ | F线退火工艺 / CTF/℃ / 1# | CTF1炉温实际值 | ctf1_furnace_temp_pv | — | plc-fur!A137 | 对应明确 |
| FA | F线退火工艺 / CTF/℃ / 2# | CTF2炉温实际值 | ctf2_furnace_temp_pv | — | plc-fur!A141 | 对应明确 |
| FB | F线退火工艺 / CTF/℃ / 3# | CTF3炉温实际值 | ctf3_furnace_temp_pv | — | plc-fur!A145 | 对应明确 |
| FC | F线退火工艺 / CTF/℃ / 4# | CTF4炉温实际值 | ctf4_furnace_temp_pv | — | plc-fur!A149 | 对应明确 |
| FD | F线退火工艺 / RJC风机开口度 / 1# | RJC1#冷却风机L1设定值 | rjc1_cooling_fan_l1_sv | — | plc-fur!A181 | 开口度口径待确认 |
| FE | F线退火工艺 / RJC风机开口度 / 2# | RJC2#冷却风机L1设定值 | rjc2_cooling_fan_l1_sv | — | plc-fur!A183 | 开口度口径待确认 |
| FF | F线退火工艺 / RJC风机开口度 / 3# | RJC3#冷却风机L1设定值 | rjc3_cooling_fan_l1_sv | — | plc-fur!A185 | 开口度口径待确认 |
| FG | F线退火工艺 / RJC风机开口度 / 4# | RJC4#冷却风机L1设定值 | rjc4_cooling_fan_l1_sv | — | plc-fur!A187 | 开口度口径待确认 |
| FH | F线退火工艺 / FJC 风机开口度 | FJC1#冷却风机L1设定值 | fjc1_cooling_fan_l1_sv | — | plc-fur!A189 | 开口度口径待确认 |
| FI | F线炉区张力控制 / 开卷机 N/mm2 | 1#开卷机张力单位张力值 | por1_tension_unit_value | N/mm2 | plc1-mese!A136 | 设定或实测口径待确认 |
| FI | F线炉区张力控制 / 开卷机 N/mm2 | 2#开卷机张力单位张力值 | por2_tension_unit_value | N/mm2 | plc1-mese!A144 | 设定或实测口径待确认 |
| FJ | F线炉区张力控制 / 入口活套 N/mm2 | 入口活套张力单位张力值 | entry_loop_tension_unit_value | N/mm2 | plc1-mese!A152 | 设定或实测口径待确认 |
| FK | F线炉区张力控制 / 酸洗段 N/mm2 | 酸洗段张力单位张力值 | acid_pickling_tension_unit_value | N/mm2 | plc2-mpsp!A49 | 设定或实测口径待确认 |
| FL | F线炉区张力控制 / BR3~BR4 N/mm2 | BR3BR4张力单位张力值 | br3_br4_tension_unit_value | N/mm2 | plc2-mpsp!A57 | 设定或实测口径待确认 |
| FM | F线炉区张力控制 / 退火炉 N/mm2 | 退火炉张力单位张力值 | annealing_tension_unit_value | N/mm2 | plc2-mpsp!A65 | 设定或实测口径待确认 |
| FN | F线炉区张力控制 / 出口活套 N/mm2 | 出口活套张力单位张力值 | exit_loop_tension_unit_tension_value | N/mm2 | plc3-mxsx!A93 | 设定或实测口径待确认 |
| FO | F线炉区张力控制 / 卷取机 N/mm2 | 1#卷取机张力单位张力值 | tr1_tension_unit_value | N/mm2 | plc3-mxsx!A77 | 设定或实测口径待确认 |
| FO | F线炉区张力控制 / 卷取机 N/mm2 | 2#卷取机张力单位张力值 | tr2_tension_unit_tension_value | N/mm2 | plc3-mxsx!A85 | 设定或实测口径待确认 |

## 逐项配置位置

下表中唯一键用于质量侧参数资源与主题引用；采集总cube路径和跟踪路径承担不同职责。无现有跟踪路径的点位需要新增跟踪配置，不能只添加主题就认为已跟踪。

| 需求列 | 英文位号 | 唯一键 | 采集cube路径 | 现有跟踪路径 | 现有跟踪位置 |
| --- | --- | --- | --- | --- | --- |
| D | thickness | iron_thickness | /aygg_total/fcl1/iron/thickness | /aygg_tracking/fcl1/process/tech/thickness/thickness | sheet1!A946:E946 |
| D | thickness | thickness_thickness | /aygg_total/fcl1/thickness/thickness | — | — |
| F | iron_loss | iron_iron_loss | /aygg_total/fcl1/iron/iron_loss | /aygg_tracking/fcl1/process/tech/iron_loss/iron_loss | sheet1!A950:E950 |
| I | nof1_furnace_temp_pv | cp1_plc_fur_overview_nof1_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/nof1_furnace_temp_pv | /aygg_tracking/cp1/process/tech/nof/nof1_furnace_temp_pv | sheet1!A29:E29 |
| I | nof2_furnace_temp_pv | cp1_plc_fur_overview_nof2_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/nof2_furnace_temp_pv | /aygg_tracking/cp1/process/tech/nof/nof2_furnace_temp_pv | sheet1!A30:E30 |
| I | nof3_furnace_temp_pv | cp1_plc_fur_overview_nof3_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/nof3_furnace_temp_pv | /aygg_tracking/cp1/process/tech/nof/nof3_furnace_temp_pv | sheet1!A31:E31 |
| I | nof4_furnace_temp_pv | cp1_plc_fur_overview_nof4_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/nof4_furnace_temp_pv | /aygg_tracking/cp1/process/tech/nof/nof4_furnace_temp_pv | sheet1!A32:E32 |
| I | nof5_furnace_temp_pv | cp1_plc_fur_overview_nof5_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/nof5_furnace_temp_pv | /aygg_tracking/cp1/process/tech/nof/nof5_furnace_temp_pv | sheet1!A33:E33 |
| I | nof6_furnace_temp_pv | cp1_plc_fur_overview_nof6_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/nof6_furnace_temp_pv | /aygg_tracking/cp1/process/tech/nof/nof6_furnace_temp_pv | sheet1!A34:E34 |
| I | nof7_furnace_temp_pv | cp1_plc_fur_overview_nof7_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/nof7_furnace_temp_pv | /aygg_tracking/cp1/process/tech/nof/nof7_furnace_temp_pv | sheet1!A35:E35 |
| I | nof8_furnace_temp_pv | cp1_plc_fur_overview_nof8_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/nof8_furnace_temp_pv | /aygg_tracking/cp1/process/tech/nof/nof8_furnace_temp_pv | sheet1!A36:E36 |
| K | rtf1_furnace_temp_pv | cp1_plc_fur_overview_rtf1_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/rtf1_furnace_temp_pv | /aygg_tracking/cp1/process/tech/rtf/rtf1_furnace_temp_pv | sheet1!A54:E54 |
| K | rtf2_furnace_temp_pv | cp1_plc_fur_overview_rtf2_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/rtf2_furnace_temp_pv | /aygg_tracking/cp1/process/tech/rtf/rtf2_furnace_temp_pv | sheet1!A55:E55 |
| M | rcf1_1z_furnace_temp_pv | cp1_plc_fur_overview_rcf1_1z_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/rcf1_1z_furnace_temp_pv | /aygg_tracking/cp1/process/tech/rcf1/rcf1_1z_furnace_temp_pv | sheet1!A64:E64 |
| M | rcf1_2z_furnace_temp_pv | cp1_plc_fur_overview_rcf1_2z_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/rcf1_2z_furnace_temp_pv | /aygg_tracking/cp1/process/tech/rcf1/rcf1_2z_furnace_temp_pv | sheet1!A65:E65 |
| M | rcf1_3z_furnace_temp_pv | cp1_plc_fur_overview_rcf1_3z_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/rcf1_3z_furnace_temp_pv | /aygg_tracking/cp1/process/tech/rcf1/rcf1_3z_furnace_temp_pv | sheet1!A66:E66 |
| O | sf1_furnace_temp_pv | cp1_plc_fur_overview_sf1_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/sf1_furnace_temp_pv | /aygg_tracking/cp1/process/tech/sf/sf1_furnace_temp_pv | sheet1!A77:E77 |
| O | sf2_furnace_temp_pv | cp1_plc_fur_overview_sf2_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/sf2_furnace_temp_pv | /aygg_tracking/cp1/process/tech/sf/sf2_furnace_temp_pv | sheet1!A78:E78 |
| O | sf3_furnace_temp_pv | cp1_plc_fur_overview_sf3_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/sf3_furnace_temp_pv | /aygg_tracking/cp1/process/tech/sf/sf3_furnace_temp_pv | sheet1!A79:E79 |
| O | sf4_furnace_temp_pv | cp1_plc_fur_overview_sf4_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/sf4_furnace_temp_pv | /aygg_tracking/cp1/process/tech/sf/sf4_furnace_temp_pv | sheet1!A80:E80 |
| O | sf5_furnace_temp_pv | cp1_plc_fur_overview_sf5_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/sf5_furnace_temp_pv | /aygg_tracking/cp1/process/tech/sf/sf5_furnace_temp_pv | sheet1!A81:E81 |
| O | sf6_furnace_temp_pv | cp1_plc_fur_overview_sf6_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/sf6_furnace_temp_pv | /aygg_tracking/cp1/process/tech/sf/sf6_furnace_temp_pv | sheet1!A82:E82 |
| Q | rcf2_1z_furnace_temp_pv | cp1_plc_fur_overview_rcf2_1z_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/rcf2_1z_furnace_temp_pv | /aygg_tracking/cp1/process/tech/rcf2/rcf2_1z_furnace_temp_pv | sheet1!A99:E99 |
| Q | rcf2_2z_furnace_temp_pv | cp1_plc_fur_overview_rcf2_2z_furnace_temp_pv | /aygg_total/cp1/plc_fur/overview/rcf2_2z_furnace_temp_pv | /aygg_tracking/cp1/process/tech/rcf2/rcf2_2z_furnace_temp_pv | sheet1!A100:E100 |
| J | furnace_throat_plate_temp | cp1_plc_fur_overview_furnace_throat_plate_temp | /aygg_total/cp1/plc_fur/overview/furnace_throat_plate_temp | /aygg_tracking/cp1/process/tech/furnace_throat/furnace_throat_plate_temp | sheet1!A110:E110 |
| L | rtf_plate_temp | cp1_plc_fur_overview_rtf_plate_temp | /aygg_total/cp1/plc_fur/overview/rtf_plate_temp | /aygg_tracking/cp1/process/tech/rtf/rtf_plate_temp | sheet1!A56:E56 |
| N | rcf1_plate_temp | cp1_plc_fur_overview_rcf1_plate_temp | /aygg_total/cp1/plc_fur/overview/rcf1_plate_temp | /aygg_tracking/cp1/process/tech/rcf1/rcf1_plate_temp | sheet1!A67:E67 |
| P | sf_plate_temp | cp1_plc_fur_overview_sf_plate_temp | /aygg_total/cp1/plc_fur/overview/sf_plate_temp | /aygg_tracking/cp1/process/tech/sf/sf_plate_temp | sheet1!A83:E83 |
| R | rcf2_plate_temp | cp1_plc_fur_overview_rcf2_plate_temp | /aygg_total/cp1/plc_fur/overview/rcf2_plate_temp | /aygg_tracking/cp1/process/tech/rcf2/rcf2_plate_temp | sheet1!A101:E101 |
| S | center_speed_pv | cp1_plc2_mpsp_overview_center_speed_pv | /aygg_total/cp1/plc2_mpsp/overview/center_speed_pv | /aygg_tracking/cp1/process/tracking/center_speed_pv；/aygg_tracking/cp1/process/tech/rcf2/center_speed_pv | sheet1!A22:E22；sheet1!A108:E108 |
| T | rcf1_1z_fan_power_pv | cp1_plc_fur_overview_rcf1_1z_fan_power_pv | /aygg_total/cp1/plc_fur/overview/rcf1_1z_fan_power_pv | — | — |
| U | rcf1_2z_fan_power_pv | cp1_plc_fur_overview_rcf1_2z_fan_power_pv | /aygg_total/cp1/plc_fur/overview/rcf1_2z_fan_power_pv | — | — |
| V | rcf1_3z_fan_power_pv | cp1_plc_fur_overview_rcf1_3z_fan_power_pv | /aygg_total/cp1/plc_fur/overview/rcf1_3z_fan_power_pv | — | — |
| W | rcf2_1z_fan_power_pv | cp1_plc_fur_overview_rcf2_1z_fan_power_pv | /aygg_total/cp1/plc_fur/overview/rcf2_1z_fan_power_pv | — | — |
| X | rcf2_2z_fan_power_pv | cp1_plc_fur_overview_rcf2_2z_fan_power_pv | /aygg_total/cp1/plc_fur/overview/rcf2_2z_fan_power_pv | — | — |
| Y | ajc_fan_speed | cp1_plc_fur_overview_ajc_fan_speed | /aygg_total/cp1/plc_fur/overview/ajc_fan_speed | — | — |
| Z | cool1_air_pressure | cp1_plc_fur_overview_cool1_air_pressure | /aygg_total/cp1/plc_fur/overview/cool1_air_pressure | — | — |
| AA | cool1_water_pressure | cp1_plc_fur_overview_cool1_water_pressure | /aygg_total/cp1/plc_fur/overview/cool1_water_pressure | — | — |
| AB | cool1_flow | cp1_plc_fur_overview_cool1_flow | /aygg_total/cp1/plc_fur/overview/cool1_flow | — | — |
| AC | cool2_air_pressure | cp1_plc_fur_overview_cool2_air_pressure | /aygg_total/cp1/plc_fur/overview/cool2_air_pressure | — | — |
| AD | cool2_water_pressure | cp1_plc_fur_overview_cool2_water_pressure | /aygg_total/cp1/plc_fur/overview/cool2_water_pressure | — | — |
| AE | cool2_flow | cp1_plc_fur_overview_cool2_flow | /aygg_total/cp1/plc_fur/overview/cool2_flow | — | — |
| AF | cool3_air_pressure | cp1_plc_fur_overview_cool3_air_pressure | /aygg_total/cp1/plc_fur/overview/cool3_air_pressure | — | — |
| AG | cool3_water_pressure | cp1_plc_fur_overview_cool3_water_pressure | /aygg_total/cp1/plc_fur/overview/cool3_water_pressure | — | — |
| AH | cool3_flow | cp1_plc_fur_overview_cool3_flow | /aygg_total/cp1/plc_fur/overview/cool3_flow | — | — |
| AI | wsc1_section1_air_pressure | — | — | — | — |
| AJ | wsc1_section1_water_pressure | cp1_plc_fur_overview_wsc1_section1_water_pressure | /aygg_total/cp1/plc_fur/overview/wsc1_section1_water_pressure | — | — |
| AK | wsc1_section1_flow | cp1_plc_fur_overview_wsc1_section1_flow | /aygg_total/cp1/plc_fur/overview/wsc1_section1_flow | — | — |
| AL | wsc1_section2_air_pressure | — | — | — | — |
| AM | wsc1_section2_water_pressure | cp1_plc_fur_overview_wsc1_section2_water_pressure | /aygg_total/cp1/plc_fur/overview/wsc1_section2_water_pressure | — | — |
| AN | wsc1_section2_flow | cp1_plc_fur_overview_wsc1_section2_flow | /aygg_total/cp1/plc_fur/overview/wsc1_section2_flow | — | — |
| AO | water_jacket_air_pressure | — | — | — | — |
| AP | water_jacket_water_pressure | cp1_plc_fur_overview_water_jacket_water_pressure | /aygg_total/cp1/plc_fur/overview/water_jacket_water_pressure | — | — |
| AQ | water_jacket_flow | cp1_plc_fur_overview_water_jacket_flow | /aygg_total/cp1/plc_fur/overview/water_jacket_flow | — | — |
| AS | wsc2_section1_air_pressure | — | — | — | — |
| AT | wsc2_section1_water_pressure | cp1_plc_fur_overview_wsc2_section1_water_pressure | /aygg_total/cp1/plc_fur/overview/wsc2_section1_water_pressure | — | — |
| AU | wsc2_section1_flow | cp1_plc_fur_overview_wsc2_section1_flow | /aygg_total/cp1/plc_fur/overview/wsc2_section1_flow | — | — |
| AV | wsc2_section2_air_pressure | — | — | — | — |
| AW | wsc2_section2_water_pressure | cp1_plc_fur_overview_wsc2_section2_water_pressure | /aygg_total/cp1/plc_fur/overview/wsc2_section2_water_pressure | — | — |
| AX | wsc2_section2_flow | cp1_plc_fur_overview_wsc2_section2_flow | /aygg_total/cp1/plc_fur/overview/wsc2_section2_flow | — | — |
| AR | water_jacket_plate_temp | cp1_plc_fur_overview_water_jacket_plate_temp | /aygg_total/cp1/plc_fur/overview/water_jacket_plate_temp | — | — |
| AY | acid_loop1_graphite_hex1_outlet_pipe_temp_a | cp1_plc4_su_medium_acid_loop1_graphite_hex1_outlet_pipe_temp_a | /aygg_total/cp1/plc4_su/acid_loop1_graphite_hex1_outlet_pipe_temp_a | /aygg_tracking/cp1/process/tech/picking_tank1/acid_loop1_graphite_hex1_outlet_pipe_temp_a | sheet1!A122:E122 |
| AY | acid_loop1_graphite_hex2_outlet_pipe_temp_b | cp1_plc4_su_medium_acid_loop1_graphite_hex2_outlet_pipe_temp_b | /aygg_total/cp1/plc4_su/acid_loop1_graphite_hex2_outlet_pipe_temp_b | /aygg_tracking/cp1/process/tech/picking_tank1/acid_loop1_graphite_hex2_outlet_pipe_temp_b | sheet1!A123:E123 |
| BB | acid_loop2_graphite_hex1_outlet_pipe_temp_a | cp1_plc4_su_medium_acid_loop2_graphite_hex1_outlet_pipe_temp_a | /aygg_total/cp1/plc4_su/acid_loop2_graphite_hex1_outlet_pipe_temp_a | /aygg_tracking/cp1/process/tech/picking_tank2/acid_loop2_graphite_hex1_outlet_pipe_temp_a | sheet1!A130:E130 |
| BB | acid_loop2_graphite_hex2_outlet_pipe_temp_b | cp1_plc4_su_medium_acid_loop2_graphite_hex2_outlet_pipe_temp_b | /aygg_total/cp1/plc4_su/acid_loop2_graphite_hex2_outlet_pipe_temp_b | /aygg_tracking/cp1/process/tech/picking_tank2/acid_loop2_graphite_hex2_outlet_pipe_temp_b | sheet1!A131:E131 |
| BE | acid_loop3_graphite_hex_outlet_pipe_temp | cp1_plc4_su_medium_acid_loop3_graphite_hex_outlet_pipe_temp | /aygg_total/cp1/plc4_su/acid_loop3_graphite_hex_outlet_pipe_temp | /aygg_tracking/cp1/process/tech/picking_tank3/acid_loop3_graphite_hex_outlet_pipe_temp | sheet1!A133:E133 |
| AY | rinse_condensate_water_temp | cp1_plc4_su_medium_rinse_condensate_water_temp | /aygg_total/cp1/plc4_su/rinse_condensate_water_temp | /aygg_tracking/cp1/process/tech/rinsing/rinse_condensate_water_temp | sheet1!A136:E136 |
| BB | rinse_condensate_water_temp | cp1_plc4_su_medium_rinse_condensate_water_temp | /aygg_total/cp1/plc4_su/rinse_condensate_water_temp | /aygg_tracking/cp1/process/tech/rinsing/rinse_condensate_water_temp | sheet1!A136:E136 |
| BE | rinse_condensate_water_temp | cp1_plc4_su_medium_rinse_condensate_water_temp | /aygg_total/cp1/plc4_su/rinse_condensate_water_temp | /aygg_tracking/cp1/process/tech/rinsing/rinse_condensate_water_temp | sheet1!A136:E136 |
| BH | center_speed_pv | dcl1_plc2_mpsp_overview_center_speed_pv | /aygg_total/dcl1/plc2_mpsp/overview/center_speed_pv | /aygg_tracking/dcl1/process/tracking/center_speed_pv；/aygg_tracking/dcl1/process/tech/sep1/center_speed_pv | sheet1!A290:E290；sheet1!A610:E610 |
| BI | rtf1_section1_furnace_temp_pv | dcl1_plc_fur_overview_rtf1_section1_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/rtf1_section1_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/rtf1/rtf1_section1_furnace_temp_pv | sheet1!A542:E542 |
| BJ | rtf1_section2_furnace_temp_pv | dcl1_plc_fur_overview_rtf1_section2_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/rtf1_section2_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/rtf1/rtf1_section2_furnace_temp_pv | sheet1!A543:E543 |
| BK | rtf2_section1_furnace_temp_pv | dcl1_plc_fur_overview_rtf2_section1_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/rtf2_section1_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/rtf2/rtf2_section1_furnace_temp_pv | sheet1!A510:E510 |
| BL | rtf2_section2_furnace_temp_pv | dcl1_plc_fur_overview_rtf2_section2_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/rtf2_section2_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/rtf2/rtf2_section2_furnace_temp_pv | sheet1!A511:E511 |
| BM | sf1_section1_furnace_temp_pv | dcl1_plc_fur_overview_sf1_section1_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf1_section1_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/sf1_section1_furnace_temp_pv | sheet1!A388:E388 |
| BM | sf1_section2_furnace_temp_pv | dcl1_plc_fur_overview_sf1_section2_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf1_section2_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/sf1_section2_furnace_temp_pv | sheet1!A389:E389 |
| BM | sf1_section3_furnace_temp_pv | dcl1_plc_fur_overview_sf1_section3_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf1_section3_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/sf1_section3_furnace_temp_pv | sheet1!A390:E390 |
| BM | sf1_section4_furnace_temp_pv | dcl1_plc_fur_overview_sf1_section4_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf1_section4_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/sf1_section4_furnace_temp_pv | sheet1!A391:E391 |
| BM | sf1_section5_furnace_temp_pv | dcl1_plc_fur_overview_sf1_section5_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf1_section5_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/sf1_section5_furnace_temp_pv | sheet1!A392:E392 |
| BM | sf1_section6_furnace_temp_pv | dcl1_plc_fur_overview_sf1_section6_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf1_section6_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/sf1_section6_furnace_temp_pv | sheet1!A393:E393 |
| BM | sf1_section7_furnace_temp_pv | dcl1_plc_fur_overview_sf1_section7_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf1_section7_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/sf1_section7_furnace_temp_pv | sheet1!A394:E394 |
| BM | sf1_section8_furnace_temp_pv | dcl1_plc_fur_overview_sf1_section8_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf1_section8_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/sf1_section8_furnace_temp_pv | sheet1!A395:E395 |
| BM | sf1_section9_furnace_temp_pv | dcl1_plc_fur_overview_sf1_section9_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf1_section9_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/sf1_section9_furnace_temp_pv | sheet1!A396:E396 |
| BM | sf1_section10_furnace_temp_pv | dcl1_plc_fur_overview_sf1_section10_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf1_section10_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/sf1_section10_furnace_temp_pv | sheet1!A397:E397 |
| BM | sf1_section11_furnace_temp_pv | dcl1_plc_fur_overview_sf1_section11_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf1_section11_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/sf1_section11_furnace_temp_pv | sheet1!A398:E398 |
| BM | sf1_section12_furnace_temp_pv | dcl1_plc_fur_overview_sf1_section12_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf1_section12_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/sf1_section12_furnace_temp_pv | sheet1!A399:E399 |
| BM | sf1_section13_furnace_temp_pv | dcl1_plc_fur_overview_sf1_section13_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf1_section13_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/sf1_section13_furnace_temp_pv | sheet1!A400:E400 |
| BM | sf1_section14_furnace_temp_pv | dcl1_plc_fur_overview_sf1_section14_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf1_section14_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/sf1_section14_furnace_temp_pv | sheet1!A401:E401 |
| BM | sf1_section15_furnace_temp_pv | dcl1_plc_fur_overview_sf1_section15_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf1_section15_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/sf1_section15_furnace_temp_pv | sheet1!A402:E402 |
| BN | hef_section1_furnace_temp_pv | dcl1_plc_fur_overview_hef_section1_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/hef_section1_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/hef/hef_section1_furnace_temp_pv | sheet1!A375:E375 |
| BN | hef_section2_furnace_temp_pv | dcl1_plc_fur_overview_hef_section2_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/hef_section2_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/hef/hef_section2_furnace_temp_pv | sheet1!A376:E376 |
| BO | sf2_section1_furnace_temp_pv | dcl1_plc_fur_overview_sf2_section1_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf2_section1_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf2/sf2_section1_furnace_temp_pv | sheet1!A350:E350 |
| BO | sf2_section2_furnace_temp_pv | dcl1_plc_fur_overview_sf2_section2_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf2_section2_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf2/sf2_section2_furnace_temp_pv | sheet1!A351:E351 |
| BP | atc_section1_furnace_temp_pv | dcl1_plc_fur_overview_atc_section1_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/atc_section1_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/atc/atc_section1_furnace_temp_pv | sheet1!A335:E335 |
| BP | atc_section2_furnace_temp_pv | dcl1_plc_fur_overview_atc_section2_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/atc_section2_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/atc/atc_section2_furnace_temp_pv | sheet1!A336:E336 |
| BQ | sf3_section1_furnace_temp_pv | dcl1_plc_fur_overview_sf3_section1_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf3_section1_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf3/sf3_section1_furnace_temp_pv | sheet1!A297:E297 |
| BQ | sf3_section2_furnace_temp_pv | dcl1_plc_fur_overview_sf3_section2_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf3_section2_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf3/sf3_section2_furnace_temp_pv | sheet1!A298:E298 |
| BQ | sf3_section3_furnace_temp_pv | dcl1_plc_fur_overview_sf3_section3_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/sf3_section3_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/sf3/sf3_section3_furnace_temp_pv | sheet1!A299:E299 |
| BR | sjc_control_cooling_fan5_l1_sv | dcl1_plc_fur_overview_sjc_control_cooling_fan5_l1_sv | /aygg_total/dcl1/plc_fur/overview/sjc_control_cooling_fan5_l1_sv | — | — |
| BS | rjc_cooling_fan1_l1_sv | dcl1_plc_fur_overview_rjc_cooling_fan1_l1_sv | /aygg_total/dcl1/plc_fur/overview/rjc_cooling_fan1_l1_sv | — | — |
| BS | rjc_cooling_fan2_l1_sv | dcl1_plc_fur_overview_rjc_cooling_fan2_l1_sv | /aygg_total/dcl1/plc_fur/overview/rjc_cooling_fan2_l1_sv | — | — |
| BS | rjc_cooling_fan3_l1_sv | dcl1_plc_fur_overview_rjc_cooling_fan3_l1_sv | /aygg_total/dcl1/plc_fur/overview/rjc_cooling_fan3_l1_sv | — | — |
| BS | rjc_cooling_fan4_l1_sv | dcl1_plc_fur_overview_rjc_cooling_fan4_l1_sv | /aygg_total/dcl1/plc_fur/overview/rjc_cooling_fan4_l1_sv | — | — |
| BT | humidifier1_exit_pipe_temp_pv | dcl1_plc_fur_overview_humidifier1_exit_pipe_temp_pv | /aygg_total/dcl1/plc_fur/overview/humidifier1_exit_pipe_temp_pv | /aygg_tracking/dcl1/process/tech/rtf2/humidifier1_exit_pipe_temp_pv | sheet1!A530:E530 |
| BU | mixer1_gas_flow | dcl1_plc_fur_overview_mixer1_gas_flow | /aygg_total/dcl1/plc_fur/overview/mixer1_gas_flow | — | — |
| BV | mixer1_h2_ratio | dcl1_plc_fur_overview_mixer1_h2_ratio | /aygg_total/dcl1/plc_fur/overview/mixer1_h2_ratio | — | — |
| BW | humidifier2_exit_pipe_temp_pv | dcl1_plc_fur_overview_humidifier2_exit_pipe_temp_pv | /aygg_total/dcl1/plc_fur/overview/humidifier2_exit_pipe_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/humidifier2_exit_pipe_temp_pv | sheet1!A454:E454 |
| BX | mixer2_gas_flow | dcl1_plc_fur_overview_mixer2_gas_flow | /aygg_total/dcl1/plc_fur/overview/mixer2_gas_flow | — | — |
| BY | mixer2_h2_ratio | dcl1_plc_fur_overview_mixer2_h2_ratio | /aygg_total/dcl1/plc_fur/overview/mixer2_h2_ratio | — | — |
| BZ | humidifier3_exit_pipe_temp_pv | dcl1_plc_fur_overview_humidifier3_exit_pipe_temp_pv | /aygg_total/dcl1/plc_fur/overview/humidifier3_exit_pipe_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/humidifier3_exit_pipe_temp_pv | sheet1!A457:E457 |
| CA | mixer3_gas_flow | dcl1_plc_fur_overview_mixer3_gas_flow | /aygg_total/dcl1/plc_fur/overview/mixer3_gas_flow | — | — |
| CB | mixer3_h2_ratio | dcl1_plc_fur_overview_mixer3_h2_ratio | /aygg_total/dcl1/plc_fur/overview/mixer3_h2_ratio | — | — |
| CC | humidifier4_exit_pipe_temp_pv | dcl1_plc_fur_overview_humidifier4_exit_pipe_temp_pv | /aygg_total/dcl1/plc_fur/overview/humidifier4_exit_pipe_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/humidifier4_exit_pipe_temp_pv | sheet1!A460:E460 |
| CD | mixer4_gas_flow | dcl1_plc_fur_overview_mixer4_gas_flow | /aygg_total/dcl1/plc_fur/overview/mixer4_gas_flow | — | — |
| CE | mixer4_h2_ratio | dcl1_plc_fur_overview_mixer4_h2_ratio | /aygg_total/dcl1/plc_fur/overview/mixer4_h2_ratio | — | — |
| CF | humidifier5_exit_pipe_temp_pv | dcl1_plc_fur_overview_humidifier5_exit_pipe_temp_pv | /aygg_total/dcl1/plc_fur/overview/humidifier5_exit_pipe_temp_pv | /aygg_tracking/dcl1/process/tech/sf1/humidifier5_exit_pipe_temp_pv | sheet1!A463:E463 |
| CG | mixer5_gas_flow | dcl1_plc_fur_overview_mixer5_gas_flow | /aygg_total/dcl1/plc_fur/overview/mixer5_gas_flow | — | — |
| CH | mixer5_h2_ratio | dcl1_plc_fur_overview_mixer5_h2_ratio | /aygg_total/dcl1/plc_fur/overview/mixer5_h2_ratio | — | — |
| CI | humidifier6_exit_pipe_temp_pv | dcl1_plc_fur_overview_humidifier6_exit_pipe_temp_pv | /aygg_total/dcl1/plc_fur/overview/humidifier6_exit_pipe_temp_pv | /aygg_tracking/dcl1/process/tech/sf2/humidifier6_exit_pipe_temp_pv | sheet1!A365:E365 |
| CJ | mixer6_gas_flow | dcl1_plc_fur_overview_mixer6_gas_flow | /aygg_total/dcl1/plc_fur/overview/mixer6_gas_flow | — | — |
| CK | mixer6_h2_ratio | dcl1_plc_fur_overview_mixer6_h2_ratio | /aygg_total/dcl1/plc_fur/overview/mixer6_h2_ratio | — | — |
| CL | humidifier7_exit_pipe_temp_pv | dcl1_plc_fur_overview_humidifier7_exit_pipe_temp_pv | /aygg_total/dcl1/plc_fur/overview/humidifier7_exit_pipe_temp_pv | /aygg_tracking/dcl1/process/tech/sf3/humidifier7_exit_pipe_temp_pv | sheet1!A322:E322 |
| CM | mixer7_gas_flow | dcl1_plc_fur_overview_mixer7_gas_flow | /aygg_total/dcl1/plc_fur/overview/mixer7_gas_flow | — | — |
| CN | mixer7_h2_ratio | dcl1_plc_fur_overview_mixer7_h2_ratio | /aygg_total/dcl1/plc_fur/overview/mixer7_h2_ratio | — | — |
| CO | rtf2_partial_pressure_ratio | dcl1_plc_fur_overview_rtf2_partial_pressure_ratio | /aygg_total/dcl1/plc_fur/overview/rtf2_partial_pressure_ratio | — | — |
| CP | sf1_z3_partial_pressure_ratio | dcl1_plc_fur_overview_sf1_z3_partial_pressure_ratio | /aygg_total/dcl1/plc_fur/overview/sf1_z3_partial_pressure_ratio | — | — |
| CQ | sf1_z6_partial_pressure_ratio | dcl1_plc_fur_overview_sf1_z6_partial_pressure_ratio | /aygg_total/dcl1/plc_fur/overview/sf1_z6_partial_pressure_ratio | — | — |
| CR | sf1_z9_partial_pressure_ratio | dcl1_plc_fur_overview_sf1_z9_partial_pressure_ratio | /aygg_total/dcl1/plc_fur/overview/sf1_z9_partial_pressure_ratio | — | — |
| CS | sf1_z12_partial_pressure_ratio | dcl1_plc_fur_overview_sf1_z12_partial_pressure_ratio | /aygg_total/dcl1/plc_fur/overview/sf1_z12_partial_pressure_ratio | — | — |
| CT | sf1_z15_partial_pressure_ratio | dcl1_plc_fur_overview_sf1_z15_partial_pressure_ratio | /aygg_total/dcl1/plc_fur/overview/sf1_z15_partial_pressure_ratio | — | — |
| CU | sf2_z1_z2_partial_pressure_ratio | dcl1_plc_fur_overview_sf2_z1_z2_partial_pressure_ratio | /aygg_total/dcl1/plc_fur/overview/sf2_z1_z2_partial_pressure_ratio | — | — |
| CV | atc_z2_partial_pressure_ratio | dcl1_plc_fur_overview_atc_z2_partial_pressure_ratio | /aygg_total/dcl1/plc_fur/overview/atc_z2_partial_pressure_ratio | — | — |
| CY | nh3_flow_pv | dcl1_plc_fur_overview_nh3_flow_pv | /aygg_total/dcl1/plc_fur/overview/nh3_flow_pv | /aygg_tracking/dcl1/process/tech/sf3/nh3_flow_pv | sheet1!A319:E319 |
| CZ | coating_machine1_os_pressure_pv | dcl1_plc3_mxsx_coat_coating_machine1_os_pressure_pv | /aygg_total/dcl1/plc3_mxsx/coat/coating_machine1_os_pressure_pv | /aygg_tracking/dcl1/process/tech/coater1/coating_machine1_os_pressure_pv | sheet1!A576:E576 |
| CZ | coating_machine2_os_pressure_pv | dcl1_plc3_mxsx_coat_coating_machine2_os_pressure_pv | /aygg_total/dcl1/plc3_mxsx/coat/coating_machine2_os_pressure_pv | /aygg_tracking/dcl1/process/tech/coater2/coating_machine2_os_pressure_pv | sheet1!A591:E591 |
| DA | coating_machine1_ds_pressure_pv | dcl1_plc3_mxsx_coat_coating_machine1_ds_pressure_pv | /aygg_total/dcl1/plc3_mxsx/coat/coating_machine1_ds_pressure_pv | /aygg_tracking/dcl1/process/tech/coater1/coating_machine1_ds_pressure_pv | sheet1!A577:E577 |
| DA | coating_machine2_ds_pressure_pv | dcl1_plc3_mxsx_coat_coating_machine2_ds_pressure_pv | /aygg_total/dcl1/plc3_mxsx/coat/coating_machine2_ds_pressure_pv | /aygg_tracking/dcl1/process/tech/coater2/coating_machine2_ds_pressure_pv | sheet1!A594:E594 |
| DB | ds_section1_furnace_temp_pv | dcl1_plc_fur_overview_ds_section1_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/ds_section1_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/dsc/ds_section1_furnace_temp_pv | sheet1!A661:E661 |
| DC | ds_section2_furnace_temp_pv | dcl1_plc_fur_overview_ds_section2_furnace_temp_pv | /aygg_total/dcl1/plc_fur/overview/ds_section2_furnace_temp_pv | /aygg_tracking/dcl1/process/tech/dsc/ds_section2_furnace_temp_pv | sheet1!A662:E662 |
| DD | por1_tension_unit_tension | dcl1_plc1_mese_tension_por1_tension_unit_tension | /aygg_total/dcl1/plc1_mese/tension/por1_tension_unit_tension | — | — |
| DD | por2_tension_unit_tension | dcl1_plc1_mese_tension_por2_tension_unit_tension | /aygg_total/dcl1/plc1_mese/tension/por2_tension_unit_tension | — | — |
| DE | entry_loop_tension_unit_tension | dcl1_plc1_mese_tension_entry_loop_tension_unit_tension | /aygg_total/dcl1/plc1_mese/tension/entry_loop_tension_unit_tension | — | — |
| DF | pre_clean_tension_unit_tension | dcl1_plc2_mpsp_tension_pre_clean_tension_unit_tension | /aygg_total/dcl1/plc2_mpsp/tension/pre_clean_tension_unit_tension | — | — |
| DG | furnace_entry_tension_unit_tension | dcl1_plc2_mpsp_tension_furnace_entry_tension_unit_tension | /aygg_total/dcl1/plc2_mpsp/tension/furnace_entry_tension_unit_tension | — | — |
| DH | exit_loop_tension_unit_tension | dcl1_plc3_mxsx_tension_exit_loop_tension_unit_tension | /aygg_total/dcl1/plc3_mxsx/tension/exit_loop_tension_unit_tension | — | — |
| DI | tr1_tension_pv | dcl1_plc3_mxsx_tension_tr1_tension_pv | /aygg_total/dcl1/plc3_mxsx/tension/tr1_tension_pv | — | — |
| DI | tr2_tension_pv | dcl1_plc3_mxsx_tension_tr2_tension_pv | /aygg_total/dcl1/plc3_mxsx/tension/tr2_tension_pv | — | — |
| DJ | tr1_tension_pv | dcl1_plc3_mxsx_tension_tr1_tension_pv | /aygg_total/dcl1/plc3_mxsx/tension/tr1_tension_pv | — | — |
| DJ | tr2_tension_pv | dcl1_plc3_mxsx_tension_tr2_tension_pv | /aygg_total/dcl1/plc3_mxsx/tension/tr2_tension_pv | — | — |
| DK | tr1_tension_pv | dcl1_plc3_mxsx_tension_tr1_tension_pv | /aygg_total/dcl1/plc3_mxsx/tension/tr1_tension_pv | — | — |
| DK | tr2_tension_pv | dcl1_plc3_mxsx_tension_tr2_tension_pv | /aygg_total/dcl1/plc3_mxsx/tension/tr2_tension_pv | — | — |
| ER | center_speed_pv | fcl1_plc2_mpsp_overview_center_speed_pv | /aygg_total/fcl1/plc2_mpsp/overview/center_speed_pv | /aygg_tracking/fcl1/process/tracking/center_speed_pv；/aygg_tracking/fcl1/process/tech/rtf/center_speed_pv | sheet1!A739:E739；sheet1!A825:E825 |
| ES | phf1_furnace_temp_pv | fcl1_plc_fur_overview_phf1_furnace_temp_pv | /aygg_total/fcl1/plc_fur/overview/phf1_furnace_temp_pv | /aygg_tracking/fcl1/process/tech/phf/phf1_furnace_temp_pv | sheet1!A827:E827 |
| ET | phf2_furnace_temp_pv | fcl1_plc_fur_overview_phf2_furnace_temp_pv | /aygg_total/fcl1/plc_fur/overview/phf2_furnace_temp_pv | /aygg_tracking/fcl1/process/tech/phf/phf2_furnace_temp_pv | sheet1!A828:E828 |
| EU | phf3_furnace_temp_pv | fcl1_plc_fur_overview_phf3_furnace_temp_pv | /aygg_total/fcl1/plc_fur/overview/phf3_furnace_temp_pv | /aygg_tracking/fcl1/process/tech/phf/phf3_furnace_temp_pv | sheet1!A829:E829 |
| EV | phf4_furnace_temp_pv | fcl1_plc_fur_overview_phf4_furnace_temp_pv | /aygg_total/fcl1/plc_fur/overview/phf4_furnace_temp_pv | /aygg_tracking/fcl1/process/tech/phf/phf4_furnace_temp_pv | sheet1!A830:E830 |
| EW | rtf1_furnace_temp_pv | fcl1_plc_fur_overview_rtf1_furnace_temp_pv | /aygg_total/fcl1/plc_fur/overview/rtf1_furnace_temp_pv | /aygg_tracking/fcl1/process/tech/rtf/rtf1_furnace_temp_pv | sheet1!A805:E805 |
| EX | rtf2_furnace_temp_pv | fcl1_plc_fur_overview_rtf2_furnace_temp_pv | /aygg_total/fcl1/plc_fur/overview/rtf2_furnace_temp_pv | /aygg_tracking/fcl1/process/tech/rtf/rtf2_furnace_temp_pv | sheet1!A806:E806 |
| EY | sf1_furnace_temp_pv | fcl1_plc_fur_overview_sf1_furnace_temp_pv | /aygg_total/fcl1/plc_fur/overview/sf1_furnace_temp_pv | /aygg_tracking/fcl1/process/tech/sf/sf1_furnace_temp_pv | sheet1!A781:E781 |
| EY | sf2_furnace_temp_pv | fcl1_plc_fur_overview_sf2_furnace_temp_pv | /aygg_total/fcl1/plc_fur/overview/sf2_furnace_temp_pv | /aygg_tracking/fcl1/process/tech/sf/sf2_furnace_temp_pv | sheet1!A782:E782 |
| EY | sf3_furnace_temp_pv | fcl1_plc_fur_overview_sf3_furnace_temp_pv | /aygg_total/fcl1/plc_fur/overview/sf3_furnace_temp_pv | /aygg_tracking/fcl1/process/tech/sf/sf3_furnace_temp_pv | sheet1!A783:E783 |
| EY | sf4_furnace_temp_pv | fcl1_plc_fur_overview_sf4_furnace_temp_pv | /aygg_total/fcl1/plc_fur/overview/sf4_furnace_temp_pv | /aygg_tracking/fcl1/process/tech/sf/sf4_furnace_temp_pv | sheet1!A784:E784 |
| EY | sf5_furnace_temp_pv | fcl1_plc_fur_overview_sf5_furnace_temp_pv | /aygg_total/fcl1/plc_fur/overview/sf5_furnace_temp_pv | /aygg_tracking/fcl1/process/tech/sf/sf5_furnace_temp_pv | sheet1!A785:E785 |
| EZ | ctf1_furnace_temp_pv | fcl1_plc_fur_overview_ctf1_furnace_temp_pv | /aygg_total/fcl1/plc_fur/overview/ctf1_furnace_temp_pv | /aygg_tracking/fcl1/process/tech/ctf/ctf1_furnace_temp_pv | sheet1!A762:E762 |
| FA | ctf2_furnace_temp_pv | fcl1_plc_fur_overview_ctf2_furnace_temp_pv | /aygg_total/fcl1/plc_fur/overview/ctf2_furnace_temp_pv | /aygg_tracking/fcl1/process/tech/ctf/ctf2_furnace_temp_pv | sheet1!A763:E763 |
| FB | ctf3_furnace_temp_pv | fcl1_plc_fur_overview_ctf3_furnace_temp_pv | /aygg_total/fcl1/plc_fur/overview/ctf3_furnace_temp_pv | /aygg_tracking/fcl1/process/tech/ctf/ctf3_furnace_temp_pv | sheet1!A764:E764 |
| FC | ctf4_furnace_temp_pv | fcl1_plc_fur_overview_ctf4_furnace_temp_pv | /aygg_total/fcl1/plc_fur/overview/ctf4_furnace_temp_pv | /aygg_tracking/fcl1/process/tech/ctf/ctf4_furnace_temp_pv | sheet1!A765:E765 |
| FD | rjc1_cooling_fan_l1_sv | fcl1_plc_fur_overview_rjc1_cooling_fan_l1_sv | /aygg_total/fcl1/plc_fur/overview/rjc1_cooling_fan_l1_sv | — | — |
| FE | rjc2_cooling_fan_l1_sv | fcl1_plc_fur_overview_rjc2_cooling_fan_l1_sv | /aygg_total/fcl1/plc_fur/overview/rjc2_cooling_fan_l1_sv | — | — |
| FF | rjc3_cooling_fan_l1_sv | fcl1_plc_fur_overview_rjc3_cooling_fan_l1_sv | /aygg_total/fcl1/plc_fur/overview/rjc3_cooling_fan_l1_sv | — | — |
| FG | rjc4_cooling_fan_l1_sv | fcl1_plc_fur_overview_rjc4_cooling_fan_l1_sv | /aygg_total/fcl1/plc_fur/overview/rjc4_cooling_fan_l1_sv | — | — |
| FH | fjc1_cooling_fan_l1_sv | fcl1_plc_fur_overview_fjc1_cooling_fan_l1_sv | /aygg_total/fcl1/plc_fur/overview/fjc1_cooling_fan_l1_sv | — | — |
| FI | por1_tension_unit_value | fcl1_plc1_mese_tension_por1_tension_unit_value | /aygg_total/fcl1/plc1_mese/tension/por1_tension_unit_value | — | — |
| FI | por2_tension_unit_value | fcl1_plc1_mese_tension_por2_tension_unit_value | /aygg_total/fcl1/plc1_mese/tension/por2_tension_unit_value | — | — |
| FJ | entry_loop_tension_unit_value | fcl1_plc1_mese_tension_entry_loop_tension_unit_value | /aygg_total/fcl1/plc1_mese/tension/entry_loop_tension_unit_value | — | — |
| FK | acid_pickling_tension_unit_value | fcl1_plc2_mpsp_tension_acid_pickling_tension_unit_value | /aygg_total/fcl1/plc2_mpsp/tension/acid_pickling_tension_unit_value | — | — |
| FL | br3_br4_tension_unit_value | fcl1_plc2_mpsp_tension_br3_br4_tension_unit_value | /aygg_total/fcl1/plc2_mpsp/tension/br3_br4_tension_unit_value | — | — |
| FM | annealing_tension_unit_value | fcl1_plc2_mpsp_tension_annealing_tension_unit_value | /aygg_total/fcl1/plc2_mpsp/tension/annealing_tension_unit_value | — | — |
| FN | exit_loop_tension_unit_tension_value | fcl1_plc3_mxsx_tension_exit_loop_tension_unit_tension_value | /aygg_total/fcl1/plc3_mxsx/tension/exit_loop_tension_unit_tension_value | — | — |
| FO | tr1_tension_unit_value | fcl1_plc3_mxsx_tension_tr1_tension_unit_value | /aygg_total/fcl1/plc3_mxsx/tension/tr1_tension_unit_value | — | — |
| FO | tr2_tension_unit_tension_value | fcl1_plc3_mxsx_tension_tr2_tension_unit_tension_value | /aygg_total/fcl1/plc3_mxsx/tension/tr2_tension_unit_tension_value | — | — |

## 口径及待确认项

| 需求列 | 英文位号 | 匹配结论 | 说明 |
| --- | --- | --- | --- |
| A | startProdTime | 物料档字段 | F线生产开始时间；当前数字钢卷 prodTime 同样来自 startProdTime。日期显示按 Asia/Shanghai，接口时区需与服务部署核对。 |
| B | inMatNo / outMatNo | 物料档字段 | 热卷号需通过成品卷物料谱系回溯，不能把 FCL1.inMatNo 直接当作热卷号。 |
| C | outMatNo | 物料档字段 | 平整后热卷号需按平整/准备工序物料谱系确认，不能通过热卷号尾号推算。 |
| D | outMatThick | 物料档字段 | 表格厚度优先采用物料档出口厚度；现有 DcSpecWeightVO.thickness 同源。在线厚度另列候选。 |
| E | outMatNo | 物料档字段 | 建议界面以成品卷物料 ID+机组+重复生产次数定位；按业务成品判定选择 FCL1 或 CSL1。 |
| D | thickness | 厚度来源待确认 | 候选：铁损仪厚度；当前跟踪 thickness/thickness 绑定 iron_thickness。不能与独立测厚仪混为一项。 |
| D | thickness | 厚度来源待确认 | 候选：独立测厚仪；唯一键 thickness_thickness，总 cube 已有，当前跟踪未按此唯一键绑定。若选此来源，应先核对仪表与米数基准。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| F | iron_loss | 对应明确 | 原表 F4 要求取铁损仪曲线平均值。P1.7 测试条件须核对仪表配置；不能取最新瞬时值或将其等同于检验报告值。 |
| G | — | 检化验待集成 | 原表注明检化验；不以在线磁极化强度、电导率或密度替代。英文业务字段尚无证据，暂不命名。 |
| H | — | 检化验待集成 | 原表注明检化验；不以在线磁极化强度、电导率或密度替代。英文业务字段尚无证据，暂不命名。 |
| AZ | — | 检化验待集成 | 原表注明检化验；不以在线磁极化强度、电导率或密度替代。英文业务字段尚无证据，暂不命名。 |
| BA | — | 检化验待集成 | 原表注明检化验；不以在线磁极化强度、电导率或密度替代。英文业务字段尚无证据，暂不命名。 |
| BC | — | 检化验待集成 | 原表注明检化验；不以在线磁极化强度、电导率或密度替代。英文业务字段尚无证据，暂不命名。 |
| BD | — | 检化验待集成 | 原表注明检化验；不以在线磁极化强度、电导率或密度替代。英文业务字段尚无证据，暂不命名。 |
| BF | — | 检化验待集成 | 原表注明检化验；不以在线磁极化强度、电导率或密度替代。英文业务字段尚无证据，暂不命名。 |
| BG | — | 检化验待集成 | 原表注明检化验；不以在线磁极化强度、电导率或密度替代。英文业务字段尚无证据，暂不命名。 |
| I | nof1_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| I | nof2_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| I | nof3_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| I | nof4_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| I | nof5_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| I | nof6_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| I | nof7_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| I | nof8_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| K | rtf1_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| K | rtf2_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| M | rcf1_1z_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| M | rcf1_2z_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| M | rcf1_3z_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| O | sf1_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| O | sf2_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| O | sf3_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| O | sf4_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| O | sf5_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| O | sf6_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| Q | rcf2_1z_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| Q | rcf2_2z_furnace_temp_pv | 出口炉温分区待确认 | 列标题为出口炉温，采集表按分区提供；列出全部候选，需确认出口对应区或展示各区，不能默认求平均。 |
| T | rcf1_1z_fan_power_pv | 开口度口径待确认 | 源名为功率，源单位有℃或%；需求为开口度%。需核对 HMI/量程，不能直接认定百分比开度。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| U | rcf1_2z_fan_power_pv | 开口度口径待确认 | 源名为功率，源单位有℃或%；需求为开口度%。需核对 HMI/量程，不能直接认定百分比开度。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| V | rcf1_3z_fan_power_pv | 开口度口径待确认 | 源名为功率，源单位有℃或%；需求为开口度%。需核对 HMI/量程，不能直接认定百分比开度。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| W | rcf2_1z_fan_power_pv | 开口度口径待确认 | 源名为功率，源单位有℃或%；需求为开口度%。需核对 HMI/量程，不能直接认定百分比开度。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| X | rcf2_2z_fan_power_pv | 开口度口径待确认 | 源名为功率，源单位有℃或%；需求为开口度%。需核对 HMI/量程，不能直接认定百分比开度。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| Y | ajc_fan_speed | 开口度口径待确认 | 原表 Y4 备注为 CP水套冷却MV；采集名为 AJC风机开度。需确认确为同一 HMI 对象及百分比量程。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| Z | cool1_air_pressure | 分组对应待确认 | 需求组号3~10、11~16、16~22按气雾冷却1/2/3段推定；原表16组重叠，组号边界需确认。气压1/2/3段共用 DB10001.DBD3972。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AA | cool1_water_pressure | 分组对应待确认 | 需求组号3~10、11~16、16~22按气雾冷却1/2/3段推定；原表16组重叠，组号边界需确认。气压1/2/3段共用 DB10001.DBD3972。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AB | cool1_flow | 分组对应待确认 | 需求组号3~10、11~16、16~22按气雾冷却1/2/3段推定；原表16组重叠，组号边界需确认。气压1/2/3段共用 DB10001.DBD3972。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AC | cool2_air_pressure | 分组对应待确认 | 需求组号3~10、11~16、16~22按气雾冷却1/2/3段推定；原表16组重叠，组号边界需确认。气压1/2/3段共用 DB10001.DBD3972。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AD | cool2_water_pressure | 分组对应待确认 | 需求组号3~10、11~16、16~22按气雾冷却1/2/3段推定；原表16组重叠，组号边界需确认。气压1/2/3段共用 DB10001.DBD3972。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AE | cool2_flow | 分组对应待确认 | 需求组号3~10、11~16、16~22按气雾冷却1/2/3段推定；原表16组重叠，组号边界需确认。气压1/2/3段共用 DB10001.DBD3972。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AF | cool3_air_pressure | 分组对应待确认 | 需求组号3~10、11~16、16~22按气雾冷却1/2/3段推定；原表16组重叠，组号边界需确认。气压1/2/3段共用 DB10001.DBD3972。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AG | cool3_water_pressure | 分组对应待确认 | 需求组号3~10、11~16、16~22按气雾冷却1/2/3段推定；原表16组重叠，组号边界需确认。气压1/2/3段共用 DB10001.DBD3972。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AH | cool3_flow | 分组对应待确认 | 需求组号3~10、11~16、16~22按气雾冷却1/2/3段推定；原表16组重叠，组号边界需确认。气压1/2/3段共用 DB10001.DBD3972。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AJ | wsc1_section1_water_pressure | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AK | wsc1_section1_flow | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AM | wsc1_section2_water_pressure | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AN | wsc1_section2_flow | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AO | water_jacket_air_pressure | 原表存在但总 cube 未收录 | 原始表有 water_jacket_air_pressure，但 DB 地址为空，总 cube 未收录；不能视为已采集。 |
| AP | water_jacket_water_pressure | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AQ | water_jacket_flow | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AT | wsc2_section1_water_pressure | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AU | wsc2_section1_flow | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AW | wsc2_section2_water_pressure | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AX | wsc2_section2_flow | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AR | water_jacket_plate_temp | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| AY | acid_loop1_graphite_hex1_outlet_pipe_temp_a | 对应明确，含共享设备归属 | 按原表 AY4 注释保留五个换热器温度。2#/3#共用的中间换热器需根据泵状态归属，不能仅凭采集名称固定归到2#。 |
| AY | acid_loop1_graphite_hex2_outlet_pipe_temp_b | 对应明确，含共享设备归属 | 按原表 AY4 注释保留五个换热器温度。2#/3#共用的中间换热器需根据泵状态归属，不能仅凭采集名称固定归到2#。 |
| BB | acid_loop2_graphite_hex1_outlet_pipe_temp_a | 对应明确，含共享设备归属 | 按原表 AY4 注释保留五个换热器温度。2#/3#共用的中间换热器需根据泵状态归属，不能仅凭采集名称固定归到2#。 |
| BB | acid_loop2_graphite_hex2_outlet_pipe_temp_b | 对应明确，含共享设备归属 | 按原表 AY4 注释保留五个换热器温度。2#/3#共用的中间换热器需根据泵状态归属，不能仅凭采集名称固定归到2#。 |
| BE | acid_loop3_graphite_hex_outlet_pipe_temp | 对应明确，含共享设备归属 | 按原表 AY4 注释保留五个换热器温度。2#/3#共用的中间换热器需根据泵状态归属，不能仅凭采集名称固定归到2#。 |
| AY | rinse_condensate_water_temp | 对应明确 | 原表 AY5：1#/2#/3#漂洗水温共用冷凝水罐温度。与 condensate_water_temp 同地址 DB160.DBD24，选现有跟踪唯一键即可。 |
| BB | rinse_condensate_water_temp | 对应明确 | 原表 AY5：1#/2#/3#漂洗水温共用冷凝水罐温度。与 condensate_water_temp 同地址 DB160.DBD24，选现有跟踪唯一键即可。 |
| BE | rinse_condensate_water_temp | 对应明确 | 原表 AY5：1#/2#/3#漂洗水温共用冷凝水罐温度。与 condensate_water_temp 同地址 DB160.DBD24，选现有跟踪唯一键即可。 |
| BR | sjc_control_cooling_fan5_l1_sv | 开口度口径待确认 | 候选为一级设定，另有同名 l2_sv。原表要求开口度，需核对控制模式、百分比量程；风机速度不能自动视作阀门开度。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| BS | rjc_cooling_fan1_l1_sv | 开口度口径待确认 | 需求单列RJC，对应4台风机；列出一级设定候选，另有l2_sv，需确认展示对象和有效控制模式。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| BS | rjc_cooling_fan2_l1_sv | 开口度口径待确认 | 需求单列RJC，对应4台风机；列出一级设定候选，另有l2_sv，需确认展示对象和有效控制模式。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| BS | rjc_cooling_fan3_l1_sv | 开口度口径待确认 | 需求单列RJC，对应4台风机；列出一级设定候选，另有l2_sv，需确认展示对象和有效控制模式。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| BS | rjc_cooling_fan4_l1_sv | 开口度口径待确认 | 需求单列RJC，对应4台风机；列出一级设定候选，另有l2_sv，需确认展示对象和有效控制模式。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| BT | humidifier1_exit_pipe_temp_pv | 水温测点含义待确认 | 源名为加湿器出口管实际温度；需求名为水温。须确认测量介质，不能未经核对改成水槽温度。 |
| BU | mixer1_gas_flow | 对应明确 | 原表 BU4 指定使用混合器流量。源表未标单位，需求为m³/h，需核对标况与量程。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| BV | mixer1_h2_ratio | 对应明确 | 混合器H2占比；源表未标单位，核对0~1还是0~100后再显示%。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| BW | humidifier2_exit_pipe_temp_pv | 水温测点含义待确认 | 源名为加湿器出口管实际温度；需求名为水温。须确认测量介质，不能未经核对改成水槽温度。 |
| BX | mixer2_gas_flow | 对应明确 | 原表 BU4 指定使用混合器流量。源表未标单位，需求为m³/h，需核对标况与量程。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| BY | mixer2_h2_ratio | 对应明确 | 混合器H2占比；源表未标单位，核对0~1还是0~100后再显示%。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| BZ | humidifier3_exit_pipe_temp_pv | 水温测点含义待确认 | 源名为加湿器出口管实际温度；需求名为水温。须确认测量介质，不能未经核对改成水槽温度。 |
| CA | mixer3_gas_flow | 对应明确 | 原表 BU4 指定使用混合器流量。源表未标单位，需求为m³/h，需核对标况与量程。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CB | mixer3_h2_ratio | 对应明确 | 混合器H2占比；源表未标单位，核对0~1还是0~100后再显示%。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CC | humidifier4_exit_pipe_temp_pv | 水温测点含义待确认 | 源名为加湿器出口管实际温度；需求名为水温。须确认测量介质，不能未经核对改成水槽温度。 |
| CD | mixer4_gas_flow | 对应明确 | 原表 BU4 指定使用混合器流量。源表未标单位，需求为m³/h，需核对标况与量程。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CE | mixer4_h2_ratio | 对应明确 | 混合器H2占比；源表未标单位，核对0~1还是0~100后再显示%。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CF | humidifier5_exit_pipe_temp_pv | 水温测点含义待确认 | 源名为加湿器出口管实际温度；需求名为水温。须确认测量介质，不能未经核对改成水槽温度。 |
| CG | mixer5_gas_flow | 对应明确 | 原表 BU4 指定使用混合器流量。源表未标单位，需求为m³/h，需核对标况与量程。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CH | mixer5_h2_ratio | 对应明确 | 混合器H2占比；源表未标单位，核对0~1还是0~100后再显示%。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CI | humidifier6_exit_pipe_temp_pv | 水温测点含义待确认 | 源名为加湿器出口管实际温度；需求名为水温。须确认测量介质，不能未经核对改成水槽温度。 |
| CJ | mixer6_gas_flow | 对应明确 | 原表 BU4 指定使用混合器流量。源表未标单位，需求为m³/h，需核对标况与量程。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CK | mixer6_h2_ratio | 对应明确 | 混合器H2占比；源表未标单位，核对0~1还是0~100后再显示%。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CL | humidifier7_exit_pipe_temp_pv | 水温测点含义待确认 | 源名为加湿器出口管实际温度；需求名为水温。须确认测量介质，不能未经核对改成水槽温度。 |
| CM | mixer7_gas_flow | 对应明确 | 原表 BU4 指定使用混合器流量。源表未标单位，需求为m³/h，需核对标况与量程。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CN | mixer7_h2_ratio | 对应明确 | 混合器H2占比；源表未标单位，核对0~1还是0~100后再显示%。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CO | rtf2_partial_pressure_ratio | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CP | sf1_z3_partial_pressure_ratio | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CQ | sf1_z6_partial_pressure_ratio | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CR | sf1_z9_partial_pressure_ratio | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CS | sf1_z12_partial_pressure_ratio | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CT | sf1_z15_partial_pressure_ratio | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CU | sf2_z1_z2_partial_pressure_ratio | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CV | atc_z2_partial_pressure_ratio | 对应明确 |  建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| CW | — | 现场实测待录入 | 原表 CW4/CX4 标明现场实测数据，未找到4组/7组分支流量的逐支采集位号。总氨流量不能代替分支流量。 |
| CX | — | 现场实测待录入 | 原表 CW4/CX4 标明现场实测数据，未找到4组/7组分支流量的逐支采集位号。总氨流量不能代替分支流量。 |
| CY | nh3_flow_pv | 总流量边界待确认 | 炉区氨气实际流量候选；能源计量另有dcl1_nh3_main_flow，二者边界不同，需确认总量统计范围。 |
| CZ | coating_machine1_os_pressure_pv | 单位与涂层机选择待确认 | WS暂对照操作侧OS，DS为传动侧；采集为kN，需求为MPa，不能直接换单位。另有pressure_sv，需确认取实际/设定及使用1#/2#涂层机。 |
| CZ | coating_machine2_os_pressure_pv | 单位与涂层机选择待确认 | WS暂对照操作侧OS，DS为传动侧；采集为kN，需求为MPa，不能直接换单位。另有pressure_sv，需确认取实际/设定及使用1#/2#涂层机。 |
| DA | coating_machine1_ds_pressure_pv | 单位与涂层机选择待确认 | WS暂对照操作侧OS，DS为传动侧；采集为kN，需求为MPa，不能直接换单位。另有pressure_sv，需确认取实际/设定及使用1#/2#涂层机。 |
| DA | coating_machine2_ds_pressure_pv | 单位与涂层机选择待确认 | WS暂对照操作侧OS，DS为传动侧；采集为kN，需求为MPa，不能直接换单位。另有pressure_sv，需确认取实际/设定及使用1#/2#涂层机。 |
| DD | por1_tension_unit_tension | 对应明确 | 需求为N/mm²张力设定，优先单位张力值；开卷机按当次物料实际所在设备选1#/2#。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| DD | por2_tension_unit_tension | 对应明确 | 需求为N/mm²张力设定，优先单位张力值；开卷机按当次物料实际所在设备选1#/2#。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| DE | entry_loop_tension_unit_tension | 对应明确 | 需求为N/mm²张力设定，优先单位张力值；开卷机按当次物料实际所在设备选1#/2#。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| DF | pre_clean_tension_unit_tension | 对应明确 | 需求为N/mm²张力设定，优先单位张力值；开卷机按当次物料实际所在设备选1#/2#。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| DG | furnace_entry_tension_unit_tension | 对应明确 | 需求为N/mm²张力设定，优先单位张力值；开卷机按当次物料实际所在设备选1#/2#。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| DH | exit_loop_tension_unit_tension | 对应明确 | 需求为N/mm²张力设定，优先单位张力值；开卷机按当次物料实际所在设备选1#/2#。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| DI | tr1_tension_pv | 分段统计与单位换算 | 原表DI4要求卷到该阶段张力实际值；源为kN，N/mm²=张力(kN)×1000/[宽度(mm)×厚度(mm)]。卷心/卷中/卷尾必须定义长度或卷径窗口；不是三个独立点位。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| DI | tr2_tension_pv | 分段统计与单位换算 | 原表DI4要求卷到该阶段张力实际值；源为kN，N/mm²=张力(kN)×1000/[宽度(mm)×厚度(mm)]。卷心/卷中/卷尾必须定义长度或卷径窗口；不是三个独立点位。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| DJ | tr1_tension_pv | 分段统计与单位换算 | 原表DI4要求卷到该阶段张力实际值；源为kN，N/mm²=张力(kN)×1000/[宽度(mm)×厚度(mm)]。卷心/卷中/卷尾必须定义长度或卷径窗口；不是三个独立点位。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| DJ | tr2_tension_pv | 分段统计与单位换算 | 原表DI4要求卷到该阶段张力实际值；源为kN，N/mm²=张力(kN)×1000/[宽度(mm)×厚度(mm)]。卷心/卷中/卷尾必须定义长度或卷径窗口；不是三个独立点位。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| DK | tr1_tension_pv | 分段统计与单位换算 | 原表DI4要求卷到该阶段张力实际值；源为kN，N/mm²=张力(kN)×1000/[宽度(mm)×厚度(mm)]。卷心/卷中/卷尾必须定义长度或卷径窗口；不是三个独立点位。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| DK | tr2_tension_pv | 分段统计与单位换算 | 原表DI4要求卷到该阶段张力实际值；源为kN，N/mm²=张力(kN)×1000/[宽度(mm)×厚度(mm)]。卷心/卷中/卷尾必须定义长度或卷径窗口；不是三个独立点位。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| DL | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| DM | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| DN | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| DO | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| DP | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| DQ | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| DR | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| DS | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| DT | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| DU | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| DV | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| DW | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| DX | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| DY | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| DZ | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EA | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EB | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EC | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| ED | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EE | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EF | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EG | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EH | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EI | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EJ | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EK | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EL | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EM | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EN | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EO | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EP | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| EQ | — | 罩式炉阶段数据暂缓 | 按用户范围暂不配置。方案温度/速率/时长走二级→三级物料档；保护气和炉压需按实际炉台、南北侧及工艺阶段切片求均值；露点原表注明手工测量。现有PLC当前生产阶段不代表这些温度阶段已可直接区分。 |
| FD | rjc1_cooling_fan_l1_sv | 开口度口径待确认 | 一级设定候选，另有l2_sv及mode（true为一级）；需确认开口度含义与百分比量程。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| FE | rjc2_cooling_fan_l1_sv | 开口度口径待确认 | 一级设定候选，另有l2_sv及mode（true为一级）；需确认开口度含义与百分比量程。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| FF | rjc3_cooling_fan_l1_sv | 开口度口径待确认 | 一级设定候选，另有l2_sv及mode（true为一级）；需确认开口度含义与百分比量程。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| FG | rjc4_cooling_fan_l1_sv | 开口度口径待确认 | 一级设定候选，另有l2_sv及mode（true为一级）；需确认开口度含义与百分比量程。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| FH | fjc1_cooling_fan_l1_sv | 开口度口径待确认 | 一级设定候选，另有l2_sv及mode（true为一级）；需确认开口度含义与百分比量程。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| FI | por1_tension_unit_value | 设定或实测口径待确认 | 候选为单位张力设定N/mm²；若要求实际控制值，应由tension_pv(kN)按断面积换算，不能将设定值当实测值。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| FI | por2_tension_unit_value | 设定或实测口径待确认 | 候选为单位张力设定N/mm²；若要求实际控制值，应由tension_pv(kN)按断面积换算，不能将设定值当实测值。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| FJ | entry_loop_tension_unit_value | 设定或实测口径待确认 | 候选为单位张力设定N/mm²；若要求实际控制值，应由tension_pv(kN)按断面积换算，不能将设定值当实测值。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| FK | acid_pickling_tension_unit_value | 设定或实测口径待确认 | 候选为单位张力设定N/mm²；若要求实际控制值，应由tension_pv(kN)按断面积换算，不能将设定值当实测值。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| FL | br3_br4_tension_unit_value | 设定或实测口径待确认 | 候选为单位张力设定N/mm²；若要求实际控制值，应由tension_pv(kN)按断面积换算，不能将设定值当实测值。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| FM | annealing_tension_unit_value | 设定或实测口径待确认 | 候选为单位张力设定N/mm²；若要求实际控制值，应由tension_pv(kN)按断面积换算，不能将设定值当实测值。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| FN | exit_loop_tension_unit_tension_value | 设定或实测口径待确认 | 候选为单位张力设定N/mm²；若要求实际控制值，应由tension_pv(kN)按断面积换算，不能将设定值当实测值。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| FO | tr1_tension_unit_value | 设定或实测口径待确认 | 候选为单位张力设定N/mm²；若要求实际控制值，应由tension_pv(kN)按断面积换算，不能将设定值当实测值。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
| FO | tr2_tension_unit_tension_value | 设定或实测口径待确认 | 候选为单位张力设定N/mm²；若要求实际控制值，应由tension_pv(kN)按断面积换算，不能将设定值当实测值。 建议路径仅供配置讨论，段名及长度补偿须复用相邻设备并现场标定，不能直接导入即认为跟踪有效。 |
