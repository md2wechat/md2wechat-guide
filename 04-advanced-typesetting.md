# 高级排版语法

高级排版使用 `:::module` 块。模块目录、字段和示例由 CLI 内置 catalog 提供。

核验基线：`v3.1.0`，2026-07-14。

## 数字口径

| 口径 | 核验值 | 用途 |
|---|---:|---|
| 主推场景条目 | 68 | Agent 根据文章任务选型 |
| 主推语法名 | 53 | 写入 Markdown 的推荐模块名 |
| 渲染语法能力 | 60 | 渲染层覆盖口径 |
| 兼容模块 | 3 | 旧稿和特殊场景 |
| 基础增强 | 4 | KaTeX、Mermaid 等基础能力 |

引用数字时需要同时写出口径。

## 发现模块

```bash
md2wechat layout list --json
md2wechat layout show hero --json
md2wechat layout show metrics --json
```

`layout show` 返回适用场景、禁用场景、字段、变体和可运行示例。写模块前先查看所装版本的 spec。

## 最小示例

```markdown
:::hero
variant: editorial
eyebrow: 使用说明
title: 先检查文章，再选择排版结构
subtitle: 模块服务具体阅读任务
tags: 检查 | 预览
:::
```

保存到 `article.md` 后验证：

```bash
md2wechat layout validate --file article.md --json
```

从标准输入验证：

```bash
printf '%s\n' ':::hero' 'title: 先检查文章' ':::' | md2wechat layout validate --stdin --json
```

## 按任务选择

| 任务 | 可先查看的语法 |
|---|---|
| 开场和导读 | `hero`、`toc`、`part`、`cards` |
| 判断和适用人群 | `verdict`、`audience-fit`、`myth-fact` |
| 数据和证据 | `metrics`、`quote`、`cases`、`figure-caption` |
| 对比和选择 | `compare`、`comparison-table`、`matrix` |
| 操作步骤 | `steps`、`timeline`、`image-steps` |
| 图片说明 | `image-text`、`image-compare`、`image-annotate` |
| 收尾和后续动作 | `summary`、`checklist`、`cta`、`subscribe` |

字段结构以 `layout show NAME --json` 为准。

## 使用原则

- 每个模块承担一个明确任务。
- 先写内容，再选择模块。
- 同一段不叠加多个表达相近的模块。
- 对比、数据、案例和引用需要真实来源。
- CTA 只在文章确实有后续动作时使用。
- 模块通过验证后仍要检查手机端预览。

## 验证顺序

```bash
md2wechat layout validate --file article.md --json
md2wechat inspect article.md --json
md2wechat preview article.md -o article.preview.html
```

`layout validate` 通过只说明语法符合所装版本的 catalog，不能证明内容、证据或手机阅读效果已经合格。
