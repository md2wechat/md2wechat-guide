# md2wechat Guide

面向 md2wechat v3 的任务手册：安装 CLI，检查 Markdown，选择主题和排版语法，生成预览，并在明确授权后创建微信公众号草稿。

核验基线：`v3.1.0`，2026-07-14。命令行为以上游 [md2wechat-skill](https://github.com/geekjourneyx/md2wechat-skill) 的当前 Release 和内置 Skill 为准。

## 最短路径

```bash
npm install -g @geekjourneyx/md2wechat
md2wechat version --json
md2wechat skills read md2wechat --json
md2wechat doctor --json
```

准备好 API Key 后，检查并转换文章：

```bash
md2wechat inspect article.md --json
md2wechat advise article.md --json
md2wechat themes list --json
md2wechat layout validate --file article.md --json
md2wechat preview article.md --theme default -o article.preview.html
md2wechat convert article.md --theme default -o article.html
```

创建微信草稿会调用外部接口。确认公众号凭证、封面和目标账号后再执行：

```bash
md2wechat inspect article.md --draft --cover cover.jpg --strict --json
md2wechat convert article.md --draft --cover cover.jpg --json
```

## 指南目录

| 页面 | 解决的问题 |
|---|---|
| [快速开始](01-quick-start.md) | 从安装到第一份 HTML 或微信草稿 |
| [安装](02-installation.md) | npm、Homebrew、固定版本安装和验证 |
| [主题](03-themes-and-styles.md) | 从当前发现结果中选择真实主题 |
| [高级排版](04-advanced-typesetting.md) | 发现、查看和验证 `:::module` 语法 |
| [图片](05-ai-image.md) | 图片计划、直接生成、封面和信息图 |
| [API](06-api-guide.md) | CLI 配置与稳定转换接口 |
| [FAQ](07-faq.md) | 按错误现象定位配置和发布问题 |
| [v3 迁移](08-migration-v3.md) | 替换 v2 命令、主题和图片参数 |

## 文档边界

- Guide 解释稳定任务路径。
- CLI 完整能力使用 `md2wechat capabilities --json` 查询。
- Agent 操作协议使用 `md2wechat skills read md2wechat --json` 查询。
- 数量和术语的核验记录见 [md2wechat-wiki](https://github.com/md2wechat/md2wechat-wiki)。
- API 参数和价格见 [API 文档](https://www.md2wechat.cn/api-docs)。

发现错误时，请提交 [Issue](https://github.com/md2wechat/md2wechat-guide/issues)，附上版本、完整命令和脱敏错误码。
