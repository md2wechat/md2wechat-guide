# 参与 Guide 维护

Guide 只保存稳定任务路径。完整 CLI 行为以上游源码、Release 和内置 Skill 为准。

## 提交前准备

1. 安装当前稳定版本。
2. 记录 `md2wechat version --json` 输出。
3. 用 `--help` 或 discovery 命令核对参数。
4. 对高级排版示例运行 `layout validate`。
5. 删除所有凭证和未公开内容。

## Pull Request 要求

- 一个 PR 解决一个任务或一组直接相关错误。
- 命令变更附上上游 commit、Release 或 `--help` 输出。
- 数字附上 discovery 命令和核验日期。
- 历史命令只写进 `08-migration-v3.md`。
- 不加入固定产品介绍、评分、排名和推广段落。
- 不改写上游完整命令参考，使用链接或 discovery 命令。

本地检查：

```bash
bash scripts/verify-docs.sh
```

产品代码问题请提交到 [md2wechat-skill](https://github.com/geekjourneyx/md2wechat-skill/issues)。
