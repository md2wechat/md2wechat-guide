# 从 v2 迁移到 v3

仅本页保留 v2 历史写法，用于定位旧脚本。Guide 其他页面只使用 v3 命令。

核验目标：md2wechat `v3.1.0`，2026-07-14。

## 先确认所装版本

```bash
md2wechat version --json
md2wechat capabilities --json
md2wechat skills read md2wechat --json
```

## 命令替换

| v2 历史写法 | v3 写法 | 说明 |
|---|---|---|
| `md2wechat config check` | `md2wechat config validate --json` | 配置文件结构检查 |
| 无统一本地诊断 | `md2wechat doctor --json` | 本地检查配置、主题、排版目录和凭证存在性 |
| 依赖 README 猜能力 | `md2wechat capabilities --json` | 读取机器可读能力 |
| 读取外部 Skill 副本 | `md2wechat skills read md2wechat --json` | 读取所装二进制内置协议 |
| 手工查主题表 | `md2wechat themes list --json` | 使用所装版本的主题目录 |
| 手工复制模块示例 | `md2wechat layout show NAME --json` | 读取所装版本的字段和示例 |

## 草稿封面

历史脚本可能只有：

```bash
md2wechat convert article.md --draft
```

v3 草稿需要显式封面：

```bash
md2wechat convert article.md --draft --cover cover.jpg --json
```

已有素材 ID：

```bash
md2wechat convert article.md --draft --cover-media-id MEDIA_ID --json
```

## 图片参数

历史文档曾使用 `--images`，v3 的 `convert` 没有该参数。

封面计划：

```bash
md2wechat generate_cover --article article.md --plan --json
```

信息图计划：

```bash
md2wechat generate_infographic --article article.md --plan --json
```

宿主 Agent 生成图片并保存后，把封面路径传给 `--cover`；正文图片使用标准 Markdown 图片语法。

## 主题替换

以下名称来自旧文档，v3.1.0 目录中不存在：

- `minimal-dark`
- `elegant-serif`
- `focus-mono`

运行：

```bash
md2wechat themes list --json
```

可从 `minimal-*`、`elegant-*`、`focus-*` 系列选择目录中存在的主题，例如 `minimal-blue`、`elegant-gold`、`focus-navy`。

## 数字口径

旧文档使用过“43 个模块”和“3 个 AI 主题”。v3.1.0 的发现结果为：

- 68 个主推场景条目
- 53 个主推语法名
- 60 项渲染语法能力
- 4 个可选 AI 主题
- 48 个可选 API 主题

运行发现命令获取所装版本的数据：

```bash
md2wechat capabilities --json
md2wechat themes list --json
md2wechat layout list --json
```

## 迁移检查

```bash
md2wechat config validate --json
md2wechat doctor --json
md2wechat layout validate --file article.md --json
md2wechat inspect article.md --json
md2wechat preview article.md -o article.preview.html
```

完成预览后再决定是否转换、上传或创建草稿。
