"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { formatTime } from "@/app/utils/timeUtils";
import { ShareButtons } from "@/app/components/ShareButtons";

interface Item {
  name: string;
  romaji: string;
  hint?: string;
}

interface OtherTypingGameProps {
  items: Item[];
  title: string;
  backUrl: string;
  themeColor: string;
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => 0.5 - Math.random());
}

const RomajiDisplay: React.FC<{ input: string; romaji: string }> = ({
  input,
  romaji,
}) => (
  <p className="text-lg text-center font-mono">
    <span className="text-green-600">{input}</span>
    <span className="text-gray-400">{romaji.slice(input.length)}</span>
  </p>
);

export function OtherTypingGame({
  items,
  title,
  backUrl,
  themeColor,
}: OtherTypingGameProps) {
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">(
    "idle"
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
  }, [getItems]);

  const startGame = useCallback(() => {
    setGameState("playing");
    setStartTime(Date.now());
    setCurrentTime(0);
    const newItems = getItems();
    setRemainingItems(newItems);
    setCompletedItems([]);
    setCurrentItem(newItems[0]);
    setInput("");
  }, [getItems]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        (gameState === "idle" || gameState === "finished")
      ) {
        resetGame();
        startGame();
      } else if (e.code === "Escape" && gameState === "playing") {
        resetGame();
      }
    },
    [gameState, startGame, resetGame]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === "playing") {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const handleCorrectInput = useCallback(() => {
    setCompletedItems((prev) => [...prev, currentItem!]);
    setRemainingItems((prev) => {
      const newRemaining = prev.slice(1);
      if (newRemaining.length === 0) {
        setEndTime(Date.now());
        setGameState("finished");
      } else {
        setCurrentItem(newRemaining[0]);
        setInput("");
      }
      return newRemaining;
    });
  }, [currentItem]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (gameState !== "playing" || !currentItem) return;

      const newInput = e.target.value.toLowerCase();
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
    },
    [gameState, currentItem, handleCorrectInput]
  );

  const calculateAverageTypingSpeed = useCallback(() => {
    if (startTime && endTime && totalKeystrokes > 0) {
      const totalTimeInSeconds = (endTime - startTime) / 1000;
      return (totalKeystrokes / totalTimeInSeconds).toFixed(2);
    }
    return "0.00";
  }, [startTime, endTime, totalKeystrokes]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-slate-100 py-12 pt-20">
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
                <div className="text-sm text-gray-500 mb-1">
                  {completedItems.length + 1} / {itemCount}
                </div>
                {currentItem.hint && (
                  <p className="text-sm text-gray-500 mb-2">
                    {currentItem.hint}
                  </p>
                )}
                <p className="text-3xl font-bold text-gray-800 mb-2">
                  {currentItem.name}
                </p>
                <RomajiDisplay input={input} romaji={currentItem.romaji} />
              </div>

              <input
                type="text"
                value={input}
                onChange={handleInput}
                className={`w-full p-3 text-lg border rounded-lg outline-none transition-all ${
                  showMistakeEffect
                    ? "border-red-500 bg-red-50 animate-shake"
                    : "border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                }`}
                autoFocus
              />

              <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>経過時間: {formatTime(currentTime)}</span>
                <span>ミス: {mistakeCount}回</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div
                  className={`h-2 rounded-full transition-all duration-300 bg-teal-500`}
                  style={{
                    width: `${(completedItems.length / itemCount) * 100}%`,
                  }}
                />
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
              <p
                className={`text-base font-semibold transition-opacity duration-500 mt-6 ${themeColor} ${
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
