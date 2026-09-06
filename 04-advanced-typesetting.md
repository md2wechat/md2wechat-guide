# 高级排版

高级排版使用 `:::module` 块。模块名、字段和示例都由当前 CLI 提供，写入文章前先查询。

## 五组数字分别代表什么

`v3.4.0` 的排版能力包括：

| 维度 | 数量 | 含义 |
|---|---:|---|
| 推荐使用场景 | 77 | 文章任务与排版选择的映射 |
| 推荐语法名 | 56 | 默认发现命令返回、适合新稿的模块名 |
| 兼容模块 | 3 | 用于理解和迁移旧稿 |
| 基础增强 | 4 | Mermaid、KaTeX 等基础能力 |
| 渲染层语法能力 | 63 | 目标渲染器覆盖的总体能力口径 |

## 查询模块

```bash
md2wechat layout list --json
md2wechat layout show hero --json
```

阅读 `layout show` 时，依次确认输入位置、主要 `body_format`、字段或正文规则、正式变体名称和示例。兼容字段用于旧稿迁移，不应成为新稿的默认选择。

## 让 CLI 生成模块

先查看模块字段，再使用 `layout render` 生成结构，避免手写时漏掉必填字段：

```bash
md2wechat layout render hero \
  --var eyebrow=深度观察 \
  --var title="公众号排版的真问题" \
  --json
```

正文较长或结构复杂时，按 `layout show NAME --json` 返回的格式准备 `module-body.md`，再使用：

```bash
md2wechat layout render NAME --body-file module-body.md --json
```

## 验证文章

```bash
md2wechat layout validate --file article.md --json
md2wechat inspect article.md --json
md2wechat preview article.md -o article.preview.html
```

`layout validate` 只证明语法符合当前 CLI 的目录和字段约束。最终样式仍需经过实际转换，并在手机宽度下检查。

## 使用建议

- 一个模块只承担一个阅读任务。
- 先完成内容，再选择模块。
- 数据、案例和引用应保留真实来源。
- 同一位置避免叠加作用相近的模块。
- CTA 只在文章确实有下一步时使用。
