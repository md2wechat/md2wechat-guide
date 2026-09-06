# 为文章准备 AI 图片

md2wechat 提供两条图片路径：CLI 直接调用已配置的图片服务，或者用 `--plan --json` 把图片计划交给当前 Agent 的 Image Gen 工具。

## 先查询当前能力

```bash
md2wechat providers list --json
md2wechat prompts list --kind image --json
md2wechat prompts show cover-default --kind image --json
```

图片服务、模型和预设会变化，请以发现命令的结果为准。

## 交给宿主 Agent 生成

```bash
md2wechat generate_cover \
  --article article.md \
  --preset cover-default \
  --aspect 21:9 \
  --plan \
  --json
```

返回 `IMAGE_PLAN_READY` 后，Agent 读取计划中的 prompt，调用宿主提供的 Image Gen，再把图片保存到本地。此时 md2wechat 没有调用图片服务，也没有上传图片。

信息图同样支持计划模式：

```bash
md2wechat generate_infographic \
  --article article.md \
  --aspect 3:4 \
  --plan \
  --json
```

## 由 CLI 直接生成

这条路径需要配置图片 Provider、模型和 `IMAGE_API_KEY`，调用可能产生费用：

```bash
md2wechat doctor --json
md2wechat providers list --json
md2wechat generate_cover --article article.md --preset cover-default --aspect 21:9 --json
```

## MiniMax 主体参考图

`v3.4.0` 增加了 MiniMax 的主体参考图能力。先查询目标 Provider 和模型是否声明支持，不要根据 Provider 名称推断：

```bash
md2wechat providers show minimax --json
```

只有发现结果表明所选模型支持主体参考图时，才使用公开可访问的 `http(s)` 人像 URL。具体参数和限制以命令输出及 `--help` 为准；本地路径或不支持的组合会在请求前失败。

## 放进文章或用于封面

正文图片使用标准 Markdown：

```markdown
![流程示意](./workflow.png)
```

本地封面准备好后，按[发布教程](10-publishing.md)先检查账号、白名单、摘要和目标草稿，再决定是否创建草稿。
