"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/app/components/Header";
import { useRankings } from "@/app/hooks/useRankings";
import {
  GAME_CATEGORIES,
  RANKING_PERIODS,
  GAME_MODES,
  type GameCategory,
  type RankingPeriod,
} from "@/app/types/score";

export default function RankingPage() {
  const [category, setCategory] = useState<GameCategory | "all">("all");
  const [mode, setMode] = useState<string>("");
  const [period, setPeriod] = useState<RankingPeriod>("all");

  const { rankings, total, isLoading, error } = useRankings({
    category,
    mode: mode || undefined,
    period,
  });

  // Get available modes for selected category
  const availableModes = category !== "all" ? GAME_MODES[category] : {};

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800">
      <Header />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-white text-center mb-8">
            ランキング
          </h1>

          {/* Filters */}
          <div className="bg-slate-800 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  カテゴリ
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value as GameCategory | "all");
                    setMode("");
                  }}
                  className="cursor-pointer w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">すべて</option>
                  {Object.entries(GAME_CATEGORIES).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mode Filter */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  モード
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  disabled={category === "all"}
                  className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600 focus:border-blue-500 focus:outline-none disabled:opacity-50"
                >
                  <option value="">すべてのモード</option>
                  {Object.entries(availableModes).map(([key, info]) => (
                    <option key={key} value={key}>
                      {info.displayName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Period Filter */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  期間
                </label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as RankingPeriod)}
                  className="cursor-pointer w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600 focus:border-blue-500 focus:outline-none"
                >
                  {Object.entries(RANKING_PERIODS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Rankings Table */}
          <div className="bg-slate-800 rounded-xl overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-400">{error}</p>
              </div>
            ) : rankings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400">
                  まだランキングデータがありません
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  ゲームをプレイしてスコアを登録しましょう
                </p>
              </div>
            ) : (
              <>
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-slate-700 text-slate-400 text-sm font-medium">
                  <div className="col-span-1 text-center">#</div>
                  <div className="col-span-3">プレイヤー</div>
                  <div className="col-span-3">ゲーム</div>
                  <div className="col-span-2 text-right">タイム</div>
                  <div className="col-span-1 text-right">ミス</div>
                  <div className="col-span-2 text-right">プレイ日</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-slate-700">
                  {rankings.map((entry) => (
                    <div
                      key={entry.scoreId}
                      className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-slate-700/50 transition-colors"
                    >
                      {/* Rank */}
                      <div className="col-span-2 md:col-span-1 text-center">
                        {entry.rank <= 3 ? (
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                              entry.rank === 1
                                ? "bg-yellow-500 text-yellow-900"
                                : entry.rank === 2
                                  ? "bg-slate-300 text-slate-800"
                                  : "bg-amber-600 text-amber-100"
                            }`}
                          >
                            {entry.rank}
                          </span>
                        ) : (
                          <span className="text-slate-400">{entry.rank}</span>
                        )}
                      </div>

                      {/* Player */}
                      <div className="col-span-10 md:col-span-3 flex items-center gap-2">
                        {entry.avatarUrl ? (
                          <Image
                            src={entry.avatarUrl}
                            alt={entry.displayName}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                            <span className="text-white text-sm">
                              {entry.displayName.charAt(0)}
                            </span>
                          </div>
                        )}
                        <span className="text-white truncate">
                          {entry.displayName}
                        </span>
                      </div>

                      {/* Game */}
                      <div className="col-span-6 md:col-span-3">
                        <span className="text-xs text-slate-500 block">
                          {entry.gameCategoryDisplayName}
                        </span>
                        <span className="text-slate-300 text-sm">
                          {entry.gameModeDisplayName}
                        </span>
                      </div>

                      {/* Time */}
                      <div className="col-span-2 md:col-span-2 text-right">
                        <span className="text-green-400 font-mono font-bold">
                          {entry.clearTimeFormatted}
                        </span>
                      </div>

                      {/* Mistakes */}
                      <div className="col-span-2 md:col-span-1 text-right">
                        <span className="text-slate-400">
                          {entry.mistakeCount}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="col-span-2 md:col-span-2 text-right text-slate-500 text-sm">
                        {new Date(entry.playedAt).toLocaleDateString("ja-JP")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                {total > 0 && (
                  <div className="px-4 py-3 bg-slate-700/50 text-center">
                    <p className="text-slate-400 text-sm">
                      {total}件中 {rankings.length}件を表示
                    </p>
                  </div>
                )}
              </>
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
