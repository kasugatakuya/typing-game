"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import type {
  ScoreSubmitRequest,
  ScoreSubmitResponse,
  QuestionTimestamp,
  GameCategory,
} from "@/app/types/score";

interface SubmitScoreParams {
  gameCategory: GameCategory;
  gameMode: string;
  clearTimeMs: number;
  mistakeCount: number;
  keystrokeCount: number;
  questionCount: number;
  questionTimestamps: QuestionTimestamp[];
}

export function useScoreSubmit() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ScoreSubmitResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitScore = useCallback(
    async (params: SubmitScoreParams): Promise<ScoreSubmitResponse> => {
      if (!user) {
        const errorResponse: ScoreSubmitResponse = {
          success: false,
          error: "ログインが必要です",
          isVerified: false,
        };
        setResult(errorResponse);
        setError("ログインが必要です");
        return errorResponse;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        const response = await fetch("/api/scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params satisfies ScoreSubmitRequest),
        });

        const data: ScoreSubmitResponse = await response.json();
        setResult(data);

        if (!data.success) {
          setError(data.error || "スコアの送信に失敗しました");
        }

        return data;
      } catch (err) {
        const errorResponse: ScoreSubmitResponse = {
          success: false,
          error: "ネットワークエラーが発生しました",
          isVerified: false,
        };
        setResult(errorResponse);
        setError("ネットワークエラーが発生しました");
        return errorResponse;
      } finally {
        setIsSubmitting(false);
      }
    },
    [user]
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    submitScore,
    isSubmitting,
    result,
    error,
    reset,
    isLoggedIn: !!user,
  };
}
