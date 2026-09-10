# 常见问题

本页对应 md2wechat `v3.5.0`。

## 找不到命令或版本没更新

```bash
command -v md2wechat
md2wechat version --json
```

Windows 使用 `Get-Command md2wechat`。确认实际路径与安装方式一致，调整 `PATH` 后重新打开终端。

## 配置检查失败

```bash
md2wechat config show --json
md2wechat config validate --json
md2wechat doctor --json
```

环境变量的优先级高于配置文件，旧环境变量可能覆盖刚修改的配置。

## API 模式提示缺少 Key

设置 `MD2WECHAT_API_KEY` 或配置项 `api.md2wechat_key`，再运行：

```bash
md2wechat doctor --json
md2wechat inspect article.md --json
```

不要在 Issue 中粘贴真实 Key。

## 主题不存在或模式不匹配

```bash
md2wechat themes list --json
md2wechat themes show THEME_NAME --json
```

从当前 CLI 输出复制主题名，并按详情中的类型选择 API 或 AI 模式。

## 高级排版无法验证

```bash
md2wechat layout show MODULE_NAME --json
md2wechat layout validate --file article.md --json
```

核对模块名、主要 `body_format`、必填字段、正文格式和三冒号边界。复杂模块可改用 `layout render` 生成。

## 怎么判断这篇文章能不能预览或发布

```bash
md2wechat inspect article.md --json
```

自动化流程读取 `data.readiness.targets` 找到目标状态，再用 `data.readiness.blockers` 定位缺少的配置、图片或封面。`doctor` 说明本机配置是否具备尝试条件；`inspect` 才针对当前文章和目标给出判断。

## 预览失败后输出文件怎样处理

API 转换成功后，`preview` 才写入转换器返回的最终 HTML。AI 模式返回 `PREVIEW_ACTION_REQUIRED`，API 失败时也不会新建或覆盖目标文件，因此可以保留上一次成功产物用于比较。

## 图片计划为什么没有图片

```bash
md2wechat generate_cover --article article.md --plan --json
```

`IMAGE_PLAN_READY` 表示 prompt 已准备好。宿主 Agent 还需调用自己的 Image Gen 工具并保存图片。这条计划路径不调用图片 Provider，也不写入微信素材库。

若改用不带 `--plan` 的 CLI 直接生成路径，还要配置图片 Provider 凭证和微信凭证。该路径会生成图片并上传到目标公众号的永久素材库，应先展示目标公众号和费用风险，取得明确确认后再执行。

## 创建草稿提示缺少封面

先检查目标：

```bash
md2wechat inspect article.md --draft --cover cover.jpg --strict --json
```

确认后执行：

```bash
md2wechat convert article.md --draft --cover cover.jpg --json
```

已有素材 ID 时可改用 `--cover-media-id MEDIA_ID`；两种封面参数不能同时使用。

## 微信提示 IP 不在白名单

确认运行机器的公网出口 IP，并加入微信公众平台白名单。动态网络或普通 CI 的出口可能变化。使用固定出口服务时，按服务方提供的完整 URL 配置 `wechat.proxy_url` 或 `WECHAT_PROXY_URL`，不要猜测地址和端口。

## 报告问题时提供什么

- `md2wechat version --json`
- 操作系统和安装方式
- 脱敏后的完整命令与错误码
- 可以公开的最小 Markdown 示例
- 已执行的检查命令

删除 AppID、AppSecret、API Key、Cookie、Token 和未发布正文后，再到 [Guide Issues](https://github.com/md2wechat/md2wechat-guide/issues) 提交。
