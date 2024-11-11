import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { formatTime } from "@/app/utils/timeUtils";
import Link from "next/link";

interface Item {
  id: string;
  name: string;
  romaji: string;
  subName: string;
  subRomaji: string;
  birdName: string;
  birdRomaji: string;
  flowerName: string;
  flowerRomaji: string;
  treeName: string;
  treeRomaji: string;
}

type GameState = "idle" | "playing" | "finished";

interface TypingGameProps {
  allItems: Item[];
  itemCount: number;
  gameName: string;
  gameDescription: string;
  mode: "main" | "sub" | "bird" | "flower" | "tree";
  gameType: "country" | "prefectures" | "heritage";
}

function getRandomElements<T>(array: T[], n: number): T[] {
  return [...array].sort(() => 0.5 - Math.random()).slice(0, n);
}

const RomajiDisplay: React.FC<{ input: string; romaji: string }> = ({
  input,
  romaji,
}) => (
  <p className="text-lg text-center font-mono">
    <span className="text-green-600">{input}</span>
    <span className="text-gray-400">{romaji.slice(input.length)}</span>
  </p>
);

export function TypingGame({
  allItems,
  itemCount,
  gameName,
  gameDescription,
  mode,
  gameType,
}: TypingGameProps) {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [input, setInput] = useState("");
  const [completedItems, setCompletedItems] = useState<Item[]>([]);
  const [remainingItems, setRemainingItems] = useState<Item[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const [mistakeCount, setMistakeCount] = useState<number>(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);

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

  const getCurrentItemInfo = useCallback(
    (item: Item) => {
      if (mode === "main") {
        return { name: item.name, romaji: item.romaji };
      } else if (mode === "sub") {
        return { name: item.subName, romaji: item.subRomaji };
      } else if (mode === "bird") {
        return { name: item.birdName, romaji: item.birdRomaji };
      } else if (mode === "flower") {
        return { name: item.flowerName, romaji: item.flowerRomaji };
      } else if (mode === "tree") {
        return { name: item.treeName, romaji: item.treeRomaji };
      }
      return { name: item.name, romaji: item.romaji };
    },
    [mode]
  );

  const getItems = useCallback(() => {
    return itemCount < allItems.length
      ? getRandomElements(allItems, itemCount)
      : allItems;
  }, [allItems, itemCount]);

  const resetGame = useCallback(() => {
    setGameState("idle");
    setCurrentItem(null);
    setInput("");
    setCompletedItems([]);
    setStartTime(null);
    setEndTime(null);
    setCurrentTime(0);
    setRemainingItems(getItems());
    setMistakeCount(0);
    setTotalKeystrokes(0);
    setTypingStartTime(null);
  }, [getItems]);

  const startGame = useCallback(() => {
    setGameState("playing");
    setStartTime(Date.now());
    setCurrentTime(0);
    const newItems = getItems();
    setRemainingItems(newItems);
    setCompletedItems([]);
    setCurrentItem(newItems[0]);
    setInput("");
  }, [getItems]);

  const getImagePath = useCallback(
    (item: Item) => {
      let firstPath: string = gameType;
      let secondPath: string = item.romaji;

      if (gameType === "prefectures") {
        if (mode === "bird") {
          firstPath = "bird";
          secondPath = item.birdRomaji;
        } else if (mode === "flower") {
          firstPath = "flower";
          secondPath = item.flowerRomaji;
        } else if (mode === "tree") {
          firstPath = "tree";
          secondPath = item.treeRomaji;
        }
      }

      const extension = (() => {
        switch (gameType) {
          case "country":
            return "png";
          case "heritage":
            return "webp";
          default:
            return "jpg";
        }
      })();

      return `/${firstPath}/${secondPath}.${extension}`;
    },
    [gameType, mode]
  );

  const preloadImages = useCallback(() => {
    allItems.forEach((item) => {
      const img = new window.Image() as HTMLImageElement;
      img.src = getImagePath(item);
    });
  }, [allItems, getImagePath]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

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
    [gameState, startGame, resetGame]
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
    if (gameState !== "playing" || !currentItem) return;

    const newInput = e.target.value.toLowerCase();
    setTotalKeystrokes((prevCount) => prevCount + 1);

    if (typingStartTime === null) {
      setTypingStartTime(Date.now());
    }

    const currentItemInfo = getCurrentItemInfo(currentItem);
    if (currentItemInfo.romaji.startsWith(newInput)) {
      setInput(newInput);
      if (newInput === currentItemInfo.romaji) {
        handleCorrectInput();
      }
    } else {
      setMistakeCount((prevCount) => prevCount + 1);
    }
  };

  const handleCorrectInput = () => {
    setCompletedItems([...completedItems, currentItem!]);
    const newRemaining = remainingItems.slice(1);
    setRemainingItems(newRemaining);

    if (newRemaining.length === 0) {
      setEndTime(Date.now());
      setGameState("finished");
    } else {
      setCurrentItem(newRemaining[0]);
      setInput("");
      setTypingStartTime(null);
    }
  };

  const calculateAverageTypingSpeed = useCallback(() => {
    if (startTime && endTime && totalKeystrokes > 0) {
      const totalTimeInSeconds = (endTime - startTime) / 1000;
      return (totalKeystrokes / totalTimeInSeconds).toFixed(2);
    }
    return "0.00";
  }, [startTime, endTime, totalKeystrokes]);

  const getBasePath = useCallback(() => {
    if (gameType === "country") {
      return mode === "main" ? "/country/game" : "/capitals/game";
    } else if (gameType === "heritage") {
      return "/heritage/game";
    } else if (gameType === "prefectures") {
      if (mode === "main") {
        return "/prefectures/game";
      } else if (mode === "sub") {
        return "/prefecturalCapitals/game";
      } else if (mode === "bird") {
        return "/prefecturalBird/game";
      } else if (mode === "flower") {
        return "/prefecturalFlower/game";
      } else if (mode === "tree") {
        return "/prefecturalTree/game";
      }
      return "/prefectures/game";
    } else {
      return "/country/game";
    }
  }, [mode, gameType]);

  const getTitle = () => {
    if (gameType === "country") {
      return mode === "main" ? "国" : "首都";
    } else if (gameType === "heritage") {
      return "世界遺産";
    } else if (gameType === "prefectures") {
      if (mode === "main") {
        return "47都道府県";
      } else if (mode === "sub") {
        return "県庁所在地";
      } else if (mode === "bird") {
        return "県鳥";
      } else if (mode === "flower") {
        return "県花";
      } else if (mode === "tree") {
        return "県木";
      }
      return "47都道府県";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col justify-between">
      {/* ヘッダーの高さ分のスペース */}
      <div className="h-16"></div>

      {/* メインコンテンツ */}
      <main className="container mx-auto max-w-2xl px-4 flex-1 flex flex-col items-center justify-center">
        {/* ゲームカード */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
          {/* ヘッダー部分 */}
          <div className="bg-gradient-to-r from-red-400 to-red-500 p-4 text-center">
            <h1 className="text-2xl font-bold text-white mb-1">
              {getTitle()}タイピングゲーム
            </h1>
            <h2 className="text-lg text-white/90">{gameName}</h2>
          </div>

          {/* ゲームコンテンツ */}
          <div className="p-4">
            {/* アイドル状態または終了状態 */}
            {(gameState === "idle" || gameState === "finished") && (
              <div className="text-center space-y-3">
                <p className="text-gray-700">{gameDescription}</p>
                <p
                  className={`text-lg font-semibold text-red-500 transition-opacity duration-500 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  スペースキーを押してゲームを開始
                </p>
                <p className="text-sm text-gray-500">
                  ※タイピング中はキーボードを使います
                </p>
              </div>
            )}
            {/* プレイ中の状態 */}
            {gameState === "playing" && currentItem && (
              <div className="space-y-3">
                {/* 問題表示エリア */}
                <div className="text-center space-y-1">
                  <p className="text-xl font-bold text-gray-800">
                    {getCurrentItemInfo(currentItem).name}
                  </p>
                  <RomajiDisplay
                    input={input}
                    romaji={getCurrentItemInfo(currentItem).romaji}
                  />
                </div>

                {/* 画像表示エリア */}
                <div className="flex justify-center">
                  <div className="relative overflow-hidden rounded-lg shadow-md">
                    <Image
                      src={getImagePath(currentItem)}
                      alt={currentItem.name}
                      width={250}
                      height={150}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* 入力エリア */}
                <div className="space-y-2">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInput}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all"
                    autoFocus
                  />
                  <div className="text-center space-y-1">
                    <p className="text-sm font-semibold text-gray-700">
                      経過時間: {formatTime(currentTime)}
                    </p>
                    <p className="text-xs text-gray-500">
                      ESCキーを押すとゲームを中断します
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* 終了状態の結果表示 */}
            {gameState === "finished" &&
              startTime !== null &&
              endTime !== null && (
                <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-800 text-center">
                    ゲーム終了!
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">タイム</p>
                      <p className="text-xl font-bold text-gray-800">
                        {formatTime(endTime - startTime)}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">タイプミス</p>
                      <p className="text-xl font-bold text-gray-800">
                        {mistakeCount}回
                      </p>
                    </div>
                    <div className="col-span-2 bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">
                        平均タイピングスピード
                      </p>
                      <p className="text-xl font-bold text-gray-800">
                        {calculateAverageTypingSpeed()}打/秒
                      </p>
                    </div>
                  </div>
                </div>
              )}
            {/* 進捗バー */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>進捗状況</span>
                <span>
                  {completedItems.length} / {itemCount}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-400 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(completedItems.length / itemCount) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* 難易度選択ボタン - ゲームカードの下に配置 */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link
            href={`${getBasePath()}/easy`}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-300 to-orange-400 text-white font-medium transition-all duration-200 hover:from-orange-400 hover:to-orange-500 hover:shadow-md transform hover:-translate-y-1 active:translate-y-0"
          >
            かんたん
          </Link>
          <Link
            href={`${getBasePath()}/normal`}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-300 to-orange-400 text-white font-medium transition-all duration-200 hover:from-orange-400 hover:to-orange-500 hover:shadow-md transform hover:-translate-y-1 active:translate-y-0"
          >
            ふつう
          </Link>
          <Link
            href={`${getBasePath()}/${
              gameType === "country" || gameType === "heritage"
                ? "hard"
                : "time-trial"
            }`}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-300 to-orange-400 text-white font-medium transition-all duration-200 hover:from-orange-400 hover:to-orange-500 hover:shadow-md transform hover:-translate-y-1 active:translate-y-0"
          >
            {gameType === "country" || gameType === "heritage"
              ? "むずかしい"
              : "タイムトライアル"}
          </Link>
        </div>
      </main>
      {/* フッターの高さ分のスペース */}
      <div className="h-12"></div>
    </div>
  );
}
