# 常见问题

核验版本：md2wechat `v3.1.0`，2026-07-14。

## 找不到 `md2wechat`

检查：

```bash
command -v md2wechat
```

若通过固定版本安装器安装：

```bash
export PATH="$HOME/.local/bin:$PATH"
md2wechat version --json
```

Windows 使用：

```powershell
Get-Command md2wechat
```

## 版本仍然很旧

```bash
command -v md2wechat
md2wechat version --json
```

确认 shell 调用路径与当前安装方式一致。升级后重新打开终端，再读取内置协议：

```bash
md2wechat skills read md2wechat --json
```

## 配置无法通过

```bash
md2wechat config show --json
md2wechat config validate --json
md2wechat doctor --json
```

配置优先级为环境变量、配置文件、默认值。旧环境变量可能覆盖已经修改的文件。

## API 模式提示缺少 Key

症状：`MISSING_API_KEY` 或 `MD2WECHAT_API_KEY is required`。

检查：

```bash
test -n "$MD2WECHAT_API_KEY" && echo configured
md2wechat doctor --json
```

设置 `MD2WECHAT_API_KEY`，或在配置文件中填写 `api.md2wechat_key`。不要在 Issue 中输出真实值。

## 主题不存在

```bash
md2wechat themes list --json
md2wechat themes show THEME_NAME --json
```

从 discovery 输出复制主题名。v2 文档中的部分名称已经移除，迁移表见 [v3 迁移](08-migration-v3.md)。

## 高级排版块无法渲染

```bash
md2wechat layout show MODULE_NAME --json
md2wechat layout validate --file article.md --json
```

重点检查：

- 模块名是否存在
- `body_format` 是否匹配
- 必填字段是否齐全
- JSON、rows、fields 等格式是否混用
- 开始和结束标记是否都是三冒号

## `--draft` 提示缺少封面

草稿必须提供本地封面或现有素材 ID：

```bash
md2wechat convert article.md --draft --cover cover.jpg --json
```

或：

```bash
md2wechat convert article.md --draft --cover-media-id MEDIA_ID --json
```

## 微信凭证缺失

症状：`WECHAT_APPID is required`、`WECHAT_SECRET is required`。

检查：

```bash
md2wechat doctor --json
md2wechat config wechat-accounts --json
```

配置 `WECHAT_APPID` 与 `WECHAT_SECRET`，或使用配置文件中的 `wechat` 字段。日志和 Issue 必须脱敏。

## 多公众号账号无法执行副作用

```bash
md2wechat config wechat-accounts --json
md2wechat inspect article.md --draft --cover cover.jpg --wechat-account ACCOUNT --strict --json
```

命名账号执行上传或草稿操作时需要有效的 `MD2WECHAT_API_KEY`。先确认账号名和默认账号解析结果。

## 微信提示 IP 不在白名单

先确认运行机器的公网出口 IP，并把它加入微信后台白名单。家庭网络、动态云环境和普通 CI 的出口可能变化。

已开通固定出口服务时，使用服务方提供的完整 URL：

```yaml
wechat:
  proxy_url: "https://wechat-egress-url-provided-by-service.example"
```

也可以临时设置：

```bash
export WECHAT_PROXY_URL="https://wechat-egress-url-provided-by-service.example"
```

该配置只影响微信上传、草稿和图片消息等副作用。启用后需要有效的 `MD2WECHAT_API_KEY`。微信后台白名单填写服务方提供的出口 IP，不自行猜测代理端口或地址。

## 图片计划没有生成图片

`--plan --json` 返回 `IMAGE_PLAN_READY`，输出供宿主 Agent 使用。宿主 Agent 仍需调用自己的 Image Gen 工具并保存文件。

```bash
md2wechat generate_cover --article article.md --plan --json
```

## 直接图片生成失败

```bash
md2wechat providers list --json
md2wechat prompts list --json
md2wechat doctor --json
```

检查 Provider、模型和 `IMAGE_API_KEY`。直接模式会调用外部服务，可能产生费用。

## 如何只检查，不创建草稿

```bash
md2wechat inspect article.md --json
md2wechat advise article.md --json
md2wechat layout validate --file article.md --json
md2wechat preview article.md -o article.preview.html
```

这些命令不创建微信草稿。`doctor` 也不调用远程 API。

## 如何报告问题

在 [Guide Issues](https://github.com/md2wechat/md2wechat-guide/issues) 提供：

- `md2wechat version --json`
- 操作系统和安装方式
- 脱敏命令与错误码
- 可以公开的最小 Markdown 示例
- 已执行的检查命令

删除 AppID、AppSecret、API Key、Cookie、Token 和未发布正文。
