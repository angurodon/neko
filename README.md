# ic-gr-website

Ic-Growth コーポレートサイト (`https://www.ic-gr.net/`) のソースコード。

Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 製の静的サイト。`next build` で静的書き出しを行い、AWS S3 + CloudFront から配信する。

## 開発

```bash
nvm use            # .nvmrc に従って Node 20
npm install
npm run dev        # http://localhost:3000
npm run build      # next build → out/
npm run lint
```

## ブランチ運用

```
develop  ← 機能ブランチからの PR を集約（デフォルト）
   │
   ▼
  prod   ← push されると本番デプロイ
```

機能ブランチは `feature/<topic>` 命名で `develop` から切る。
ステージング環境は存在しないため、`develop` での動作確認後にそのまま `prod` へ進める。

---

## 本番デプロイ

`prod` ブランチへの push で GitHub Actions が自動デプロイする。手動操作は不要。

### 手順（推奨：PR 経由）

1. `develop` 上で動作確認（`npm run dev` でローカル確認、必要なら機能ブランチを develop に取り込む）
2. `develop → prod` の PR を作成・マージ（**push された瞬間に本番デプロイが走る**）
3. Actions タブで `Deploy to ic-gr.net` ジョブが完走するのを確認
4. `https://www.ic-gr.net/` を全ページ + 直リンクハードリロードで確認

### 手順（緊急時：CLI から直接）

`prod` への push が直接走るため取り扱い注意。

```bash
git checkout prod && git merge --no-ff develop && git push   # ← ここでデプロイ起動
```

### ワークフロー

| ファイル | トリガ | やること |
|---|---|---|
| `.github/workflows/ci.yml` | `develop` / `prod` への PR | `npm run lint` + `npm run build` |
| `.github/workflows/deploy.yml` | `prod` への push（または手動 `workflow_dispatch`） | `next build` → `aws s3 sync out/` → CloudFront invalidation |

GitHub Actions は **OIDC で IAM Role を assume する**ので、リポジトリに長期 AWS 認証情報を置かない。仕組みの詳細は [`doc/deploy-architecture.md`](doc/deploy-architecture.md) を参照。

### 失敗時の挙動

- **CI ジョブが赤** → コードまたは型の問題。原因を直して PR を更新する
- **deploy ジョブが赤（assume role 失敗）** → IAM Role の信頼ポリシーがリポジトリ名・ブランチを正しく指しているか確認（[トラブルシュート](#災害復旧--再構築)）
- **deploy ジョブが赤（s3 sync / invalidation 失敗）** → 権限ポリシー、もしくは S3 / CloudFront のリソース ID 不一致を疑う
- **デプロイは完走したのに反映されない** → CloudFront のキャッシュ。invalidation が走っているはずだが、ブラウザ側のキャッシュも疑う（DevTools → Disable cache）。`E3CUYP7CXV3V06`（`*.ic-gr.com` 系）には invalidation を撃っていない

### 緊急時の手動デプロイ（フォールバック）

ローカルから AWS CLI で同じ操作を実行できる。

```bash
npm ci
npm run build
aws --profile ic-gr s3 sync out/ s3://ic-gr.com/ --delete
aws --profile ic-gr cloudfront create-invalidation \
  --distribution-id EHFD30ZL5XZ0U --paths "/*"
```

`ic-gr.com` 側 (`*.ic-gr.com`) も即時反映したい場合は、上記の invalidation を `--distribution-id E3CUYP7CXV3V06` でも追加で実行する。

---

## AWS インフラ

| リソース | 値 |
|---|---|
| AWS アカウント | `058264181659`（ローカル CLI プロファイル `ic-gr`） |
| リージョン | `ap-northeast-1`（CloudFront / ACM のみ `us-east-1`） |
| S3 バケット | `ic-gr.com`（非公開、CloudFront OAC 経由のみ `s3:GetObject` 許可） |
| CloudFront（本番） | `EHFD30ZL5XZ0U` / `d2sot6ky3ie96o.cloudfront.net` — alias: `ic-gr.net`, `www.ic-gr.net`, `*.ic-gr.net` |
| CloudFront（旧 `.com` 系） | `E3CUYP7CXV3V06` / `d16tpwwtsnlv00.cloudfront.net` — alias: `ic-gr.com`, `www.ic-gr.com`, `*.ic-gr.com`（同じ S3 を origin） |
| Route53 ホストゾーン | `ic-gr.net.`（A レコードで CloudFront にエイリアス、ワイルドカードあり） |
| デプロイ用 IAM Role | `github-actions-ic-gr-deploy`（GitHub OIDC で `repo:angurodon/ic-gr-website:ref:refs/heads/prod` のみ信頼） |
| Default Root Object | `index.html` |

`output: 'export'` + `trailingSlash: true` により、各ルートが `out/<route>/index.html` で生成される。CloudFront の Custom Error Response 設定なしでハードリロードでも 200 が返る。

> **AWS 側の初回セットアップは完了済み**（OIDC Provider と IAM Role `github-actions-ic-gr-deploy` は作成済み）。日常運用では追加の AWS 操作は不要。再構築が必要になった場合のみ [災害復旧 / 再構築](#災害復旧--再構築) を参照。

---

## 災害復旧 / 再構築

AWS リソースを誤って消したり別アカウントへ引越す際の手順。日常運用では使わない。

### OIDC Provider と IAM Role の再作成

`aws --profile ic-gr` で以下を順に実行する。

```bash
# 1. OIDC Provider
aws --profile ic-gr iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1

# 2. IAM Role（trust-policy.json と role-policy.json を作ってから）
aws --profile ic-gr iam create-role \
  --role-name github-actions-ic-gr-deploy \
  --assume-role-policy-document file://trust-policy.json

aws --profile ic-gr iam put-role-policy \
  --role-name github-actions-ic-gr-deploy \
  --policy-name deploy \
  --policy-document file://role-policy.json
```

`trust-policy.json`（GitHub Actions に AssumeRole を許可する条件）:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::058264181659:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:angurodon/ic-gr-website:ref:refs/heads/prod"
        }
      }
    }
  ]
}
```

`role-policy.json`（このロールが実行できるアクション）:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::ic-gr.com"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::ic-gr.com/*"
    },
    {
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "arn:aws:cloudfront::058264181659:distribution/EHFD30ZL5XZ0U"
    }
  ]
}
```

### 切り分けのポイント

deploy ジョブが落ちた時の典型的な原因:

- **AssumeRole 失敗**: 信頼ポリシーの `sub` がリポジトリ名・ブランチ名と一致していない（リネーム後など）
- **S3 / CloudFront 操作で `AccessDenied`**: 権限ポリシーで指定したリソース ARN が違う
- **OIDC Provider 認証エラー**: GitHub 側のキー更新でサムプリントが古くなった可能性

---

## ディレクトリ構成

```
ic-gr-website/
├── app/
│   ├── layout.tsx              # ルートレイアウト（Header + Footer + ScrollToTop + metadata）
│   ├── page.tsx                # / （SectionComponent1 + Backup + Consult）
│   ├── overview/page.tsx       # /overview
│   ├── company/page.tsx        # /company
│   ├── privacy/page.tsx        # /privacy
│   ├── sitemap.ts / robots.ts  # ビルド時に sitemap.xml / robots.txt を生成
│   ├── globals.css             # Tailwind v4 + CSS 変数
│   └── components/
│       ├── Header.tsx          # 'use client'（ハンバーガーメニュー）
│       ├── Footer.tsx
│       ├── ScrollToTop.tsx     # 'use client'（usePathname でスクロールリセット）
│       ├── SectionComponent1.tsx
│       ├── Backup.tsx
│       └── Consult.tsx
├── public/
│   ├── favicon.ico / logo192.png / logo512.png
│   ├── manifest.webmanifest
│   └── images/                 # next/image で参照する画像
├── next.config.ts              # output: 'export', trailingSlash: true
├── .github/workflows/          # ci.yml, deploy.yml
└── CLAUDE.md                   # AI アシスタント向けプロジェクトメモ
```

問い合わせは外部 Google Form（`Header.tsx` / `Footer.tsx` 内に URL ハードコード）。
