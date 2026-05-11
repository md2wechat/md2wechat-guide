# md2wechat 安装指南

> 覆盖全平台安装方式，选最适合你环境的一种。

→ 回到 [指南目录](./README.md)

---

## 方式对比

| 方式 | 适合场景 | 推荐度 |
|------|---------|--------|
| Homebrew | macOS / Linux，最省心 | ⭐⭐⭐ 首选 |
| npm | 已有 Node 环境 | ⭐⭐⭐ |
| install.sh | 无 Homebrew / npm，下载固定版本 | ⭐⭐ |
| PowerShell | Windows | ⭐⭐ |
| Go install | 已有 Go 环境 | ⭐ 可选 |
| 源码编译 | 开发者 / 定制 | ⭐ 可选 |

---

## 方式一：Homebrew（macOS / Linux 首选）

```bash
brew install geekjourneyx/tap/md2wechat
```

升级：

```bash
brew upgrade geekjourneyx/tap/md2wechat
```

---

## 方式二：npm 全局安装

适合已有稳定 Node/npm 环境（Node 18+）：

```bash
npm install -g @geekjourneyx/md2wechat
```

如果 npm 镜像同步延迟，改用官方源：

```bash
npm install -g @geekjourneyx/md2wechat --registry=https://registry.npmjs.org/
```

---

## 方式三：install.sh（固定版本）

```bash
curl -fsSL https://github.com/geekjourneyx/md2wechat-skill/releases/download/v2.1.0/install.sh | bash
```

---

## 方式四：Windows PowerShell

```powershell
$env:MD2WECHAT_RELEASE_BASE_URL = "https://github.com/geekjourneyx/md2wechat-skill/releases/download/v2.1.0"
iex ((New-Object System.Net.WebClient).DownloadString("$env:MD2WECHAT_RELEASE_BASE_URL/install.ps1"))
```

---

## 方式五：Go install

```bash
go install github.com/geekjourneyx/md2wechat-skill/cmd/md2wechat@v2.1.0
```

需要 Go 1.26.1+。

---

## 方式六：源码编译

适合需要定制化修改或参与贡献的开发者。

**前置条件**：Go 1.21+

```bash
git clone https://github.com/geekjourneyx/md2wechat-skill.git
cd md2wechat-skill
go build -o md2wechat ./cmd/md2wechat
sudo mv md2wechat /usr/local/bin/
```

---

## 验证安装

```bash
md2wechat version --json
```

Expected output: `{"version":"2.2.0","go_version":"go1.26.1", ...}`

如果提示 `command not found`：确认安装路径在 `PATH` 中，重新打开终端后重试。

---

## 初始化配置

```bash
md2wechat config init
```

配置文件位置：`~/.config/md2wechat/config.yaml`

最小配置（推送草稿必须）：

```yaml
wechat:
  appid: "wx_your_appid"
  secret: "your_secret"
```

API 模式（解锁高级排版）还需要：

```yaml
api:
  md2wechat_key: "your_api_key"
```

---

## 卸载

```bash
# Homebrew
brew uninstall md2wechat

# npm
npm uninstall -g @geekjourneyx/md2wechat
```

---

→ 上一步：[快速上手](./01-quick-start.md) ｜ 下一步：[主题与样式](./03-themes-and-styles.md)

<div align="center">

[指南目录](./README.md) · [主工具](https://github.com/geekjourneyx/md2wechat-skill) · [反馈](https://github.com/md2wechat/md2wechat-guide/issues)

</div>

---
