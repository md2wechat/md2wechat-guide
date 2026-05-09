# md2wechat 主题与样式指南

> 40+ 专业主题，微信渲染精调。本指南帮你快速找到适合自己风格的主题。

→ 回到 [指南目录](./README.md)

---

## 主题系列概览

md2wechat 提供 4 大系列主题：

| 系列 | 风格描述 | 适合内容 |
|------|---------|---------|
| **Minimal** | 极简、大量留白、字体主导 | 深度思考、个人品牌 |
| **Focus** | 专注正文、减少装饰 | 教程、指南、干货 |
| **Elegant** | 精致排版、温和色调 | 生活方式、人文 |
| **Bold** | 强对比、视觉冲击 | 观点、热点、营销 |

完整主题预览：[theme-gallery](https://md2wechat.app/theme-gallery)

---

## 如何指定主题

**在命令行中指定：**

```bash
md2wechat convert article.md --theme minimal-dark --draft
```

**在 Markdown 文件头部声明（frontmatter）：**

```yaml
---
theme: elegant-serif
---

# 文章标题
正文内容...
```

文件头部声明优先级高于命令行参数。

---

## 常用主题示例

**Minimal Dark（深色极简）：**

```bash
md2wechat convert article.md --theme minimal-dark
```

**Elegant Serif（优雅衬线）：**

```bash
md2wechat convert article.md --theme elegant-serif
```

**Focus Mono（专注等宽）：**

```bash
md2wechat convert article.md --theme focus-mono
```

---

## 预览主题效果

本地预览（不推送）：

```bash
md2wechat preview article.md --theme minimal-dark
```

浏览器会打开预览页面，可实时对比不同主题效果。

---

## 主题 + 高级排版组合

主题控制**视觉风格**，高级排版模块控制**内容结构**。两者独立，可自由组合：

```bash
# elegant-serif 主题 + hero / verdict 等排版模块
md2wechat convert article.md --theme elegant-serif --draft
```

→ 高级排版模块详见 [高级排版指南](./04-advanced-typesetting.md)

---

> **注意**：多主题能力（40+ 主题）为 API 模式专属。AI 模式（免费）仅支持 3 个基础主题。  
> 申请 API 访问权限见 [API 接入指南](./06-api-guide.md)

---

→ 下一步：[高级排版模块](./04-advanced-typesetting.md)

<div align="center">

[指南目录](./README.md) · [主工具](https://github.com/geekjourneyx/md2wechat-skill) · [反馈](https://github.com/md2wechat/md2wechat-guide/issues)

</div>

---
