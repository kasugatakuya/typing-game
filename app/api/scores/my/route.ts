import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";
import { formatTime } from "@/app/utils/timeUtils";
import { GAME_MODES, type GameCategory } from "@/app/types/score";
import type { Score } from "@/app/types/database";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as GameCategory | null;
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    let query = supabase
      .from("scores")
      .select("*", { count: "exact" })
      .eq("user_id", user.id)
      .order("played_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq("game_category", category);
    }

    const { data: scores, count, error } = await query;

    if (error) {
      console.error("Query error:", error);
      return NextResponse.json(
        { error: "Failed to fetch scores" },
        { status: 500 }
      );
    }

    const formattedScores = (scores as Score[] | null)?.map((score) => {
      const categoryModes =
        GAME_MODES[score.game_category as GameCategory] || {};
      const modeInfo = categoryModes[score.game_mode];

      return {
        id: score.id,
        gameCategory: score.game_category,
        gameMode: score.game_mode,
        gameModeDisplayName: modeInfo?.displayName || score.game_mode,
        clearTimeMs: score.clear_time_ms,
        clearTimeFormatted: formatTime(score.clear_time_ms),
        mistakeCount: score.mistake_count,
        keystrokeCount: score.keystroke_count,
        isVerified: score.is_verified,
        playedAt: score.played_at,
      };
    });

    return NextResponse.json({
      scores: formattedScores,
      total: count || 0,
    });
  } catch (error) {
    console.error("My scores error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
