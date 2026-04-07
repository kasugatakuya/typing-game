"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Element, allElementsWithPosition } from "@/app/(other-typing)/periodic-table/data";
import { ShareButtons } from "@/app/components/ShareButtons";

type Props = {
  elements: Element[];
  title: string;
  backUrl: string;
};

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
            <div
              key={`${row}-${col}`}
              className={`w-6 h-6 sm:w-8 sm:h-8 flex flex-col items-center justify-center text-[8px] sm:text-[10px] rounded transition-colors ${getElementStyle(element)}`}
            >
              <span className="font-bold leading-none">{element.symbol}</span>
              <span className="text-[6px] sm:text-[7px] leading-none">
                {element.number}
              </span>
            </div>
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

  // ランタノイド・アクチノイド
  const renderLanthanides = () => {
    const cells = [];
    for (let col = 3; col <= 17; col++) {
      const element = allElementsWithPosition.find(
        (e) => e.row === 9 && e.col === col
      );
      if (element) {
        cells.push(
          <div
            key={`9-${col}`}
            className={`w-6 h-6 sm:w-8 sm:h-8 flex flex-col items-center justify-center text-[8px] sm:text-[10px] rounded transition-colors ${getElementStyle(element)}`}
          >
            <span className="font-bold leading-none">{element.symbol}</span>
            <span className="text-[6px] sm:text-[7px] leading-none">
              {element.number}
            </span>
          </div>
        );
      }
    }
    return cells;
  };

  const renderActinides = () => {
    const cells = [];
    for (let col = 3; col <= 17; col++) {
      const element = allElementsWithPosition.find(
        (e) => e.row === 10 && e.col === col
      );
      if (element) {
        cells.push(
          <div
            key={`10-${col}`}
            className={`w-6 h-6 sm:w-8 sm:h-8 flex flex-col items-center justify-center text-[8px] sm:text-[10px] rounded transition-colors ${getElementStyle(element)}`}
          >
            <span className="font-bold leading-none">{element.symbol}</span>
            <span className="text-[6px] sm:text-[7px] leading-none">
              {element.number}
            </span>
          </div>
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
          {renderLanthanides()}
        </div>
        <div className="flex gap-0.5 ml-[52px] sm:ml-[68px]">
          {renderActinides()}
        </div>
      </div>
    </div>
  );
}

export default function PeriodicTableTypingGame({
  elements,
  title,
  backUrl,
}: Props) {
  const [shuffledElements, setShuffledElements] = useState<Element[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [completedElements, setCompletedElements] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showMistakeEffect, setShowMistakeEffect] = useState(false);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);

  // シャッフル関数
  const shuffleArray = useCallback((array: Element[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // 初期化
  useEffect(() => {
    setShuffledElements(shuffleArray(elements));
  }, [elements, shuffleArray]);

  // タイマー
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && !isFinished) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [startTime, isFinished]);

  const currentElement = shuffledElements[currentIndex] || null;

  // キー入力処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (isFinished) {
          // リスタート
          setShuffledElements(shuffleArray(elements));
          setCurrentIndex(0);
          setInput("");
          setIsFinished(false);
          setCompletedElements([]);
          setStartTime(null);
          setElapsedTime(0);
          setMistakeCount(0);
          setTotalKeystrokes(0);
        }
        return;
      }

      if (isFinished || !currentElement) return;

      // タイマー開始
      if (!startTime && e.key.length === 1) {
        setStartTime(Date.now());
      }

      if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        const newInput = (input + e.key).toLowerCase();
        setTotalKeystrokes((prev) => prev + 1);

        // 入力がローマ字の先頭と一致するか確認
        if (currentElement.romaji.startsWith(newInput)) {
          setInput(newInput);

          // 完全一致したら次へ
          if (newInput === currentElement.romaji) {
            setCompletedElements((prev) => [...prev, currentElement.number]);
            if (currentIndex + 1 >= shuffledElements.length) {
              setIsFinished(true);
            } else {
              setCurrentIndex((prev) => prev + 1);
              setInput("");
            }
          }
        } else {
          // ミス時のエフェクト
          setMistakeCount((prev) => prev + 1);
          setShowMistakeEffect(true);
          setTimeout(() => setShowMistakeEffect(false), 300);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    input,
    currentElement,
    currentIndex,
    shuffledElements.length,
    isFinished,
    startTime,
    shuffleArray,
    elements,
  ]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateAverageTypingSpeed = useCallback(() => {
    if (elapsedTime > 0 && totalKeystrokes > 0) {
      return (totalKeystrokes / elapsedTime).toFixed(2);
    }
    return "0.00";
  }, [elapsedTime, totalKeystrokes]);

  if (shuffledElements.length === 0) {
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
            completedElements={completedElements}
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
              <p className="text-gray-600 mb-2">
                {shuffledElements.length}問完了
              </p>
              <div className="flex justify-center gap-8 mb-4">
                <div>
                  <p className="text-xs text-gray-500">タイム</p>
                  <p className="text-xl font-bold text-gray-800">
                    {formatTime(elapsedTime)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ミス</p>
                  <p className="text-xl font-bold text-gray-800">
                    {mistakeCount}回
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">速度</p>
                  <p className="text-xl font-bold text-gray-800">
                    {calculateAverageTypingSpeed()}打/秒
                  </p>
                </div>
              </div>
              <ShareButtons
                time={formatTime(elapsedTime)}
                mistakes={mistakeCount}
                speed={calculateAverageTypingSpeed()}
                gameName={title}
                mode=""
              />
              <p className="text-teal-500 text-sm mt-6">
                スペースキーでもう一度プレイ
              </p>
            </div>
            <div className="mt-6">
              <Link
                href={backUrl}
                className="inline-flex items-center px-5 py-2 text-sm rounded-full bg-white text-gray-600 font-medium shadow-md hover:shadow-lg hover:text-teal-600 transition-all"
              >
                <svg
                  className="w-4 h-4 mr-2"
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
              <div
                className={`text-xl sm:text-2xl font-mono mb-3 ${
                  showMistakeEffect ? "animate-shake text-red-500" : ""
                }`}
              >
                <span className={showMistakeEffect ? "" : "text-green-600"}>
                  {input}
                </span>
                <span className={showMistakeEffect ? "" : "text-gray-400"}>
                  {currentElement?.romaji.slice(input.length)}
                </span>
              </div>

              {/* ヒント */}
              <div className="text-sm text-gray-500 mb-3">
                {currentElement?.name}
              </div>

              {/* 経過時間とミス */}
              <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <span>経過時間: {formatTime(elapsedTime)}</span>
                <span>ミス: {mistakeCount}回</span>
              </div>

              {/* 進捗バー */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300 bg-teal-500"
                  style={{
                    width: `${(currentIndex / shuffledElements.length) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                <span>ESCキーで中断</span>
                <span>{currentIndex} / {shuffledElements.length}</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={backUrl}
                className="inline-flex items-center px-5 py-2 text-sm rounded-full bg-white text-gray-600 font-medium shadow-md hover:shadow-lg hover:text-teal-600 transition-all"
              >
                <svg
                  className="w-4 h-4 mr-2"
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
        )}
      </div>
    </div>
  );
}
