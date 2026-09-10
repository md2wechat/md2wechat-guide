# 选择主题和样式

主题会随版本演进。先从当前安装的 CLI 查询，再查看候选主题的完整说明。

```bash
md2wechat themes list --json
md2wechat themes show default --json
```

`v3.5.0` 提供 48 个 API 主题。主题列表以命令输出为准，不要根据系列名称自行拼接主题 ID。

## 从默认主题开始

```bash
md2wechat preview article.md --mode api --theme default -o article.preview.html
```

确认基础内容正常后，再从 `themes list` 选择其他主题，并用 `themes show THEME_NAME --json` 核对类型、用途和可选状态：

```bash
md2wechat themes show elegant-gold --json
md2wechat preview article.md --mode api --theme elegant-gold -o article.preview.html
md2wechat convert article.md --mode api --theme elegant-gold -o article.html --json
```

API 模式需要 `MD2WECHAT_API_KEY`。

## AI 模式

同样先查询实际可选主题：

```bash
md2wechat themes list --json
md2wechat themes show autumn-warm --json
md2wechat convert article.md --mode ai --theme autumn-warm --json
```

AI 模式返回交给宿主 Agent 继续处理的内容。执行前可读取当前版本内置说明：

```bash
md2wechat skills read md2wechat --json
```

## 字号与背景

```bash
md2wechat preview article.md \
  --theme minimal-blue \
  --font-size medium \
  --background-type none \
  -o article.preview.html
```

字号可选 `small`、`medium`、`large`；背景可选 `default`、`grid`、`none`。

## 选择步骤

1. 用 `default` 检查内容和图片。
2. 用 `themes list` 找到当前版本的候选主题。
3. 用 `themes show` 查看候选主题详情。
4. 生成本地预览并检查手机阅读效果。
5. 确认后再输出正式 HTML；创建草稿另见[发布教程](10-publishing.md)。
