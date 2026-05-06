#!/bin/bash
# Stop hook: app/ または components/ に未コミットの変更がある場合のみ React Doctor のスコアを表示
set -u

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}" || exit 0

# 対象領域に変更があるかチェック
HAS_CHANGES=0
{
  git diff --name-only HEAD 2>/dev/null
  git ls-files --others --exclude-standard 2>/dev/null
} | grep -qE '^(app|components)/' && HAS_CHANGES=1

if [ "$HAS_CHANGES" -eq 0 ]; then
  exit 0
fi

# React Doctor をスコアモードで実行（リポジトリルートが対象）
SCORE=$(npx --yes react-doctor@latest . --score 2>/dev/null | tail -1)

if [[ "$SCORE" =~ ^[0-9]+$ ]]; then
  printf '{"systemMessage": "React Doctor スコア: %s/100 （詳細は /react-doctor で確認）"}\n' "$SCORE"
fi

exit 0
