# neko — Ic-Growth コーポレートサイト

Create React App 製の SPA。本番は AWS S3 + CloudFront で `https://www.ic-gr.net/` に公開。

## 開発コマンド

```bash
npm install
npm start          # http://localhost:3000
npm run build      # build/ に成果物を出力
npm test
```

## デプロイ（本番: ic-gr.net）

参考記事: https://qiita.com/ushi_osushi/items/a32d7b710567c2313faa （S3+CloudFront+Route53+ACM の手動構築ガイド。CI/CDは無く手動デプロイ）

AWS プロファイル: `ic-gr`（アカウント `058264181659`）

```bash
# 1. ビルド（相対パスで出すため PUBLIC_URL を上書き）
PUBLIC_URL=. npm run build

# 2. S3 同期（バケットは ap-northeast-1 / 非公開・OAC経由）
aws --profile ic-gr s3 sync build/ s3://ic-gr.com/ --delete

# 3. CloudFront キャッシュ無効化（ic-gr.net 用）
aws --profile ic-gr cloudfront create-invalidation \
  --distribution-id EHFD30ZL5XZ0U --paths "/*"
```

### インフラ構成（AWS 上の実体）

| リソース | 値 |
|---|---|
| S3 バケット | `ic-gr.com`（ap-northeast-1、非公開、OAC からのみ `s3:GetObject` 許可） |
| CloudFront（本番） | `EHFD30ZL5XZ0U` / `d2sot6ky3ie96o.cloudfront.net` — alias: `ic-gr.net`, `www.ic-gr.net`, `*.ic-gr.net` |
| CloudFront（旧/併設） | `E3CUYP7CXV3V06` / `d16tpwwtsnlv00.cloudfront.net` — alias: `ic-gr.com`, `www.ic-gr.com`, `*.ic-gr.com` |
| Route53 ホストゾーン | `ic-gr.net.`（A レコードで CloudFront にエイリアス、ワイルドカードあり） |
| Default Root Object | `index.html` |

`.com` ドメインの CloudFront も同じ S3 バケットを向いているので、`s3 sync` 後は両方の invalidation を打つかどうか判断する。

### `package.json` の `homepage` に注意

`homepage` が `https://angurodon.github.io/neko` のままになっている（旧 GitHub Pages 配信の名残）。
そのままビルドすると CRA がアセットを `/neko/static/...` 配下に出力し、ic-gr.net では 404 になる。
**AWS デプロイ時は必ず `PUBLIC_URL=.` か `homepage: "."` で上書きしてビルドする**こと。
S3 上の `index.html` は実際に相対パス（`./static/js/...`）でビルドされている。

### `npm run deploy` は AWS 用ではない

`package.json` の `deploy` スクリプトは `gh-pages -d build`（GitHub Pages 用）。AWS デプロイには使わない。

## ルーティング上の既知の制約

- `App.js` は `react-router-dom` の `BrowserRouter` を使用。ルート: `/`, `/neko`, `/overview`, `/company`, `/privacy`。
- CloudFront のカスタムエラーレスポンス未設定。`/overview` 等の**直リンク（リロード）は S3 から 403/404 が返る**。現状はヘッダのリンク経由でのみ遷移可能。
- 直リンクを動かすには CloudFront に `403/404 → /index.html (200)` の Custom Error Response を追加する必要がある。

## ディレクトリ構成

```
src/
├── App.js                       # ルーティング
├── index.js / index.css         # エントリ
├── ScrollToTop.js               # ルート遷移時のスクロール初期化
├── assets/                      # 画像（ロゴ、サービス紹介画像）
├── components/
│   ├── HeaderComponents/        # ヘッダ（ハンバーガーメニュー、外部 Google フォームへのリンク）
│   ├── FooterComponents/
│   ├── HomepageComponents/      # `/` と `/neko` の本体。SectionComponent1 + Backup + Consult を組み合わせる
│   ├── SectionComponent1/       # トップのヒーロー部
│   ├── BackupComponents/        # サービス: バックアップ系
│   ├── ConsultComponents/       # サービス: コンサル系
│   ├── OverviewComponents/      # /overview 事業概要
│   ├── CompanyComponents/       # /company 会社概要
│   └── PrivacyComponents/       # /privacy
└── Gabage/                      # 旧コンポーネント（typo: Garbage ではなく Gabage）。SystemSupport / BusinessSupport / MAS。App.js でコメントアウト中。削除可否を確認してから消すこと
```

問い合わせは外部 Google Form（Header.jsx 内に URL ハードコード）。

## 未使用の依存関係

`i18next` 系・`react-i18next` 系・`react-scroll` 系が `package.json` にあるがコード側で `import` されていない。多言語対応や smooth scroll を再導入する予定が無いなら、`npm uninstall` で整理して構わない。

## ブランチ運用

- 本流: `main`
- 機能別ブランチ（`form`, `phone`, `footer`, `route`, `sumaho`, `fix-1` 等）を切って PR → squash/merge する流れ。
- `gh-pages` ブランチは旧 GitHub Pages 配信の成果物ブランチ。AWS 配信に移行済みのため通常触らない。
