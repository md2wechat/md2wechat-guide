# 主题发现与选择

主题目录会随版本变化。运行 discovery 命令获取当前可选项：

```bash
md2wechat themes list --json
md2wechat themes show default --json
```

核验基线：`v3.1.0`，2026-07-14。当前发现结果包含 53 个目录条目和 52 个可选主题；可选项中有 48 个 API 主题、4 个 AI 主题。

## API 模式主题

常用主题示例：

| 主题 | 适合先测试的内容 |
|---|---|
| `default` | 基线兼容性 |
| `minimal-blue` | 简洁教程和说明文 |
| `focus-navy` | 重点明确的长文 |
| `elegant-gold` | 人文、品牌和评论内容 |
| `bold-red` | 发布、活动和强信息层级 |
| `github-readme` | 技术文章 |
| `wechat-native` | 接近公众号原生阅读习惯的内容 |

使用前查看真实详情：

```bash
md2wechat themes show elegant-gold --json
```

预览和转换：

```bash
md2wechat preview article.md --mode api --theme elegant-gold -o article.preview.html
md2wechat convert article.md --mode api --theme elegant-gold -o article.html --json
```

API 模式需要 `MD2WECHAT_API_KEY`。

## AI 模式主题

当前可选项：

- `autumn-warm`
- `spring-fresh`
- `ocean-calm`
- `custom`

示例：

```bash
md2wechat convert article.md --mode ai --theme autumn-warm --json
```

`custom` 主题需要配合 `--custom-prompt`。AI 模式返回的内容需要按宿主 Agent 的协议处理，执行前读取：

```bash
md2wechat skills read md2wechat --json
```

## 选择方法

1. 先用 `default` 验证内容和图片。
2. 通过 `themes list` 找到当前可选主题。
3. 用 `themes show` 核对类型和说明。
4. 为目标主题生成本地预览。
5. 在手机宽度下检查标题、引用、代码、表格和图片。
6. 通过后再输出正式 HTML 或创建草稿。

## 字号与背景

API 模式支持：

```bash
md2wechat preview article.md \
  --theme minimal-blue \
  --font-size medium \
  --background-type none \
  -o article.preview.html
```

字号可选 `small`、`medium`、`large`；背景可选 `default`、`grid`、`none`。

## 常见错误

### 主题不存在

```bash
md2wechat themes list --json
```

从输出复制主题 `name`，不要根据系列名称自行拼接。

### 模式和主题不匹配

先运行：

```bash
md2wechat themes show THEME_NAME --json
```

按输出中的主题类型选择 `--mode api` 或 `--mode ai`。
