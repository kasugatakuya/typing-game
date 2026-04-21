import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { display_name } = body;

    if (!display_name || typeof display_name !== "string") {
      return NextResponse.json(
        { error: "表示名が必要です" },
        { status: 400 }
      );
    }

    const trimmedName = display_name.trim();

    if (trimmedName.length < 1 || trimmedName.length > 30) {
      return NextResponse.json(
        { error: "表示名は1〜30文字で入力してください" },
        { status: 400 }
      );
    }

    const { data: profile, error: updateError } = await supabase
      .from("profiles")
      .update({ display_name: trimmedName } as never)
      .eq("id", user.id as never)
      .select()
      .single();

    if (updateError) {
      console.error("Profile update error:", updateError);
      return NextResponse.json(
        { error: "プロフィールの更新に失敗しました" },
        { status: 500 }
      );
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
