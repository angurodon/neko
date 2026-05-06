#!/bin/bash
# PostToolUse hook: TS/TSX 編集後に型チェックを実行（警告のみ・ブロックしない）
set -euo pipefail

FILE=$(jq -r '.tool_input.file_path // empty')

if [ -z "$FILE" ]; then
  exit 0
fi

if ! echo "$FILE" | grep -qE '\.(ts|tsx)$'; then
  exit 0
fi

if echo "$FILE" | grep -qE '(^|/)(\.next/|out/|node_modules/|next-env\.d\.ts$)'; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

OUTPUT=$(npx --no-install tsc --noEmit 2>&1) || true

if echo "$OUTPUT" | grep -qE 'error TS'; then
  echo "TypeScript 型エラーが検出されました:" >&2
  echo "$OUTPUT" | grep -E 'error TS' | head -10 >&2
fi

exit 0
