"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { shuffleArray } from "@/app/utils/arrayUtils";
import type { QuestionTimestamp } from "@/app/types/score";

export type GameState = "idle" | "playing" | "finished";

interface UseTypingGameOptions<T> {
  items: T[];
  /** 出題対象のローマ字を返す。省略時は item.romaji を使う */
  getRomaji?: (item: T) => string;
  /**
   * true の場合、スペースキーではなく最初の文字入力でゲームを開始する
   * （周期表タイピングの挙動）
   */
  startOnFirstKey?: boolean;
}

interface UseTypingGameResult<T> {
  gameState: GameState;
  currentItem: T | null;
  input: string;
  completedItems: T[];
  completedCount: number;
  itemCount: number;
  startTime: number | null;
  endTime: number | null;
  /** プレイ中の経過時間（ms） */
  currentTime: number;
  /** クリアタイム（ms）。未クリア時は 0 */
  clearTimeMs: number;
  mistakeCount: number;
  totalKeystrokes: number;
  /** アイドル/終了画面の点滅表示用フラグ */
  isVisible: boolean;
  showMistakeEffect: boolean;
  questionTimestamps: QuestionTimestamp[];
  /** 平均タイピング速度（打/秒） */
  averageSpeed: string;
  startGame: () => void;
  resetGame: () => void;
}

export function useTypingGame<T>({
  items,
  getRomaji,
  startOnFirstKey = false,
}: UseTypingGameOptions<T>): UseTypingGameResult<T> {
  // 開始前から問題を表示するモードのため、初期状態からシャッフル済みの問題を持つ
  const [initialShuffle] = useState(() => shuffleArray(items));
  const [gameState, setGameState] = useState<GameState>("idle");
  const [currentItem, setCurrentItem] = useState<T | null>(
    startOnFirstKey ? (initialShuffle[0] ?? null) : null,
  );
  const [input, setInput] = useState("");
  const [completedItems, setCompletedItems] = useState<T[]>([]);
  const [, setRemainingItems] = useState<T[]>(initialShuffle);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showMistakeEffect, setShowMistakeEffect] = useState(false);
  const [questionTimestamps, setQuestionTimestamps] = useState<
    QuestionTimestamp[]
  >([]);
  const questionStartTimeRef = useRef<number | null>(null);

  // getRomaji の identity 変化でエフェクトが再購読されないよう ref で保持
  const getRomajiRef = useRef(getRomaji);
  useEffect(() => {
    getRomajiRef.current = getRomaji;
  }, [getRomaji]);

  const resolveRomaji = useCallback((item: T): string => {
    const fn = getRomajiRef.current;
    return fn ? fn(item) : (item as { romaji: string }).romaji;
  }, []);

  const itemCount = items.length;

  // アイドル/終了画面の点滅
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (gameState === "idle" || gameState === "finished") {
      intervalId = setInterval(() => {
        setIsVisible((prev) => !prev);
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [gameState]);

  const resetGame = useCallback(() => {
    const shuffled = shuffleArray(items);
    setGameState("idle");
    // 開始前から問題を表示する必要があるモードでは最初の問題をセットしておく
    setCurrentItem(startOnFirstKey ? (shuffled[0] ?? null) : null);
    setInput("");
    setCompletedItems([]);
    setRemainingItems(shuffled);
    setStartTime(null);
    setEndTime(null);
    setCurrentTime(0);
    setMistakeCount(0);
    setTotalKeystrokes(0);
    setQuestionTimestamps([]);
    questionStartTimeRef.current = null;
  }, [items, startOnFirstKey]);

  const startGame = useCallback(() => {
    const now = Date.now();
    const shuffled = shuffleArray(items);
    setGameState("playing");
    setStartTime(now);
    setEndTime(null);
    setCurrentTime(0);
    setRemainingItems(shuffled);
    setCompletedItems([]);
    setCurrentItem(shuffled[0] ?? null);
    setInput("");
    setMistakeCount(0);
    setTotalKeystrokes(0);
    setQuestionTimestamps([]);
    questionStartTimeRef.current = now;
  }, [items]);

  const handleCorrectInput = useCallback(() => {
    const now = Date.now();
    const targetRomaji = resolveRomaji(currentItem!);

    // 最初の問題で ref が未設定の場合は startTime をフォールバックに使う
    const questionStart = questionStartTimeRef.current ?? startTime ?? now;

    setQuestionTimestamps((prev) => [
      ...prev,
      {
        questionIndex: prev.length,
        startTime: questionStart,
        endTime: now,
        romajiLength: targetRomaji.length,
        targetRomaji,
      },
    ]);

    setCompletedItems((prev) => [...prev, currentItem!]);
    setRemainingItems((prev) => {
      const newRemaining = prev.slice(1);
      if (newRemaining.length === 0) {
        setEndTime(now);
        setGameState("finished");
      } else {
        setCurrentItem(newRemaining[0]);
        setInput("");
        questionStartTimeRef.current = Date.now();
      }
      return newRemaining;
    });
  }, [currentItem, startTime, resolveRomaji]);

  // キー入力処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (gameState === "finished" || (gameState === "idle" && !startOnFirstKey)) {
          startGame();
        }
        return;
      }

      if (e.code === "Escape" && gameState === "playing") {
        resetGame();
        return;
      }

      const canType =
        gameState === "playing" || (startOnFirstKey && gameState === "idle");
      if (!canType || !currentItem) return;

      if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        // startOnFirstKey モードでは最初の文字入力でタイマーを開始
        if (startOnFirstKey && gameState === "idle") {
          const now = Date.now();
          setGameState("playing");
          setStartTime(now);
          questionStartTimeRef.current = now;
        }

        const newInput = (input + e.key).toLowerCase();
        setTotalKeystrokes((prev) => prev + 1);

        const targetRomaji = resolveRomaji(currentItem);
        if (targetRomaji.startsWith(newInput)) {
          setInput(newInput);
          if (newInput === targetRomaji) {
            handleCorrectInput();
          }
        } else {
          setMistakeCount((prev) => prev + 1);
          setShowMistakeEffect(true);
          setTimeout(() => setShowMistakeEffect(false), 300);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    gameState,
    startGame,
    resetGame,
    currentItem,
    input,
    startOnFirstKey,
    resolveRomaji,
    handleCorrectInput,
  ]);

  // 経過時間の更新
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === "playing" && startTime !== null) {
      interval = setInterval(() => {
        setCurrentTime(Date.now() - startTime);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [gameState, startTime]);

  const clearTimeMs = startTime !== null && endTime !== null ? endTime - startTime : 0;

  const averageSpeed =
    clearTimeMs > 0 && totalKeystrokes > 0
      ? (totalKeystrokes / (clearTimeMs / 1000)).toFixed(2)
      : "0.00";

  return {
    gameState,
    currentItem,
    input,
    completedItems,
    completedCount: completedItems.length,
    itemCount,
    startTime,
    endTime,
    currentTime,
    clearTimeMs,
    mistakeCount,
    totalKeystrokes,
    isVisible,
    showMistakeEffect,
    questionTimestamps,
    averageSpeed,
    startGame,
    resetGame,
  };
}
