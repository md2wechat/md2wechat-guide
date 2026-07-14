# 快速开始

目标：生成一份可检查的微信 HTML。创建公众号草稿属于可选步骤。

核验版本：md2wechat `v3.1.0`，2026-07-14。

## 1. 安装并确认版本

```bash
npm install -g @geekjourneyx/md2wechat
md2wechat version --json
md2wechat capabilities --json
md2wechat skills read md2wechat --json
```

`skills read` 读取所装二进制内置的 Agent 操作协议，不需要联网获取另一份 Skill 文件。

## 2. 初始化配置

```bash
md2wechat config init
md2wechat config show --json
md2wechat config validate --json
md2wechat doctor --json
```

默认配置路径：

```text
~/.config/md2wechat/config.yaml
```

API 模式需要 `MD2WECHAT_API_KEY` 或配置项 `api.md2wechat_key`。创建微信草稿还需要 `WECHAT_APPID` 和 `WECHAT_SECRET`，也可以写入配置文件。

不要把凭证写进文章、示例、Issue 或 Git 仓库。

## 3. 准备文章

创建 `article.md`：

```markdown
---
title: 第一次使用 md2wechat
author: 你的名字
digest: 从检查到预览的最短流程
---

# 第一次使用 md2wechat

这是一段正文。

## 要点

- 先检查
- 再预览
- 确认后转换
```

## 4. 检查文章

```bash
md2wechat inspect article.md --json
md2wechat advise article.md --json
md2wechat layout validate --file article.md --json
```

- `inspect` 返回解析后的标题、摘要和发布准备度。
- `advise` 给出确定性的改进建议，不修改文件。
- `layout validate` 检查高级排版块的字段和结构。

需要把检查错误用于 CI 时：

```bash
md2wechat inspect article.md --strict --json
```

发现 error 级问题时，`--strict` 使用退出码 2。

## 5. 选择主题并预览

```bash
md2wechat themes list --json
md2wechat themes show default --json
md2wechat preview article.md --theme default -o article.preview.html
```

打开 `article.preview.html`，检查标题、段落、代码、图片和手机宽度下的阅读效果。

## 6. 转换 HTML

```bash
md2wechat convert article.md --theme default -o article.html --json
```

需要让转换阶段只生成预览且不上传图片：

```bash
md2wechat convert article.md --preview --theme default --json
```

## 7. 可选：创建微信草稿

先准备本地封面 `cover.jpg`，再按草稿目标检查：

```bash
md2wechat inspect article.md --draft --cover cover.jpg --strict --json
```

确认目标账号和副作用后执行：

```bash
md2wechat convert article.md --draft --cover cover.jpg --json
```

已有微信封面素材 ID 时，可以使用：

```bash
md2wechat convert article.md --draft --cover-media-id MEDIA_ID --json
```

`--cover` 与 `--cover-media-id` 不能同时使用。

## 8. 可选：标题建议与 Brand Profile

生成可交给 AI 的标题建议请求：

```bash
md2wechat title suggest article.md \
  --target-reader "公众号创作者" \
  --count 8 \
  --hook-level 1 \
  --json
```

初始化供 Agent 读取的作者资料：

```bash
md2wechat brand init
md2wechat brand show
```

Brand Profile 位于 `~/.config/md2wechat/brand.md`。CLI 不解析其中内容，宿主 Agent 根据它理解语气、排版偏好和限制。

## Agent 调用顺序

```text
version → capabilities → skills read → doctor
→ inspect → advise → themes/layout discovery
→ layout validate → preview → convert
→ 用户确认后执行 upload 或 draft
```

Agent 不应在用户只要求排版、预览或检查时创建草稿。
