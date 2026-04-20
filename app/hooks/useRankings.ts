"use client";

import { useState, useCallback, useEffect } from "react";
import type { GameCategory, RankingPeriod } from "@/app/types/score";

interface RankingEntry {
  rank: number;
  scoreId: string;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  gameCategory: string;
  gameCategoryDisplayName: string;
  gameMode: string;
  gameModeDisplayName: string;
  clearTimeMs: number;
  clearTimeFormatted: string;
  mistakeCount: number;
  playedAt: string;
}

interface RankingResponse {
  rankings: RankingEntry[];
  total: number;
  period: {
    type: RankingPeriod;
    startDate?: string;
    endDate?: string;
  };
}

interface UseRankingsParams {
  category?: GameCategory | "all";
  mode?: string;
  period?: RankingPeriod;
  limit?: number;
}

export function useRankings({
  category = "all",
  mode,
  period = "all",
  limit = 50,
}: UseRankingsParams = {}) {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRankings = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (mode) params.set("mode", mode);
      if (period) params.set("period", period);
      params.set("limit", limit.toString());

      const response = await fetch(`/api/rankings?${params}`);
      const data: RankingResponse = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch rankings");
      }

      setRankings(data.rankings);
      setTotal(data.total);
    } catch (err) {
      setError("ランキングの取得に失敗しました");
      console.error("Rankings fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [category, mode, period, limit]);

  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);

  return {
    rankings,
    total,
    isLoading,
    error,
    refetch: fetchRankings,
  };
}
