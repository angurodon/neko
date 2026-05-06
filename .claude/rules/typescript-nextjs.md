# TypeScript / Next.js コーディング規約

ic-gr-website (Next.js 15 App Router + React 19 + TypeScript + Tailwind v4) の規約。

## 型システム

- `type` を使用（`interface` は使わない）
- `any` 禁止。やむを得ない場合は `unknown` + 型ガードで絞り込む
- `import type` で型と値を明示的に分離
- props には明示的な型を付ける

## Server / Client コンポーネント

- **Server Components をデフォルト**にし、必要なときだけ `"use client"` を付ける
- 以下のときに client component が必要:
  - `useState` / `useEffect` / `useReducer` などのフック
  - `onClick` / `onChange` などのイベントハンドラ
  - `usePathname` / `useRouter` などのクライアント API
  - ブラウザ専用 API（`window`, `document`, `localStorage` 等）
- 既存の `"use client"` 例: `app/components/Header.tsx`, `app/components/ScrollToTop.tsx`

## エクスポート

- Named export を原則使用
- 例外（Next.js が default export を要求）:
  - `app/**/page.tsx`, `app/**/layout.tsx`, `app/**/error.tsx`, `app/**/not-found.tsx`
  - `app/sitemap.ts`, `app/robots.ts`
  - `next.config.ts`, `postcss.config.mjs`

## 関数スタイル

- トップレベルの関数は関数宣言 (`function foo() {}`) を優先
- コールバックは arrow function

## ファイル命名

- コンポーネント: PascalCase（`Header.tsx`, `Footer.tsx`）
- フック / ユーティリティ: kebab-case（`use-something.ts`）
- App Router の特殊ファイル: 固定（`page.tsx`, `layout.tsx`, ...）

## パス・インポート

- 深い相対パス（`../../*`）を避け、`@/*` パスエイリアスがあればそちらを使う（neko では tsconfig で別途設定要）
- 同じディレクトリ内の参照は相対パスで OK

## 静的エクスポート (`output: 'export'`) の制約

- `next/image` は `unoptimized: true` 設定済み（`next.config.ts`）。動的最適化は使えない
- `app/api/*` のような Route Handlers は使えない
- `revalidate` / ISR は使えない
- 動的ルート (`[id]`) を使う場合は `generateStaticParams` で全パスを列挙する
- 環境変数は `NEXT_PUBLIC_*` のみクライアントに渡る（ビルド時に埋め込まれる）

## サブパス挙動

- `next.config.ts` で `trailingSlash: true` を設定済み → `/company` ではなく `/company/` で配信
- 直リンク・リロード対応は CloudFront Function (`infra/cloudfront/url-rewrite.js`) が viewer-request でリライト
- 新しいページを追加した場合、ローカルビルド (`npm run build`) で `out/<route>/index.html` が出力されることを確認

## Tailwind CSS v4

- v4 は CSS first-class（`@tailwindcss/postcss` 経由）。`tailwind.config.*` は持たず、`app/globals.css` で `@theme` と CSS 変数を直接定義
- ブランドカラー・フォントは `app/globals.css` の CSS 変数を使う

## フォーム・バリデーション（必要時）

- 現状フォーム実装は無い（問い合わせは外部 Google Form）
- 必要になったら `react-hook-form` + `zod` を導入する想定
