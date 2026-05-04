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
  main   ← ステージング相当
   │
   ▼
  prod   ← push されると本番デプロイ
```

機能ブランチは `feature/<topic>` 命名で `develop` から切る。

---

## 本番デプロイ

`prod` ブランチへの push で GitHub Actions が自動デプロイする。手動操作は不要。

```bash
# 例: develop で動作確認 → main でステージ確認 → prod に進める
git checkout main && git merge --no-ff develop && git push
git checkout prod && git merge --no-ff main   && git push   # ← ここでデプロイ起動
```

ワークフロー:

| ファイル | トリガ | やること |
|---|---|---|
| `.github/workflows/ci.yml` | `develop` / `main` / `prod` への PR | `npm run lint` + `npm run build` |
| `.github/workflows/deploy.yml` | `prod` への push（または手動 dispatch） | `next build` → `aws s3 sync out/` → CloudFront invalidation |

GitHub Actions は **OIDC で IAM Role を assume する**ので、リポジトリに長期 AWS 認証情報を置かない。

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

### 初回セットアップ手順（`prod` 初回 push 前に一度だけ実施）

ローカルで `aws --profile ic-gr` を使う前提で記載。Console で行っても可。

#### 1. GitHub OIDC Provider を作成

```bash
aws --profile ic-gr iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

> サムプリントは GitHub 公式の値。詳細は [Configuring OpenID Connect in Amazon Web Services](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) を参照。既に作成済みのアカウントではこのコマンドはスキップする。

#### 2. デプロイ用 IAM Role を作成

信頼ポリシー（`trust-policy.json`）:

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

権限ポリシー（`role-policy.json`）:

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

作成コマンド:

```bash
aws --profile ic-gr iam create-role \
  --role-name github-actions-ic-gr-deploy \
  --assume-role-policy-document file://trust-policy.json

aws --profile ic-gr iam put-role-policy \
  --role-name github-actions-ic-gr-deploy \
  --policy-name deploy \
  --policy-document file://role-policy.json
```

#### 3. S3 バケットのバージョニング有効化（事故対策）

```bash
aws --profile ic-gr s3api put-bucket-versioning \
  --bucket ic-gr.com \
  --versioning-configuration Status=Enabled
```

`s3 sync --delete` で消したオブジェクトも 30 日間（任意）はバージョン履歴から復旧できる。

### 動作確認

セットアップ後、初回は手動トリガーで安全に確認できる:

1. GitHub の `Actions` タブ → `Deploy to ic-gr.net` → `Run workflow` → ブランチ `prod` を指定
2. ジョブが完走したら `https://www.ic-gr.net/` を全ページ + 直リンクハードリロードで確認

エラーが出たら主に以下のいずれか:
- IAM Role の信頼ポリシー（`sub` 条件）がリポジトリ名・ブランチ名と一致していない
- IAM Role の権限ポリシーで S3 / CloudFront の対象リソース ARN が違う
- OIDC Provider のサムプリントが古い（GitHub 側のキー更新時）

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
