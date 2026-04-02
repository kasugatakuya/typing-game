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
type Region =
  | "north-america"
  | "south-america"
  | "western-europe"
  | "eastern-europe"
  | "east-asia"
  | "west-asia"
  | "oceania"
  | "north-africa"
  | "sub-saharan-africa";

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
  <p className="text-lg text-center font-mono">
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
  const [completedCountries, setCompletedCountries] = useState<MapCountry[]>(
    [],
  );
  const [remainingCountries, setRemainingCountries] = useState<MapCountry[]>(
    [],
  );
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
    [gameState, startGame, resetGame],
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
    <div className="h-screen flex flex-col pt-11 lg:pt-14">
      <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-6 py-10 overflow-hidden">
        {/* ヘッダー */}
        <div className="flex-shrink-0 text-center mb-5 w-full">
          <h1 className="text-xl font-bold text-gray-800">
            世界地図タイピング - {regionName}（全{itemCount}問）
          </h1>
        </div>

        {/* 地図表示エリア - 残りスペースを埋める */}
        <div className="relative flex-1 min-h-0 min-w-0 w-full bg-white rounded-lg shadow-lg overflow-hidden mb-4">
          <WorldMapSVG
            highlightedCountry={currentCountry?.id || null}
            region={region}
          />

          {/* 国旗オーバーレイ - 右上の海の部分に表示 */}
          {gameState === "playing" && currentCountry && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-white/90 p-3 rounded-lg shadow-lg border border-gray-200">
                <Image
                  src={getFlagImagePath(currentCountry)}
                  alt={`${currentCountry.name}の国旗`}
                  width={120}
                  height={80}
                  className="object-contain rounded w-[120px] h-auto"
                />
              </div>
            </div>
          )}

          {/* 進捗表示 - 左上 */}
          <div className="absolute top-4 left-4 z-10 bg-white/90 px-3 py-1 rounded-lg shadow">
            <span className="text-sm font-semibold text-gray-700">
              {completedCountries.length} / {itemCount}
            </span>
          </div>

          {/* アイドル状態または終了状態のオーバーレイ */}
          {(gameState === "idle" || gameState === "finished") && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20">
              <div className="bg-white/95 rounded-xl shadow-xl p-6 text-center max-w-md mx-4">
                {gameState === "idle" ? (
                  <>
                    <p className="text-gray-700 mb-3">
                      地図上でハイライトされた国の名前をタイピングしよう！
                    </p>
                    <p
                      className={`text-xl font-semibold text-blue-500 transition-opacity duration-500 ${
                        isVisible ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      スペースキーを押してゲームを開始
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      ※タイピング中はキーボードを使います
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      ゲーム終了！
                    </h3>
                    {startTime !== null && endTime !== null && (
                      <div className="flex justify-center gap-6 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">タイム</p>
                          <p className="text-lg font-bold text-gray-800">
                            {formatTime(endTime - startTime)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">ミス</p>
                          <p className="text-lg font-bold text-gray-800">
                            {mistakeCount}回
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">速度</p>
                          <p className="text-lg font-bold text-gray-800">
                            {calculateAverageTypingSpeed()}打/秒
                          </p>
                        </div>
                      </div>
                    )}
                    <p
                      className={`text-base font-semibold text-blue-500 transition-opacity duration-500 ${
                        isVisible ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      スペースキーでもう一度プレイ
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* プレイ中の入力エリア */}
        {gameState === "playing" && currentCountry && (
          <div className="flex-shrink-0 bg-white rounded-lg shadow-lg p-4 mb-3">
            <div className="max-w-lg mx-auto">
              {/* 国名と入力 */}
              <div className="text-center mb-2">
                <p className="text-xl font-bold text-gray-800">
                  {currentCountry.name}
                </p>
                <RomajiDisplay input={input} romaji={currentCountry.romaji} />
              </div>

              {/* 入力フィールド */}
              <input
                type="text"
                value={input}
                onChange={handleInput}
                className="w-full p-2 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                autoFocus
              />

              {/* 経過時間とヒント */}
              <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                <span>経過時間: {formatTime(currentTime)}</span>
                <span>ESCキーで中断</span>
              </div>

              {/* 進捗バー */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(completedCountries.length / itemCount) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 地域選択に戻るリンク */}
        <div className="flex-shrink-0 text-center mt-4">
          <Link
            href="/worldmap"
            className="inline-block px-5 py-1.5 text-sm rounded-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-medium transition-all duration-200 hover:from-gray-500 hover:to-gray-600 hover:shadow-md"
          >
            ← 地域選択に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
