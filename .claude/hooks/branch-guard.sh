#!/bin/bash
# PreToolUse hook: 保護ブランチ (develop / prod / main) での直接編集をブロック
set -euo pipefail

PROTECTED_BRANCHES="^(develop|prod|main)$"

# git リポジトリでない場合はスキップ
if ! git rev-parse --git-dir >/dev/null 2>&1; then
  exit 0
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")

if [ -z "$BRANCH" ]; then
  exit 0
fi

if echo "$BRANCH" | grep -qE "$PROTECTED_BRANCHES"; then
  cat >&2 <<EOF
BLOCKED: 現在 '${BRANCH}' ブランチで編集しようとしています。保護ブランチには直接コミットしないでください。

feature ブランチを切ってから再度実行してください:

  /branch-from-develop <topic>

または

  git checkout -b feature/<topic>
EOF
  exit 2
fi

exit 0
