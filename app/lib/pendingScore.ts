import type { QuestionTimestamp, GameCategory } from "@/app/types/score";

const PENDING_SCORE_KEY = "pending_score";

export interface PendingScoreData {
  gameCategory: GameCategory;
  gameMode: string;
  clearTimeMs: number;
  mistakeCount: number;
  keystrokeCount: number;
  questionCount: number;
  questionTimestamps: QuestionTimestamp[];
  savedAt: number;
}

export function savePendingScore(data: Omit<PendingScoreData, "savedAt">): void {
  if (typeof window === "undefined") return;

  const pendingScore: PendingScoreData = {
    ...data,
    savedAt: Date.now(),
  };

  try {
    sessionStorage.setItem(PENDING_SCORE_KEY, JSON.stringify(pendingScore));
  } catch {
    // sessionStorageが使えない場合は無視
  }
}

export function getPendingScore(): PendingScoreData | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = sessionStorage.getItem(PENDING_SCORE_KEY);
    if (!stored) return null;

    const data: PendingScoreData = JSON.parse(stored);

    // 30分以上経過したデータは無効とする
    const MAX_AGE_MS = 30 * 60 * 1000;
    if (Date.now() - data.savedAt > MAX_AGE_MS) {
      clearPendingScore();
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export function clearPendingScore(): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(PENDING_SCORE_KEY);
  } catch {
    // sessionStorageが使えない場合は無視
  }
}
