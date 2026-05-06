#!/bin/bash
# PreToolUse hook: git commit 前にステージングされたファイルからシークレットを検出
set -euo pipefail

COMMAND=$(jq -r '.tool_input.command // empty')

if [ -z "$COMMAND" ]; then
  exit 0
fi

if ! echo "$COMMAND" | grep -qE '^git commit'; then
  exit 0
fi

echo "Secret detection: ステージングされたファイルをスキャン中..." >&2

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM 2>/dev/null) || exit 0

if [ -z "$STAGED_FILES" ]; then
  exit 0
fi

FOUND_SECRETS=false

for FILE in $STAGED_FILES; do
  case "$FILE" in
    *.lock|package-lock.json|*.min.js|*.min.css|*.d.ts|out/*|.next/*)
      continue
      ;;
  esac

  [ -f "$FILE" ] || continue

  MATCHES=$(grep -nEi '(password|passwd|secret|api_key|apikey|access_key|private_key|aws_access|aws_secret|token)\s*[:=]\s*["\x27][^\s"'\'']{8,}' "$FILE" 2>/dev/null) || true

  if [ -n "$MATCHES" ]; then
    echo "WARNING: $FILE にシークレットの可能性がある文字列が検出されました:" >&2
    echo "$MATCHES" | head -5 >&2
    FOUND_SECRETS=true
  fi
done

if [ "$FOUND_SECRETS" = true ]; then
  echo "" >&2
  echo "WARNING: シークレットがハードコードされている可能性があります。環境変数 / GitHub Actions Secrets / AWS Secrets Manager を使用してください。" >&2
fi

exit 0
