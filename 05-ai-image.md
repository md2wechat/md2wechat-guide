# 图片计划与生成

md2wechat v3 把图片流程分成两条路径：计划模式交给宿主 Agent 执行，直接模式调用配置的图片 Provider。

核验版本：`v3.1.0`，2026-07-14。

## 先发现能力

```bash
md2wechat providers list --json
md2wechat prompts list --json
md2wechat prompts show cover-default --json
md2wechat prompts show infographic-default --json
```

当前核验结果包含 6 个 Provider 和 32 个内置提示词。目录会变化，实际调用以 discovery 输出为准。

## 计划模式

计划模式不要求图片 Provider 或 `IMAGE_API_KEY`，不会上传图片。它返回 `IMAGE_PLAN_READY`，由宿主 Agent 调用自己的图片工具。

封面：

```bash
md2wechat generate_cover \
  --article article.md \
  --preset cover-default \
  --aspect 21:9 \
  --plan \
  --json
```

信息图：

```bash
md2wechat generate_infographic \
  --article article.md \
  --preset infographic-default \
  --aspect 3:4 \
  --plan \
  --json
```

宿主 Agent 应按以下顺序执行：

1. 读取计划 JSON。
2. 调用运行时提供的 Image Gen 工具。
3. 保存本地图片。
4. 将图片路径交还给后续预览或草稿命令。

## 直接生成模式

直接模式需要配置图片 Provider、模型和 `IMAGE_API_KEY`。命令会调用外部服务；根据配置还可能上传到微信。

```bash
md2wechat generate_cover \
  --article article.md \
  --preset cover-default \
  --aspect 21:9 \
  --json
```

通用图片：

```bash
md2wechat generate_image \
  "一张展示 Markdown 到公众号工作流的简洁示意图" \
  --aspect 16:9 \
  --json
```

执行前运行：

```bash
md2wechat doctor --json
md2wechat providers list --json
```

## 使用封面创建草稿

确认本地封面后：

```bash
md2wechat inspect article.md --draft --cover cover.jpg --strict --json
md2wechat convert article.md --draft --cover cover.jpg --json
```

`--cover` 接收已有图片路径。它不会自动生成封面。正文配图需要先生成文件，再使用标准 Markdown 图片语法引用。

## 正文图片

正文使用标准 Markdown 图片：

```markdown
![流程示意](./workflow.png)
```

需要上传并替换图片 URL 时，先确认微信凭证和目标账号，再执行：

```bash
md2wechat inspect article.md --upload --strict --json
md2wechat convert article.md --upload --json
```

## 安全检查

- 不把图片 API Key 写进提示词、文章或日志。
- 计划模式返回计划，不代表图片已经生成。
- 直接模式可能产生费用，执行前确认 Provider 和模型。
- 上传与建草稿会修改外部状态，必须取得用户授权。
- 生成图片后检查文字错误、人物、品牌标识、版权和画幅。
