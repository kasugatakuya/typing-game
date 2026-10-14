-- ランキングを「ユーザーごとのベストタイム」で集計する関数
-- Supabase Dashboard の SQL Editor で実行してください。
--
-- 従来はスコア行をそのまま並べていたため、同一ユーザーが何度もプレイすると
-- 上位を独占できてしまった。この関数は各ユーザーの最速スコア 1 件だけを
-- 対象にして順位付けする。
--
-- p_category / p_mode / p_start は NULL で「絞り込みなし」。
-- total 列には絞り込み後の総ユーザー数（ページング用）が全行に入る。

CREATE OR REPLACE FUNCTION public.get_rankings(
  p_category TEXT DEFAULT NULL,
  p_mode TEXT DEFAULT NULL,
  p_start TIMESTAMPTZ DEFAULT NULL,
  p_limit INTEGER DEFAULT 50,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  game_category TEXT,
  game_mode TEXT,
  clear_time_ms INTEGER,
  mistake_count INTEGER,
  played_at TIMESTAMPTZ,
  display_name TEXT,
  avatar_url TEXT,
  total BIGINT
)
LANGUAGE sql
STABLE
SECURITY INVOKER
AS $$
  WITH best AS (
    SELECT DISTINCT ON (s.user_id)
      s.id,
      s.user_id,
      s.game_category,
      s.game_mode,
      s.clear_time_ms,
      s.mistake_count,
      s.played_at
    FROM public.scores s
    WHERE s.is_verified = TRUE
      AND (p_category IS NULL OR s.game_category = p_category)
      AND (p_mode IS NULL OR s.game_mode = p_mode)
      AND (p_start IS NULL OR s.played_at >= p_start)
    ORDER BY s.user_id, s.clear_time_ms ASC, s.played_at ASC
  )
  SELECT
    b.id,
    b.user_id,
    b.game_category,
    b.game_mode,
    b.clear_time_ms,
    b.mistake_count,
    b.played_at,
    p.display_name,
    p.avatar_url,
    COUNT(*) OVER () AS total
  FROM best b
  JOIN public.profiles p ON p.id = b.user_id
  ORDER BY b.clear_time_ms ASC, b.played_at ASC
  LIMIT GREATEST(p_limit, 0)
  OFFSET GREATEST(p_offset, 0);
$$;

GRANT EXECUTE ON FUNCTION public.get_rankings(TEXT, TEXT, TIMESTAMPTZ, INTEGER, INTEGER)
  TO anon, authenticated;
