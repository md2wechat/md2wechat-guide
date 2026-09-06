# 从早期 v3 版本迁移到 v3.4.0

本页把历史行为集中在一起，帮助你更新旧脚本。目标版本是 `v3.4.0`。

## 先确认当前命令

```bash
md2wechat version --json
md2wechat capabilities --json
md2wechat skills read md2wechat --json
```

不要从远端仓库复制旧 Skill；读取已安装二进制自带的操作说明，才能和实际命令保持一致。

## v3.2 到 v3.4 的变化

| 版本 | 变化 | 迁移影响 |
|---|---|---|
| v3.2.0 | `capabilities` 改为聚合信息，资源详情改由 `list`、`show`、`render` 分层返回；API 预览成功才写最终 HTML；AI 预览只返回交接动作 | Discovery JSON 的资源字段形状有破坏性变化；预览流程应检查状态，不能依赖回退页面 |
| v3.2.0 | `inspect` 的 `data.readiness.targets/blockers` 成为文章级目标判断入口 | 原有布尔字段仍保留，新 Agent 应迁移到 targets/blockers |
| v3.3.0 | 排版目录更新为 77 个推荐场景、56 个推荐语法名和 63 项渲染能力，并明确字段读取顺序 | 现有正确模块继续可用；新稿应重新查询 `layout show`，避免沿用猜测的字段或别名 |
| v3.4.0 | MiniMax 增加可发现的主体参考图能力 | 属于新增能力；先运行 `providers show minimax --json`，再根据所选模型的发现结果决定是否传入主体参考图 |

## 历史基线：v3.1.0

早期文档以 `v3.1.0` 为目标，当时曾记录 68 个推荐场景、53 个推荐语法名和 60 项渲染能力。它们只是历史数字，当前页面应使用 77、56、63。

旧文档还可能要求全量读取目录。现在按任务使用最少的发现命令：选择主题时运行 `themes list` 和 `themes show`，编写排版模块时运行 `layout list`、`layout show`，复杂模块再用 `layout render`。

## 旧命令替换

| 历史写法 | 当前写法 |
|---|---|
| `md2wechat config check` | `md2wechat config validate --json` |
| 依赖 README 猜能力 | `md2wechat capabilities --json` |
| 读取远端 Skill 副本 | `md2wechat skills read md2wechat --json` |
| 手工维护主题表 | `md2wechat themes list --json` |
| 手工复制模块字段 | `md2wechat layout show NAME --json` |

历史脚本中的 `convert --draft` 如果没有封面，需要改为：

```bash
md2wechat inspect article.md --draft --cover cover.jpg --strict --json
md2wechat convert article.md --draft --cover cover.jpg --json
```

## 完成迁移后的检查

```bash
md2wechat config validate --json
md2wechat doctor --json
md2wechat inspect article.md --json
md2wechat layout validate --file article.md --json
md2wechat preview article.md -o article.preview.html
```

确认预览后，再决定是否上传素材或创建草稿。
