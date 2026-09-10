# 安装与升级 md2wechat

以下固定版本命令对应 `v3.5.0`。安装完成后都应运行 `md2wechat version --json`。

## npm

适合已经安装 Node.js 的 macOS、Linux 和 Windows：

```bash
npm install -g @geekjourneyx/md2wechat
md2wechat version --json
```

## Homebrew

```bash
brew install geekjourneyx/tap/md2wechat
md2wechat version --json
```

升级时运行：

```bash
brew update
brew upgrade md2wechat
```

## 固定版本安装器

Linux 或 macOS：

```bash
curl -fsSL https://github.com/geekjourneyx/md2wechat-skill/releases/download/v3.5.0/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"
md2wechat version --json
```

Windows PowerShell：

```powershell
$env:MD2WECHAT_RELEASE_BASE_URL = "https://github.com/geekjourneyx/md2wechat-skill/releases/download/v3.5.0"
iex ((New-Object System.Net.WebClient).DownloadString("$env:MD2WECHAT_RELEASE_BASE_URL/install.ps1"))
md2wechat version --json
```

## Go install

```bash
go install github.com/geekjourneyx/md2wechat-skill/cmd/md2wechat@v3.5.0
md2wechat version --json
```

确保 `$(go env GOPATH)/bin` 已加入 `PATH`。

## 安装后检查

```bash
command -v md2wechat
md2wechat version --json
md2wechat capabilities --json
md2wechat skills read md2wechat --json
md2wechat doctor --json
```

Windows 用 `Get-Command md2wechat` 查看实际执行路径。如果版本没有更新，请比较命令路径与安装位置，调整 `PATH` 后重新打开终端。

## 配置位置

```bash
md2wechat config init
md2wechat config validate --json
```

配置按环境变量、配置文件、默认值的顺序生效。配置文件依次查找：

1. `~/.config/md2wechat/config.yaml`
2. `~/.md2wechat.yaml`
3. `./md2wechat.yaml`

## 卸载

```bash
npm uninstall -g @geekjourneyx/md2wechat
# 或
brew uninstall md2wechat
```

手动安装时，根据 `command -v md2wechat` 找到二进制再删除。配置目录可能包含凭证，请先确认是否需要备份。
