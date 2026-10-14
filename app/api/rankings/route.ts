import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";
import { formatTime } from "@/app/utils/timeUtils";
import {
  GAME_MODES,
  GAME_CATEGORIES,
  RANKING_PERIODS,
  type GameCategory,
  type RankingPeriod,
} from "@/app/types/score";

const MAX_LIMIT = 100;
const MAX_OFFSET = 10_000;
// RPC 関数が未作成の場合のフォールバックで読む最大行数
const FALLBACK_FETCH_LIMIT = 5000;
// 日本時間（UTC+9）。サーバー（Vercel）は UTC で動くため明示的に補正する
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

interface RankingRow {
  id: string;
  user_id: string;
  game_category: string;
  game_mode: string;
  clear_time_ms: number;
  mistake_count: number;
  played_at: string;
  display_name: string;
  avatar_url: string | null;
}

/** クエリ文字列を 0 以上の整数として読む。不正値・NaN は fallback、上限は max で丸める */
function parsePositiveInt(value: string | null, fallback: number, max: number): number {
  const n = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(n) || n < 0) return fallback;
  return Math.min(n, max);
}

function isRankingPeriod(value: string | null): value is RankingPeriod {
  return value !== null && value in RANKING_PERIODS;
}

function isGameCategory(value: string | null): value is GameCategory {
  return value !== null && value in GAME_CATEGORIES;
}

/** 日本時間での「今日の 0:00」を返す */
function startOfTodayJst(now: Date): Date {
  const jst = new Date(now.getTime() + JST_OFFSET_MS);
  jst.setUTCHours(0, 0, 0, 0);
  return new Date(jst.getTime() - JST_OFFSET_MS);
}

function getPeriodFilter(period: RankingPeriod): { startDate: Date; endDate: Date } | null {
  const now = new Date();
  const endDate = now;

  switch (period) {
    case "daily":
      return { startDate: startOfTodayJst(now), endDate };
    case "weekly": {
      const startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 7);
      return { startDate, endDate };
    }
    case "monthly": {
      const startDate = new Date(now);
      startDate.setMonth(startDate.getMonth() - 1);
      return { startDate, endDate };
    }
    case "all":
    default:
      return null;
  }
}

interface FetchParams {
  category: GameCategory | null;
  mode: string | null;
  startDate: Date | null;
  limit: number;
  offset: number;
}

/**
 * get_rankings RPC（supabase/migrations/20261014_get_rankings.sql）で
 * ユーザーごとのベストタイムを取得する。
 */
async function fetchViaRpc(
  supabase: Awaited<ReturnType<typeof createClient>>,
  params: FetchParams,
): Promise<{ rows: RankingRow[]; total: number } | { missingFunction: true }> {
  const { data, error } = await supabase.rpc("get_rankings" as never, {
    p_category: params.category,
    p_mode: params.mode,
    p_start: params.startDate?.toISOString() ?? null,
    p_limit: params.limit,
    p_offset: params.offset,
  } as never);

  if (error) {
    // 42883: function does not exist / PGRST202: PostgREST が関数を見つけられない
    if (error.code === "42883" || error.code === "PGRST202") {
      return { missingFunction: true };
    }
    throw error;
  }

  const rows = (data as (RankingRow & { total: number })[] | null) ?? [];
  const total = rows.length > 0 ? Number(rows[0].total) : 0;
  return { rows, total };
}

/**
 * RPC 関数がまだ作成されていない環境向けのフォールバック。
 * 検証済みスコアをタイム順に読み、アプリ側でユーザーごとに最速 1 件へ絞る。
 */
async function fetchViaFallback(
  supabase: Awaited<ReturnType<typeof createClient>>,
  params: FetchParams,
): Promise<{ rows: RankingRow[]; total: number }> {
  let query = supabase
    .from("scores")
    .select(
      `
      id,
      user_id,
      game_category,
      game_mode,
      clear_time_ms,
      mistake_count,
      played_at,
      profiles!inner (
        display_name,
        avatar_url
      )
    `,
    )
    .eq("is_verified", true)
    .order("clear_time_ms", { ascending: true })
    .order("played_at", { ascending: true })
    .limit(FALLBACK_FETCH_LIMIT);

  if (params.category) query = query.eq("game_category", params.category);
  if (params.mode) query = query.eq("game_mode", params.mode);
  if (params.startDate) query = query.gte("played_at", params.startDate.toISOString());

  const { data, error } = await query;
  if (error) throw error;

  type Raw = Omit<RankingRow, "display_name" | "avatar_url"> & {
    profiles: { display_name: string; avatar_url: string | null } | null;
  };

  const seen = new Set<string>();
  const best: RankingRow[] = [];
  for (const row of (data as unknown as Raw[] | null) ?? []) {
    if (seen.has(row.user_id)) continue;
    seen.add(row.user_id);
    best.push({
      id: row.id,
      user_id: row.user_id,
      game_category: row.game_category,
      game_mode: row.game_mode,
      clear_time_ms: row.clear_time_ms,
      mistake_count: row.mistake_count,
      played_at: row.played_at,
      display_name: row.profiles?.display_name ?? "Unknown",
      avatar_url: row.profiles?.avatar_url ?? null,
    });
  }

  return {
    rows: best.slice(params.offset, params.offset + params.limit),
    total: best.length,
  };
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const rawCategory = searchParams.get("category");
    const category = isGameCategory(rawCategory) ? rawCategory : null;
    const mode = searchParams.get("mode");
    const rawPeriod = searchParams.get("period");
    const period: RankingPeriod = isRankingPeriod(rawPeriod) ? rawPeriod : "all";
    const limit = parsePositiveInt(searchParams.get("limit"), 50, MAX_LIMIT);
    const offset = parsePositiveInt(searchParams.get("offset"), 0, MAX_OFFSET);

    const periodFilter = getPeriodFilter(period);
    const fetchParams: FetchParams = {
      category,
      mode: mode || null,
      startDate: periodFilter?.startDate ?? null,
      limit,
      offset,
    };

    let result = await fetchViaRpc(supabase, fetchParams);
    if ("missingFunction" in result) {
      console.warn(
        "get_rankings RPC が見つかりません。supabase/migrations/20261014_get_rankings.sql を実行してください。フォールバック集計を使用します。",
      );
      result = await fetchViaFallback(supabase, fetchParams);
    }

    const rankings = result.rows.map((row, index) => {
      const categoryModes = GAME_MODES[row.game_category as GameCategory] || {};
      const modeInfo = categoryModes[row.game_mode];

      return {
        rank: offset + index + 1,
        scoreId: row.id,
        userId: row.user_id,
        displayName: row.display_name || "Unknown",
        avatarUrl: row.avatar_url ?? undefined,
        gameCategory: row.game_category,
        gameCategoryDisplayName:
          GAME_CATEGORIES[row.game_category as GameCategory] || row.game_category,
        gameMode: row.game_mode,
        gameModeDisplayName: modeInfo?.displayName || row.game_mode,
        clearTimeMs: row.clear_time_ms,
        clearTimeFormatted: formatTime(row.clear_time_ms),
        mistakeCount: row.mistake_count,
        playedAt: row.played_at,
      };
    });

    return NextResponse.json({
      rankings,
      total: result.total,
      period: {
        type: period,
        startDate: periodFilter?.startDate.toISOString(),
        endDate: periodFilter?.endDate.toISOString(),
      },
    });
  } catch (error) {
    console.error("Rankings error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
