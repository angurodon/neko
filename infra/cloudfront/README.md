# CloudFront Function — `url-rewrite`

Next.js static export の `out/<route>/index.html` を、CloudFront のサブパスリクエスト
（例: `/company/`, `/overview/`）に対して正しく解決させるための viewer-request 関数。

S3 (REST origin + OAC) では `DefaultRootObject` がバケットルートにしか効かないため、
これが無いとサブパスへの直リンク/リロードで `403 AccessDenied` になる。

## 関連リソース

- 関数名: `ic-gr-url-rewrite`
- ランタイム: `cloudfront-js-2.0`
- 紐付けイベント: viewer-request
- 対象ディストリビューション:
  - `EHFD30ZL5XZ0U` (`*.ic-gr.net`)
  - `E3CUYP7CXV3V06` (`*.ic-gr.com`) ※同じ S3 を origin にしているため同じ関数を共用

## 初回デプロイ（CLI 例）

```bash
PROFILE=ic-gr
NAME=ic-gr-url-rewrite

# 1. 関数作成
aws --profile $PROFILE cloudfront create-function \
  --name $NAME \
  --function-config Comment="Rewrite /foo/ to /foo/index.html for Next.js static export",Runtime=cloudfront-js-2.0 \
  --function-code fileb://url-rewrite.js

# 2. publish（DEVELOPMENT → LIVE）
ETAG=$(aws --profile $PROFILE cloudfront describe-function --name $NAME --query 'ETag' --output text)
aws --profile $PROFILE cloudfront publish-function --name $NAME --if-match "$ETAG"

# 3. 各ディストリビューションの DefaultCacheBehavior.FunctionAssociations に紐付け
#    （マネコンの方が安全。CLI でやる場合は get-distribution-config → JSON 編集 → update-distribution）

# 4. キャッシュ無効化
aws --profile $PROFILE cloudfront create-invalidation \
  --distribution-id EHFD30ZL5XZ0U --paths "/*"
```

## 更新

`url-rewrite.js` を編集したら:

```bash
ETAG=$(aws --profile ic-gr cloudfront describe-function --name ic-gr-url-rewrite --query 'ETag' --output text)
aws --profile ic-gr cloudfront update-function \
  --name ic-gr-url-rewrite \
  --if-match "$ETAG" \
  --function-config Comment="Rewrite /foo/ to /foo/index.html for Next.js static export",Runtime=cloudfront-js-2.0 \
  --function-code fileb://url-rewrite.js

ETAG=$(aws --profile ic-gr cloudfront describe-function --name ic-gr-url-rewrite --query 'ETag' --output text)
aws --profile ic-gr cloudfront publish-function --name ic-gr-url-rewrite --if-match "$ETAG"
```

publish 後、各ディストリビューションへの反映は数分かかる。CloudFront Function の
更新だけならディストリビューション側の再デプロイは不要（紐付け済みなら自動で新版が使われる）。
