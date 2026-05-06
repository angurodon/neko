---
name: deploy-check
description: prod へ push する前のデプロイ前チェック（CI 相当 + サブパスリライト確認）
---

`prod` ブランチへ push して本番デプロイをトリガする前の最終チェックを行ってください。

## 前提

- `prod` への push で GitHub Actions (`deploy.yml`) が S3 sync + CloudFront invalidation を実行する
- `develop` で動作確認済みであることが前提
- ステージング環境は無い

## 手順

### 1. ブランチ状態の確認

```bash
git status
git branch --show-current
```

`develop` または `feature/*` で作業中であること、未コミット変更が無いことを確認。

### 2. ローカルで CI 相当を実行

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

`out/` が生成され、`out/index.html`, `out/company/index.html` などサブパスの index が出力されていることを確認:

```bash
ls out/
ls out/company out/overview out/privacy
```

### 3. CloudFront Function の整合確認

`infra/cloudfront/url-rewrite.js` を読み、サブパス → `index.html` のリライトロジックに変更が無いか確認。
変更がある場合は **コードと AWS 上の関数 (`ic-gr-url-rewrite`) の両方** を更新する必要があるため、ユーザーに警告。

### 4. デプロイ手順の提示

チェックが通ったら、以下を提示してユーザーの確認を取ってから実行:

```bash
git checkout prod
git merge --ff-only develop      # または PR develop → prod
git push origin prod              # ← これがデプロイトリガ
```

push 後に GitHub Actions の進行を確認:

```bash
gh run list --branch prod --limit 3
gh run watch
```

## 注意

- `prod` への直接 push はワークフロートリガになり、本番が即座に書き換わる
- 緊急時のロールバックは前のコミットへ revert → push（同じパイプラインで戻る）
- CloudFront Function の変更はリポジトリだけでは反映されない（AWS 側のデプロイが別途必要）。`infra/cloudfront/README.md` を参照
