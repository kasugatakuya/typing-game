"use client";

import { RomajiDisplay } from "@/app/components/game/RomajiDisplay";
import { GameProgress } from "@/app/components/game/GameProgress";
import { GameResult } from "@/app/components/game/GameResult";
import { BackLink } from "@/app/components/game/BackLink";
import { MobileNotice } from "@/app/components/game/MobileNotice";
import { SoundToggle } from "@/app/components/game/SoundToggle";
import { PersonalBestBadge } from "@/app/components/game/PersonalBestBadge";
import { YamanoteSVG } from "@/app/(other-typing)/components/YamanoteSVG";
import { useTypingGame } from "@/app/hooks/useTypingGame";

interface Station {
  name: string;
  romaji: string;
}

interface YamanoteTypingGameProps {
  stations: Station[];
}

export function YamanoteTypingGame({ stations }: YamanoteTypingGameProps) {
  const {
    gameState,
    currentItem: currentStation,
    input,
    completedItems: completedStations,
    completedCount,
    itemCount: stationCount,
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
  } = useTypingGame({ items: stations });

  return (
    <div className="h-screen bg-linear-to-b from-teal-50 to-slate-100 pt-16 pb-2 mt-7">
      <MobileNotice />
      <SoundToggle />
      <div className="container mx-auto px-4 max-w-lg">
        {/* タイトル */}
        <div className="text-center py-1 mb-7">
          <h1 className="text-2xl font-bold text-gray-800">
            山手線タイピング（全{stationCount}駅）
          </h1>
        </div>

        {/* 路線図（ゲーム終了時は非表示） */}
        {gameState !== "finished" && (
          <div className="bg-white rounded-xl shadow-lg mb-3 max-h-102.5 overflow-hidden flex items-center justify-center">
            <YamanoteSVG
              currentStation={currentStation?.name || null}
              completedStations={completedStations.map((s) => s.name)}
            />
          </div>
        )}

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
              <PersonalBestBadge gameCategory="other" gameMode="yamanote" />
            </div>
          )}

          {gameState === "playing" && currentStation && (
            <div>
              <div className="text-center mb-3">
                <p className="text-lg font-bold text-gray-800 mb-1">
                  {currentStation.name}
                </p>
                <RomajiDisplay
                  input={input}
                  romaji={displayRomaji}
                  showMistake={showMistakeEffect}
                  className="text-base"
                />
              </div>

              <GameProgress
                currentTime={currentTime}
                mistakeCount={mistakeCount}
                completedCount={completedCount}
                itemCount={stationCount}
                barColorClass="bg-green-500"
                timeLabel="経過"
              />
            </div>
          )}

          {gameState === "finished" && startTime && endTime && (
            <div className="text-center">
              <h3 className="text-base font-bold text-gray-800 mb-2">
                🎉 全駅制覇！
              </h3>
              <GameResult
                gameName="山手線タイピング"
                gameCategory="other"
                gameMode="yamanote"
                clearTimeMs={clearTimeMs}
                mistakeCount={mistakeCount}
                keystrokeCount={totalKeystrokes}
                questionCount={stationCount}
                questionTimestamps={questionTimestamps}
                averageSpeed={averageSpeed}
                size="sm"
              />
              <p
                className={`text-xs font-semibold text-teal-500 transition-opacity duration-500 mt-4 ${
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
          <BackLink href="/other" />
        </div>
      </div>
    </div>
  );
}
