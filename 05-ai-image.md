# md2wechat AI 配图指南

> 告别手动找图，AI 自动为每篇文章生成匹配的封面和配图。

→ 回到 [指南目录](./README.md)

---

## AI 配图能力概览

md2wechat 提供 3 类 AI 图片能力：

| 功能 | 说明 | 触发方式 |
|------|------|---------|
| **封面生成** | 根据文章标题自动生成封面图 | `--cover` 参数 |
| **段落配图** | 为正文段落自动匹配或生成插图 | `--images` 参数 |
| **图片优化** | 压缩 + 格式转换为微信兼容格式 | 默认开启 |

---

## 快速使用

**生成文章封面：**

```bash
md2wechat convert article.md --cover --draft
```

**同时生成封面 + 段落配图：**

```bash
md2wechat convert article.md --cover --images --draft
```

**仅本地预览 AI 配图效果（不推送）：**

```bash
md2wechat preview article.md --cover --images
```

---

## 配置 AI 图片服务

在配置文件 `~/.config/md2wechat/config.yaml` 中配置图片生成服务：

```yaml
image:
  provider: openai          # 图片服务商：openai / stability / replicate
  model: dall-e-3           # 生成模型
  style: realistic          # 风格：realistic / illustration / minimal
  auto_alt: true            # 自动生成 alt 描述
  upload_to_wechat: true    # 生成后自动上传到微信素材库
```

---

## AI 配图工作流

1. **分析文章** — AI 读取标题、摘要、关键段落
2. **生成提示词** — 自动构建图片描述（支持中文）
3. **调用图片 API** — 生成图片（通常 10–30 秒）
4. **上传素材库** — 自动上传到微信公众号素材库
5. **插入文章** — 在对应位置插入图片链接
6. **推送草稿箱** — 含图片的完整文章推入草稿

---

## 注意事项

- AI 配图功能需要配置图片服务 API Key（openai / stability 等）
- 生成图片会消耗对应服务的 API 额度
- 微信素材库有存储上限，建议定期清理
- 段落配图（`--images`）会显著增加处理时间

---

> **提示**：AI 配图为 **API 模式专属**功能。  
> 申请 API 访问权限见 [API 接入指南](./06-api-guide.md)

---

→ 下一步：[API 接入指南](./06-api-guide.md)

<div align="center">

[指南目录](./README.md) · [主工具](https://github.com/geekjourneyx/md2wechat-skill) · [反馈](https://github.com/md2wechat/md2wechat-guide/issues)

</div>

---
