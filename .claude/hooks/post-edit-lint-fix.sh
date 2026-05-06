#!/bin/bash
# PostToolUse hook: TS/TSX 編集後に ESLint auto-fix を実行
set -euo pipefail

FILE=$(jq -r '.tool_input.file_path // empty')

if [ -z "$FILE" ]; then
  exit 0
fi

if ! echo "$FILE" | grep -qE '\.(ts|tsx|js|jsx|mjs)$'; then
  exit 0
fi

# ビルド成果物・依存はスキップ
if echo "$FILE" | grep -qE '(^|/)(\.next/|out/|node_modules/)'; then
  exit 0
fi

[ -f "$FILE" ] || exit 0

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

OUTPUT=$(npx --no-install eslint --fix "$FILE" 2>&1) || true

if [ -n "$OUTPUT" ]; then
  echo "ESLint:" >&2
  echo "$OUTPUT" | head -10 >&2
fi

exit 0
