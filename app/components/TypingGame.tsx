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
}

type GameState = "idle" | "playing" | "finished";

interface TypingGameProps {
  allItems: Item[];
  itemCount: number;
  gameName: string;
  gameDescription: string;
  mode: "main" | "sub";
  gameType: "country" | "prefectures";
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
      return mode === "main"
        ? { name: item.name, romaji: item.romaji }
        : { name: item.subName, romaji: item.subRomaji };
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

  const preloadImages = useCallback(() => {
    allItems.forEach((item) => {
      const img = new window.Image() as HTMLImageElement;
      img.src = `/${gameType}/${item.romaji}.${
        gameType === "country" ? "png" : "jpg"
      }`;
    });
  }, [allItems, gameType]);

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
    } else {
      return mode === "main"
        ? "/prefectures/game"
        : "/prefecturalCapitals/game";
    }
  }, [mode, gameType]);

  const getTitle = () => {
    if (gameType === "country") {
      return mode === "main" ? "国" : "首都";
    } else {
      return mode === "main" ? "47都道府県" : "県庁所在地";
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <main className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">
          {getTitle()}タイピングゲーム
        </h1>
        <h4 className="text-xl font-bold text-center mb-6">{gameName}</h4>

        {(gameState === "idle" || gameState === "finished") && (
          <div className="text-center">
            <p className="mb-2">{gameDescription}</p>
            <p
              className={`text-red-600 font-bold text-lg mb-4 transition-opacity duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              スペースキーを押してゲームを開始
            </p>
            <p className="text-sm text-gray-600 mt-4">
              ※タイピング中はキーボードを使います
            </p>
          </div>
        )}

        {gameState === "playing" && currentItem && (
          <div className="mb-4">
            <p className="text-xl font-semibold text-center">
              {getCurrentItemInfo(currentItem).name}
            </p>
            <RomajiDisplay
              input={input}
              romaji={getCurrentItemInfo(currentItem).romaji}
            />
            <div className="flex justify-center my-4">
              <Image
                src={`/${gameType}/${currentItem.romaji}.${
                  gameType === "country" ? "png" : "jpg"
                }`}
                alt={currentItem.name}
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

        {gameState === "finished" && startTime !== null && endTime !== null && (
          <div className="text-center mt-5">
            <p className="text-xl font-semibold mb-2">ゲーム終了!</p>
            <p className="text-lg">タイム: {formatTime(endTime - startTime)}</p>
            <p className="text-md">タイプミス: {mistakeCount}回</p>
            <p className="text-md">
              平均タイピングスピード: {calculateAverageTypingSpeed()}打/秒
            </p>
          </div>
        )}

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            完了: {completedItems.length} / {itemCount}
          </p>
        </div>
      </main>

      <div className="mt-10">
        <Link
          href={`${getBasePath()}/easy`}
          className="border rounded-full bg-orange-300 px-3 py-3 mr-2"
        >
          かんたん
        </Link>
        <Link
          href={`${getBasePath()}/normal`}
          className="border rounded-full bg-orange-300 px-3 py-3 mr-2"
        >
          ふつう
        </Link>
        <Link
          href={`${getBasePath()}/${
            gameType === "country" ? "hard" : "time-trial"
          }`}
          className="border rounded-full bg-orange-300 px-3 py-3"
        >
          {gameType === "country" ? "むずかしい" : "タイムトライアル"}
        </Link>
      </div>
    </div>
  );
}
