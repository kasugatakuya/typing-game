"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { formatTime } from "@/app/utils/timeUtils";

// 都道府県のデータ構造を定義
interface Prefecture {
  id: string;
  name: string;
  romaji: string;
}

// ゲームの状態を定義
type GameState = "idle" | "playing" | "finished";

// かんたんモード用の都道府県リスト
const prefectures: Prefecture[] = [
  { id: "1", name: "北海道", romaji: "hokkaidou" },
  { id: "2", name: "青森県", romaji: "aomoriken" },
  { id: "3", name: "山梨県", romaji: "yamanashiken" },
  { id: "4", name: "愛媛県", romaji: "ehimeken" },
  { id: "5", name: "香川県", romaji: "kagawaken" },
];

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

// メインのゲームコンポーネント
export default function PrefecturesGameEasy() {
  // ゲームの状態を管理するstate
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

    if (currentPrefecture.romaji.startsWith(newInput)) {
      setInput(newInput);

      if (newInput === currentPrefecture.romaji) {
        // 入力が正解の場合の処理
        setCompletedPrefectures([...completedPrefectures, currentPrefecture]);
        const newRemaining = remainingPrefectures.slice(1);
        setRemainingPrefectures(newRemaining);

        if (newRemaining.length === 0) {
          // すべての都道府県が完了した場合
          setEndTime(Date.now());
          setGameState("finished");
        } else {
          // 次の都道府県に進む
          setCurrentPrefecture(newRemaining[0]);
          setInput("");
        }
      }
    }
  };

  // UIをレンダリング
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">
          47都道府県タイピングゲーム
        </h1>
        <h4 className="text-xl font-bold text-center mb-6">かんたんモード</h4>
        {/* ゲーム開始前または終了後の表示 */}
        {(gameState === "idle" || gameState === "finished") && (
          <div className="text-center">
            <p className="mb-2">全5問の合計タイムを競います。</p>
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
