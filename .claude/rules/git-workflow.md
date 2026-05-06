# Git ワークフロー

## ブランチ運用

```
feature/<topic>  ──PR──▶  develop  ──PR/FF──▶  prod  ──push トリガで本番デプロイ──▶ AWS
```

- **`develop`** がデフォルトブランチ。機能ブランチからの PR を集約
- **`prod`** へ push されると GitHub Actions (`deploy.yml`) が走り本番反映
- ステージング環境は持たない（`develop` で動作確認 → `prod` へ進める）

旧 `main` / `gh-pages` ブランチは過去の遺物。触らない。

## ブランチ命名

- `feature/<topic>` — 新機能・改善
- `fix/<topic>` — バグ修正
- `chore/<topic>` — 設定・ドキュメント
- `<topic>` は kebab-case で簡潔に（例: `feature/add-contact-form`, `fix/mobile-header`）

ブランチを切るときは `/branch-from-develop <topic>` slash command を使うと自動化される。

## コミットメッセージ

- 1 行目は日本語で簡潔に（`add: 〜`, `fix: 〜`, `update: 〜`, `chore: 〜`）
- `--no-verify` は禁止（`block-no-verify.sh` フックでブロック）

## PR

- ベースは `develop`
- マージ方式は squash merge を推奨
- `prod` への merge は **`develop` → `prod`** に限定（feature ブランチから直接 prod に出さない）

## prod への進め方

1. `develop` で `/pre-commit` 相当のチェックを通す
2. `/deploy-check` を実行して `out/` 出力とサブパスを確認
3. `git checkout prod && git merge --ff-only develop` または PR `develop → prod`
4. `git push origin prod` → デプロイ自動実行
5. `gh run watch` で進行確認

## やってはいけないこと

- `git push --force` / `--force-with-lease`（フックで deny 済み）
- `git reset --hard`（フックで deny 済み）
- `develop` / `prod` への直接コミット（必ず feature ブランチ経由）
- `--no-verify` でフックバイパス
