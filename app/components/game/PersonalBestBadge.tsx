"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { formatTime } from "@/app/utils/timeUtils";
import type { GameCategory } from "@/app/types/score";

interface PersonalBestBadgeProps {
  gameCategory: GameCategory;
  gameMode: string;
}

/** ログインユーザーの自己ベストタイムを表示（未ログイン・記録なしなら非表示） */
export function PersonalBestBadge({
  gameCategory,
  gameMode,
}: PersonalBestBadgeProps) {
  const { user } = useAuth();
  const [bestTimeMs, setBestTimeMs] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }
    let cancelled = false;
    fetch(
      `/api/scores/best?category=${encodeURIComponent(gameCategory)}&mode=${encodeURIComponent(gameMode)}`,
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.bestTimeMs === "number") {
          setBestTimeMs(data.bestTimeMs);
        }
      })
      .catch(() => {
        // 取得失敗時は単に表示しない
      });
    return () => {
      cancelled = true;
    };
  }, [user, gameCategory, gameMode]);

  if (bestTimeMs === null) return null;

  return (
    <p className="text-sm text-gray-600 mt-3">
      🏆 自己ベスト:{" "}
      <span className="font-mono font-bold text-gray-800">
        {formatTime(bestTimeMs)}
      </span>
    </p>
  );
}
