"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

function LoginContent() {
  const { user, isLoading, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const redirect = searchParams.get("redirect") ?? "/";

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user && !isLoading) {
      router.push(redirect);
    }
  }, [user, isLoading, router, redirect]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      if (mode === "signup") {
        if (!displayName.trim()) {
          setFormError("表示名を入力してください");
          return;
        }
        if (password.length < 6) {
          setFormError("パスワードは6文字以上で入力してください");
          return;
        }

        const result = await signUpWithEmail(email, password, displayName);
        if (!result.success) {
          setFormError(result.error ?? "登録に失敗しました");
        } else if (result.needsEmailConfirmation) {
          setSuccessMessage("確認メールを送信しました。メール内のリンクをクリックして登録を完了してください。");
          setEmail("");
          setPassword("");
          setDisplayName("");
        }
      } else {
        const result = await signInWithEmail(email, password);
        if (!result.success) {
          setFormError(result.error ?? "ログインに失敗しました");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800">
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-800 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">
                {mode === "login" ? "ログイン" : "新規登録"}
              </h1>
              <p className="text-slate-400 text-sm">
                ランキングに参加するにはログインが必要です
              </p>
            </div>

            {/* タブ切り替え */}
            <div className="flex mb-6 bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => {
                  setMode("login");
                  setFormError(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  mode === "login"
                    ? "bg-slate-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                ログイン
              </button>
              <button
                onClick={() => {
                  setMode("signup");
                  setFormError(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  mode === "signup"
                    ? "bg-slate-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                新規登録
              </button>
            </div>

            {(error || formError) && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm text-center">
                  {formError || "ログインに失敗しました。もう一度お試しください。"}
                </p>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-sm text-center">
                  {successMessage}
                </p>
              </div>
            )}

            {/* メールフォーム */}
            <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
              {mode === "signup" && (
                <div>
                  <label className="block text-sm text-slate-400 mb-1">
                    表示名
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="ランキングに表示される名前"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  メールアドレス
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  パスワード
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "signup" ? "6文字以上" : "パスワード"}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  required
                  minLength={mode === "signup" ? 6 : undefined}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
              >
                {isSubmitting
                  ? "処理中..."
                  : mode === "login"
                    ? "ログイン"
                    : "新規登録"}
              </button>
            </form>

            {/* 区切り線 */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-slate-500">または</span>
              </div>
            </div>

            {/* Googleログイン */}
            <button
              onClick={signInWithGoogle}
              className="cursor-pointer w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-100 text-gray-800 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Googleで{mode === "login" ? "ログイン" : "登録"}
            </button>

            <div className="mt-8 pt-6 border-t border-slate-700">
              <p className="text-slate-400 text-xs text-center">
                {mode === "login" ? "ログイン" : "登録"}すると、
                <Link href="/about" className="text-blue-400 hover:underline">
                  利用規約
                </Link>
                に同意したことになります
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              ログインせずにプレイする
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
