# 让 Agent 使用 md2wechat

这条流程适用于能够运行本地命令的 Agent。不同宿主的安装入口和权限可能不同，先确认宿主能安装 Skill、调用 CLI，并能把输出文件交还给你。

## 1. 安装并读取当前协议

先按[安装教程](02-installation.md)安装 CLI，再运行：

```bash
md2wechat version --json
md2wechat skills read md2wechat --json
```

`skills read` 返回当前二进制内置的操作说明。不要让 Agent 下载远端旧副本。

## 2. 只查询当前任务需要的能力

```bash
md2wechat capabilities --json
# 选择主题时
md2wechat themes list --json
md2wechat themes show default --json
# 使用高级排版时
md2wechat layout list --json
md2wechat layout show hero --json
```

无需在每次任务开始时枚举所有主题、模块、Provider 和提示词。

## 3. 检查环境和文章

```bash
md2wechat doctor --json
md2wechat inspect article.md --json
```

Agent 应使用 `inspect` 的 `data.readiness.targets` 和 `data.readiness.blockers` 判断目标是否可以继续，不能只根据命令退出码猜测发布条件。

## 4. 生成临时排版稿

让 Agent 保持原文只读，把加入排版模块后的内容写进临时文件，例如 `article.formatted.md`。复杂模块先用 `layout render` 生成，再验证：

```bash
md2wechat layout validate --file article.formatted.md --json
```

把排版稿保存到原文附近前，应先询问用户。

## 5. 预览或转换

```bash
md2wechat preview article.formatted.md --theme default -o article.preview.html
md2wechat convert article.formatted.md --theme default -o article.html --json
```

API 预览成功后才写最终 HTML；AI handoff 或失败不会创建或覆盖输出。Convert API 只完成排版，不创建微信草稿。

## 6. 需要发布时再次确认

上传和创建草稿是另一条流程。Agent 必须先展示目标账号、封面、摘要和检查结果，取得明确确认后才能运行带 `--upload` 或 `--draft` 的命令。详情见[发布教程](10-publishing.md)。

千问办公、DuMate、WorkBuddy 和豆包工作的接入验证进展，以 [Wiki 平台证据](https://github.com/md2wechat/md2wechat-wiki/tree/main/evidence) 为准；本指南不把安装入口等同于已经验证可用。
