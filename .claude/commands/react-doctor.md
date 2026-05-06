---
name: react-doctor
description: React Doctor でフロントエンドを診断し、検出された問題を修正する（スコア、セキュリティ、パフォーマンス、a11y、アーキテクチャ）
argument-hint: <blank | diff | score | path>
---

React Doctor でフロントエンドのコード品質を診断し、検出された問題を修正してください: $ARGUMENTS

## React Doctor とは

Aiden Bai（Million.js / React Scan 作者）による React コードベース診断 CLI。プロジェクトをスキャンしてセキュリティ・パフォーマンス・正確性・アクセシビリティ・アーキテクチャの問題を 47 以上のルールで検出し、0〜100 のスコアで健全性を可視化する。

主な検出対象:
- 不要な `useEffect`（派生ステート計算・イベントハンドラで代替可能な処理）
- アクセシビリティ問題（`alt` 属性欠落、ラベルなしフォーム要素）
- Prop drilling（Context / Composition で置き換えるべき多段 props 渡し）
- デッドコード（未使用 export / 未参照ファイル）
- 古い / 非推奨パターン、セキュリティ上のアンチパターン

## 対象の判定

- 引数なし → リポジトリ全体（`app/`, `components/`）をスキャン
- 引数が `diff` → `develop` ブランチとの差分のみスキャン
- 引数が `score` → スコアのみ出力（修正フェーズに進まない）
- 引数がパス → 当該パス配下をスキャン

設定は `react-doctor.config.json` を参照（`.next/`, `out/`, `node_modules/` は除外済み）。

## 手順

### 1. 診断実行

リポジトリルートで React Doctor を実行する。

```bash
# 詳細表示（問題のあるファイルと行番号）
npx --yes react-doctor@latest . --verbose

# 差分スキャン（引数: diff）
npx --yes react-doctor@latest . --diff develop --verbose

# スコアのみ（引数: score）
npx --yes react-doctor@latest . --score
```

初回実行時は `npx` によるパッケージ取得に時間がかかる。

### 2. 結果の読み取り

- 総合スコア（例: `Score: 87/100`）
- 検出されたルール違反のカテゴリ別件数
- ファイルパス・行番号付きの個別指摘

### 3. 除外対象の判定

以下のファイルは指摘があっても**編集しない**:
- `.next/`, `out/`, `node_modules/`（ビルド成果物・依存）
- `next-env.d.ts`（Next.js 自動生成）

### 4. 修正方針の提示

検出件数が多い場合は、ユーザーに修正スコープを確認する前に以下を整理して提示:

- **高優先**: セキュリティ、a11y 違反、明確なバグ
- **中優先**: 不要な `useEffect`、prop drilling、パフォーマンス
- **低優先**: デッドコード、命名、スタイル

### 5. 修正の実行

優先度順に 1 件ずつ修正。各修正後に以下を遵守:

- `.claude/rules/typescript-nextjs.md` のコーディング規約を守る
- `any` は導入しない。やむを得ない場合は `unknown` + 型ガード
- Server Components をデフォルトに。`"use client"` は必要時のみ

### 6. 検証

修正後に以下を実行し、スコアが改善し既存機能が壊れていないことを確認:

```bash
npx --yes react-doctor@latest . --score
npm run lint
npm run typecheck
npm run build
```

### 7. 結果報告

```
## React Doctor 診断結果

### スコア
- 修正前: XX/100
- 修正後: YY/100

### 修正した問題
- [カテゴリ] 内容: ファイルパス:行番号

### 未対応（理由付き）
- [カテゴリ] 内容: 理由

### ビルド・型チェック
- lint:      OK/NG
- typecheck: OK/NG
- build:     OK/NG
```

## 注意事項

- `npx --yes react-doctor@latest` は毎回最新を取得する。オフライン環境ではユーザーに確認する
- 大規模リファクタ（prop drilling → Context 化など）はユーザー確認を取ってから実行
- スコア改善のためだけに本質を逸脱する変更（意味のある `useEffect` を無理に除去する等）は避ける
