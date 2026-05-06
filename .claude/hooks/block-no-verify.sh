#!/bin/bash
# PreToolUse hook: --no-verify フラグの使用をブロック
set -euo pipefail

COMMAND=$(jq -r '.tool_input.command // empty')

if [ -z "$COMMAND" ]; then
  exit 0
fi

if echo "$COMMAND" | grep -qE '\-\-no-verify'; then
  echo "BLOCKED: --no-verify フラグは禁止されています。pre-commit / CI のチェックをバイパスせず、原因を修正してください。" >&2
  exit 2
fi

exit 0
