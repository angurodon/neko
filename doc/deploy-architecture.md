# デプロイの仕組み

`prod` ブランチに push した瞬間に `https://www.ic-gr.net/` が更新される、その裏側で何が起きているかを解説する。

このドキュメントは「自動デプロイってどういう仕組み？」を理解するための読み物。具体的な手順は [`README.md`](../README.md) を参照。

---

## 全体像

```
[開発者] git push prod
   │
   ▼
[GitHub] イベント検知 → 使い捨て VM 起動
   │
   ▼
[VM] OIDC トークン発行 → AWS で AssumeRole
   │
   ▼
[VM] 一時クレデンシャルで:
     ├── next build           （out/ を生成）
     ├── aws s3 sync          （バケットへアップロード）
     └── cloudfront invalidation （CDN キャッシュ削除）
   │
   ▼
[VM] 破棄
   │
   ▼
[エンドユーザー] 新版を閲覧
```

所要時間はトータル 3〜5 分。長期的な秘密情報（AWS アクセスキーなど）は **どこにも保存していない**。

---

## 1. GitHub Actions のイベント駆動

リポジトリで何かが起きると（push, PR, issue コメント...）GitHub が **イベント** を発火する。

`.github/workflows/deploy.yml` の冒頭：

```yaml
on:
  push:
    branches: [prod]
  workflow_dispatch:
```

これが「`prod` ブランチに push があったら、または手動トリガーで、このワークフローを動かす」という宣言。GitHub は内部でイベントを監視していて、検知すると：

1. 使い捨ての仮想マシン（runner と呼ばれる Ubuntu の入った VM）を立ち上げる
2. その VM にこのリポジトリをクローン
3. workflow ファイルに書いた `steps` を上から順に実行
4. 終わったら VM を破棄する

VM はジョブごとに **毎回まっさら**。前回の状態は持ち越されない。これにより「環境が汚れて動かなくなる」事故が起きない。

### よく使う他のイベント

| トリガ | 用途 |
|---|---|
| `pull_request` | PR が開かれた／更新されたとき | 
| `push` | 特定ブランチに push されたとき |
| `schedule` | cron 式で定期実行 |
| `workflow_dispatch` | GitHub UI から手動起動 |

このプロジェクトでは `pull_request`（CI）と `push: prod` + `workflow_dispatch`（デプロイ）を使っている。

---

## 2. OIDC：長期キーを置かずに AWS にログインする

ここがこの仕組みの核心。

### 素朴な方法（避けたい）

「AWS のアクセスキー (`AKIA...` と `secret`) を GitHub Secrets に貼り付ける」
- 漏洩したら全権を握られる
- 定期的にローテーションが必要
- 誰がいつ使ったか追跡しにくい
- そもそも長期の機密情報を VCS まわりに置きたくない

### OIDC の方法

GitHub Actions のジョブが動くとき、GitHub は「**このジョブは確かに `angurodon/ic-gr-website` の `prod` ブランチで動いている**」という署名付きの証明書（**OIDC ID トークン**, JWT 形式）を発行できる。

トークンの中身は概ねこうなっている（抜粋）：

```json
{
  "iss": "https://token.actions.githubusercontent.com",
  "sub": "repo:angurodon/ic-gr-website:ref:refs/heads/prod",
  "aud": "sts.amazonaws.com",
  "ref": "refs/heads/prod",
  "sha": "abc123...",
  "repository": "angurodon/ic-gr-website",
  "actor": "angurodon",
  "exp": 1730000000
}
```

特徴：

- **GitHub の秘密鍵で署名されている**：偽造不可能
- **失効時間 (`exp`) が短い**：通常 5〜10 分
- **発行元 (`iss`) が GitHub 公式 URL**：AWS が信頼する OIDC Provider と一致する

このトークンを AWS STS (Security Token Service) に提示すると、AWS は次のように判断する：

```
[トークンの署名を検証]
  GitHub の公開鍵で復号できれば本物 → OK
  ↓
[IAM Role の信頼ポリシーをチェック]
  sub が repo:angurodon/ic-gr-website:ref:refs/heads/prod と一致する? → OK
  ↓
[最大 1 時間有効な一時クレデンシャルを発行]
  AccessKeyId, SecretAccessKey, SessionToken を返す
```

ジョブはこの一時キーで `aws s3 sync` などを実行する。ジョブが終われば VM が破棄され、キーも自動失効する。

### 例えるなら

マイナンバーカードを使った本人確認に近い。

- **国（GitHub）** が「この人は確かに山田太郎」と署名する
- **銀行（AWS）** はその署名を検証して「じゃあ口座操作 OK」と判断する
- カードはコピー不可、有効期限あり

リポジトリには「身分証を出してください」と書いてあるだけで、身分証そのものや銀行の口座番号は入っていない。

---

## 3. 信頼の3層構造

OIDC で「誰がジョブを動かしているか」が分かったあと、AWS は3段階で許可を絞り込んでいる。

### 第1層：OIDC Provider の登録

AWS に「GitHub の発行する署名は信用していい」と教える設定。アカウント全体で1個作れば十分。

```
arn:aws:iam::058264181659:oidc-provider/token.actions.githubusercontent.com
```

これがないと、いくら正しいトークンを提示しても「知らない発行元」として弾かれる。

### 第2層：IAM Role の信頼ポリシー（誰に使わせるか）

`github-actions-ic-gr-deploy` ロールの信頼ポリシーには次の条件が書いてある：

```json
"Condition": {
  "StringEquals": {
    "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
  },
  "StringLike": {
    "token.actions.githubusercontent.com:sub": "repo:angurodon/ic-gr-website:ref:refs/heads/prod"
  }
}
```

つまり「`angurodon/ic-gr-website` リポジトリの `prod` ブランチからのリクエストだけ、このロールを引き受けさせる」。

- 別のリポジトリからは弾かれる
- 同じリポジトリでも `develop` ブランチからは弾かれる
- 同じリポジトリの PR からも弾かれる（`sub` が `pull_request` 形式になるので）

### 第3層：IAM Role の権限ポリシー（何をできるか）

ロールに付いている権限は最小限：

```json
{
  "Action": ["s3:ListBucket"],
  "Resource": "arn:aws:s3:::ic-gr.com"
},
{
  "Action": ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"],
  "Resource": "arn:aws:s3:::ic-gr.com/*"
},
{
  "Action": ["cloudfront:CreateInvalidation"],
  "Resource": "arn:aws:cloudfront::058264181659:distribution/EHFD30ZL5XZ0U"
}
```

仮に攻撃者がトークンを奪い、信頼ポリシーをすり抜けたとしても：

- **`ic-gr.com` バケット以外には触れない**
- **`EHFD30ZL5XZ0U` 以外の CloudFront には触れない**
- **EC2 / RDS / Lambda などは一切触れない**

被害範囲が物理的に限定される設計（**Least Privilege の原則**）。

---

## 4. S3 と CloudFront

最後の段階は単純で、ファイルを置いて CDN にキャッシュ削除を伝えるだけ。

### S3（オリジン = 真実のソース）

`s3://ic-gr.com/` バケットが配信のオリジン。`next build` で生成された `out/` ディレクトリの中身を、そのままバケットの直下に同期する。

```
out/
├── index.html
├── overview/index.html
├── company/index.html
├── privacy/index.html
├── _next/static/...
├── images/...
├── sitemap.xml
└── robots.txt
```

`aws s3 sync out/ s3://ic-gr.com/ --delete` の `--delete` がポイントで、**ローカルに無いファイルはバケットからも削除される**。これがないと、リファクタリングで消したファイルが本番に残り続けてしまう。

### CloudFront（CDN）

S3 はバケットなので「世界中のどこからでも速く配信」には向かない。CloudFront は世界各地のエッジサーバーに HTML/JS/画像をキャッシュして配信する CDN。

普段は次のように動く：

```
[ユーザー] https://www.ic-gr.net/index.html を要求
   ↓
[CloudFront エッジ] キャッシュ持ってる？
   ├── ある → そのまま返す（速い）
   └── ない → S3 から取ってきてキャッシュ → 返す
```

問題は、新しい `index.html` を S3 にアップロードしても、エッジは古いキャッシュを返し続けること。

そこで `create-invalidation` を呼ぶ：

```bash
aws cloudfront create-invalidation \
  --distribution-id EHFD30ZL5XZ0U \
  --paths "/*"
```

これで「`/*` のキャッシュは全部捨てて、次回はオリジンから取り直して」とエッジに伝わる。1〜2 分でキャッシュが入れ替わり、新版が見えるようになる。

### `trailingSlash: true` の効用

`next.config.ts` で `trailingSlash: true` にしているおかげで、ビルド成果は `out/overview/index.html` のように **ディレクトリ + index.html** 形式で出力される。

これにより：
- `https://www.ic-gr.net/overview/` でハードリロードしても 200 が返る
- CloudFront に Custom Error Response（`403/404 → /index.html`）の設定が不要

旧 CRA SPA では `react-router-dom` の `BrowserRouter` を使っていたため、`/overview` を直リクエストすると S3 が「そんなオブジェクトはない」と 403 を返していた問題が、構造的に解消されている。

---

## 5. 失敗パターンの切り分け

ジョブが失敗したときに何が起きているかを把握しておくと早い。

### CI ジョブの失敗

**症状**: PR チェックが赤
**原因**: `npm run lint` や `npm run build` がコード問題で落ちた
**対処**: ジョブのログを見て該当箇所を直す

### deploy ジョブが「AssumeRole 失敗」で止まる

```
Error: Could not assume role with OIDC: ...
```

**原因の候補**:

| 症状 | 原因 |
|---|---|
| `Not authorized to perform sts:AssumeRoleWithWebIdentity` | 信頼ポリシーの `sub` 条件が一致していない（リポジトリ名・ブランチ名のタイポなど） |
| `Invalid identity token` | OIDC Provider のサムプリントが古い（GitHub 側のキー更新時） |
| `An IAM Role with this Arn does not exist` | IAM Role 自体が存在しない or 別アカウント |

### deploy ジョブが「S3 / CloudFront で AccessDenied」で止まる

**原因**: 権限ポリシーで指定したリソース ARN が違う、もしくはアクションが足りない
**対処**: `role-policy.json` の Resource と Action を見直す

### デプロイは完走したのに反映されない

**原因**: CloudFront のキャッシュ、もしくはブラウザのキャッシュ
**対処**:
- DevTools → Disable cache でリロード
- 数分待つ（invalidation の伝播）
- `*.ic-gr.com` で見てる場合は別ディストリビューションなので別途 invalidation 必要

---

## 6. 関連ファイル / リソース

### このリポジトリ

- [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) — デプロイの workflow
- [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) — PR の検証 workflow
- [`README.md`](../README.md) — 運用手順とインフラ構成、災害復旧手順

### AWS リソース

| 項目 | 値 |
|---|---|
| AWS アカウント | `058264181659` |
| OIDC Provider | `arn:aws:iam::058264181659:oidc-provider/token.actions.githubusercontent.com` |
| IAM Role | `arn:aws:iam::058264181659:role/github-actions-ic-gr-deploy` |
| S3 バケット | `ic-gr.com` (`ap-northeast-1`) |
| CloudFront ディストリビューション | `EHFD30ZL5XZ0U` |

### 公式ドキュメント

- [GitHub Actions: Configuring OpenID Connect in Amazon Web Services](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
- [AWS: Creating OIDC identity providers](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)
- [`aws-actions/configure-aws-credentials`](https://github.com/aws-actions/configure-aws-credentials)

---

## まとめ

OIDC + IAM Role の組み合わせで実現していること：

1. **長期的な秘密情報をリポジトリに置かない**
2. **特定リポジトリの特定ブランチからのリクエストだけを信頼**
3. **そのジョブが操作できるリソースは S3 と CloudFront の特定 1 つずつだけ**
4. **使い回しできない短命なクレデンシャルだけを発行**

この仕組みは GitHub Actions ↔ AWS だけでなく、Google Cloud, Azure, Vault, Vercel, Cloudflare などほとんどのクラウドプロバイダで使える業界標準の構成になっている。
