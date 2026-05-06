#!/bin/bash
# PostToolUse hook: TS/TSX に console.log があれば警告
set -euo pipefail

FILE=$(jq -r '.tool_input.file_path // empty')

if [ -z "$FILE" ]; then
  exit 0
fi

if ! echo "$FILE" | grep -qE '\.(ts|tsx)$'; then
  exit 0
fi

# テストファイル（将来追加されたとき用）
if echo "$FILE" | grep -qE '\.(test|spec)\.(ts|tsx)$'; then
  exit 0
fi

[ -f "$FILE" ] || exit 0

if grep -qn 'console\.log' "$FILE"; then
  LINES=$(grep -n 'console\.log' "$FILE" | head -5)
  echo "WARNING: console.log が検出されました。デバッグ用であれば削除してください:" >&2
  echo "$LINES" >&2
fi

exit 0
