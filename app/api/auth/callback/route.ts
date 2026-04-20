import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // リダイレクト先にauth_successパラメータを追加
      const redirectUrl = new URL(next, origin);
      redirectUrl.searchParams.set("auth_success", "true");
      return NextResponse.redirect(redirectUrl.toString());
    }
  }

  // Return to login page with error
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
