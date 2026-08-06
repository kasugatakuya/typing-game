"use client";

import Image from "next/image";
import { JapanMapSVG, JapanRegion } from "@/app/components/JapanMapSVG";
import { RomajiDisplay } from "@/app/components/game/RomajiDisplay";
import { GameProgress } from "@/app/components/game/GameProgress";
import { GameResult } from "@/app/components/game/GameResult";
import { BackLink } from "@/app/components/game/BackLink";
import { MobileNotice } from "@/app/components/game/MobileNotice";
import { SoundToggle } from "@/app/components/game/SoundToggle";
import { PersonalBestBadge } from "@/app/components/game/PersonalBestBadge";
import { useTypingGame } from "@/app/hooks/useTypingGame";

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

export function JapanMapTypingGame({
  allPrefectures,
  region,
  regionName,
  gameMode,
}: JapanMapTypingGameProps) {
  const {
    gameState,
    currentItem: currentPrefecture,
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
    displayRomaji,
  } = useTypingGame({
    items: allPrefectures,
    getRomaji: (p) => getTargetRomaji(p, gameMode),
  });

  return (
    <div className="h-screen flex flex-col pt-11 lg:pt-12">
      <MobileNotice />
      <SoundToggle />
      <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-6 py-10 overflow-hidden">
        {/* ヘッダー */}
        <div className="shrink-0 text-center mb-6 w-full">
          <h1 className="text-xl font-bold text-gray-800">
            日本地図タイピング - {regionName}（全{itemCount}問）
            <span className="ml-2 text-sm font-normal text-blue-600">
              【{gameModeLabels[gameMode]}】
            </span>
          </h1>
        </div>

        {/* 地図表示エリア */}
        <div className="relative flex-1 min-h-0 min-w-0 w-full bg-white rounded-lg shadow-lg overflow-hidden mb-4">
          <JapanMapSVG
            highlightedPrefecture={currentPrefecture?.id || null}
            region={region}
          />

          {/* 県鳥・県花・県木モードの画像オーバーレイ - 右上 */}
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

          {/* アイドル状態または終了状態のオーバーレイ */}
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
                    <PersonalBestBadge
                      gameCategory="japanmap"
                      gameMode={`${region}-${gameMode}`}
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      ゲーム終了！
                    </h3>
                    {startTime !== null && endTime !== null && (
                      <GameResult
                        gameName={`日本地図タイピング - ${regionName}`}
                        shareMode={gameModeLabels[gameMode]}
                        gameCategory="japanmap"
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
        {gameState === "playing" && currentPrefecture && (
          <div className="shrink-0 bg-white rounded-lg shadow-lg p-4 mb-3">
            <div className="max-w-lg mx-auto">
              {/* 都道府県名と入力 */}
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
                  romaji={displayRomaji}
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
          <BackLink href="/japanmap" label="← 地域選択に戻る" variant="gray" />
        </div>
      </div>
    </div>
  );
}
