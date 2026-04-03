"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatTime } from "@/app/utils/timeUtils";
import { JapanMapSVG, JapanRegion } from "./JapanMapSVG";
import { ShareButtons } from "./ShareButtons";

interface Prefecture {
  id: string;
  name: string;
  romaji: string;
  subName?: string;
  subRomaji?: string;
  birdName?: string;
  birdRomaji?: string;
  flowerName?: string;
  flowerRomaji?: string;
  treeName?: string;
  treeRomaji?: string;
}

type GameState = "idle" | "playing" | "finished";
type GameMode = "prefecture" | "capital" | "bird" | "flower" | "tree";

interface JapanMapTypingGameProps {
  allPrefectures: Prefecture[];
  region: JapanRegion;
  regionName: string;
  gameMode: GameMode;
}

const gameModeLabels: Record<GameMode, string> = {
  prefecture: "都道府県名",
  capital: "県庁所在地",
  bird: "県鳥",
  flower: "県花",
  tree: "県木",
};

const getTargetName = (prefecture: Prefecture, mode: GameMode): string => {
  switch (mode) {
    case "capital":
      return prefecture.subName || prefecture.name;
    case "bird":
      return prefecture.birdName || prefecture.name;
    case "flower":
      return prefecture.flowerName || prefecture.name;
    case "tree":
      return prefecture.treeName || prefecture.name;
    default:
      return prefecture.name;
  }
};

const getTargetRomaji = (prefecture: Prefecture, mode: GameMode): string => {
  switch (mode) {
    case "capital":
      return prefecture.subRomaji || prefecture.romaji;
    case "bird":
      return prefecture.birdRomaji || prefecture.romaji;
    case "flower":
      return prefecture.flowerRomaji || prefecture.romaji;
    case "tree":
      return prefecture.treeRomaji || prefecture.romaji;
    default:
      return prefecture.romaji;
  }
};

const getImagePath = (
  prefecture: Prefecture,
  mode: GameMode,
): string | null => {
  switch (mode) {
    case "bird":
      return prefecture.birdRomaji
        ? `/bird/${prefecture.birdRomaji}.jpg`
        : null;
    case "flower":
      return prefecture.flowerRomaji
        ? `/flower/${prefecture.flowerRomaji}.jpg`
        : null;
    case "tree":
      return prefecture.treeRomaji
        ? `/tree/${prefecture.treeRomaji}.jpg`
        : null;
    default:
      return null;
  }
};

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

export function JapanMapTypingGame({
  allPrefectures,
  region,
  regionName,
  gameMode,
}: JapanMapTypingGameProps) {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [currentPrefecture, setCurrentPrefecture] = useState<Prefecture | null>(
    null,
  );
  const [input, setInput] = useState("");
  const [completedPrefectures, setCompletedPrefectures] = useState<
    Prefecture[]
  >([]);
  const [remainingPrefectures, setRemainingPrefectures] = useState<
    Prefecture[]
  >([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const [mistakeCount, setMistakeCount] = useState<number>(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showMistakeEffect, setShowMistakeEffect] = useState(false);

  const itemCount = allPrefectures.length;

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
    return shuffleArray(allPrefectures);
  }, [allPrefectures]);

  const resetGame = useCallback(() => {
    setGameState("idle");
    setCurrentPrefecture(null);
    setInput("");
    setCompletedPrefectures([]);
    setStartTime(null);
    setEndTime(null);
    setCurrentTime(0);
    setRemainingPrefectures(getItems());
    setMistakeCount(0);
    setTotalKeystrokes(0);
    setTypingStartTime(null);
  }, [getItems]);

  const startGame = useCallback(() => {
    setGameState("playing");
    setStartTime(Date.now());
    setCurrentTime(0);
    const newItems = getItems();
    setRemainingPrefectures(newItems);
    setCompletedPrefectures([]);
    setCurrentPrefecture(newItems[0]);
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

  const handleCorrectInput = useCallback(() => {
    setCompletedPrefectures((prev) => [...prev, currentPrefecture!]);
    setRemainingPrefectures((prev) => {
      const newRemaining = prev.slice(1);
      if (newRemaining.length === 0) {
        setEndTime(Date.now());
        setGameState("finished");
      } else {
        setCurrentPrefecture(newRemaining[0]);
        setInput("");
        setTypingStartTime(null);
      }
      return newRemaining;
    });
  }, [currentPrefecture]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (gameState !== "playing" || !currentPrefecture) return;

      const newInput = e.target.value.toLowerCase();
      setTotalKeystrokes((prevCount) => prevCount + 1);

      setTypingStartTime((prev) => (prev === null ? Date.now() : prev));

      const targetRomaji = getTargetRomaji(currentPrefecture, gameMode);
      if (targetRomaji.startsWith(newInput)) {
        setInput(newInput);
        if (newInput === targetRomaji) {
          handleCorrectInput();
        }
      } else {
        setMistakeCount((prevCount) => prevCount + 1);
        setShowMistakeEffect(true);
        setTimeout(() => setShowMistakeEffect(false), 300);
      }
    },
    [gameState, currentPrefecture, gameMode, handleCorrectInput],
  );

  const calculateAverageTypingSpeed = useCallback(() => {
    if (startTime && endTime && totalKeystrokes > 0) {
      const totalTimeInSeconds = (endTime - startTime) / 1000;
      return (totalKeystrokes / totalTimeInSeconds).toFixed(2);
    }
    return "0.00";
  }, [startTime, endTime, totalKeystrokes]);

  return (
    <div className="h-screen flex flex-col pt-11 lg:pt-12">
      <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-6 py-10 overflow-hidden">
        {/* Header */}
        <div className="shrink-0 text-center mb-6 w-full">
          <h1 className="text-xl font-bold text-gray-800">
            日本地図タイピング - {regionName}（全{itemCount}問）
            <span className="ml-2 text-sm font-normal text-blue-600">
              【{gameModeLabels[gameMode]}】
            </span>
          </h1>
        </div>

        {/* Map area */}
        <div className="relative flex-1 min-h-0 min-w-0 w-full bg-white rounded-lg shadow-lg overflow-hidden mb-4">
          <JapanMapSVG
            highlightedPrefecture={currentPrefecture?.id || null}
            region={region}
          />

          {/* Progress display - top left */}
          <div className="absolute top-4 left-4 z-10 bg-white/90 px-3 py-1 rounded-lg shadow">
            <span className="text-sm font-semibold text-gray-700">
              {completedPrefectures.length} / {itemCount}
            </span>
          </div>

          {/* Image overlay for bird/flower/tree modes - top right */}
          {gameState === "playing" &&
            currentPrefecture &&
            getImagePath(currentPrefecture, gameMode) && (
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-white/90 p-3 rounded-lg shadow-lg border border-gray-200">
                  <Image
                    src={getImagePath(currentPrefecture, gameMode)!}
                    alt={`${getTargetName(currentPrefecture, gameMode)}の画像`}
                    width={120}
                    height={80}
                    className="object-contain rounded w-30 h-auto"
                  />
                </div>
              </div>
            )}

          {/* Idle or finished state overlay */}
          {(gameState === "idle" || gameState === "finished") && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20">
              <div className="bg-white/95 rounded-xl shadow-xl p-6 text-center max-w-md mx-4">
                {gameState === "idle" ? (
                  <>
                    <p className="text-gray-700 mb-3">
                      {gameMode === "prefecture"
                        ? "地図上の都道府県名をタイピングしよう！"
                        : `地図上の都道府県の${gameModeLabels[gameMode]}をタイピングしよう！`}
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
                      <>
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
                        <ShareButtons
                          time={formatTime(endTime - startTime)}
                          mistakes={mistakeCount}
                          speed={calculateAverageTypingSpeed()}
                          gameName={`日本地図タイピング - ${regionName}`}
                          mode={gameModeLabels[gameMode]}
                        />
                      </>
                    )}
                    <p
                      className={`text-base font-semibold text-blue-500 transition-opacity duration-500 mt-4 ${
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

        {/* Input area during play */}
        {gameState === "playing" && currentPrefecture && (
          <div className="shrink-0 bg-white rounded-lg shadow-lg p-4 mb-3">
            <div className="max-w-lg mx-auto">
              {/* Prefecture name and input */}
              <div className="text-center mb-2">
                {gameMode !== "prefecture" && (
                  <p className="text-sm text-gray-500 mb-1">
                    {currentPrefecture.name}の{gameModeLabels[gameMode]}
                  </p>
                )}
                <p className="text-xl font-bold text-gray-800">
                  {getTargetName(currentPrefecture, gameMode)}
                </p>
                <RomajiDisplay
                  input={input}
                  romaji={getTargetRomaji(currentPrefecture, gameMode)}
                />
              </div>

              {/* Input field */}
              <input
                type="text"
                value={input}
                onChange={handleInput}
                className={`w-full p-2 text-lg border rounded-lg outline-none transition-all ${
                  showMistakeEffect
                    ? "border-red-500 bg-red-50 animate-shake"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                }`}
                autoFocus
              />

              {/* Elapsed time and hint */}
              <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                <span>経過時間: {formatTime(currentTime)}</span>
                <span>ESCキーで中断</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(completedPrefectures.length / itemCount) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Back to region selection link */}
        <div className="shrink-0 text-center mt-4">
          <Link
            href="/japanmap"
            className="inline-block px-5 py-1.5 text-sm rounded-full bg-linear-to-r from-gray-400 to-gray-500 text-white font-medium transition-all duration-200 hover:from-gray-500 hover:to-gray-600 hover:shadow-md"
          >
            ← 地域選択に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
