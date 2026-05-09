# md2wechat API 接入指南

> 解锁全部 43 个排版模块 + 40+ 专业主题。本指南帮你从免费 AI 模式升级到完整 API 模式。

→ 回到 [指南目录](./README.md)

---

## AI 模式 vs API 模式

| 特性 | AI 模式（免费） | API 模式（订阅） |
|------|---------------|---------------|
| 主题数量 | 3 个基础主题 | 40+ 专业主题 |
| 排版模块 | 标准 Markdown | 全部 43 个模块 |
| AI 配图 | ❌ | ✅ |
| 批量发布 | ❌ | ✅ |
| 优先支持 | ❌ | ✅ |

---

## 申请 API 访问权限

1. **访问** [md2wechat.app](https://md2wechat.app) 注册账号
2. **选择订阅计划**（个人版 / 团队版）
3. **获取 API Key** — 在账户设置页面生成
4. **配置到本地** — 写入配置文件（见下方）

---

## 配置 API Key

编辑 `~/.config/md2wechat/config.yaml`：

```yaml
api:
  key: "sk-your-api-key-here"
  endpoint: "https://api.md2wechat.app/v1"  # 默认，无需修改

wechat:
  app_id: "your-wechat-app-id"
  app_secret: "your-wechat-app-secret"
```

验证配置是否生效：

```bash
md2wechat config check
```

预期输出：

```
✓ API Key: valid (plan: pro)
✓ WeChat: connected (appid: wx****)
✓ Themes: 40+ available
✓ Modules: 43 available
```

---

## 使用完整功能

配置完成后，所有高级功能自动解锁：

```bash
# 使用专业主题
md2wechat convert article.md --theme elegant-serif --draft

# 使用高级排版模块（:::blocktype 语法）
md2wechat convert article.md --draft

# 同时开启 AI 配图
md2wechat convert article.md --theme minimal-dark --cover --images --draft
```

---

## CI/CD 自动化发布

在 GitHub Actions 中自动发布到微信公众号：

```yaml
# .github/workflows/publish.yml
name: Publish to WeChat

on:
  push:
    paths: ['articles/*.md']

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install md2wechat
        run: npm install -g @geekjourneyx/md2wechat
      - name: Publish article
        env:
          MD2WECHAT_API_KEY: ${{ secrets.MD2WECHAT_API_KEY }}
          WECHAT_APP_ID: ${{ secrets.WECHAT_APP_ID }}
          WECHAT_APP_SECRET: ${{ secrets.WECHAT_APP_SECRET }}
        run: md2wechat convert articles/${{ github.event.head_commit.message }}.md --draft
```

---

> **问题或反馈**？欢迎在 [GitHub Issues](https://github.com/md2wechat/md2wechat-guide/issues) 提交。

---

→ 下一步：[常见问题 FAQ](./07-faq.md)

<div align="center">

[指南目录](./README.md) · [主工具](https://github.com/geekjourneyx/md2wechat-skill) · [反馈](https://github.com/md2wechat/md2wechat-guide/issues)

</div>

---
