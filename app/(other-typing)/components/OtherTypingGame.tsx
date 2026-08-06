"use client";

import Image from "next/image";
import { RomajiDisplay } from "@/app/components/game/RomajiDisplay";
import { GameProgress } from "@/app/components/game/GameProgress";
import { GameResult } from "@/app/components/game/GameResult";
import { BackLink } from "@/app/components/game/BackLink";
import { MobileNotice } from "@/app/components/game/MobileNotice";
import { SoundToggle } from "@/app/components/game/SoundToggle";
import { PersonalBestBadge } from "@/app/components/game/PersonalBestBadge";
import { useTypingGame } from "@/app/hooks/useTypingGame";

interface Item {
  name: string;
  romaji: string;
  hint?: string;
  image?: string;
}

interface OtherTypingGameProps {
  items: Item[];
  title: string;
  backUrl: string;
  themeColor: string;
  gameMode: string;
}

export function OtherTypingGame({
  items,
  title,
  backUrl,
  themeColor,
  gameMode,
}: OtherTypingGameProps) {
  const {
    gameState,
    currentItem,
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
  } = useTypingGame({ items });

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 to-slate-100 py-12 pt-20 mt-4">
      <MobileNotice />
      <SoundToggle />
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {title}（全{itemCount}問）
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {gameState === "idle" && (
            <div className="text-center py-12">
              <p className="text-gray-700 mb-4">
                表示される名前をタイピングしよう！
              </p>
              <p
                className={`text-xl font-semibold transition-opacity duration-500 ${themeColor} ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                スペースキーを押してゲームを開始
              </p>
              <p className="text-xs text-gray-500 mt-2">
                ※ESCキーで中断できます
              </p>
              <PersonalBestBadge gameCategory="other" gameMode={gameMode} />
            </div>
          )}

          {gameState === "playing" && currentItem && (
            <div>
              <div className="text-center mb-6">
                {currentItem.image && (
                  <div className="flex justify-center items-center mb-4 h-[150px]">
                    <Image
                      src={currentItem.image}
                      alt={currentItem.name}
                      width={150}
                      height={150}
                      className="rounded-lg object-contain max-h-[150px] w-auto"
                    />
                  </div>
                )}
                {currentItem.hint && (
                  <p className="text-sm text-gray-500 mb-2">
                    {currentItem.hint}
                  </p>
                )}
                <p className="text-3xl font-bold text-gray-800 mb-2">
                  {currentItem.name}
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
                barColorClass="bg-teal-500"
              />
            </div>
          )}

          {gameState === "finished" && startTime && endTime && (
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                ゲーム終了！
              </h3>
              <GameResult
                gameName={title}
                gameCategory="other"
                gameMode={gameMode}
                clearTimeMs={clearTimeMs}
                mistakeCount={mistakeCount}
                keystrokeCount={totalKeystrokes}
                questionCount={itemCount}
                questionTimestamps={questionTimestamps}
                averageSpeed={averageSpeed}
                size="lg"
              />
              <p
                className={`text-base font-semibold transition-opacity duration-500 mt-10 ${themeColor} ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                スペースキーでもう一度プレイ
              </p>
            </div>
          )}
        </div>

        <div className="text-center">
          <BackLink href={backUrl} />
        </div>
      </div>
    </div>
  );
}
