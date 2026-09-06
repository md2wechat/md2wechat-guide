# 接入 Convert API

Convert API 把 Markdown 转成公众号 HTML。稳定接口是：

```text
POST https://www.md2wechat.cn/api/convert
```

它不上传微信素材，也不创建公众号草稿。需要发布能力时，请使用 [Publishing API](https://md2wechat.com/api/v1) 或 CLI 的发布流程，并单独完成授权与账号检查。

## CLI 配置

```bash
export MD2WECHAT_API_KEY="your_key"
export MD2WECHAT_BASE_URL="https://www.md2wechat.cn"
md2wechat config validate --json
md2wechat doctor --json
```

不要把真实 Key 提交到 Git。

## CLI 转换

```bash
md2wechat themes list --json
md2wechat themes show default --json
md2wechat layout validate --file article.md --json
md2wechat convert article.md \
  --mode api \
  --theme default \
  --font-size medium \
  --background-type none \
  -o article.html \
  --json
```

## HTTP 请求

```bash
curl -X POST "https://www.md2wechat.cn/api/convert" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "markdown": "# 标题\n\n这是一段正文。",
    "theme": "default",
    "fontSize": "medium",
    "backgroundType": "none"
  }'
```

主题 ID 可从 [主题画廊](https://www.md2wechat.cn/theme-gallery) 或 `themes list --json` 获取。

## 常用字段

| 字段 | 必填 | 说明 |
|---|---|---|
| `markdown` | 是 | Markdown 文本 |
| `theme` | 否 | 主题 ID，默认 `default` |
| `fontSize` | 否 | `small`、`medium`、`large` |
| `backgroundType` | 否 | `default`、`grid`、`none` |

## 出错时

先用 `default` 和最小 Markdown 重试，再检查 HTTP 状态码、错误码、Key 请求头以及 JSON 字段大小写。接口与鉴权详情见 [API 文档](https://www.md2wechat.cn/api-docs)。
