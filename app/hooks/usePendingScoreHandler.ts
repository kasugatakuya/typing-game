"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { getPendingScore, clearPendingScore } from "@/app/lib/pendingScore";
import type { ScoreSubmitResponse } from "@/app/types/score";

interface PendingScoreResult {
  isProcessing: boolean;
  result: ScoreSubmitResponse | null;
  gameMode: string | null;
  clearResult: () => void;
}

export function usePendingScoreHandler(): PendingScoreResult {
  const { user, isLoading } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ScoreSubmitResponse | null>(null);
  const [gameMode, setGameMode] = useState<string | null>(null);
  const hasProcessed = useRef(false);

  const clearResult = useCallback(() => {
    setResult(null);
    setGameMode(null);
  }, []);

  useEffect(() => {
    // ロード中、未ログイン、または既に処理済みの場合はスキップ
    if (isLoading || !user || hasProcessed.current) return;

    const pendingScore = getPendingScore();
    if (!pendingScore) return;

    // 処理中フラグを立てる（重複実行防止）
    hasProcessed.current = true;
    setIsProcessing(true);
    setGameMode(pendingScore.gameMode);

    const submitPendingScore = async () => {
      try {
        const response = await fetch("/api/scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gameCategory: pendingScore.gameCategory,
            gameMode: pendingScore.gameMode,
            clearTimeMs: pendingScore.clearTimeMs,
            mistakeCount: pendingScore.mistakeCount,
            keystrokeCount: pendingScore.keystrokeCount,
            questionCount: pendingScore.questionCount,
            questionTimestamps: pendingScore.questionTimestamps,
          }),
        });

        const data: ScoreSubmitResponse = await response.json();
        setResult(data);

        // 成功したらペンディングスコアをクリア
        if (data.success) {
          clearPendingScore();
        }
      } catch {
        setResult({
          success: false,
          error: "ネットワークエラーが発生しました",
          isVerified: false,
        });
      } finally {
        setIsProcessing(false);
      }
    };

    submitPendingScore();
  }, [user, isLoading]);

  return {
    isProcessing,
    result,
    gameMode,
    clearResult,
  };
}
