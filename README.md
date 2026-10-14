# 地理タイピング

地図・国旗・雑学を題材にしたブラウザ向けタイピングゲームです。
ログインするとクリアタイムをランキングに登録できます。

- 本番: https://typing-game-rho-weld.vercel.app
- フレームワーク: Next.js (App Router) / React / Tailwind CSS
- 認証・DB: Supabase（Google / メールログイン、スコア保存）
- ホスティング: Vercel

## ゲームの種類

| カテゴリ | 内容 |
| --- | --- |
| 世界地図 | 地域別の国名・首都名（12地域） |
| 日本地図 | 都道府県名・県庁所在地・県鳥・県花・県木（全国 + 6地方）、日本の世界遺産 |
| 雑学 | 山手線、元素記号、星座、干支、惑星、七福神、四字熟語、ことわざ、難読漢字 |

## セットアップ

```bash
npm install
cp .env.local.example .env.local   # Supabase の URL と anon key を設定
npm run dev
```

http://localhost:3000 で起動します。Node.js は `.nvmrc` のバージョン（24）を使ってください。

### Supabase

1. Supabase プロジェクトを作成し、SQL Editor で `supabase/schema.sql` を実行する
2. 続けて `supabase/migrations/` 配下の SQL を日付順に実行する
   - `20261014_get_rankings.sql`: ランキングをユーザーごとのベストタイムで集計する関数。
     未実行でもアプリ側のフォールバック集計で動作しますが、本番では実行を推奨します。
3. Authentication で Google プロバイダーとメール認証を有効にし、
   Redirect URL に `https://<ドメイン>/api/auth/callback` を追加する

環境変数は `.env.local.example` を参照してください。Supabase の設定がなくてもゲーム自体は動作し、
ランキング関連の機能だけが無効になります。

## スクリプト

```bash
npm run dev     # 開発サーバー
npm run build   # 本番ビルド
npm run start   # 本番サーバー
npm run lint    # ESLint
```

## ディレクトリ構成

```
app/
  (pages)/          世界地図・日本地図・ランキング・ログイン・マイページ
  (other-typing)/   雑学タイピング各種
  api/              スコア登録・ランキング・プロフィール・認証コールバック
  components/       ゲーム共通 UI（GameResult, RomajiDisplay など）
  hooks/            useTypingGame（ゲーム進行）・useScoreSubmit など
  utils/romaji.ts   ローマ字入力ゆれ（shi/si, nn/n など）の判定
  types/score.ts    ゲームモード定義（GAME_MODES）
  data/             世界地図の国データ
  prefectures.json  都道府県データ
  sitemap.ts        サイトマップ（ページ追加時に追記）
supabase/           スキーマとマイグレーション SQL
public/             国旗・県鳥・県花・県木などの画像
```

## ゲームモードを追加するとき

1. データファイルとページを追加する
2. `app/types/score.ts` の `GAME_MODES` にモード ID・表示名・問題数を追加する
   （問題数はサーバー側のスコア検証でも使われるため、実データと一致させること）
3. `app/sitemap.ts` にページを追加する

## スコアの不正対策

`POST /api/scores` では、モード ID と問題数が `GAME_MODES` と一致すること、
各問題の入力時間が 1 文字あたり 40ms 以上であること、タイムスタンプの順序と合計時間の整合性、
サーバー時刻との乖離などを検証し、通らなかったスコアは `is_verified = false` で保存してランキングから除外します。
