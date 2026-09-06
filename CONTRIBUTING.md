# 参与 Guide 维护

Guide 只保留用户完成任务所需的稳定路径。命令变化以固定 Release、对应源码和当前 CLI 的发现结果为依据。

## 写作要求

- 先写用户能完成的结果，再补充版本和资料来源。
- 示例使用当前稳定版本；旧版本只放在迁移页的历史段落。
- 不根据平台入口推断兼容性，也不使用未经验证的“全面支持”等表述。
- 区分 HTML 转换、素材上传、草稿创建和群发。
- 涉及上传或草稿时，先写清目标、凭证、检查项和确认步骤。
- 不在示例中使用真实凭证、账号或未发布内容。

## 提交前检查

```bash
node --test tests/*.test.mjs
node scripts/check-docs.mjs
git diff --check
```

同时核对改动涉及的命令：

```bash
md2wechat version --json
md2wechat capabilities --json
md2wechat skills read md2wechat --json
```

高级排版示例还应运行 `md2wechat layout validate --file FILE --json`。PR 需要附上固定 Release 或不可变源码链接，说明版本、数字或命令为何发生变化。

产品代码问题请提交到 [md2wechat-skill Issues](https://github.com/geekjourneyx/md2wechat-skill/issues)。
