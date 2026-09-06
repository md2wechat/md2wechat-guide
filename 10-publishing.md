# 发布到微信公众号

发布流程会连接微信接口。先生成并检查 HTML，再单独确认公众号账号和草稿动作。

## 两类凭证

| 凭证 | 用途 |
|---|---|
| `MD2WECHAT_API_KEY` | 调用 md2wechat 的转换或专业服务能力 |
| `WECHAT_APPID` / `WECHAT_SECRET` | 访问指定微信公众号的素材与草稿接口 |

两类凭证不能互相替代。多账号场景还应明确 `--wechat-account`，避免把内容写入错误账号。

## 发布前检查

确认以下信息：

- 文章标题、作者和摘要准确；
- 本地封面存在，或已有正确的封面素材 ID；
- 目标公众号和账号选择明确；
- 运行环境的出口 IP 已加入微信白名单；
- 正文中的本地图片可读；
- `inspect` 没有列出会阻止创建草稿的问题。

运行检查：

```bash
md2wechat doctor --json
md2wechat config wechat-accounts --json
md2wechat inspect article.md \
  --draft \
  --cover cover.jpg \
  --wechat-account ACCOUNT \
  --strict \
  --json
```

自动化流程应读取 `data.readiness.targets` 中的草稿状态和对应 `data.readiness.blockers`。检查和最终创建草稿必须使用同一个 `--wechat-account` 值。

## 明确确认后创建草稿

在执行前向用户展示解析后的账号标识和 AppID（不要展示 Secret）、标题、摘要、封面以及即将发生的动作，并取得类似“确认在该公众号创建草稿”的明确回复。然后使用刚才检查过的同一账号运行：

```bash
md2wechat convert article.md \
  --draft \
  --cover cover.jpg \
  --wechat-account ACCOUNT \
  --json
```

已有微信封面素材 ID 时使用 `--cover-media-id MEDIA_ID`，不要同时传入 `--cover`。

创建草稿只是把内容写入公众号草稿箱，不等于发送或群发。后续发布仍应在微信公众平台中检查并确认。

## API 边界

- [Convert API](https://www.md2wechat.cn/api/convert) 只把 Markdown 转成 HTML，不上传素材，也不创建草稿。
- [Publishing API](https://md2wechat.com/api/v1) 可以上传媒体并创建草稿，调用前应按其鉴权文档完成授权。
- CLI 的 `convert --draft` 会触发创建草稿动作，因此必须放在确认之后。

凭证不要出现在文章、命令历史截图、日志或 Issue 中。若微信返回白名单错误，请核对实际公网出口 IP；不要自行猜测代理地址。
