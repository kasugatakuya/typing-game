import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";
import { formatTime } from "@/app/utils/timeUtils";
import {
  GAME_MODES,
  GAME_CATEGORIES,
  type GameCategory,
  type RankingPeriod,
} from "@/app/types/score";

interface ScoreWithProfile {
  id: string;
  user_id: string;
  game_category: string;
  game_mode: string;
  clear_time_ms: number;
  mistake_count: number;
  played_at: string;
  profiles: {
    display_name: string;
    avatar_url: string | null;
  };
}

function getPeriodFilter(period: RankingPeriod): { startDate: Date; endDate: Date } | null {
  const now = new Date();
  const endDate = now;

  switch (period) {
    case "daily": {
      const startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
      return { startDate, endDate };
    }
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

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category") as GameCategory | "all" | null;
    const mode = searchParams.get("mode");
    const period = (searchParams.get("period") as RankingPeriod) || "all";
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    // Build query
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
        { count: "exact" }
      )
      .eq("is_verified", true)
      .order("clear_time_ms", { ascending: true });

    // Category filter
    if (category && category !== "all") {
      query = query.eq("game_category", category);
    }

    // Mode filter
    if (mode) {
      query = query.eq("game_mode", mode);
    }

    // Period filter
    const periodFilter = getPeriodFilter(period);
    if (periodFilter) {
      query = query
        .gte("played_at", periodFilter.startDate.toISOString())
        .lte("played_at", periodFilter.endDate.toISOString());
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data: scores, count, error } = await query;

    if (error) {
      console.error("Query error:", error);
      return NextResponse.json(
        { error: "Failed to fetch rankings" },
        { status: 500 }
      );
    }

    // Format response
    const rankings = (scores as ScoreWithProfile[] | null)?.map((score, index) => {
      const categoryModes =
        GAME_MODES[score.game_category as GameCategory] || {};
      const modeInfo = categoryModes[score.game_mode];
      const profile = score.profiles;

      return {
        rank: offset + index + 1,
        scoreId: score.id,
        userId: score.user_id,
        displayName: profile?.display_name || "Unknown",
        avatarUrl: profile?.avatar_url,
        gameCategory: score.game_category,
        gameCategoryDisplayName:
          GAME_CATEGORIES[score.game_category as GameCategory] ||
          score.game_category,
        gameMode: score.game_mode,
        gameModeDisplayName: modeInfo?.displayName || score.game_mode,
        clearTimeMs: score.clear_time_ms,
        clearTimeFormatted: formatTime(score.clear_time_ms),
        mistakeCount: score.mistake_count,
        playedAt: score.played_at,
      };
    });

    return NextResponse.json({
      rankings: rankings || [],
      total: count || 0,
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
