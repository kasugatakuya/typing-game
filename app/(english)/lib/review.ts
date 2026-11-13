import { useState } from "react";
import { findItemByProgressKey } from "@/app/(english)/data";
import type { EnglishItem } from "@/app/(english)/data/types";
import {
  dueAt,
  isDue,
  isMastered,
  isWeak,
  useEnglishProgress,
  type ProgressMap,
} from "@/app/(english)/lib/progress";

/** due: 覚えたあと復習の時期が来た問題 / weak: 答えを見たまままだ覚えていない問題 */
export type ReviewType = "due" | "weak";

/** 1回の復習で出題する最大数 */
export const REVIEW_BATCH_SIZE = 20;

export const REVIEW_LABELS: Record<ReviewType, string> = {
  due: "今日の復習",
  weak: "苦手な問題",
};

export function isReviewType(value: string | null): value is ReviewType {
  return value === "due" || value === "weak";
}

/**
 * 学習記録から復習対象の問題をデッキ横断で集める。
 * due は復習期限の古い順、weak は間違えた回数の多い順に並べる。
 */
export function collectReviewItems(
  progress: ProgressMap,
  type: ReviewType,
  now: number,
): EnglishItem[] {
  const entries = Object.entries(progress).filter(([, p]) =>
    type === "due" ? isDue(p, now) : isWeak(p),
  );
  if (type === "due") {
    entries.sort(([, a], [, b]) => dueAt(a) - dueAt(b));
  } else {
    entries.sort(([, a], [, b]) => b.wrong - a.wrong || a.last - b.last);
  }

  const items: EnglishItem[] = [];
  for (const [key] of entries) {
    // 問題の差し替えで無くなったキーは無視する
    const found = findItemByProgressKey(key);
    if (found) items.push({ ...found.item, progressKey: key });
  }
  return items;
}

export interface ReviewSummary {
  due: EnglishItem[];
  weak: EnglishItem[];
  /** 覚えていて、まだ復習の時期が来ていない問題の数 */
  scheduledCount: number;
  /** 次に復習の時期が来る時刻（ms）。予定が無ければ null */
  nextDueAt: number | null;
}

/** 復習対象の一覧と件数。時刻はページを開いた時点で固定する */
export function useReviewSummary(): ReviewSummary {
  const progress = useEnglishProgress();
  const [now] = useState(() => Date.now());

  let scheduledCount = 0;
  let nextDueAt: number | null = null;
  for (const [key, p] of Object.entries(progress)) {
    if (!isMastered(p) || isDue(p, now) || !findItemByProgressKey(key)) continue;
    scheduledCount++;
    const due = dueAt(p);
    if (nextDueAt === null || due < nextDueAt) nextDueAt = due;
  }

  return {
    due: collectReviewItems(progress, "due", now),
    weak: collectReviewItems(progress, "weak", now),
    scheduledCount,
    nextDueAt,
  };
}
