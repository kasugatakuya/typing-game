"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { createClient } from "@/app/lib/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import type { Profile } from "@/app/types/database";

interface AuthResult {
  success: boolean;
  error?: string;
  needsEmailConfirmation?: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isSupabaseAvailable: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<AuthResult>;
  signInWithEmail: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (displayName: string) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const isSupabaseAvailable = supabase !== null;

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(isSupabaseAvailable);

  const fetchOrCreateProfile = useCallback(
    async (userId: string) => {
      if (!supabase) return;
      try {
        // 最新のユーザー情報を取得
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (!currentUser) return;

        // user_metadataから表示名を取得（email signupで設定されたdisplay_nameを優先）
        const metadataDisplayName =
          currentUser.user_metadata?.display_name ||
          currentUser.user_metadata?.full_name ||
          currentUser.user_metadata?.name ||
          null;

        const emailUsername = currentUser.email?.split("@")[0] || null;
        const displayName = metadataDisplayName || emailUsername || "ユーザー";

        const avatarUrl =
          currentUser.user_metadata?.avatar_url ||
          currentUser.user_metadata?.picture ||
          null;

        const provider = currentUser.app_metadata?.provider || "email";

        // まずプロフィールを取得
        const { data: existingProfileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        const existingProfile = existingProfileData as Profile | null;

        if (existingProfile) {
          // プロフィールがデフォルト名のままで、より良い名前がある場合は更新
          const isDefaultName = existingProfile.display_name === "ユーザー" ||
                                existingProfile.display_name === "User" ||
                                existingProfile.display_name === "";
          if (isDefaultName && metadataDisplayName) {
            const { data: updatedProfile } = await supabase
              .from("profiles")
              .update({ display_name: metadataDisplayName } as never)
              .eq("id", userId as never)
              .select()
              .single();

            setProfile(updatedProfile ? (updatedProfile as Profile) : existingProfile);
          } else {
            setProfile(existingProfile);
          }
          return;
        }

        // プロフィールが存在しない場合は作成
        const { data: newProfile } = await supabase
          .from("profiles")
          .insert({
            id: userId,
            display_name: displayName,
            avatar_url: avatarUrl,
            provider: provider,
          } as never)
          .select()
          .single();

        if (newProfile) {
          setProfile(newProfile as Profile);
        }
      } catch {
        // プロフィール取得/作成エラーは無視
      }
    },
    [supabase]
  );

  // 互換性のためのエイリアス
  const fetchProfile = fetchOrCreateProfile;

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    // auth_successパラメータがある場合、URLをクリーンにする
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.has("auth_success")) {
        url.searchParams.delete("auth_success");
        window.history.replaceState({}, "", url.pathname + url.search);
      }
    }

    if (!supabase) {
      return;
    }

    let isMounted = true;

    // Listen for auth changes first
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchProfile(session.user.id).then(() => {
          if (isMounted) setIsLoading(false);
        });
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    });

    // 初期セッションを取得（onAuthStateChangeが発火しない場合のフォールバック）
    const initSession = async () => {
      try {
        const { data: { user: currentUser }, error } = await supabase.auth.getUser();

        if (!isMounted) return;

        if (currentUser && !error) {
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          if (!isMounted) return;

          setSession(currentSession);
          setUser(currentUser);
          await fetchProfile(currentUser.id);
        }
      } catch {
        // エラーは無視
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    // 少し遅延させてonAuthStateChangeが先に処理されるようにする
    const timeoutId = setTimeout(initSession, 100);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, [supabase, fetchProfile]);

  const signInWithGoogle = async () => {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<AuthResult> => {
    if (!supabase) return { success: false, error: "Supabaseが利用できません" };

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        return { success: false, error: "このメールアドレスは既に登録されています" };
      }
      return { success: false, error: error.message };
    }

    // メール確認が必要な場合
    if (data.user && !data.session) {
      return { success: true, needsEmailConfirmation: true };
    }

    return { success: true };
  };

  const signInWithEmail = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    if (!supabase) return { success: false, error: "Supabaseが利用できません" };

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        return { success: false, error: "メールアドレスまたはパスワードが正しくありません" };
      }
      if (error.message.includes("Email not confirmed")) {
        return { success: false, error: "メールアドレスの確認が完了していません" };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  };

  const signOut = async () => {
    if (!supabase) return;
    // 即座に状態をクリア
    setUser(null);
    setSession(null);
    setProfile(null);
    // Supabaseのセッションをクリア
    await supabase.auth.signOut();
    // ホームページにリダイレクト
    window.location.href = "/";
  };

  const updateProfile = async (displayName: string): Promise<AuthResult> => {
    if (!user) return { success: false, error: "ログインが必要です" };

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ display_name: displayName }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "更新に失敗しました" };
      }

      setProfile(data.profile);
      return { success: true };
    } catch {
      return { success: false, error: "通信エラーが発生しました" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isSupabaseAvailable,
        signInWithGoogle,
        signUpWithEmail,
        signInWithEmail,
        signOut,
        refreshProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
