#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

required=(
  README.md
  01-quick-start.md
  02-installation.md
  03-themes-and-styles.md
  04-advanced-typesetting.md
  05-ai-image.md
  06-api-guide.md
  07-faq.md
  08-migration-v3.md
  CONTRIBUTING.md
)

for file in "${required[@]}"; do
  if [[ ! -s "$file" ]]; then
    echo "missing required guide file: $file" >&2
    exit 1
  fi
done

stale='v2\.[0-9]|config check|--images|minimal-dark|elegant-serif|focus-mono|43 个模块|3 个 AI 主题'
if rg -n "$stale" --glob '*.md' --glob '!08-migration-v3.md'; then
  echo "stale v2 content found outside migration guide" >&2
  exit 1
fi

promotional='最强|领先|一站式|全面升级|重新定义|赋能|颠覆|不是.*而是|问题不在于.*而在于'
if rg -n "$promotional" --glob '*.md'; then
  echo "promotional or formulaic prose found" >&2
  exit 1
fi

while IFS= read -r line; do
  if [[ "$line" != *"--cover"* && "$line" != *"--cover-media-id"* ]]; then
    echo "draft command without explicit cover: $line" >&2
    exit 1
  fi
done < <(rg 'md2wechat convert .*--draft' --glob '*.md' --glob '!08-migration-v3.md' || true)

echo "guide verification passed"
