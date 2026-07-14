# 安装 md2wechat

核验版本：`v3.1.0`，2026-07-14。最新版本请查看 [Releases](https://github.com/geekjourneyx/md2wechat-skill/releases)。

## npm

适合已经安装 Node.js 的 macOS、Linux 和 Windows 用户。

```bash
npm install -g @geekjourneyx/md2wechat
md2wechat version --json
```

遇到镜像缓存或 tarball 404 时，显式使用 npm 官方 Registry：

```bash
npm install -g @geekjourneyx/md2wechat --registry=https://registry.npmjs.org/
```

## Homebrew

适合 macOS 和已经配置 Homebrew 的 Linux 用户。

```bash
brew install geekjourneyx/tap/md2wechat
md2wechat version --json
```

升级：

```bash
brew update
brew upgrade md2wechat
```

## 固定版本安装器

Linux 或 macOS：

```bash
curl -fsSL https://github.com/geekjourneyx/md2wechat-skill/releases/download/v3.1.0/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"
md2wechat version --json
```

Windows PowerShell：

```powershell
$env:MD2WECHAT_RELEASE_BASE_URL = "https://github.com/geekjourneyx/md2wechat-skill/releases/download/v3.1.0"
iex ((New-Object System.Net.WebClient).DownloadString("$env:MD2WECHAT_RELEASE_BASE_URL/install.ps1"))
md2wechat version --json
```

固定版本安装器会下载对应 Release 资产。升级时把 URL 中的版本改成目标 Release，并重新执行。

## Go install

适合已经维护 Go 工具链的开发者：

```bash
go install github.com/geekjourneyx/md2wechat-skill/cmd/md2wechat@v3.1.0
md2wechat version --json
```

确认 `$(go env GOPATH)/bin` 位于 `PATH`。

## 安装后检查

```bash
command -v md2wechat
md2wechat version --json
md2wechat capabilities --json
md2wechat skills read md2wechat --json
md2wechat doctor --json
```

Windows 可以使用：

```powershell
Get-Command md2wechat
md2wechat version --json
```

## 初始化配置

```bash
md2wechat config init
md2wechat config validate --json
md2wechat doctor --json
```

配置优先级：

1. 环境变量
2. 配置文件
3. 默认值

配置文件查找顺序：

1. `~/.config/md2wechat/config.yaml`
2. `~/.md2wechat.yaml`
3. `./md2wechat.yaml`

## 升级后核对

```bash
md2wechat version --json
md2wechat capabilities --json
md2wechat skills read md2wechat --json
md2wechat doctor --json
```

如果 shell 仍调用旧二进制，比较 `command -v md2wechat` 与安装器输出路径，清理旧 PATH 项后重新打开终端。

## 卸载

npm：

```bash
npm uninstall -g @geekjourneyx/md2wechat
```

Homebrew：

```bash
brew uninstall md2wechat
```

手动安装时，删除 `command -v md2wechat` 返回的二进制。配置目录 `~/.config/md2wechat` 可能包含凭证，确认备份需求后再处理。
