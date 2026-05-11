# md2wechat 快速上手 — 5 分钟跑通主流程

> **目标**：完成安装 → 配置微信凭证 → 转换并推送第一篇草稿。  
> **前置条件**：macOS / Linux / Windows，无需编程背景，会用命令行即可。

→ 回到 [指南目录](./README.md)

---

## 第一步：安装 md2wechat

**macOS（推荐）：**

```bash
brew install geekjourneyx/tap/md2wechat
```

**npm（跨平台，已有 Node 环境）：**

```bash
npm install -g @geekjourneyx/md2wechat
```

**验证安装成功：**

```bash
md2wechat version --json
```

Expected output: `{"version":"2.2.0", ...}`

> 其他安装方式（install.sh / Go / 二进制）见 [安装指南](./02-installation.md)

---

## 第二步：配置微信凭证（只需一次）

```bash
md2wechat config init
```

该命令在 `~/.config/md2wechat/config.yaml` 创建配置文件。  
打开文件，填入以下字段：

```yaml
wechat:
  appid: "wx_your_appid_here"
  secret: "your_secret_here"
```

**AppID / Secret 获取步骤：**

1. 登录 [微信公众平台](https://mp.weixin.qq.com) → 「设置与开发」→「基本配置」
2. 复制 `AppID（应用ID）` 和 `AppSecret`
3. 同页面配置 **IP 白名单**（必须）——添加你本机或服务器的公网 IP

> AppSecret 只显示一次，请立即复制保存。  
> IP 白名单配置详见 [微信凭证指南](https://github.com/geekjourneyx/md2wechat-skill/blob/main/docs/WECHAT-CREDENTIALS.md)

---

## 第三步：转换第一篇文章

准备一个 Markdown 文件，例如 `article.md`：

```markdown
# 我的第一篇公众号文章

这是用 md2wechat 排版的第一篇文章。

## 核心观点

AI 时代，写作工具应该越来越简单。
```

**预览（本地，不触发上传）：**

```bash
md2wechat preview article.md
```

浏览器会打开本地预览页面，确认排版效果。

**推送微信草稿箱：**

```bash
md2wechat convert article.md --draft
```

Expected: `✓ Draft created successfully`

登录公众号后台，在「草稿箱」中即可看到这篇文章。

---

## 全流程示例（4 步从想法到草稿箱）

```bash
# 1. AI 生成文章（需配置 AI key）
md2wechat write --style dan-koe

# 2. 去除 AI 痕迹
md2wechat humanize article.md

# 3. AI 生成封面图
md2wechat generate_cover --article article.md

# 4. 转换并推送草稿
md2wechat convert article.md --draft --cover cover.jpg
```

---

## 在 Claude Code / Codex 中使用

md2wechat 是 Agent-native 工具，可以直接用自然语言驱动：

```
"用 Dan Koe 风格写一篇关于 AI 时代独立开发者的文章，生成封面，推送到微信草稿箱"
```

Claude Code 会自动调用 CLI 完成全流程。  
→ 安装 Claude Code Skill 见 [主仓库](https://github.com/geekjourneyx/md2wechat-skill#coding-agent)

---

## 遇到问题？

- `command not found: md2wechat` → 见 [安装指南](./02-installation.md)
- `45002 内容超限` → 长文章拆分，或使用简洁主题
- 草稿推送失败 → 检查 IP 白名单配置
- 更多问题 → [常见问题](./07-faq.md)

---

→ 下一步：[主题与样式选择](./03-themes-and-styles.md) | [高级排版模块](./04-advanced-typesetting.md)

<div align="center">

[指南目录](./README.md) · [主工具](https://github.com/geekjourneyx/md2wechat-skill) · [反馈](https://github.com/md2wechat/md2wechat-guide/issues)

</div>
