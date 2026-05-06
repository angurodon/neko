---
name: pre-commit
description: コミット前の包括的チェック（lint, typecheck, build, react-doctor）を実行
---

コミット前の包括的なチェックを実行してください。

## 1. 静的解析・型チェック

```bash
npm run lint
npm run typecheck
```

エラーがある場合は修正してから次に進む。設定（`eslint.config.*` / `tsconfig.json`）を緩めて回避するのは禁止。

## 2. ビルド確認

```bash
npm run build
```

`out/` への static export まで成功することを確認。

## 3. React Doctor 診断

`/react-doctor diff` を実行し、`develop` との差分に対するスコアと指摘を確認する。
高優先度（セキュリティ・a11y）の指摘があれば修正する。

## 4. 結果サマリー

全チェックの結果を一覧（OK / NG）で報告してください:

```
- lint:         OK/NG
- typecheck:    OK/NG
- build:        OK/NG
- react-doctor: スコア XX/100, 高優先指摘 N 件
```

問題がある場合は修正方法を提案してください。
