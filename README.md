# 桜坂

GitHub Pages で動く日記サイトです。`_posts/` に Markdown ファイルを 1 つ追加すると、日記が 1 日分増えます。
一覧・アーカイブ・タグ・RSS は自動で作られるので、書くことだけに集中できます。
配色はネイビーで、端末の設定に合わせて明るいテーマ／暗いテーマが切り替わります。

---

## 1. 公開するための設定（最初に一度だけ）

1. GitHub でこのリポジトリを開く
2. **Settings** → 左メニューの **Pages**
3. **Source** を `Deploy from a branch` にする
4. **Branch** を公開したいブランチ（通常は `main`）／ フォルダは `/ (root)` にして **Save**
5. 1〜2 分待つと、下の URL で公開されます

```
https://coesato0721-sketch.github.io/sakurazaka.github.io/
```

リポジトリ名を `sakurazaka.github.io` にしているため、URL の末尾にリポジトリ名が付きます。
これに合わせて `_config.yml` に次の設定を入れてあります（そのままで大丈夫です）。

```yaml
url: "https://coesato0721-sketch.github.io"
baseurl: "/sakurazaka.github.io"
```

もし将来 `https://coesato0721-sketch.github.io/` という短い URL にしたくなったら、
リポジトリ名を `coesato0721-sketch.github.io`（＝ GitHub アカウント名 + `.github.io`）に変え、
`baseurl` を `""` にします。

---

## 2. 日記を書く

### いちばん簡単な方法（ブラウザだけで完結）

1. GitHub でこのリポジトリの `_posts` フォルダを開く
2. **Add file** → **Create new file**
3. ファイル名を `2026-08-01-きょうのこと.md` のように入れる（**日付-タイトル.md** の形が必須）
4. 中身を書く

```markdown
---
title: きょうのこと
date: 2026-08-01 21:00:00 +0900
tags: [日常, カフェ]
mood: おだやか
---

駅前に新しいカフェができていたので入ってみた。
静かで居心地がよかったので、また行きたい。
```

5. **Commit changes** を押す → 1〜2 分後にサイトに反映されます

### ファイル名のルール

| 例 | 結果 |
|---|---|
| `2026-08-01-カフェ.md` | ✅ 公開される |
| `カフェ.md` | ❌ 日付がないので無視される |
| `2026-8-1-カフェ.md` | ❌ 月日は 2 桁（`08`・`01`）で書く |

### 記事の先頭に書く設定

| 項目 | 必須 | 説明 |
|---|---|---|
| `title` | ○ | 見出しに出るタイトル |
| `date` | – | 日付と時刻。省略するとファイル名の日付が使われます |
| `tags` | – | `[日常, 読書]` のように好きな言葉を。タグページに自動でまとまります |
| `mood` | – | 「きょうの気分」として記事の上に表示されます |

本文で使える書き方の見本は、公開後の「[日記の書き方メモ]」の記事にあります。

### 書きかけの日記

`_drafts/` フォルダに入れたファイルは公開されません。書きかけはここに置いてください。
`_drafts/template.md` を雛形として使えます。
公開するときは、ファイル名を `2026-08-01-タイトル.md` に変えて `_posts/` へ移動します。

### 写真を入れる

`assets/images/` に画像をアップロードして、本文にこう書きます。

```markdown
![猫の写真]({{ '/assets/images/cat.jpg' | relative_url }})
```

---

## 3. サイトの見た目や名前を変える

| 変えたいもの | 編集するファイル |
|---|---|
| サイト名・説明・作者名 | `_config.yml` |
| 色・文字の大きさ | `assets/css/style.css` の先頭 `:root` |
| ネイビーの濃さ | `style.css` の `--header-bg`（ヘッダー）と `--hero-bg`（トップの見出し部分） |
| 自己紹介ページ | `about.md` |
| メニューの項目 | `_includes/header.html` |
| トップに出す記事数 | `_config.yml` の `recent_posts` |

---

## 4. 自分のパソコンで表示を確認する（任意）

Ruby が入っていれば、公開前に手元で確認できます。

```bash
bundle install
bundle exec jekyll serve
# → http://localhost:4000/sakurazaka.github.io/
```

書きかけ（`_drafts/`）も含めて見たいときは `bundle exec jekyll serve --drafts` を使います。

---

## ファイル構成

```
├── _config.yml          サイト全体の設定
├── index.html           トップページ（最新の日記）
├── archive.html         アーカイブ（年月別・キーワード絞り込み付き）
├── tags.html            タグ一覧
├── about.md             このサイトについて
├── _posts/              日記の本体（1ファイル = 1日分）
├── _drafts/             書きかけ（公開されない）
├── _layouts/            ページの骨組み
├── _includes/           ヘッダー・フッターなどの部品
└── assets/              CSS・JavaScript・画像
```

## 困ったとき

- **反映されない** → Actions タブでビルド結果を確認。記事のファイル名が `YYYY-MM-DD-題名.md` か、先頭の `---` で囲んだ設定が正しいかを確認
- **タイトルに `:` を使いたい** → `title: "10:00に起きた"` のようにダブルクォートで囲む
- **記事が未来の日付になっている** → 未来の日付の記事は公開されません。日付を今日以前にしてください
