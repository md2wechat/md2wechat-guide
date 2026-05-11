# md2wechat 高级排版指南

> 43 个专业排版模块，让微信文章瞬间升级。本指南展示每类模块的语法和效果。

→ 回到 [指南目录](./README.md)

---

## 什么是高级排版模块？

md2wechat 在标准 Markdown 之上，提供 `:::blocktype` 语法，用于插入精美排版组件。

**基本语法：**

```markdown
:::hero
# 大标题
副标题文案
:::
```

渲染后会生成对应的微信兼容 HTML 块。

---

## 模块分类总览

| 分类 | 模块名 | 用途 |
|------|--------|------|
| **视觉冲击** | hero, banner, cover | 文章顶部标题区 |
| **内容结构** | steps, timeline, checklist | 步骤 / 流程 / 清单 |
| **信息强调** | callout, tip, warning, quote | 提示块 / 引用 |
| **数据展示** | stat, comparison, pricing | 统计 / 对比 / 定价 |
| **互动感** | verdict, poll, cta | 观点 / 投票 / 行动号召 |
| **媒体** | figure, gallery, video-cover | 图片 / 相册 / 视频封面 |

---

## 一、视觉冲击类

**hero — 文章主标题区：**

```markdown
:::hero
# 2025 年最值得关注的 5 个 AI 工具
每一个都改变了我的工作方式
:::
```

**banner — 全宽横幅：**

```markdown
:::banner
重磅发布！md2wechat v2.2 正式版
支持 43 个排版模块 · 40+ 专业主题
:::
```

---

## 二、内容结构类

**steps — 分步骤：**

```markdown
:::steps
1. 安装 md2wechat CLI
2. 初始化配置文件
3. 写 Markdown，一键发布
:::
```

**timeline — 时间线：**

```markdown
:::timeline
- 2023.01 — 项目立项
- 2024.06 — 突破 1000 Star
- 2025.05 — 发布高级排版 API
:::
```

---

## 三、信息强调类

**callout — 重要提示：**

```markdown
:::callout
**微信限制**：单篇文章图片数量上限为 50 张，超出部分不会上传。
:::
```

**warning — 警告：**

```markdown
:::warning
修改 `app_secret` 后需重新授权，旧的 access_token 会立即失效。
:::
```

---

## 四、数据展示类

**stat — 数据统计：**

```markdown
:::stat
- 2.1k GitHub Stars
- 40+ 专业主题
- 43 排版模块
- 3 分钟上手
:::
```

**comparison — 对比表：**

```markdown
:::comparison
| 特性 | AI 模式 | API 模式 |
|------|---------|---------|
| 主题数量 | 3 | 40+ |
| 排版模块 | 基础 | 全部 43 个 |
| 价格 | 免费 | 订阅制 |
:::
```

---

## 五、互动感类

**verdict — 最终结论：**

```markdown
:::verdict
**推荐指数：⭐⭐⭐⭐⭐**

对于每周发布 2+ 篇公众号文章的创作者来说，md2wechat 是目前最节省时间的工具。
:::
```

**cta — 行动号召：**

```markdown
:::cta
立即体验 md2wechat → [免费下载](https://github.com/geekjourneyx/md2wechat-skill)
:::
```

---

## 六、媒体类

**figure — 图片说明：**

```markdown
:::figure
![预览截图](./screenshot.png)
*图：md2wechat 主题选择界面*
:::
```

---

> **提示**：高级排版模块为 **API 模式专属**。AI 模式（免费）支持标准 Markdown 渲染。  
> 申请 API 访问权限见 [API 接入指南](./06-api-guide.md)

---

→ 下一步：[AI 配图功能](./05-ai-image.md)

<div align="center">

[指南目录](./README.md) · [主工具](https://github.com/geekjourneyx/md2wechat-skill) · [反馈](https://github.com/md2wechat/md2wechat-guide/issues)

</div>
