"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatTime } from "@/app/utils/timeUtils";
import { ShareButtons } from "@/app/components/ShareButtons";
import { ScoreSubmitButton } from "@/app/components/score/ScoreSubmitButton";
import type { QuestionTimestamp } from "@/app/types/score";

interface Item {
  name: string;
  romaji: string;
  hint?: string;
  image?: string;
}

interface OtherTypingGameProps {
  items: Item[];
  title: string;
  backUrl: string;
  themeColor: string;
  gameMode: string;
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => 0.5 - Math.random());
}

const RomajiDisplay: React.FC<{
  input: string;
  romaji: string;
  showMistake: boolean;
}> = ({ input, romaji, showMistake }) => (
  <p
    className={`text-lg text-center font-mono ${showMistake ? "animate-shake text-red-500" : ""}`}
  >
    <span className={showMistake ? "" : "text-green-600"}>{input}</span>
    <span className={showMistake ? "" : "text-gray-400"}>
      {romaji.slice(input.length)}
    </span>
  </p>
);

export function OtherTypingGame({
  items,
  title,
  backUrl,
  themeColor,
  gameMode,
}: OtherTypingGameProps) {
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">(
    "idle",
  );
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [input, setInput] = useState("");
  const [completedItems, setCompletedItems] = useState<Item[]>([]);
  const [remainingItems, setRemainingItems] = useState<Item[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [mistakeCount, setMistakeCount] = useState<number>(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showMistakeEffect, setShowMistakeEffect] = useState(false);
  const [questionTimestamps, setQuestionTimestamps] = useState<QuestionTimestamp[]>([]);
  const questionStartTimeRef = useRef<number | null>(null);

  const itemCount = items.length;

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

  const getItems = useCallback(() => {
    return shuffleArray(items);
  }, [items]);

  const resetGame = useCallback(() => {
    setGameState("idle");
    setCurrentItem(null);
    setInput("");
    setCompletedItems([]);
    setStartTime(null);
    setEndTime(null);
    setCurrentTime(0);
    setRemainingItems(getItems());
    setMistakeCount(0);
    setTotalKeystrokes(0);
    setQuestionTimestamps([]);
    questionStartTimeRef.current = null;
  }, [getItems]);

  const startGame = useCallback(() => {
    const now = Date.now();
    setGameState("playing");
    setStartTime(now);
    setCurrentTime(0);
    const newItems = getItems();
    setRemainingItems(newItems);
    setCompletedItems([]);
    setCurrentItem(newItems[0]);
    setInput("");
    setQuestionTimestamps([]);
    questionStartTimeRef.current = now;
  }, [getItems]);

  const handleCorrectInput = useCallback(() => {
    const now = Date.now();

    // Use startTime as fallback for first question if ref is not set
    const questionStart = questionStartTimeRef.current ?? startTime ?? now;

    // Record timestamp for this question
    setQuestionTimestamps((prev) => [
      ...prev,
      {
        questionIndex: prev.length,
        startTime: questionStart,
        endTime: now,
        romajiLength: currentItem!.romaji.length,
        targetRomaji: currentItem!.romaji,
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
        // Set start time for next question immediately
        questionStartTimeRef.current = Date.now();
      }
      return newRemaining;
    });
  }, [currentItem, startTime]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (gameState === "idle" || gameState === "finished") {
          resetGame();
          startGame();
        }
        return;
      }

      if (e.code === "Escape" && gameState === "playing") {
        resetGame();
        return;
      }

      if (gameState !== "playing" || !currentItem) return;

      if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        const newInput = (input + e.key).toLowerCase();
        setTotalKeystrokes((prevCount) => prevCount + 1);

        if (currentItem.romaji.startsWith(newInput)) {
          setInput(newInput);
          if (newInput === currentItem.romaji) {
            handleCorrectInput();
          }
        } else {
          setMistakeCount((prevCount) => prevCount + 1);
          setShowMistakeEffect(true);
          setTimeout(() => setShowMistakeEffect(false), 300);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, startGame, resetGame, currentItem, input, handleCorrectInput]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === "playing") {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const calculateAverageTypingSpeed = useCallback(() => {
    if (startTime && endTime && totalKeystrokes > 0) {
      const totalTimeInSeconds = (endTime - startTime) / 1000;
      return (totalKeystrokes / totalTimeInSeconds).toFixed(2);
    }
    return "0.00";
  }, [startTime, endTime, totalKeystrokes]);

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 to-slate-100 py-12 pt-20 mt-4">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {title}（全{itemCount}問）
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {gameState === "idle" && (
            <div className="text-center py-12">
              <p className="text-gray-700 mb-4">
                表示される名前をタイピングしよう！
              </p>
              <p
                className={`text-xl font-semibold transition-opacity duration-500 ${themeColor} ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                スペースキーを押してゲームを開始
              </p>
              <p className="text-xs text-gray-500 mt-2">
                ※ESCキーで中断できます
              </p>
            </div>
          )}

          {gameState === "playing" && currentItem && (
            <div>
              <div className="text-center mb-6">
                {currentItem.image && (
                  <div className="flex justify-center items-center mb-4 h-[150px]">
                    <Image
                      src={currentItem.image}
                      alt={currentItem.name}
                      width={150}
                      height={150}
                      className="rounded-lg object-contain max-h-[150px] w-auto"
                    />
                  </div>
                )}
                {currentItem.hint && (
                  <p className="text-sm text-gray-500 mb-2">
                    {currentItem.hint}
                  </p>
                )}
                <p className="text-3xl font-bold text-gray-800 mb-2">
                  {currentItem.name}
                </p>
                <RomajiDisplay
                  input={input}
                  romaji={currentItem.romaji}
                  showMistake={showMistakeEffect}
                />
              </div>

              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>経過時間: {formatTime(currentTime)}</span>
                <span>ミス: {mistakeCount}回</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 bg-teal-500`}
                  style={{
                    width: `${(completedItems.length / itemCount) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                <span>ESCキーで中断</span>
                <span>{completedItems.length} / {itemCount}</span>
              </div>
            </div>
          )}

          {gameState === "finished" && startTime && endTime && (
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                ゲーム終了！
              </h3>
              <div className="flex justify-center gap-8 mb-6">
                <div>
                  <p className="text-xs text-gray-500">タイム</p>
                  <p className="text-xl font-bold text-gray-800">
                    {formatTime(endTime - startTime)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ミス</p>
                  <p className="text-xl font-bold text-gray-800">
                    {mistakeCount}回
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">速度</p>
                  <p className="text-xl font-bold text-gray-800">
                    {calculateAverageTypingSpeed()}打/秒
                  </p>
                </div>
              </div>
              <ShareButtons
                time={formatTime(endTime - startTime)}
                mistakes={mistakeCount}
                speed={calculateAverageTypingSpeed()}
                gameName={title}
                mode=""
              />
              <ScoreSubmitButton
                gameCategory="other"
                gameMode={gameMode}
                clearTimeMs={endTime - startTime}
                mistakeCount={mistakeCount}
                keystrokeCount={totalKeystrokes}
                questionCount={itemCount}
                questionTimestamps={questionTimestamps}
              />
              <p
                className={`text-base font-semibold transition-opacity duration-500 mt-10 ${themeColor} ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                スペースキーでもう一度プレイ
              </p>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            href={backUrl}
            className="inline-flex items-center px-6 py-2 text-sm rounded-full bg-white text-gray-600 font-medium shadow-md hover:shadow-lg hover:text-teal-600 transition-all"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
