"use client";

import Image from "next/image";
import { WorldMapSVG } from "@/app/components/WorldMapSVG";
import { RomajiDisplay } from "@/app/components/game/RomajiDisplay";
import { GameProgress } from "@/app/components/game/GameProgress";
import { GameResult } from "@/app/components/game/GameResult";
import { BackLink } from "@/app/components/game/BackLink";
import { useTypingGame } from "@/app/hooks/useTypingGame";

interface MapCountry {
  id: string;
  name: string;
  romaji: string;
  flagImage: string;
  capital: string;
  capitalRomaji: string;
}

type GameMode = "country" | "capital";

type Region =
  | "north-america"
  | "south-america"
  | "western-europe"
  | "eastern-europe"
  | "east-asia"
  | "west-asia"
  | "oceania"
  | "north-africa"
  | "sub-saharan-africa"
  | "central-asia"
  | "southern-europe"
  | "west-africa";

interface WorldMapTypingGameProps {
  allCountries: MapCountry[];
  region: Region;
  regionName: string;
  gameMode: GameMode;
}

const getTargetRomaji = (country: MapCountry, mode: GameMode): string => {
  return mode === "capital" ? country.capitalRomaji : country.romaji;
};

export function WorldMapTypingGame({
  allCountries,
  region,
  regionName,
  gameMode,
}: WorldMapTypingGameProps) {
  const {
    gameState,
    currentItem: currentCountry,
    input,
    completedCount,
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
  } = useTypingGame({
    items: allCountries,
    getRomaji: (c) => getTargetRomaji(c, gameMode),
  });

  return (
    <div className="h-screen flex flex-col pt-11 lg:pt-12">
      <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-6 py-10 overflow-hidden">
        {/* ヘッダー */}
        <div className="shrink-0 text-center mb-6 w-full">
          <h1 className="text-xl font-bold text-gray-800">
            世界地図タイピング - {regionName}（全{itemCount}問）
            <span className="ml-2 text-sm font-normal text-blue-600">
              {gameMode === "capital" ? "【首都名】" : "【国名】"}
            </span>
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
                  src={`/country/${currentCountry.flagImage}.png`}
                  alt={`${currentCountry.name}の国旗`}
                  width={120}
                  height={80}
                  className="object-contain rounded w-30 h-auto"
                />
              </div>
            </div>
          )}

          {/* アイドル状態または終了状態のオーバーレイ */}
          {(gameState === "idle" || gameState === "finished") && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20">
              <div className="bg-white/95 rounded-xl shadow-xl p-6 text-center max-w-md mx-4">
                {gameState === "idle" ? (
                  <>
                    <p className="text-gray-700 mb-3">
                      {gameMode === "capital"
                        ? "地図上の国の首都名をタイピングしよう！"
                        : "地図上の国の名前をタイピングしよう！"}
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
                      <GameResult
                        gameName={`世界地図タイピング - ${regionName}`}
                        shareMode={gameMode === "capital" ? "首都名" : "国名"}
                        gameCategory="worldmap"
                        gameMode={`${region}-${gameMode}`}
                        clearTimeMs={clearTimeMs}
                        mistakeCount={mistakeCount}
                        keystrokeCount={totalKeystrokes}
                        questionCount={itemCount}
                        questionTimestamps={questionTimestamps}
                        averageSpeed={averageSpeed}
                      />
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

        {/* プレイ中の入力エリア */}
        {gameState === "playing" && currentCountry && (
          <div className="shrink-0 bg-white rounded-lg shadow-lg p-4 mb-3">
            <div className="max-w-lg mx-auto">
              {/* 国名/首都名と入力 */}
              <div className="text-center mb-2">
                {gameMode === "capital" ? (
                  <>
                    <p className="text-sm text-gray-500 mb-1">
                      {currentCountry.name}の首都
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      {currentCountry.capital}
                    </p>
                  </>
                ) : (
                  <p className="text-xl font-bold text-gray-800">
                    {currentCountry.name}
                  </p>
                )}
                <RomajiDisplay
                  input={input}
                  romaji={getTargetRomaji(currentCountry, gameMode)}
                  showMistake={showMistakeEffect}
                />
              </div>

              <GameProgress
                currentTime={currentTime}
                mistakeCount={mistakeCount}
                completedCount={completedCount}
                itemCount={itemCount}
              />
            </div>
          </div>
        )}

        {/* 地域選択に戻るリンク */}
        <div className="shrink-0 text-center mt-4">
          <BackLink href="/worldmap" label="← 地域選択に戻る" variant="gray" />
        </div>
      </div>
    </div>
  );
}
