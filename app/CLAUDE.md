# app/ — Next.js App Router

## 概要

Next.js 15 App Router によるルート定義。`output: 'export'` で静的書き出し（`out/`）。

## ルート構成

```
app/
├── layout.tsx          # ルートレイアウト（Header + Footer + ScrollToTop + metadata）
├── page.tsx            # /
├── overview/page.tsx   # /overview
├── company/page.tsx    # /company
├── privacy/page.tsx    # /privacy
├── sitemap.ts          # ビルド時に sitemap.xml を生成
├── robots.ts           # ビルド時に robots.txt を生成
├── globals.css         # Tailwind v4 + CSS 変数（ブランドカラー / フォント）
└── components/
    ├── Header.tsx           # 'use client'（ハンバーガー開閉）
    ├── Footer.tsx
    ├── ScrollToTop.tsx      # 'use client'（usePathname でスクロールリセット）
    ├── SectionComponent1.tsx
    ├── Backup.tsx
    └── Consult.tsx
```

## 規約（詳細は `.claude/rules/typescript-nextjs.md`）

- Server Component をデフォルトに、`"use client"` は **本当に必要なときのみ**
- 各 `page.tsx` / `layout.tsx` は default export（Next.js が要求）
- それ以外は named export

## 新規ページ追加時のチェックリスト

1. `app/<route>/page.tsx` を作る（Server Component が原則）
2. `npm run build` を実行し `out/<route>/index.html` が出力されることを確認
3. ヘッダ・フッタからの遷移リンク (`Header.tsx` / `Footer.tsx`) を更新
4. `app/sitemap.ts` に新ルートを追加
5. CloudFront Function (`infra/cloudfront/url-rewrite.js`) は拡張子無し URL を `index.html` にリライトするので、新規ルートにも自動で効く（個別の AWS 操作は不要）
6. `/react-doctor` でレビュー

## 自動編集禁止

- `next-env.d.ts`（自動生成）
- `.next/`, `out/`（ビルド成果物）
