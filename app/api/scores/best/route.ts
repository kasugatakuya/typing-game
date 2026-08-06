import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

// ログインユーザーの自己ベストタイム（検証済みスコアのみ）を返す
export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ bestTimeMs: null });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const mode = searchParams.get("mode");

    if (!category || !mode) {
      return NextResponse.json(
        { error: "Missing category or mode" },
        { status: 400 },
      );
    }

    const { data } = await supabase
      .from("scores")
      .select("clear_time_ms")
      .eq("user_id", user.id as never)
      .eq("game_category", category as never)
      .eq("game_mode", mode as never)
      .eq("is_verified", true as never)
      .order("clear_time_ms", { ascending: true })
      .limit(1)
      .maybeSingle();

    const best = data as { clear_time_ms: number } | null;

    return NextResponse.json({ bestTimeMs: best?.clear_time_ms ?? null });
  } catch (error) {
    console.error("Best score fetch error:", error);
    return NextResponse.json({ bestTimeMs: null }, { status: 500 });
  }
}
