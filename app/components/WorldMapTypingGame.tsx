"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatTime } from "@/app/utils/timeUtils";
import { WorldMapSVG } from "./WorldMapSVG";

interface MapCountry {
  id: string;
  name: string;
  romaji: string;
  flagImage: string;
}

type GameState = "idle" | "playing" | "finished";
type Region = "north-america" | "south-america" | "europe" | "asia" | "oceania" | "africa";

interface WorldMapTypingGameProps {
  allCountries: MapCountry[];
  region: Region;
  regionName: string;
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => 0.5 - Math.random());
}

const RomajiDisplay: React.FC<{ input: string; romaji: string }> = ({
  input,
  romaji,
}) => (
  <p className="text-base text-center font-mono">
    <span className="text-green-600">{input}</span>
    <span className="text-gray-400">{romaji.slice(input.length)}</span>
  </p>
);

export function WorldMapTypingGame({
  allCountries,
  region,
  regionName,
}: WorldMapTypingGameProps) {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [currentCountry, setCurrentCountry] = useState<MapCountry | null>(null);
  const [input, setInput] = useState("");
  const [completedCountries, setCompletedCountries] = useState<MapCountry[]>([]);
  const [remainingCountries, setRemainingCountries] = useState<MapCountry[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const [mistakeCount, setMistakeCount] = useState<number>(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);

  const itemCount = allCountries.length;

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
    return shuffleArray(allCountries);
  }, [allCountries]);

  const resetGame = useCallback(() => {
    setGameState("idle");
    setCurrentCountry(null);
    setInput("");
    setCompletedCountries([]);
    setStartTime(null);
    setEndTime(null);
    setCurrentTime(0);
    setRemainingCountries(getItems());
    setMistakeCount(0);
    setTotalKeystrokes(0);
    setTypingStartTime(null);
  }, [getItems]);

  const startGame = useCallback(() => {
    setGameState("playing");
    setStartTime(Date.now());
    setCurrentTime(0);
    const newItems = getItems();
    setRemainingCountries(newItems);
    setCompletedCountries([]);
    setCurrentCountry(newItems[0]);
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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== "playing" || !currentCountry) return;

    const newInput = e.target.value.toLowerCase();
    setTotalKeystrokes((prevCount) => prevCount + 1);

    if (typingStartTime === null) {
      // eslint-disable-next-line react-hooks/purity -- Date.now() is safe in event handlers
      setTypingStartTime(Date.now());
    }

    if (currentCountry.romaji.startsWith(newInput)) {
      setInput(newInput);
      if (newInput === currentCountry.romaji) {
        handleCorrectInput();
      }
    } else {
      setMistakeCount((prevCount) => prevCount + 1);
    }
  };

  const handleCorrectInput = () => {
    setCompletedCountries([...completedCountries, currentCountry!]);
    const newRemaining = remainingCountries.slice(1);
    setRemainingCountries(newRemaining);

    if (newRemaining.length === 0) {
      setEndTime(Date.now());
      setGameState("finished");
    } else {
      setCurrentCountry(newRemaining[0]);
      setInput("");
      setTypingStartTime(null);
    }
  };

  const calculateAverageTypingSpeed = useCallback(() => {
    if (startTime && endTime && totalKeystrokes > 0) {
      const totalTimeInSeconds = (endTime - startTime) / 1000;
      return (totalKeystrokes / totalTimeInSeconds).toFixed(2);
    }
    return "0.00";
  }, [startTime, endTime, totalKeystrokes]);

  const getFlagImagePath = (country: MapCountry) => {
    return `/country/${country.flagImage}.png`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col justify-between">
      {/* ヘッダーの高さ分のスペース */}
      <div className="h-16"></div>

      {/* メインコンテンツ */}
      <main className="container mx-auto max-w-3xl px-4 flex-1 flex flex-col items-center justify-center">
        {/* ゲームカード */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
          {/* ヘッダー部分 */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-3 text-center">
            <h1 className="text-xl font-bold text-white">
              世界地図タイピング
            </h1>
            <h2 className="text-sm text-white/90">{regionName}（全{itemCount}問）</h2>
          </div>

          {/* ゲームコンテンツ */}
          <div className="p-4">
            {/* 地図と国旗の表示エリア */}
            <div className="flex gap-4 mb-4">
              {/* 地図表示エリア */}
              <div className="flex-1 border rounded-lg overflow-hidden" style={{ maxHeight: "240px" }}>
                <WorldMapSVG
                  highlightedCountry={currentCountry?.id || null}
                  region={region}
                />
              </div>

              {/* 国旗表示エリア */}
              {gameState === "playing" && currentCountry && (
                <div className="w-36 flex items-center justify-center">
                  <div className="relative overflow-hidden rounded-lg shadow-md border border-gray-200">
                    <Image
                      src={getFlagImagePath(currentCountry)}
                      alt={`${currentCountry.name}の国旗`}
                      width={140}
                      height={95}
                      className="object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* アイドル状態または終了状態 */}
            {(gameState === "idle" || gameState === "finished") && (
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-700">
                  地図上でハイライトされた国の名前をタイピングしよう！
                </p>
                <p
                  className={`text-base font-semibold text-blue-500 transition-opacity duration-500 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  スペースキーを押してゲームを開始
                </p>
                <p className="text-xs text-gray-500">
                  ※タイピング中はキーボードを使います
                </p>
              </div>
            )}

            {/* プレイ中の状態 */}
            {gameState === "playing" && currentCountry && (
              <div className="space-y-2">
                {/* 問題表示エリア */}
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800">
                    {currentCountry.name}
                  </p>
                  <RomajiDisplay
                    input={input}
                    romaji={currentCountry.romaji}
                  />
                </div>

                {/* 入力エリア */}
                <div className="space-y-1">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInput}
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                    autoFocus
                  />
                  <div className="text-center">
                    <p className="text-xs font-semibold text-gray-700">
                      経過時間: {formatTime(currentTime)}
                    </p>
                    <p className="text-xs text-gray-500">
                      ESCキーでゲームを中断
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 終了状態の結果表示 */}
            {gameState === "finished" &&
              startTime !== null &&
              endTime !== null && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="text-base font-bold text-gray-800 text-center mb-2">
                    ゲーム終了!
                  </h3>
                  <div className="flex justify-center gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">タイム</p>
                      <p className="text-sm font-bold text-gray-800">
                        {formatTime(endTime - startTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">ミス</p>
                      <p className="text-sm font-bold text-gray-800">
                        {mistakeCount}回
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">速度</p>
                      <p className="text-sm font-bold text-gray-800">
                        {calculateAverageTypingSpeed()}打/秒
                      </p>
                    </div>
                  </div>
                </div>
              )}

            {/* 進捗バー */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>進捗</span>
                <span>
                  {completedCountries.length} / {itemCount}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-400 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: `${(completedCountries.length / itemCount) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 地域選択に戻るリンク */}
        <div className="mt-4">
          <Link
            href="/worldmap"
            className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-gray-300 to-gray-400 text-white font-medium transition-all duration-200 hover:from-gray-400 hover:to-gray-500 hover:shadow-md"
          >
            ← 地域選択に戻る
          </Link>
        </div>
      </main>

      {/* フッターの高さ分のスペース */}
      <div className="h-8"></div>
    </div>
  );
}
