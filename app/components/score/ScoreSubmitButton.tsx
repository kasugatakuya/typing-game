"use client";

import { useState } from "react";
import Link from "next/link";
import { useScoreSubmit } from "@/app/hooks/useScoreSubmit";
import type { QuestionTimestamp, GameCategory } from "@/app/types/score";

interface ScoreSubmitButtonProps {
  gameCategory: GameCategory;
  gameMode: string;
  clearTimeMs: number;
  mistakeCount: number;
  keystrokeCount: number;
  questionCount: number;
  questionTimestamps: QuestionTimestamp[];
}

export function ScoreSubmitButton({
  gameCategory,
  gameMode,
  clearTimeMs,
  mistakeCount,
  keystrokeCount,
  questionCount,
  questionTimestamps,
}: ScoreSubmitButtonProps) {
  const { submitScore, isSubmitting, result, isLoggedIn } = useScoreSubmit();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (hasSubmitted) return;

    await submitScore({
      gameCategory,
      gameMode,
      clearTimeMs,
      mistakeCount,
      keystrokeCount,
      questionCount,
      questionTimestamps,
    });
    setHasSubmitted(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="mt-4 p-4 bg-slate-700/50 rounded-lg">
        <p className="text-slate-300 text-sm mb-2">
          ランキングに登録するにはログインが必要です
        </p>
        <Link
          href={`/login?redirect=${encodeURIComponent(window.location.pathname)}`}
          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
        >
          ログインする
        </Link>
      </div>
    );
  }

  if (result) {
    return (
      <div
        className={`mt-4 p-4 rounded-lg ${
          result.success && result.isVerified
            ? "bg-green-500/20 border border-green-500/30"
            : result.success
              ? "bg-yellow-500/20 border border-yellow-500/30"
              : "bg-red-500/20 border border-red-500/30"
        }`}
      >
        {result.success && result.isVerified ? (
          <>
            <p className="text-green-400 font-medium">
              ランキングに登録しました
            </p>
            {result.rank && (
              <p className="text-green-300 text-sm mt-1">
                現在 {result.rank} 位です
              </p>
            )}
          </>
        ) : result.success ? (
          <>
            <p className="text-yellow-400 font-medium">スコアを記録しました</p>
            <p className="text-yellow-300 text-xs mt-1">
              検証に失敗したため、ランキングには表示されません
            </p>
          </>
        ) : (
          <>
            <p className="text-red-400 font-medium">送信に失敗しました</p>
            <p className="text-red-300 text-xs mt-1">{result.error}</p>
          </>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleSubmit}
      disabled={isSubmitting || hasSubmitted}
      className={`mt-4 px-6 py-3 rounded-lg font-medium transition-colors ${
        isSubmitting || hasSubmitted
          ? "bg-slate-600 text-slate-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700 text-white"
      }`}
    >
      {isSubmitting ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          送信中...
        </span>
      ) : (
        "ランキングに登録する"
      )}
    </button>
  );
}
