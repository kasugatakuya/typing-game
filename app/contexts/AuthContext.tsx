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

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isSupabaseAvailable: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const isSupabaseAvailable = supabase !== null;

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(isSupabaseAvailable);

  const fetchProfile = useCallback(
    async (userId: string) => {
      if (!supabase) return;
      try {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();
        setProfile(data);
      } catch {
        // プロフィール取得エラーは無視
      }
    },
    [supabase]
  );

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

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isSupabaseAvailable,
        signInWithGoogle,
        signOut,
        refreshProfile,
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
