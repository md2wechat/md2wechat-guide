# 快速开始：生成第一份公众号 HTML

这条路径先生成可检查的本地 HTML，不上传素材，也不创建公众号草稿。

## 1. 安装并确认版本

```bash
npm install -g @geekjourneyx/md2wechat
md2wechat version --json
md2wechat capabilities --json
md2wechat skills read md2wechat --json
```

本指南对应 `v3.4.0`。`skills read` 读取当前二进制内置的操作说明，不需要下载远端 Skill 文件。

## 2. 检查配置

```bash
md2wechat config init
md2wechat config validate --json
md2wechat doctor --json
```

Convert API 需要 `MD2WECHAT_API_KEY`。凭证应放在环境变量或本地配置中，不要写进文章、日志或 Git 仓库。

## 3. 准备文章

新建 `article.md`：

```markdown
---
title: 第一次使用 md2wechat
author: 你的名字
digest: 从 Markdown 到公众号 HTML
---

# 第一次使用 md2wechat

这是一段正文。

- 先检查文章
- 再生成预览
```

## 4. 检查文章和目标状态

```bash
md2wechat inspect article.md --json
md2wechat advise article.md --json
md2wechat layout validate --file article.md --json
```

自动化流程应读取 `inspect` 返回的 `data.readiness.targets` 和 `data.readiness.blockers`，再决定是否继续预览、转换或发布。`advise` 只给建议，不改原文。

## 5. 选择主题并预览

```bash
md2wechat themes list --json
md2wechat themes show default --json
md2wechat preview article.md --theme default -o article.preview.html
```

打开 `article.preview.html`，重点检查手机宽度下的标题、段落、代码、表格和图片。`preview` 只有在 API 转换成功后才写入最终 HTML；失败或 AI handoff 不会新建、清空或覆盖输出文件。

## 6. 输出正式 HTML

```bash
md2wechat convert article.md --theme default -o article.html --json
```

这里只完成排版转换。Convert API 不上传素材，也不创建公众号草稿。需要发布时，再按[发布教程](10-publishing.md)检查账号、封面和权限。

## 交给 Agent 时

让 Agent 使用最少的任务相关发现命令，不必在启动时枚举所有主题、模块和图片预设。完整顺序见 [Agent 与 Skill](09-agent-skill.md)。
