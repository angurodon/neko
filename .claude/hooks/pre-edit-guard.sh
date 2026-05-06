#!/bin/bash
# PreToolUse hook: 自動生成・ビルド成果物の編集をブロック
set -euo pipefail

FILE=$(jq -r '.tool_input.file_path // empty')

if [ -z "$FILE" ]; then
  exit 0
fi

# Next.js ビルド成果物・自動生成
if echo "$FILE" | grep -qE '(^|/)(\.next/|out/|node_modules/)'; then
  echo "BLOCKED: ${FILE} は Next.js のビルド成果物または依存です。直接編集せず、ソース側を修正して 'npm run build' で再生成してください。" >&2
  exit 2
fi

if echo "$FILE" | grep -qE '(^|/)next-env\.d\.ts$'; then
  echo "BLOCKED: next-env.d.ts は Next.js が自動生成・更新します。直接編集しないでください。" >&2
  exit 2
fi

# package-lock.json は npm が管理
if echo "$FILE" | grep -qE '(^|/)package-lock\.json$'; then
  echo "BLOCKED: package-lock.json は npm が管理します。'npm install' / 'npm ci' で更新してください。" >&2
  exit 2
fi

exit 0
