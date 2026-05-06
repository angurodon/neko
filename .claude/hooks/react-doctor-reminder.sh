#!/bin/bash
# PostToolUse hook: app/ または components/ 配下の TS/TSX が変更されたら React Doctor をリマインド
set -euo pipefail

FILE=$(jq -r '.tool_input.file_path // .tool_response.filePath // empty' 2>/dev/null)

if [ -z "$FILE" ]; then
  exit 0
fi

# 対象は React コンポーネント領域のみ
if ! echo "$FILE" | grep -qE '(^|/)(app|components)/.+\.(ts|tsx)$'; then
  exit 0
fi

# ビルド成果物は除外
if echo "$FILE" | grep -qE '(^|/)(\.next/|out/|node_modules/)'; then
  exit 0
fi

cat <<'EOF'
{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"[react-doctor reminder] React コンポーネント領域 (app/ または components/) のファイルが変更されました。一連の編集が完了したら /react-doctor を実行してフロントエンドの問題を診断してください。"}}
EOF

exit 0
