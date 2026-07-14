# API 接入

公开稳定转换接口：`POST https://www.md2wechat.cn/api/convert`。

核验来源：[md2wechat API 文档](https://www.md2wechat.cn/api-docs)，2026-07-14。接口、鉴权和价格发生变化时，以该页面为准。

## CLI 配置

```bash
export MD2WECHAT_API_KEY="your_key"
export MD2WECHAT_BASE_URL="https://www.md2wechat.cn"

md2wechat config validate --json
md2wechat doctor --json
```

也可以写入 `~/.config/md2wechat/config.yaml`：

```yaml
api:
  md2wechat_key: "your_key"
  md2wechat_base_url: "https://www.md2wechat.cn"
```

不要把真实 Key 提交到 Git。

## CLI 转换

```bash
md2wechat themes list --json
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
  -H "Md2wechat-API-Key: YOUR_API_KEY" \
  -d '{
    "markdown": "# 标题\n\n这是一段正文。",
    "theme": "default",
    "fontSize": "medium",
    "backgroundType": "none"
  }'
```

请求前从 [主题画廊](https://www.md2wechat.cn/theme-gallery) 或 `themes list` 获取主题 ID。

## 请求字段

| 字段 | 必填 | 说明 |
|---|---|---|
| `markdown` | 是 | Markdown 文本 |
| `theme` | 否 | 主题 ID，默认 `default` |
| `fontSize` | 否 | `small`、`medium`、`large` |
| `backgroundType` | 否 | `default`、`grid`、`none` |

## 高级排版

接口接受当前渲染器支持的 `:::module` 语法。发送请求前在 CLI 中验证：

```bash
md2wechat layout validate --file article.md --json
```

保存生成后的 Markdown 需要用户明确授权。自动化流程可以在临时目录生成副本，再把副本交给 API。

## 错误定位

1. 先用 `theme: default` 和最小 Markdown 请求。
2. 检查 HTTP 状态码和响应错误码。
3. 运行 `md2wechat config validate --json`。
4. 运行 `md2wechat doctor --json`。
5. 检查 Key 是否放在 `Md2wechat-API-Key` 请求头。
6. 检查请求体字段大小写和 JSON 转义。

## CI 凭证

在 CI Secret 中保存 `MD2WECHAT_API_KEY`。日志只记录错误码、请求标识和脱敏环境信息，不输出请求头或完整未发布文章。
