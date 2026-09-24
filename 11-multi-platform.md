# Markdown 保存到知乎、CSDN、头条、腾讯云开发者社区草稿

md2wechat v3.6.0 于 2026-09-12 发布知乎、CSDN、头条草稿流程；v3.7.0 于 2026-09-23 增加腾讯云开发者社区。CLI 在本地准备正文，有浏览器能力的 Agent 在你已登录的账号中保存未发布草稿，再重新打开核对。准备成功不等于草稿完成，不包含公开发布。

## 准备文章

文章需要标题、非空正文和有效的本地 PNG、JPEG、GIF 或 WebP 图片。远程图片先自行下载并调整引用；Obsidian 专用语法、原始 HTML 和公众号高级排版块需要整理成普通 Markdown。模板里的 `:::` 模块不能原样交给此命令。

```bash
md2wechat version --json
md2wechat capabilities --json
md2wechat sync prepare article.md --output ./article-prepared --json
```

输出目录必须尚不存在，父目录必须存在。命令只生成 `body.html`，不会修改原稿、复制或上传图片，也不需要微信凭证或排版 API Key。

收到 `SYNC_PREPARED` 和 `status: action_required` 后才进入浏览器操作；收到 `SYNC_PREPARE_FAILED` 时先修正文章，不开始远端写入。

## 交给 Agent 保存草稿

向 Agent 说明文章、目标平台和账号，例如：“把 article.md 保存到我已登录的知乎和 CSDN 草稿箱，不公开发布。”Agent 读取当前二进制内置说明：

```bash
md2wechat skills read md2wechat references/sync/workflow.md --json
md2wechat skills read md2wechat references/sync/zhihu.md --json
md2wechat skills read md2wechat references/sync/csdn.md --json
# 头条使用 references/sync/toutiao.md
# 腾讯云开发者社区从 v3.7.0 起读取 references/sync/tencent-cloud.md
```

同一篇未改动的文章只准备一次。Agent 按平台依次上传图片、填写正文和标题、保存草稿，取得地址后重新打开，核对标题、全文、图片位置和主要结构。浏览器布局与操作说明不符时停止，不猜测点击，也不通过内部业务接口代替正常编辑器。

头条会将标题归一为一级。文章含多个标题级别时，应在写入前暂停，经过你同意修改原稿后重新准备。保存后还需核对特殊字符，不能为了通过检查擅自删除内容。

## 中断与完成

中断时先检查已有草稿地址或草稿列表，再继续同一草稿，不要重复创建。一个平台失败不影响其他已完成结果。最终逐个平台报告账号、草稿地址、全文重开核对结果和未完成原因；只点击保存不能算完成。

v3.7.0 的腾讯云流程仅验证短结构正文和单图的保存重开；多图、长文、从草稿列表恢复仍未验证。知乎、CSDN、头条的历史实测记录保留原版本标记。上游实测覆盖 macOS、Chrome 已登录会话。其他系统和四大办公 Agent 宿主尚未逐一验证；安装了 agent-browser 也不能直接推导三平台流程可用。私人账号、草稿地址和临时图片地址不要提交到公共仓库。

当前新增范围：[v3.7.0 Release](https://github.com/geekjourneyx/md2wechat-skill/releases/tag/v3.7.0)、[当前多平台流程](https://github.com/geekjourneyx/md2wechat-skill/blob/v3.7.0/docs/SYNC.md)、[v3.7 验证记录](https://github.com/geekjourneyx/md2wechat-skill/blob/v3.7.0/docs/SMOKE.md)。历史来源：[v3.6.0 Release](https://github.com/geekjourneyx/md2wechat-skill/releases/tag/v3.6.0)、[固定版本流程](https://github.com/geekjourneyx/md2wechat-skill/blob/9cb3318f84ff980d1cac41ab0fafbcec525ef6dd/docs/SYNC.md)、[上游实测记录](https://github.com/geekjourneyx/md2wechat-skill/blob/9cb3318f84ff980d1cac41ab0fafbcec525ef6dd/docs/SMOKE.md)。本页于 2026-09-24 按 v3.7.0 文档校准，未重新执行远程草稿操作。
