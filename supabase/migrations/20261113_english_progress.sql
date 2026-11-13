-- 英語タイピングの学習記録（単語・文ごとの正誤と復習の段階）
-- Supabase Dashboard の SQL Editor で実行してください。
--
-- 「覚えたか確認」モードの結果を 1 問 1 行で保存し、端末をまたいで
-- 「覚えた数」「今日の復習」「苦手な問題」を引き継げるようにする。
-- 未実行でもアプリは動作し、その場合の記録はブラウザ（localStorage）にだけ残る。

CREATE TABLE IF NOT EXISTS public.english_progress (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  -- 問題の識別子: "<section>/<deck id>/<英語>"（例: "words/food/water"）
  item_key TEXT NOT NULL,
  -- 答えを見ずに打てた回数 / 答えを表示した回数
  correct INTEGER NOT NULL DEFAULT 0,
  wrong INTEGER NOT NULL DEFAULT 0,
  -- 復習の段階（連続正解数）。0 は「まだ覚えていない」
  streak INTEGER NOT NULL DEFAULT 0,
  -- 最後に段階が変わった時刻。次回復習日の起点
  last_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

  PRIMARY KEY (user_id, item_key),
  CONSTRAINT english_progress_counts_valid
    CHECK (correct >= 0 AND wrong >= 0 AND streak >= 0),
  CONSTRAINT english_progress_key_length CHECK (char_length(item_key) <= 200)
);

ALTER TABLE public.english_progress ENABLE ROW LEVEL SECURITY;

-- 自分の記録だけを読み書きできる
CREATE POLICY "Users can view own english progress"
  ON public.english_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own english progress"
  ON public.english_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own english progress"
  ON public.english_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
