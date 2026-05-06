---
name: branch-from-develop
description: develop から最新を取得して feature/<topic> ブランチを切る
argument-hint: <topic>
---

`develop` の最新から `feature/$ARGUMENTS` ブランチを切ってください。

## 手順

### 1. 引数の検証

`$ARGUMENTS` が空の場合、ユーザーにトピック名（例: `add-contact-form`, `fix-mobile-header`）を確認する。
`feature/` プレフィックスが既に含まれていれば取り除く（重複防止）。

### 2. develop の最新化

```bash
git checkout develop
git pull --ff-only origin develop
```

未コミットの変更があれば「stash するか確認してから」進める。

### 3. ブランチ作成

```bash
git checkout -b feature/<topic>
```

### 4. 報告

```
作業ブランチを作成しました:
- 元ブランチ: develop (commit: <短縮 SHA>)
- 新ブランチ: feature/<topic>
```

## 命名規則

- `feature/<topic>` — 新機能・改善
- `fix/<topic>` — バグ修正
- `chore/<topic>` — 設定・ドキュメント等

`<topic>` は kebab-case で簡潔に（例: `add-favicon`, `fix-overview-typo`）。
