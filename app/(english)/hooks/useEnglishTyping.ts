"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { shuffleArray } from "@/app/utils/arrayUtils";
import { sounds } from "@/app/lib/sounds";
import type { QuestionTimestamp } from "@/app/types/score";

export type EnglishGameState = "idle" | "playing" | "finished";

/**
 * learn: 英語を見ながら打つ / test: 日本語だけ見て思い出して打つ /
 * listen: 音声だけを聞いて打つ
 */
export type EnglishTypingMode = "learn" | "test" | "listen";

/** 英語を伏せて出題するモードか（答えの表示と自動表示の対象） */
export function isRecallMode(mode: EnglishTypingMode): boolean {
  return mode !== "learn";
}

/** 伏せて出題するモードで、1問の中でこの回数ミスすると答えを自動表示する */
export const AUTO_REVEAL_MISTAKES = 3;

export interface ItemResult<T> {
  item: T;
  mistakes: number;
  /** テストモードで答えを表示したか */
  revealed: boolean;
}

/** 復習対象: 伏せて出題するモードでは答えを表示した問題、学習ではミスした問題 */
function getMissedItems<T>(
  results: ItemResult<T>[],
  mode: EnglishTypingMode,
): T[] {
  return results
    .filter((r) => (isRecallMode(mode) ? r.revealed : r.mistakes > 0))
    .map((r) => r.item);
}

interface UseEnglishTypingOptions<T> {
  items: T[];
  getText: (item: T) => string;
  mode: EnglishTypingMode;
  onItemComplete?: (result: ItemResult<T>) => void;
}

/**
 * 英語用のタイピング進行フック。
 * ローマ字ゲームの useTypingGame と違い、スペースや記号を含む文をそのまま判定する。
 * 大文字・小文字は区別しない（Shift なしでも打てる）。
 */
export function useEnglishTyping<T>({
  items,
  getText,
  mode,
  onItemComplete,
}: UseEnglishTypingOptions<T>) {
  const [gameState, setGameState] = useState<EnglishGameState>("idle");
  const [queue, setQueue] = useState<T[]>([]);
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const [itemMistakes, setItemMistakes] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<ItemResult<T>[]>([]);
  // ランキング登録用: 各問題の開始・終了時刻と、全問を通したラウンドかどうか
  const [questionTimestamps, setQuestionTimestamps] = useState<
    QuestionTimestamp[]
  >([]);
  const [isFullRound, setIsFullRound] = useState(true);
  const questionStartRef = useRef<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showMistakeEffect, setShowMistakeEffect] = useState(false);
  const [imeDetected, setImeDetected] = useState(false);

  // コールバックの identity 変化でキー入力のエフェクトが再購読されないよう ref で保持
  const getTextRef = useRef(getText);
  const onItemCompleteRef = useRef(onItemComplete);
  useEffect(() => {
    getTextRef.current = getText;
    onItemCompleteRef.current = onItemComplete;
  }, [getText, onItemComplete]);

  const currentItem =
    gameState === "playing" ? (queue[index] ?? null) : null;
  const missedItems = getMissedItems(results, mode);

  // アイドル/終了画面の点滅
  useEffect(() => {
    if (gameState === "playing") return;
    const intervalId = setInterval(() => setIsVisible((prev) => !prev), 1000);
    return () => clearInterval(intervalId);
  }, [gameState]);

  // IME 検知の案内は数秒で自動的に消す
  useEffect(() => {
    if (!imeDetected) return;
    const timeoutId = setTimeout(() => setImeDetected(false), 4000);
    return () => clearTimeout(timeoutId);
  }, [imeDetected]);

  const clearRound = useCallback(() => {
    setIndex(0);
    setPosition(0);
    setItemMistakes(0);
    setRevealed(false);
    setResults([]);
    setQuestionTimestamps([]);
    setEndTime(null);
    setCurrentTime(0);
    setMistakeCount(0);
    setTotalKeystrokes(0);
  }, []);

  /** subset を渡すとその問題だけで開始する（間違えた問題の復習用） */
  const startGame = useCallback(
    (subset?: T[]) => {
      const source = subset && subset.length > 0 ? subset : items;
      if (source.length === 0) return;
      const now = Date.now();
      clearRound();
      setQueue(shuffleArray(source));
      setIsFullRound(source === items);
      setStartTime(now);
      questionStartRef.current = now;
      setGameState("playing");
    },
    [items, clearRound],
  );

  const resetGame = useCallback(() => {
    clearRound();
    setQueue([]);
    setStartTime(null);
    setGameState("idle");
  }, [clearRound]);

  const revealAnswer = useCallback(() => {
    if (gameState === "playing" && isRecallMode(mode)) setRevealed(true);
  }, [gameState, mode]);

  // キー入力処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (gameState !== "playing") {
        if (e.code === "Space") {
          e.preventDefault();
          startGame();
        } else if (gameState === "finished" && e.key.toLowerCase() === "r") {
          const missed = getMissedItems(results, mode);
          if (missed.length > 0) startGame(missed);
        }
        return;
      }

      if (e.key === "Escape") {
        resetGame();
        return;
      }

      // 日本語入力（IME）がオンだと key が "Process" になり何も起きないため案内を出す
      if (e.isComposing || e.key === "Process") {
        setImeDetected(true);
        return;
      }

      const item = queue[index];
      if (item === undefined) return;

      if (e.key === "Enter") {
        // リンクやボタンにフォーカスがある場合はそちらの操作を優先する
        const target = e.target as HTMLElement | null;
        if (target?.closest?.("a,button")) return;
        if (isRecallMode(mode)) setRevealed(true);
        return;
      }

      if (e.key.length !== 1) return;
      // スペースでのスクロールや ' / でのページ内検索を防ぐ
      e.preventDefault();
      setImeDetected(false);
      setTotalKeystrokes((prev) => prev + 1);

      const text = getTextRef.current(item);
      const expected = text[position];
      const isCorrect =
        expected !== undefined &&
        (e.key === expected || e.key.toLowerCase() === expected.toLowerCase());

      if (!isCorrect) {
        const newItemMistakes = itemMistakes + 1;
        setMistakeCount((prev) => prev + 1);
        setItemMistakes(newItemMistakes);
        if (isRecallMode(mode) && newItemMistakes >= AUTO_REVEAL_MISTAKES) {
          setRevealed(true);
        }
        setShowMistakeEffect(true);
        sounds.playMiss();
        setTimeout(() => setShowMistakeEffect(false), 300);
        return;
      }

      sounds.playType();
      const newPosition = position + 1;
      if (newPosition < text.length) {
        setPosition(newPosition);
        return;
      }

      // 1問クリア
      const result: ItemResult<T> = {
        item,
        mistakes: itemMistakes,
        revealed,
      };
      const now = Date.now();
      // updater は後から実行されるため、ref の値は先に読み出しておく
      const questionStart = questionStartRef.current ?? startTime ?? now;
      setResults((prev) => [...prev, result]);
      setQuestionTimestamps((prev) => [
        ...prev,
        {
          questionIndex: prev.length,
          startTime: questionStart,
          endTime: now,
          romajiLength: text.length,
          targetRomaji: text,
        },
      ]);
      questionStartRef.current = now;
      onItemCompleteRef.current?.(result);

      if (index + 1 >= queue.length) {
        setEndTime(now);
        setGameState("finished");
        sounds.playClear();
      } else {
        setIndex(index + 1);
        setPosition(0);
        setItemMistakes(0);
        setRevealed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    gameState,
    startGame,
    resetGame,
    queue,
    index,
    position,
    itemMistakes,
    revealed,
    mode,
    results,
    startTime,
  ]);

  // 経過時間の更新
  useEffect(() => {
    if (gameState !== "playing" || startTime === null) return;
    const interval = setInterval(() => {
      setCurrentTime(Date.now() - startTime);
    }, 10);
    return () => clearInterval(interval);
  }, [gameState, startTime]);

  const clearTimeMs =
    startTime !== null && endTime !== null ? endTime - startTime : 0;

  /** 正しく打てたキーの割合（%） */
  const accuracy =
    totalKeystrokes > 0
      ? Math.round(((totalKeystrokes - mistakeCount) / totalKeystrokes) * 100)
      : 100;

  return {
    gameState,
    currentItem,
    position,
    revealed,
    results,
    missedItems,
    completedCount: results.length,
    itemCount: gameState === "idle" ? items.length : queue.length,
    currentTime,
    clearTimeMs,
    mistakeCount,
    totalKeystrokes,
    questionTimestamps,
    isFullRound,
    accuracy,
    isVisible,
    showMistakeEffect,
    imeDetected,
    startGame,
    resetGame,
    revealAnswer,
  };
}
