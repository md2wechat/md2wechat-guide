# 让办公 Agent 使用 md2wechat

千问办公、DuMate、WorkBuddy、豆包工作，以及其他办公 Agent，都可以走同一条本机 CLI 路径。前提是 Agent 能在你的电脑上执行终端命令：在这个环境安装 md2wechat，再把操作手册和任务交给 Agent 即可。使用这条路径无需先安装平台专用 Skill 包。

## 1. 把这段安装提示词发给 Agent

复制下面整段，发送到你正在使用的办公 Agent：

```text
帮我在当前电脑安装 md2wechat，执行：

npm install -g @geekjourneyx/md2wechat

如果没有初始化配置，请执行：

md2wechat config init

已有配置请保留。如果当前环境没有 npm，请先帮我完成 Node.js / npm 的安装。

安装完成后，执行以下命令，确认版本并读取当前操作说明：

md2wechat version --json
md2wechat skills read md2wechat --json

给 Agent 的操作手册：
https://www.md2wechat.cn/docs/md2wechat/skill

md2wechat CLI 使用手册：
https://www.md2wechat.cn/docs/md2wechat

网页版文档：
https://www.md2wechat.cn/docs

告诉我安装结果，以及开始排版前还需要配置什么。
```

如果 Agent 的命令运行在远程环境或独立沙箱中，需要在它实际执行命令的环境安装。其他安装方式见[安装教程](02-installation.md)。

初始化会生成配置，高级排版还需配置有效的 md2wechat API Key；安装完成不等于已经开通 API。配置步骤见[首次使用](01-quick-start.md)。

## 2. 把文章和排版要求交给 Agent

先看[高级排版模块与真实样例](https://www.md2wechat.cn/features)，挑选适合文章内容的表达方式，再把文章和下面这段要求一起发给 Agent：

```text
请用 md2wechat 为我提供的文章排版。

先读取当前安装版本的操作说明，并参考高级排版样例：
https://www.md2wechat.cn/features

保留原文的观点、事实和引用，按内容需要选择主题和高级排版模块。
请将排版稿另存为新文件，生成预览供我查看，并告诉我保存位置。
如果缺少 API Key 或其他必要配置，先指导我在本机完成配置。
本次只做排版和预览，不上传图片、不创建草稿、不公开发布。
```

更多说明：

- [高级排版教程](04-advanced-typesetting.md)：主题、模块和字段的使用步骤。
- [高级排版公众号教程](https://mp.weixin.qq.com/s/im5k-SXcoHMA6Kewtnm4Fw)：阅读图文讲解。
- [CLI 使用手册](https://www.md2wechat.cn/docs/md2wechat)：查看完整命令与配置。

## 3. Agent 按当前任务读取能力

当前安装版本内置的说明由 `md2wechat skills read md2wechat --json` 读取。网页版手册用于查阅，实际命令和字段以当前 CLI 返回结果为准。

选择主题时查询主题，使用模块时查询对应模块，不必在每次任务开始时枚举所有能力：

```bash
md2wechat capabilities --json
md2wechat themes list --json
md2wechat themes show default --json
md2wechat layout list --json
md2wechat layout show hero --json
```

检查环境和文章：

```bash
md2wechat doctor --json
md2wechat inspect article.md --json
```

Agent 根据检查结果补齐当前任务所需配置。加入模块后的排版稿另存为新文件，再验证并预览：

```bash
md2wechat layout validate --file article.formatted.md --json
md2wechat preview article.formatted.md --theme default -o article.preview.html
```

API 预览成功后才写出 HTML；AI 模式要求后续处理或执行失败时，不应把结果当作已经完成的预览。转换接口只完成排版，不创建微信草稿。

## 4. 需要定向产品写作时

从 v3.7.0 起，可以把产品资料和目标读者交给 Agent，让它按百科式或平台表达撰写新稿。先确认当前安装版本包含内置指引：

```bash
md2wechat version --json
md2wechat skills read md2wechat references/writing/workflow.md --json
```

只排版时保持原文，不自动改写；要求定向写作时，先核对来源、事实和缺失材料。指定 ChatGPT、豆包等目标不等于调用这些模型或获得专属排序规则，也不保证收录、引用或转化。百科词条只准备草稿，不自动提交。完整范围见[上游写作指南](https://github.com/geekjourneyx/md2wechat-skill/blob/v3.7.0/docs/WRITING.md)。

## 5. 需要图片或草稿时，再说明具体任务

图片任务见[图片教程](05-ai-image.md)。公众号草稿任务见[发布教程](10-publishing.md)，知乎、CSDN、头条、腾讯云开发者社区草稿任务见[多平台教程](11-multi-platform.md)。上传、生成图片和保存草稿按你明确提出的任务执行；保存草稿不等于公开发布。

维护者记录的各平台实测进度见 [Wiki 平台证据](https://github.com/md2wechat/md2wechat-wiki/blob/23027229c258e0d67c81b86da0211f14f851065c/evidence/agent-platforms.json)。这些记录说明已做过哪些验证，不是使用上述本机 CLI 路径的安装步骤。
