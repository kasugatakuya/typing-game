"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { formatTime } from "@/app/utils/timeUtils";
import { ShareButtons } from "@/app/components/ShareButtons";
import { YamanoteSVG } from "./YamanoteSVG";

interface Station {
  name: string;
  romaji: string;
}

interface YamanoteTypingGameProps {
  stations: Station[];
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

export function YamanoteTypingGame({ stations }: YamanoteTypingGameProps) {
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">(
    "idle",
  );
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [input, setInput] = useState("");
  const [completedStations, setCompletedStations] = useState<Station[]>([]);
  const [remainingStations, setRemainingStations] = useState<Station[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [mistakeCount, setMistakeCount] = useState<number>(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showMistakeEffect, setShowMistakeEffect] = useState(false);

  const stationCount = stations.length;

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

  const getStations = useCallback(() => {
    return shuffleArray(stations);
  }, [stations]);

  const resetGame = useCallback(() => {
    setGameState("idle");
    setCurrentStation(null);
    setInput("");
    setCompletedStations([]);
    setStartTime(null);
    setEndTime(null);
    setCurrentTime(0);
    setRemainingStations(getStations());
    setMistakeCount(0);
    setTotalKeystrokes(0);
  }, [getStations]);

  const startGame = useCallback(() => {
    setGameState("playing");
    setStartTime(Date.now());
    setCurrentTime(0);
    const newStations = getStations();
    setRemainingStations(newStations);
    setCompletedStations([]);
    setCurrentStation(newStations[0]);
    setInput("");
  }, [getStations]);

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
    setCompletedStations((prev) => [...prev, currentStation!]);
    setRemainingStations((prev) => {
      const newRemaining = prev.slice(1);
      if (newRemaining.length === 0) {
        setEndTime(Date.now());
        setGameState("finished");
      } else {
        setCurrentStation(newRemaining[0]);
        setInput("");
      }
      return newRemaining;
    });
  }, [currentStation]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (gameState !== "playing" || !currentStation) return;

      const newInput = e.target.value.toLowerCase();
      setTotalKeystrokes((prevCount) => prevCount + 1);

      if (currentStation.romaji.startsWith(newInput)) {
        setInput(newInput);
        if (newInput === currentStation.romaji) {
          handleCorrectInput();
        }
      } else {
        setMistakeCount((prevCount) => prevCount + 1);
        setShowMistakeEffect(true);
        setTimeout(() => setShowMistakeEffect(false), 300);
      }
    },
    [gameState, currentStation, handleCorrectInput],
  );

  const calculateAverageTypingSpeed = useCallback(() => {
    if (startTime && endTime && totalKeystrokes > 0) {
      const totalTimeInSeconds = (endTime - startTime) / 1000;
      return (totalKeystrokes / totalTimeInSeconds).toFixed(2);
    }
    return "0.00";
  }, [startTime, endTime, totalKeystrokes]);

  return (
    <div className="h-screen bg-linear-to-b from-teal-50 to-slate-100 pt-16 pb-2 mt-4">
      <div className="container mx-auto px-4 max-w-md">
        {/* タイトル */}
        <div className="text-center py-1 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            山手線タイピング（全{stationCount}駅）
          </h1>
        </div>

        {/* 路線図 */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-3">
          <YamanoteSVG
            currentStation={currentStation?.name || null}
            completedStations={completedStations.map((s) => s.name)}
          />
        </div>

        {/* ゲームエリア */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-3">
          {gameState === "idle" && (
            <div className="text-center py-3">
              <p className="text-gray-700 mb-2">
                山手線の駅名をタイピングしよう！
              </p>
              <p
                className={`text-lg font-semibold text-green-500 transition-opacity duration-500 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                スペースキーで開始
              </p>
              <p className="text-xs text-gray-500 mt-1">※ESCキーで中断</p>
            </div>
          )}

          {gameState === "playing" && currentStation && (
            <div>
              <div className="text-center mb-3">
                <p className="text-lg font-bold text-gray-800 mb-1">
                  {currentStation.name}
                </p>
                <RomajiDisplay input={input} romaji={currentStation.romaji} />
              </div>

              <input
                type="text"
                value={input}
                onChange={handleInput}
                className={`w-full p-2.5 text-lg border rounded-lg outline-none transition-all ${
                  showMistakeEffect
                    ? "border-red-500 bg-red-50 animate-shake"
                    : "border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400"
                }`}
                autoFocus
              />

              <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                <span>経過: {formatTime(currentTime)}</span>
                <span>ミス: {mistakeCount}回</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="h-2 rounded-full transition-all duration-300 bg-green-500"
                  style={{
                    width: `${(completedStations.length / stationCount) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {gameState === "finished" && startTime && endTime && (
            <div className="text-center py-2">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                🎉 全駅制覇！
              </h3>
              <div className="flex justify-center gap-5 mb-3">
                <div>
                  <p className="text-xs text-gray-500">タイム</p>
                  <p className="text-base font-bold text-gray-800">
                    {formatTime(endTime - startTime)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ミス</p>
                  <p className="text-base font-bold text-gray-800">
                    {mistakeCount}回
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">速度</p>
                  <p className="text-base font-bold text-gray-800">
                    {calculateAverageTypingSpeed()}打/秒
                  </p>
                </div>
              </div>
              <ShareButtons
                time={formatTime(endTime - startTime)}
                mistakes={mistakeCount}
                speed={calculateAverageTypingSpeed()}
                gameName="山手線タイピング"
                mode=""
              />
              <p
                className={`text-sm font-semibold text-green-500 transition-opacity duration-500 mt-3 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                スペースキーでもう一度
              </p>
            </div>
          )}
        </div>

        {/* 戻るボタン */}
        <div className="text-center mt-6">
          <Link
            href="/other"
            className="inline-flex items-center px-4 py-1 text-sm rounded-full bg-white text-gray-600 font-medium shadow-md hover:shadow-lg hover:text-teal-600 transition-all"
          >
            <svg
              className="w-3.5 h-3.5 mr-1.5"
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
