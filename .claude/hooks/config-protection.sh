#!/bin/bash
# PreToolUse hook: プロジェクト設定ファイル編集を警告（ブロックはしない）
set -euo pipefail

FILE=$(jq -r '.tool_input.file_path // empty')

if [ -z "$FILE" ]; then
  exit 0
fi

if echo "$FILE" | grep -qE '(next\.config\.(ts|mjs|js)|tsconfig\.json|postcss\.config\.(mjs|js)|eslint\.config\.(mjs|js)|\.eslintrc.*|package\.json)$'; then
  BASENAME=$(basename "$FILE")
  echo "WARNING: ${BASENAME} はプロジェクト設定ファイルです。リンター/ビルド設定を緩めてエラー回避するのではなく、コード側を修正してください。本当に設定変更が必要な場合のみ編集してください。" >&2
fi

# CLAUDE.md / .claude/* の編集も明示的に通知（隠れた挙動変更を防ぐ）
if echo "$FILE" | grep -qE '(^|/)(CLAUDE\.md|\.claude/(settings\.json|hooks/|commands/|agents/|rules/))'; then
  echo "NOTE: Claude Code 設定ファイルを編集しています。フック・コマンド・ルール変更はチーム全体に影響します。" >&2
fi

exit 0
