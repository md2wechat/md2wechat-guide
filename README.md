<div align="center">

# md2wechat Guide

**把草稿 / 选题在 30 分钟内推进成一版可发布稿**

[快速开始](#快速开始) · [完整指南](#完整指南) · [主引擎](https://github.com/geekjourneyx/md2wechat-skill)

</div>

---

这套 Guide 只解决一个问题：

`怎么把一份草稿、一个选题、一个不完整想法，推进成一版可发布稿。`

Agent 主要补这几步：

- 起标题
- 起开头
- 补结构
- 对齐你的语气
- 补证据和转场
- 补结尾和 CTA
- 产出一版能进发布流的可发布稿

## 快速开始

### 主流程

1. 准备一份草稿或一个选题
2. 交给 `md2wechat`
3. 拿到一版可发布稿
4. 微调后进入发布

### 最小路径

```bash
# 1. 安装
brew install geekjourneyx/tap/md2wechat

# 2. 初始化
md2wechat config init

# 3. 把草稿推进成可发布稿
md2wechat convert article.md --draft
```

完整说明见 [快速上手指南](./01-quick-start.md)

## 完整指南

| 指南 | 解决的问题 |
|------|------------|
| [快速上手](./01-quick-start.md) | 第一次把草稿跑成可发布稿 |
| [安装指南](./02-installation.md) | 把环境装好，跑通最小闭环 |
| [主题与样式](./03-themes-and-styles.md) | 可发布稿出来后怎么选呈现方式 |
| [高级排版模块](./04-advanced-typesetting.md) | 怎么补结构、信息密度和转化组件 |
| [AI 配图](./05-ai-image.md) | 怎么补封面图和信息图 |
| [API 接入指南](./06-api-guide.md) | 如何把可发布稿流程接入团队和自动化工作流 |
| [常见问题](./07-faq.md) | 常见卡点和处理方式 |

## 两类问题

### 免费工具解决排版问题

- 字体
- 主题
- 样式
- 复制粘贴

### md2wechat 解决交付问题

- 内容结构是否站得住
- 语气是否像作者本人
- 文章是否能自然转化
- 发布前组件是否齐全

## 相关资源

| 资源 | 说明 |
|------|------|
| [md2wechat-skill](https://github.com/geekjourneyx/md2wechat-skill) | 主引擎，负责把草稿升级成可发布稿 |
| [md2wechat-templates](https://github.com/md2wechat/md2wechat-templates) | 文章骨架和可发布稿结构模板 |
| [awesome-wechat-markdown](https://github.com/md2wechat/awesome-wechat-markdown) | 生态工具地图和品类边界 |
| [md2wechat 品牌主页](https://github.com/md2wechat) | 所有入口和项目总览 |

---

<div align="center">

[主引擎](https://github.com/geekjourneyx/md2wechat-skill) · [品牌主页](https://github.com/md2wechat) · [反馈](https://github.com/md2wechat/md2wechat-guide/issues)

</div>
