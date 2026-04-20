"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/app/components/Header";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  GAME_CATEGORIES,
  GAME_MODES,
  type GameCategory,
} from "@/app/types/score";

interface MyScore {
  id: string;
  gameCategory: string;
  gameMode: string;
  gameModeDisplayName: string;
  clearTimeMs: number;
  clearTimeFormatted: string;
  mistakeCount: number;
  keystrokeCount: number;
  isVerified: boolean;
  playedAt: string;
}

export default function MyPage() {
  const { user, profile, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [scores, setScores] = useState<MyScore[]>([]);
  const [isLoadingScores, setIsLoadingScores] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<
    GameCategory | "all"
  >("all");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/mypage");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchScores = async () => {
      if (!user) return;

      try {
        const params = new URLSearchParams();
        if (selectedCategory !== "all") {
          params.set("category", selectedCategory);
        }
        params.set("limit", "100");

        const response = await fetch(`/api/scores/my?${params}`);
        const data = await response.json();

        if (response.ok) {
          setScores(data.scores);
        }
      } catch (error) {
        console.error("Failed to fetch scores:", error);
      } finally {
        setIsLoadingScores(false);
      }
    };

    if (user) {
      fetchScores();
    }
  }, [user, selectedCategory]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  // Calculate stats
  const totalGames = scores.length;
  const verifiedGames = scores.filter((s) => s.isVerified).length;
  const totalMistakes = scores.reduce((sum, s) => sum + s.mistakeCount, 0);
  const avgMistakes =
    totalGames > 0 ? (totalMistakes / totalGames).toFixed(1) : "0";

  // Calculate average KPS (keystrokes per second)
  const totalKeystrokes = scores.reduce((sum, s) => sum + s.keystrokeCount, 0);
  const totalTimeSeconds = scores.reduce(
    (sum, s) => sum + s.clearTimeMs / 1000,
    0,
  );
  const avgKps =
    totalTimeSeconds > 0
      ? (totalKeystrokes / totalTimeSeconds).toFixed(2)
      : "0";

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800">
      <Header />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <div className="bg-slate-800 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4">
              {profile.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt={profile.display_name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-slate-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {profile.display_name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white">
                  {profile.display_name}
                </h1>
                <p className="text-slate-400 text-sm">
                  Googleアカウントでログイン中
                </p>
              </div>
              <button
                onClick={signOut}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
              >
                ログアウト
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{totalGames}</p>
                <p className="text-slate-400 text-sm">プレイ回数</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">
                  {verifiedGames}
                </p>
                <p className="text-slate-400 text-sm">ランキング登録</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">{avgKps}</p>
                <p className="text-slate-400 text-sm">平均打鍵/秒</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{avgMistakes}</p>
                <p className="text-slate-400 text-sm">平均ミス数</p>
              </div>
            </div>
          </div>

          {/* Score History */}
          <div className="bg-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-700 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">プレイ履歴</h2>
              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as GameCategory | "all")
                }
                className="bg-slate-700 text-white rounded-lg px-3 py-1.5 text-sm border border-slate-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="all">すべて</option>
                {Object.entries(GAME_CATEGORIES).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {isLoadingScores ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : scores.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400">まだプレイ履歴がありません</p>
                <Link
                  href="/"
                  className="inline-block mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                >
                  ゲームをプレイする
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-700">
                {scores.map((score) => {
                  const kps =
                    score.clearTimeMs > 0
                      ? (
                          score.keystrokeCount /
                          (score.clearTimeMs / 1000)
                        ).toFixed(2)
                      : "0";
                  return (
                    <div
                      key={score.id}
                      className="px-4 py-3 hover:bg-slate-700/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">
                              {score.gameModeDisplayName}
                            </span>
                            {score.isVerified ? (
                              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">
                                ランキング登録済
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                                未検証
                              </span>
                            )}
                          </div>
                          <p className="text-slate-500 text-sm">
                            {
                              GAME_CATEGORIES[
                                score.gameCategory as GameCategory
                              ]
                            }{" "}
                            ・{" "}
                            {new Date(score.playedAt).toLocaleString("ja-JP")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-mono font-bold">
                            {score.clearTimeFormatted}
                          </p>
                          <p className="text-slate-500 text-sm">
                            <span className="text-blue-400">{kps}打/秒</span>
                            <span className="mx-1">・</span>
                            ミス: {score.mistakeCount}回
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Back Link */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-block px-6 py-2 text-slate-400 hover:text-white transition-colors"
            >
              トップに戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
