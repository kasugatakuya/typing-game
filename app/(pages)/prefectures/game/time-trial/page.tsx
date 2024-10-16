"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import prefectures from "@/app/prefectures.json";
import { formatTime } from "@/app/utils/timeUtils";

// 都道府県のデータ構造を定義
interface Prefecture {
  id: string;
  name: string;
  romaji: string;
}

// ゲームの状態を定義
type GameState = "idle" | "playing" | "finished";

// ローマ字入力の表示コンポーネント
const RomajiDisplay: React.FC<{ input: string; romaji: string }> = ({
  input,
  romaji,
}) => {
  const correct = input;
  const remaining = romaji.slice(input.length);
  return (
    <p className="text-lg text-center font-mono">
      <span className="text-green-600">{correct}</span>
      <span className="text-gray-400">{remaining}</span>
    </p>
  );
};

export default function PrefecturesGameTimeTrial() {
  // ゲームの状態を管理するstate
  const [gameState, setGameState] = useState<GameState>("idle");
  // 現在の都道府県を管理するstate
  const [currentPrefecture, setCurrentPrefecture] = useState<Prefecture | null>(
    null
  );
  // ユーザーの入力を管理するstate
  const [input, setInput] = useState("");
  // 完了した都道府県のリストを管理するstate
  const [completedPrefectures, setCompletedPrefectures] = useState<
    Prefecture[]
  >([]);
  // ゲーム開始時間を管理するstate
  const [startTime, setStartTime] = useState<number | null>(null);
  // ゲーム終了時間を管理するstate
  const [endTime, setEndTime] = useState<number | null>(null);
  // 現在の経過時間を管理するstate
  const [currentTime, setCurrentTime] = useState<number>(0);
  // タイプミスの数を管理するstate
  const [mistakeCount, setMistakeCount] = useState<number>(0);
  // 総タイプ数を管理するstate
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  // タイピング開始時間を管理するstate
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);

  // 都道府県のリストをシャッフルする関数
  const shufflePrefectures = useCallback((): Prefecture[] => {
    return [...prefectures].sort(() => Math.random() - 0.5);
  }, []);

  // 残りの都道府県のリストを管理するstate
  const [remainingPrefectures, setRemainingPrefectures] = useState<
    Prefecture[]
  >(shufflePrefectures());

  // ゲームをリセットする関数
  const resetGame = useCallback(() => {
    setGameState("idle");
    setCurrentPrefecture(null);
    setInput("");
    setCompletedPrefectures([]);
    setStartTime(null);
    setEndTime(null);
    setCurrentTime(0);
    setRemainingPrefectures(shufflePrefectures());
    setMistakeCount(0);
    setTotalKeystrokes(0);
    setTypingStartTime(null);
  }, [shufflePrefectures]);

  // 画像をプリロードする関数
  const preloadImages = useCallback(() => {
    prefectures.forEach((prefecture) => {
      const img = new window.Image() as HTMLImageElement;
      img.src = `/prefectures/${prefecture.romaji}.jpg`;
    });
  }, []);

  // コンポーネントのマウント時に画像をプリロード
  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  // ゲームを開始する関数
  const startGame = useCallback(() => {
    setGameState("playing");
    setStartTime(Date.now());
    setCurrentTime(0);
    const shuffled = shufflePrefectures();
    setRemainingPrefectures(shuffled);
    setCompletedPrefectures([]);
    setCurrentPrefecture(shuffled[0]);
    setInput("");
    preloadImages(); // ゲーム開始時にも再度プリロード
  }, [shufflePrefectures, preloadImages]);

  // キーボードイベントを処理する関数
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        (gameState === "idle" || gameState === "finished")
      ) {
        startGame();
      } else if (e.code === "Escape" && gameState === "playing") {
        resetGame();
      }
    },
    [gameState, startGame, resetGame]
  );

  // キーボードイベントリスナーを設定するeffect
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // タイマーを管理するeffect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === "playing") {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  // ユーザーの入力を処理する関数
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== "playing" || !currentPrefecture) return;

    const newInput = e.target.value.toLowerCase();

    // タイピング開始時間を設定
    if (typingStartTime === null) {
      setTypingStartTime(Date.now());
    }

    // 総タイプ数を更新
    setTotalKeystrokes((prevCount) => prevCount + 1);

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
          setTypingStartTime(null); // 次の問題のためにリセット
        }
      }
    } else {
      // タイプミスの場合
      setMistakeCount((prevCount) => prevCount + 1);
    }
  };

  // 平均タイピングスピードを計算する関数 (キーストローク/秒)
  const calculateAverageTypingSpeed = useCallback(() => {
    if (startTime && endTime && totalKeystrokes > 0) {
      const totalTimeInSeconds = (endTime - startTime) / 1000; // ミリ秒を秒に変換
      return (totalKeystrokes / totalTimeInSeconds).toFixed(2); // 1秒あたりの打鍵数（小数点以下2桁）
    }
    return "0.00";
  }, [startTime, endTime, totalKeystrokes]);

  // UIをレンダリング
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">
          47都道府県タイピングゲーム
        </h1>
        <h4 className="text-xl font-bold text-center mb-6">
          タイムトライアルモード
        </h4>
        {/* ゲーム開始前または終了後の表示 */}
        {(gameState === "idle" || gameState === "finished") && (
          <div className="text-center">
            <p className="mb-2">全47問の合計タイムを競います。</p>
            <p className="text-center mb-4">スペースキーを押してゲームを開始</p>
          </div>
        )}
        {/* ゲームプレイ中の表示 */}
        {gameState === "playing" && currentPrefecture && (
          <div className="mb-4">
            <p className="text-xl font-semibold text-center">
              {currentPrefecture.name}
            </p>
            <RomajiDisplay input={input} romaji={currentPrefecture.romaji} />
            <div className="flex justify-center my-4">
              <Image
                src={`/prefectures/${currentPrefecture.romaji}.jpg`}
                alt={currentPrefecture.name}
                width={200}
                height={150}
                className="rounded-lg"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
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
            <p className="text-center mt-2 text-sm text-gray-600">
              ESCキーを押すとゲームを中断します
            </p>
          </div>
        )}
        {/* ゲーム終了後の結果表示 */}
        {gameState === "finished" && startTime !== null && endTime !== null && (
          <div className="text-center">
            <p className="text-xl font-semibold mb-2">ゲーム終了!</p>
            <p className="text-lg">タイム: {formatTime(endTime - startTime)}</p>
            <p className="text-md">タイプミス: {mistakeCount}回</p>
            <p className="text-md">
              平均タイピングスピード: {calculateAverageTypingSpeed()}打/秒
            </p>
          </div>
        )}
        {/* 進捗状況の表示 */}
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            完了: {completedPrefectures.length} / {prefectures.length}
          </p>
        </div>
      </main>
    </div>
  );
}
