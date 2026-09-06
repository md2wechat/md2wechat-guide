# md2wechat Guide

把 Markdown 变成适合微信公众号阅读的 HTML，并在你明确确认后创建公众号草稿。这套指南按实际任务组织，第一次使用可以直接从“快速开始”走完整个预览流程。

## 你想完成什么

| 目标 | 从这里开始 |
|---|---|
| 安装并生成第一份 HTML | [快速开始](01-quick-start.md) |
| 选择主题或高级排版 | [主题与样式](03-themes-and-styles.md)、[高级排版](04-advanced-typesetting.md) |
| 让 Agent 调用 md2wechat | [Agent 与 Skill](09-agent-skill.md) |
| 接入 Markdown 转换接口 | [Convert API](06-api-guide.md) |
| 上传素材或创建公众号草稿 | [发布到微信公众号](10-publishing.md) |
| 排查安装、配置和预览问题 | [常见问题](07-faq.md) |

## 第一次预览

```bash
npm install -g @geekjourneyx/md2wechat
md2wechat version --json
md2wechat capabilities --json
md2wechat skills read md2wechat --json
md2wechat doctor --json
md2wechat inspect article.md --json
md2wechat themes list --json
md2wechat themes show default --json
md2wechat preview article.md --theme default -o article.preview.html
```

`preview` 只有在 API 转换成功后才写入最终 HTML。AI 模式需要宿主 Agent 接手，转换失败时也不会新建或覆盖输出文件。

## 全部指南

1. [快速开始](01-quick-start.md)
2. [安装与升级](02-installation.md)
3. [主题与样式](03-themes-and-styles.md)
4. [高级排版](04-advanced-typesetting.md)
5. [AI 图片](05-ai-image.md)
6. [Convert API](06-api-guide.md)
7. [常见问题](07-faq.md)
8. [从旧版迁移](08-migration-v3.md)
9. [Agent 与 Skill](09-agent-skill.md)
10. [发布到微信公众号](10-publishing.md)

## 当前版本与资料来源

本指南按 md2wechat `v3.4.0`（提交 `07fdea284e71ddaf5c6b5311238d7e9c2df3b8af`）编写。这个版本提供 48 个 API 主题、77 个推荐使用场景、56 个推荐排版语法名和 63 项渲染层语法能力；这些数字代表不同维度，不能相互替换。

命令细节以已安装版本的 `--help` 和发现命令为准。版本证据见 [v3.4.0 Release](https://github.com/geekjourneyx/md2wechat-skill/releases/tag/v3.4.0)，平台接入进度见 [Wiki 证据页](https://github.com/md2wechat/md2wechat-wiki/tree/main/evidence)。

发现错误时，请提交 [Issue](https://github.com/md2wechat/md2wechat-guide/issues)，附上版本、完整命令和脱敏后的错误信息。
