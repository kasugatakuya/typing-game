"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import prefectures from "@/app/prefectures.json";

interface Prefecture {
  id: string;
  name: string;
  romaji: string;
}

type GameState = "idle" | "playing" | "finished";

export default function PrefecturesGameTimeTrial() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [currentPrefecture, setCurrentPrefecture] = useState<Prefecture | null>(
    null
  );
  const [input, setInput] = useState("");
  const [completedPrefectures, setCompletedPrefectures] = useState<
    Prefecture[]
  >([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const shufflePrefectures = useCallback((): Prefecture[] => {
    return [...prefectures].sort(() => Math.random() - 0.5);
  }, []);

  const [remainingPrefectures, setRemainingPrefectures] = useState<
    Prefecture[]
  >(shufflePrefectures());

  const startGame = useCallback(() => {
    setGameState("playing");
    setStartTime(Date.now());
    setCurrentTime(0);
    const shuffled = shufflePrefectures();
    setRemainingPrefectures(shuffled);
    setCompletedPrefectures([]);
    setCurrentPrefecture(shuffled[0]);
    setInput("");
  }, [shufflePrefectures]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        (gameState === "idle" || gameState === "finished")
      ) {
        startGame();
      }
    },
    [gameState, startGame]
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
    if (gameState !== "playing" || !currentPrefecture) return;

    const newInput = e.target.value.toLowerCase();

    if (currentPrefecture.romaji.startsWith(newInput)) {
      setInput(newInput);

      if (newInput === currentPrefecture.romaji) {
        setCompletedPrefectures([...completedPrefectures, currentPrefecture]);
        const newRemaining = remainingPrefectures.slice(1);
        setRemainingPrefectures(newRemaining);

        if (newRemaining.length === 0) {
          setEndTime(Date.now());
          setGameState("finished");
        } else {
          setCurrentPrefecture(newRemaining[0]);
          setInput("");
        }
      }
    }
  };

  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, "0")}.${ms
      .toString()
      .padStart(2, "0")}`;
  };

  const renderRomaji = () => {
    if (!currentPrefecture) return null;
    const correct = input;
    const remaining = currentPrefecture.romaji.slice(input.length);
    return (
      <p className="text-lg text-center font-mono">
        <span className="text-green-600">{correct}</span>
        <span className="text-gray-400">{remaining}</span>
      </p>
    );
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">
          47都道府県タイピングゲーム
        </h1>
        <h4 className="text-xl font-bold text-center mb-6">
          タイムトライアルモード
        </h4>
        {(gameState === "idle" || gameState === "finished") && (
          <div className="text-center">
            <p className="mb-2">全47問の合計タイムを競います。</p>
            <p className="text-center mb-4">スペースキーを押してゲームを開始</p>
          </div>
        )}
        {gameState === "playing" && currentPrefecture && (
          <div className="mb-4">
            <p className="text-xl font-semibold text-center">
              {currentPrefecture.name}
            </p>
            {renderRomaji()}
            <div className="flex justify-center my-4">
              <Image
                src={`/prefectures/${currentPrefecture.romaji}.jpg`}
                alt={currentPrefecture.name}
                width={200}
                height={150}
                className="rounded-lg"
              />
            </div>
            <input
              type="text"
              value={input}
              onChange={handleInput}
              className="w-full mt-2 p-2 border rounded"
              autoFocus
            />
            <p className="text-center mt-4 text-lg font-semibold">
              経過時間: {formatTime(currentTime)}
            </p>
          </div>
        )}
        {gameState === "finished" && startTime !== null && endTime !== null && (
          <div className="text-center">
            <p className="text-xl font-semibold mb-2">ゲーム終了!</p>
            <p className="text-lg">タイム: {formatTime(endTime - startTime)}</p>
          </div>
        )}
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            完了: {completedPrefectures.length} / {prefectures.length}
          </p>
        </div>
      </main>
    </div>
  );
}
