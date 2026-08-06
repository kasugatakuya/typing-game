"use client";

import { useMemo } from "react";
import { Element, allElementsWithPosition } from "@/app/(other-typing)/periodic-table/data";
import { RomajiDisplay } from "@/app/components/game/RomajiDisplay";
import { GameProgress } from "@/app/components/game/GameProgress";
import { GameResult } from "@/app/components/game/GameResult";
import { BackLink } from "@/app/components/game/BackLink";
import { useTypingGame } from "@/app/hooks/useTypingGame";

type Props = {
  elements: Element[];
  title: string;
  backUrl: string;
  gameMode: string;
};

// 周期表の1マス
function ElementCell({
  element,
  styleClass,
}: {
  element: Element;
  styleClass: string;
}) {
  return (
    <div
      className={`w-6 h-6 sm:w-8 sm:h-8 flex flex-col items-center justify-center text-[8px] sm:text-[10px] rounded transition-colors ${styleClass}`}
    >
      <span className="font-bold leading-none">{element.symbol}</span>
      <span className="text-[6px] sm:text-[7px] leading-none">
        {element.number}
      </span>
    </div>
  );
}

// 周期表コンポーネント
function PeriodicTable({
  currentElement,
  completedElements,
  targetElements,
}: {
  currentElement: Element | null;
  completedElements: number[];
  targetElements: Element[];
}) {
  const targetNumbers = useMemo(
    () => new Set(targetElements.map((e) => e.number)),
    [targetElements]
  );

  const getElementStyle = (element: Element) => {
    const isTarget = targetNumbers.has(element.number);
    const isCurrent = currentElement?.number === element.number;
    const isCompleted = completedElements.includes(element.number);

    if (isCurrent) {
      return "bg-red-500 text-white font-bold";
    }
    if (isCompleted) {
      return "bg-green-500 text-white";
    }
    if (isTarget) {
      return "bg-blue-100 text-blue-800";
    }
    return "bg-gray-100 text-gray-400";
  };

  // 周期表のグリッドを構築
  const renderMainTable = () => {
    const rows = [];
    for (let row = 1; row <= 7; row++) {
      const cells = [];
      for (let col = 1; col <= 18; col++) {
        // 周期6,7の3列目はランタノイド/アクチノイドへの参照
        if ((row === 6 || row === 7) && col === 3) {
          cells.push(
            <div
              key={`${row}-${col}`}
              className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-[6px] sm:text-[8px] bg-gray-200 text-gray-500 rounded"
            >
              {row === 6 ? "La-Lu" : "Ac-Lr"}
            </div>
          );
          continue;
        }

        const element = allElementsWithPosition.find(
          (e) => e.row === row && e.col === col
        );
        if (element) {
          cells.push(
            <ElementCell
              key={`${row}-${col}`}
              element={element}
              styleClass={getElementStyle(element)}
            />
          );
        } else {
          cells.push(
            <div key={`${row}-${col}`} className="w-6 h-6 sm:w-8 sm:h-8" />
          );
        }
      }
      rows.push(
        <div key={row} className="flex gap-0.5">
          {cells}
        </div>
      );
    }
    return rows;
  };

  // ランタノイド(row 9)・アクチノイド(row 10)
  const renderExtendedRow = (row: 9 | 10) => {
    const cells = [];
    for (let col = 3; col <= 17; col++) {
      const element = allElementsWithPosition.find(
        (e) => e.row === row && e.col === col
      );
      if (element) {
        cells.push(
          <ElementCell
            key={`${row}-${col}`}
            element={element}
            styleClass={getElementStyle(element)}
          />
        );
      }
    }
    return cells;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* メイン周期表 */}
      <div className="flex flex-col gap-0.5">{renderMainTable()}</div>

      {/* ランタノイド・アクチノイド */}
      <div className="flex flex-col gap-0.5 mt-2">
        <div className="flex gap-0.5 ml-[52px] sm:ml-[68px]">
          {renderExtendedRow(9)}
        </div>
        <div className="flex gap-0.5 ml-[52px] sm:ml-[68px]">
          {renderExtendedRow(10)}
        </div>
      </div>
    </div>
  );
}

export default function PeriodicTableTypingGame({
  elements,
  title,
  backUrl,
  gameMode,
}: Props) {
  const {
    gameState,
    currentItem: currentElement,
    input,
    completedItems,
    completedCount,
    itemCount,
    currentTime,
    clearTimeMs,
    mistakeCount,
    totalKeystrokes,
    showMistakeEffect,
    questionTimestamps,
    averageSpeed,
  } = useTypingGame({ items: elements, startOnFirstKey: true });

  const isFinished = gameState === "finished";
  const completedNumbers = completedItems.map((e) => e.number);

  if (itemCount === 0) {
    return <div className="min-h-screen bg-teal-50 pt-20" />;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 to-slate-100 pt-20 pb-8">
      <div className="container mx-auto px-2 max-w-4xl">
        {/* ヘッダー */}
        <div className="text-center mb-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            {title}
          </h1>
        </div>

        {/* 周期表 */}
        <div className="flex justify-center mb-4 overflow-x-auto">
          <PeriodicTable
            currentElement={isFinished ? null : currentElement}
            completedElements={completedNumbers}
            targetElements={elements}
          />
        </div>

        {isFinished ? (
          /* 完了画面 */
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                クリア！
              </h2>
              <p className="text-gray-600 mb-2">{itemCount}問完了</p>
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
              <p className="text-teal-500 text-sm mt-6">
                スペースキーでもう一度プレイ
              </p>
            </div>
            <div className="mt-6">
              <BackLink href={backUrl} />
            </div>
          </div>
        ) : (
          /* ゲーム画面 */
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-md mx-auto">
              {/* 現在の元素 */}
              <div className="mb-4">
                <div className="text-4xl sm:text-5xl font-bold text-red-500 mb-1">
                  {currentElement?.symbol}
                </div>
                <div className="text-sm text-gray-500">
                  {currentElement?.number}番元素
                </div>
              </div>

              {/* ローマ字表示 */}
              {currentElement && (
                <RomajiDisplay
                  input={input}
                  romaji={currentElement.romaji}
                  showMistake={showMistakeEffect}
                  className="text-xl sm:text-2xl mb-3"
                />
              )}

              {/* ヒント */}
              <div className="text-sm text-gray-500 mb-3">
                {currentElement?.name}
              </div>

              <GameProgress
                currentTime={currentTime}
                mistakeCount={mistakeCount}
                completedCount={completedCount}
                itemCount={itemCount}
                barColorClass="bg-teal-500"
              />
            </div>

            <div className="mt-6">
              <BackLink href={backUrl} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
