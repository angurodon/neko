# ic-gr-website — Ic-Growth コーポレートサイト

Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 製の静的サイト。`https://www.ic-gr.net/` で公開。

> 旧称 `neko`。リポジトリ名は `ic-gr-website` にリネーム済み（GitHub の自動リダイレクトで旧 URL も一定期間有効）。

## 開発コマンド

```bash
nvm use            # .nvmrc に従って Node 20 を選択
npm install
npm run dev        # http://localhost:3000
npm run build      # next build （static export → out/）
npm run lint
```

## デプロイ

`prod` ブランチへの push で GitHub Actions が自動デプロイする（手動操作は不要）。

```
develop  ← 機能ブランチからの PR を集約
   │
   ▼
  prod   ← push されると本番デプロイ
```

ステージング環境は存在しない。`develop` で動作確認後にそのまま `prod` へ進める。

ワークフロー:
- `.github/workflows/ci.yml` — PR 時に `npm run lint` + `npm run build` を実行
- `.github/workflows/deploy.yml` — `prod` push をトリガに `next build` → `aws s3 sync out/` → CloudFront invalidation

GitHub Actions は OIDC で IAM Role `arn:aws:iam::058264181659:role/github-actions-ic-gr-deploy` を assume するため、リポジトリに AWS シークレットは持たない。

### 緊急時の手動デプロイ（フォールバック）

ローカルから `aws --profile ic-gr` で同じことを実行できる。

```bash
npm ci
npm run build
aws --profile ic-gr s3 sync out/ s3://ic-gr.com/ --delete
aws --profile ic-gr cloudfront create-invalidation \
  --distribution-id EHFD30ZL5XZ0U --paths "/*"
```

## インフラ構成（AWS 上の実体）

| リソース | 値 |
|---|---|
| AWS アカウント | `058264181659`（CLI プロファイル `ic-gr`） |
| S3 バケット | `ic-gr.com`（ap-northeast-1、非公開、CloudFront OAC 経由のみ `s3:GetObject` 許可） |
| CloudFront（本番） | `EHFD30ZL5XZ0U` / `d2sot6ky3ie96o.cloudfront.net` — alias: `ic-gr.net`, `www.ic-gr.net`, `*.ic-gr.net` |
| CloudFront（旧 `.com` 系） | `E3CUYP7CXV3V06` / `d16tpwwtsnlv00.cloudfront.net` — alias: `ic-gr.com`, `www.ic-gr.com`, `*.ic-gr.com`（同じ S3 を origin） |
| Route53 ホストゾーン | `ic-gr.net.`（A レコードで CloudFront にエイリアス、ワイルドカードあり） |
| デプロイ用 IAM Role | `github-actions-ic-gr-deploy`（GitHub OIDC で `repo:angurodon/ic-gr-website:ref:refs/heads/prod` のみ信頼） |
| Default Root Object | `index.html` |

`.com` ドメイン側の CloudFront には今回のデプロイでは invalidation を打っていないため、`*.ic-gr.com` でも即時反映したい場合は手動で `--distribution-id E3CUYP7CXV3V06` の invalidation を実行する。

### SPA 直リンク問題は解消済み

旧 CRA では CloudFront に Custom Error Response 未設定だったため `/overview` などのリロードで 403 を返していたが、Next.js の static export + `trailingSlash: true` で各ルートが `out/overview/index.html` として生成されるため、ハードリロードでも 200 が返る。

## ディレクトリ構成

```
ic-gr-website/
├── app/
│   ├── layout.tsx              # ルートレイアウト（Header + Footer + ScrollToTop + metadata）
│   ├── page.tsx                # / （SectionComponent1 + Backup + Consult）
│   ├── overview/page.tsx       # /overview （事業概要 + 3 セクション）
│   ├── company/page.tsx        # /company （会社概要テーブル）
│   ├── privacy/page.tsx        # /privacy （個人情報保護方針）
│   ├── sitemap.ts              # ビルド時に sitemap.xml を生成
│   ├── robots.ts               # ビルド時に robots.txt を生成
│   ├── globals.css             # Tailwind v4 + CSS 変数（ブランドカラー / フォント）
│   └── components/
│       ├── Header.tsx          # 'use client' （ハンバーガー開閉）
│       ├── Footer.tsx
│       ├── ScrollToTop.tsx     # 'use client' （usePathname でスクロールリセット）
│       ├── SectionComponent1.tsx
│       ├── Backup.tsx          # トップの3カード（/overview#... に遷移）
│       └── Consult.tsx         # 電話相談バナー
├── public/
│   ├── favicon.ico             # ※ Ic-Growth ブランドの ico に差し替え予定
│   ├── apple-touch-icon.png    # ※ ブランド資産入手後に追加
│   ├── logo192.png / logo512.png
│   ├── manifest.webmanifest
│   └── images/                 # next/image で参照する画像群
├── next.config.ts              # output: 'export', trailingSlash: true, images.unoptimized: true
├── tsconfig.json
├── postcss.config.mjs          # @tailwindcss/postcss
├── .nvmrc                      # 20
└── .github/workflows/
    ├── ci.yml
    └── deploy.yml
```

問い合わせは外部 Google Form（`Header.tsx` / `Footer.tsx` 内に URL ハードコード）。

## ブランド資産（未確定）

旧 CRA 版から失われたタイトル `Ic-Growth` と独自 favicon は、ユーザーから素材を受領後に以下を差し替える：
- `public/favicon.ico`（マルチサイズ ICO 推奨: 16/32/48）
- `public/apple-touch-icon.png` (180×180)
- `public/logo192.png` (192×192)
- `public/logo512.png` (512×512)
タイトルとメタ description は `app/layout.tsx` で定義済み。

## ブランチ運用

- `develop` （デフォルト）: 機能ブランチからの PR を集約
- `prod`: push されると本番デプロイ
- 旧 `main` / `gh-pages` ブランチは過去の遺物。ステージングは持たない運用に変更したため `main` は使わない
- 機能ブランチは `feature/<topic>` 命名で `develop` から切る
