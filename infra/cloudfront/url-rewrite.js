// CloudFront Function (viewer-request) — Next.js static export ルーティング補正
//
// 目的: S3 (REST origin + OAC) で配信している `out/` を、サブディレクトリへの
// 直リンク / リロードでも正しく `index.html` に解決させる。
// CloudFront の DefaultRootObject は `/` にしか効かないので、
// `/company/` → `/company/index.html` のリライトはここで行う。
//
// ルール:
//   1. 末尾が `/` のとき: `index.html` を末尾に付与
//   2. 末尾が `/` でなく拡張子を含まないとき: `/index.html` を付与（末尾スラッシュ無しでも閲覧可）
//   3. 拡張子があるとき (例: /_next/static/foo.js, /favicon.ico): そのまま通す
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
    } else {
        var lastSegment = uri.substring(uri.lastIndexOf('/') + 1);
        if (lastSegment.indexOf('.') === -1) {
            request.uri = uri + '/index.html';
        }
    }

    return request;
}
