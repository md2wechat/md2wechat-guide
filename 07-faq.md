# md2wechat 常见问题 FAQ

> 遇到问题？这里收录了最常见的 80% 问题和解决方案。

→ 回到 [指南目录](./README.md)

---

## 一、安装问题

**Q: `brew install` 失败，提示 tap 不存在？**

```bash
# 先手动添加 tap，再安装
brew tap geekjourneyx/tap
brew install md2wechat
```

**Q: `npm install -g` 后找不到 `md2wechat` 命令？**

```bash
# 检查 npm 全局 bin 路径是否在 PATH 中
npm config get prefix
# 将输出路径下的 bin 目录加入 PATH
export PATH="$(npm config get prefix)/bin:$PATH"
```

---

## 二、微信授权问题

**Q: 推送时提示 "invalid credential"？**

检查 `~/.config/md2wechat/config.yaml` 中的 `app_id` 和 `app_secret` 是否正确，并确认在微信公众平台已开启"接口权限"。

**Q: 推送成功但草稿箱看不到文章？**

微信草稿箱有延迟，通常 1–3 分钟后刷新可见。若超过 10 分钟未出现，检查公众号类型是否为订阅号或服务号（个人订阅号无草稿箱接口权限）。

---

## 三、排版渲染问题

**Q: Markdown 表格在微信中显示错乱？**

微信编辑器对 HTML 表格支持有限。建议改用 `:::comparison` 排版模块（API 模式），或将表格转为图片插入。

**Q: 代码块颜色丢失？**

微信不支持 `<style>` 标签内的部分 CSS 属性。md2wechat 已针对微信做了兼容处理，若仍出现问题，尝试切换主题：

```bash
md2wechat convert article.md --theme focus-mono --draft
```

---

## 四、主题与模块问题

**Q: 我只能看到 3 个主题，40+ 主题在哪里？**

40+ 专业主题需要 API 模式。当前 AI 模式（免费）仅支持 3 个基础主题。申请方式见 [API 接入指南](./06-api-guide.md)。

**Q: `:::hero` 语法不生效，原样输出了？**

`:::blocktype` 高级排版模块为 API 模式专属。免费 AI 模式下会原样输出 `:::` 语法块。

---

## 五、API 模式问题

**Q: `md2wechat config check` 提示 API Key invalid？**

1. 确认 Key 已复制完整（以 `sk-` 开头）
2. 检查配置文件路径是否正确：`~/.config/md2wechat/config.yaml`
3. 运行 `md2wechat config init` 重新初始化，再粘贴 Key

**Q: API 模式下图片生成很慢？**

AI 配图（`--cover --images`）需调用外部图片 API，通常耗时 15–45 秒。可单独先用 `--cover` 生成封面，再逐步启用段落配图。

---

## 六、其他问题

**Q: 如何更新到最新版本？**

```bash
# Homebrew
brew upgrade md2wechat

# npm
npm update -g @geekjourneyx/md2wechat
```

**Q: 在哪里提交 Bug 或功能建议？**

欢迎在 [GitHub Issues](https://github.com/geekjourneyx/md2wechat-skill/issues) 提交，或加入微信交流群（见主 README）。

---

## 五、授权与商业使用

**Q: md2wechat 可以免费商业使用吗？**

v2.2.0 起，许可证从 MIT 升级为 Source Available License（BUSL 1.1 为基础）。个人使用、学习、非商业项目、开源贡献**免费无需授权**。SaaS 集成、客户交付、品牌替换、白标等商业用途需要书面商业授权，联系 skrphper@gmail.com 或通过公众号「极客杰尼」咨询。

历史版本（MIT）不受影响，2030-01-01 后自动转为 Apache 2.0。

---

→ 回到 [指南目录](./README.md) · 查看 [API 接入指南](./06-api-guide.md)

<div align="center">

[指南目录](./README.md) · [主工具](https://github.com/geekjourneyx/md2wechat-skill) · [反馈](https://github.com/md2wechat/md2wechat-guide/issues)

</div>

---
