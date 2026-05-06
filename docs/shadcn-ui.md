# shadcn/ui 導入ガイド

`feature/shadcn-ui-migration` で、フロントエンドの UI コンポーネント基盤を自前 Tailwind 実装から **shadcn/ui** に置き換えた。本ドキュメントはその背景と運用方法をまとめる。

## なぜ shadcn/ui か

### 旧来の課題

移行前の実装は、Tailwind のユーティリティクラスを各コンポーネントで直書きしていた。

- **デザインの整合性が手作業頼み**
  - ボタン・カード・テーブルなどの基本要素ごとに padding / radius / shadow が手で書かれており、ページ間で微妙に値がブレていた（例: カードの `rounded-xl` と `rounded-md` が混在、shadow の強度が不統一）。
- **a11y を都度自分で書き起こす必要があった**
  - `Header` のハンバーガーメニューはスライドイン div を `useState` で開閉する自前実装だった。`aria-expanded` などは付けていたが、フォーカストラップ・Esc キー閉じ・スクロールロックは未実装。
- **状態管理のために `"use client"` が必要だった**
  - メニュー開閉用に Header 全体を Client Component にしていた。Server-first で配信できない。
- **アイコンも画像で `next/image` 経由**
  - `phone.png`、ハンバーガー用の三本線 `<span>` など、本来 SVG アイコンで済む UI が画像 / DOM 装飾で表現されていた。
- **テーマトークンが `--color-brand-*` のみ**
  - shadcn 系コンポーネント（OSS で多数）を後から取り込もうとすると `--primary`, `--muted-foreground` 等の標準トークンが無く、毎回手で書き換える必要があった。

### shadcn/ui を入れて何が変わるか

shadcn/ui は npm パッケージではなく **「コンポーネントのソースを `components/ui/` にコピーする」CLI ツール**。コードは自分のリポジトリに入る（hidden な依存ではない）ので、必要に応じて自由に書き換えられる。

- **a11y / 動作はライブラリ側が担保**
  - 本プロジェクトでは shadcn の `style: "base-nova"` を採用しており、内部実装は **Base UI** (`@base-ui/react`)。フォーカストラップ・Escape 閉じ・ARIA 属性などはこの Primitive 側が処理する。
- **テーマ系トークン（`--primary`, `--muted` 等）が標準で揃う**
  - 後から `dialog`, `tabs`, `dropdown-menu` などを `npx shadcn@latest add <name>` で追加するときも、グローバルスタイルが連続する。
- **見た目はリポジトリ内の TSX を直接編集して微調整可能**
  - `components/ui/button.tsx` に色や size variant が CVA で定義されているので、案件特有の調整もそのファイルで完結する。
- **Tailwind v4・React 19・Next 15 静的エクスポート互換**
  - `output: "export"` を維持したまま動作。Server Component から Sheet 等の client primitive を呼ぶ構成に整理できた。

## 採用した構成

| 要素 | 値 | 備考 |
| --- | --- | --- |
| shadcn CLI | `4.7.0` | `npx shadcn@latest <cmd>` |
| style | `base-nova` | shadcn のモダン系プリセット |
| コンポーネントベース | `@base-ui/react` | Radix UI ではなく Base UI を採用 |
| baseColor | `neutral` | 中立トーン。実値は brand カラーで上書き |
| Tailwind | v4 | CSS first-class（`@theme`） |
| アイコン | `lucide-react` | shadcn 標準 |

`components.json` に上記設定が記録されている。

### Radix UI との違い（Base UI）

`base-nova` style の shadcn は内部で Base UI を使う。Radix UI と概ね同じ思想だが API が一部異なる。

- **`asChild` が無い** → `render` prop に JSX 要素を渡す
  ```tsx
  <SheetClose render={<Link href="/about" />}>About</SheetClose>
  ```
- **`Dialog.Trigger` 配下にカスタム要素を置きたい場合** も `render={<Button .../>}` パターン
- イベントは標準の `onClick` で、`onSelect` 等の独自ハンドラは少ない

## ディレクトリ構成（追加分）

```
ic-gr-website/
├── components.json              # shadcn CLI 設定
├── components/
│   └── ui/                      # shadcn コンポーネント本体（編集可）
│       ├── button.tsx
│       ├── card.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       └── table.tsx
├── lib/
│   └── utils.ts                 # cn() ヘルパー（clsx + tailwind-merge）
└── app/
    └── globals.css              # ブランドトークンを shadcn トークンにマップ
```

`@/components`, `@/lib` は `tsconfig.json` の `paths` で `./*` にエイリアスされている。

## ブランドカラーのマッピング

`app/globals.css` の `:root` で、shadcn の標準トークンを Ic-Growth ブランドカラーで上書きしている。

| shadcn トークン | 値 | 意味 |
| --- | --- | --- |
| `--primary` | `#0b5fff` | brand-primary（リンク・CTA・ring） |
| `--primary-foreground` | `#ffffff` | primary 上の文字色 |
| `--secondary` / `--muted` | `#f5f7fa` | セクション背景 |
| `--secondary-foreground` | `#0b1736` | brand-dark（フッター背景にも使用） |
| `--accent` | `#f5a623` | brand-accent（アクセント） |
| `--muted-foreground` | `#555555` | 本文補助色 |
| `--border` / `--input` | `#e5e7eb` | 境界線 |
| `--ring` | `#0b5fff` | フォーカスリング |

加えて、ブランド色は `--color-brand-*` トークンで `@theme` ブロックに残してあり、`bg-brand-dark` `text-brand-success` 等の Tailwind ユーティリティとしても利用可能。

```css
@theme {
  --color-brand-primary: #0b5fff;
  --color-brand-dark: #0b1736;
  --color-brand-accent: #f5a623;
  --color-brand-success: #215126;
}
```

ダークモードトークンも shadcn デフォルトのまま残してあるが、現状ダークモード切り替え UI は実装していない。

## マイグレーションした主要コンポーネント

| ファイル | Before | After |
| --- | --- | --- |
| `app/components/Header.tsx` | `useState` でハンバーガー開閉 / 自前スライドイン div / Client Component | `Sheet` で開閉 / Server Component 化 / `lucide-react` の `Menu` |
| `app/components/Footer.tsx` | 直書きの色指定 | `bg-brand-dark` / `Separator` / コピーライト分離 |
| `app/components/Backup.tsx` | 自前カード + Link | `Card` + `CardHeader` + `CardContent` + `lucide-react` の `ArrowRight` |
| `app/components/Consult.tsx` | `next/image` で電話画像 + 全体反転 hover | `lucide-react` の `Phone` + 振動 (`@keyframes ring`) + 波紋 (`animate-ping`) |
| `app/components/SectionComponent1.tsx` | hex 直書き | shadcn トークン (`text-muted-foreground`, `text-primary`) |
| `app/overview/page.tsx` | テキスト直書き | `Card` + `Separator`、セクションを config で配列化 |
| `app/company/page.tsx` | 生 `<table>` | shadcn の `Table` / `TableRow` / `TableCell` を `Card` で囲む |
| `app/privacy/page.tsx` | hex 直書き | `Separator` + `text-muted-foreground` |

## 開発ガイド

### 新しい shadcn コンポーネントを追加

```bash
npx shadcn@latest add dialog dropdown-menu tabs
```

`components/ui/` 配下にソースが追加される。同時に必要な `@base-ui/react/*` 依存も `package.json` に入る。

### 既存コンポーネントを書き換える

`components/ui/<name>.tsx` を直接編集する。これがリポジトリ内のソースなので diff として残せる。upstream に追従したいときは `npx shadcn@latest add <name> --overwrite` で再取得（編集は失われるので注意）。

### `cn()` の使いどころ

```ts
import { cn } from "@/lib/utils";

className={cn("base classes", isActive && "active classes", className)}
```

`tailwind-merge` で同種ユーティリティの後勝ちを解決してから出力する。コンポーネントが `className` prop を受け取って親側で上書きしたい場合は必ず `cn()` 経由で結合する。

### Server / Client の境界

shadcn のうち以下は内部で `"use client"` を付与済み: `Sheet`, `Table`, `Separator`。`Card`, `Button` 系は純粋な div / button なので Server Component。

ページ側（`app/**/page.tsx`）はデフォルト Server Component のままでよく、shadcn の Client コンポーネントをインポートしても Next.js が境界を自動で張る。

### カスタムアニメーション

`Consult.tsx` で電話アイコンを揺らすために、`app/globals.css` に `@keyframes ring` を直接定義し、Tailwind の任意値構文で `animate-[ring_0.6s_ease-in-out_infinite]` として呼び出している。同様のワンショット系アニメーションは `globals.css` 末尾に keyframes を追加してから任意値構文で参照する。

## 静的エクスポートでの注意

- `output: "export"` 環境では Server Component 内で `new Date()` を JSX に直接書くと React Doctor がハイドレーション警告を出す（実際には SSG なので build 時固定だが、警告自体を消すためにモジュールトップで `const COPYRIGHT_YEAR = new Date().getFullYear();` のように定数化する）。
- shadcn のダイアログ系（`Sheet` など）は portal を使う。SSG でも問題なく動くが、初期 HTML には body 直下の portal コンテナは出力されないので、SEO で表示すべきテキストはトリガー側に置く。

## 検証

各コミットで以下を緑にしてから merge する。

```bash
npm run lint
npm run typecheck
npm run build       # static export 成功
npx react-doctor@latest . --score   # 99/100 を baseline として維持
```

## 後続の改修ログ

shadcn/ui 初期導入のあとに行った継続改修。

### Typography（feature/typography-and-accent）

- 見出し用フォントとして **Zen Kaku Gothic New** を `next/font/google` 経由で導入
  （weight 500/700/900、`--font-zen-kaku` 変数として `<html>` にバインド）
- `globals.css` の `--font-heading` を Zen Kaku に紐付け、`@layer base` で `h1/h2/h3` に自動適用
- 本文は OS 既定の Hiragino / Yu Gothic スタックのまま（軽量重視）

### アクセントカラーの導入（同上）

- `:root` に `--accent: #f5a623` を残しつつ、実 UI で eyebrow ラベル / 小区切り Separator に投入
  - `Accounting Transformation` / `Service 0X` / `Our Services` / `Case 0X` などの上付きラベル
  - 各セクション h2 直下の `Separator`（`max-w-12 bg-brand-accent`）
- 「青支配 + 朱の差し色」の構図を採用。CTA・カード強調は青のまま

### ハイドレーション・カスケードの落とし穴

- `globals.css` のトップレベルにあった `a { color: inherit; }` がアンレイヤーで Tailwind ユーティリティを上書きしていた
  → `@layer base` 内に閉じ込めてユーティリティ優先に戻した
- Server Component 内の `new Date().getFullYear()` は React Doctor がハイドレーション警告を出すため、モジュールトップで定数化（`const COPYRIGHT_YEAR = new Date().getFullYear();`）

### ページ構造の刷新（feature/typography-and-accent / feature/home-and-header-polish）

- `/company`: 「8 行のテーブル単発」を解消し、Hero / 基本情報（dl）/ サービス4カテゴリ Card グリッド / Access + Map iframe + CTA の 4 セクション構成へ
- `/overview`: 1 列箇条書き + 不揃いな見出し階層を解消し、ヒーロー / 各サービス（左: 番号 + h2 + lede / 右: 特徴ドット箇条書き）/ MAS の Case 01・02 サブカード / 末尾 CTA の構成へ
- `/`（ホーム）: ヒーロー (`SectionComponent1`) に「サービスを見る / お問い合わせ」の二段 CTA を追加。`Backup` の 3 カードを `/overview` ヒーローと同じ「icon + Service 番号 + 詳しく見る →」パターンに統一
- お問い合わせ系 CTA（Header / `/overview` 末尾 / `/company` 末尾）はブランドのコンタクト用イメージカラー `#5fc061` で統一。`globals.css` に `--color-brand-contact` トークンを追加し、`bg-brand-contact` で参照する。電話発信用 `Consult` のアイコン背景・電話番号テキストにも同色を使用

### ブランチ運用の自動化

- `.claude/hooks/branch-guard.sh` を新設し、`develop` / `prod` / `main` での `Edit` / `Write` を PreToolUse で `exit 2` ブロック
- `.claude/settings.json` の `PreToolUse: Write|Edit` matcher 先頭に登録

## 参考リンク

- shadcn/ui: <https://ui.shadcn.com/>
- Base UI（`@base-ui/react`）: <https://base-ui.com/>
- lucide-react: <https://lucide.dev/>
- Tailwind v4 `@theme`: <https://tailwindcss.com/docs/theme>
