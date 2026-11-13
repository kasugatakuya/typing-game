import { useSyncExternalStore } from "react";
import type { EnglishDeck, EnglishItem } from "@/app/(english)/data/types";

/**
 * 英語学習の進捗（テストモードの正誤）の保存と、復習タイミングの計算。
 *
 * ブラウザの localStorage に常に保存し、ログイン中は lib/progressSync.ts が
 * Supabase の english_progress テーブルと同期する。
 * ランキング用の scores テーブルとは独立している。
 */

const STORAGE_KEY = "english-progress-v1";
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * 連続正解数（streak）に応じた次回復習までの日数。
 * 1回目の正解で1日後、以降 3日 → 7日 → 14日 → 30日 → 60日 と間隔を広げる。
 */
export const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 60];

export interface ItemProgress {
  /** テストで答えを見ずに打てた回数 */
  correct: number;
  /** テストで答えを表示した回数 */
  wrong: number;
  /** 復習の段階（連続正解数）。1以上で「覚えた」とみなす */
  streak: number;
  /** 最後に段階が変わった時刻（ms）。次回復習日の起点になる */
  last: number;
}

export type ProgressMap = Record<string, ItemProgress>;

const EMPTY: ProgressMap = {};
let cache: ProgressMap | null = null;
const listeners = new Set<() => void>();
/** 記録が更新されたときに呼ぶ（Supabase への送信用） */
const changeListeners = new Set<(key: string, value: ItemProgress) => void>();

function isItemProgress(value: unknown): value is ItemProgress {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.correct === "number" &&
    typeof v.wrong === "number" &&
    typeof v.streak === "number" &&
    typeof v.last === "number"
  );
}

function load(): ProgressMap {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === "object") {
      const valid: ProgressMap = {};
      for (const [key, value] of Object.entries(parsed)) {
        if (isItemProgress(value)) valid[key] = value;
      }
      cache = valid;
    } else {
      cache = EMPTY;
    }
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function save(next: ProgressMap) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // 保存できない環境（プライベートモードなど）ではメモリ上の値だけ使う
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  // 別タブでの更新を反映する
  const onStorage = (e: StorageEvent) => {
    if (e.key !== null && e.key !== STORAGE_KEY) return;
    cache = null;
    listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getServerSnapshot = () => EMPTY;

export function itemKey(deck: EnglishDeck, item: EnglishItem): string {
  return item.progressKey ?? `${deck.section}/${deck.id}/${item.en}`;
}

export function isMastered(progress: ItemProgress | undefined): boolean {
  return progress !== undefined && progress.streak >= 1;
}

export function countMastered(deck: EnglishDeck, progress: ProgressMap): number {
  return deck.items.filter((item) => isMastered(progress[itemKey(deck, item)]))
    .length;
}

/** 次に復習すべき時刻（ms） */
export function dueAt(progress: ItemProgress): number {
  if (progress.streak <= 0) return progress.last;
  const index = Math.min(progress.streak, REVIEW_INTERVAL_DAYS.length) - 1;
  return progress.last + REVIEW_INTERVAL_DAYS[index] * DAY_MS;
}

/** 覚えたあと復習の時期が来ているか */
export function isDue(progress: ItemProgress, now: number): boolean {
  return progress.streak >= 1 && dueAt(progress) <= now;
}

/** 直近のテストで答えを見た（まだ覚えていない）問題か */
export function isWeak(progress: ItemProgress): boolean {
  return progress.streak === 0 && progress.wrong > 0;
}

/** テストモードの結果を記録する */
export function recordTestResult(key: string, remembered: boolean) {
  const current = load();
  const prev = current[key] ?? { correct: 0, wrong: 0, streak: 0, last: 0 };
  const now = Date.now();

  let next: ItemProgress;
  if (!remembered) {
    next = { ...prev, wrong: prev.wrong + 1, streak: 0, last: now };
  } else if (prev.streak >= 1 && dueAt(prev) > now) {
    // 復習の時期より前に正解しても段階は進めない（同じ日に繰り返しても間隔が延びないようにする）
    next = { ...prev, correct: prev.correct + 1 };
  } else {
    next = {
      ...prev,
      correct: prev.correct + 1,
      streak: prev.streak + 1,
      last: now,
    };
  }

  save({ ...current, [key]: next });
  changeListeners.forEach((listener) => listener(key, next));
}

/** 現在の全記録（同期用） */
export function getProgressSnapshot(): ProgressMap {
  return load();
}

/** 記録全体を置き換える（Supabase から取り込んだ結果の反映用） */
export function replaceProgress(next: ProgressMap) {
  save(next);
}

/** 記録が更新されるたびに呼ばれるリスナーを登録する */
export function onProgressChange(
  listener: (key: string, value: ItemProgress) => void,
) {
  changeListeners.add(listener);
  return () => {
    changeListeners.delete(listener);
  };
}

export function useEnglishProgress(): ProgressMap {
  return useSyncExternalStore(subscribe, load, getServerSnapshot);
}
