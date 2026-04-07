"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { formatTime } from "@/app/utils/timeUtils";
import { ShareButtons } from "@/app/components/ShareButtons";
import { Heritage, heritages } from "@/app/(pages)/japanmap/heritage/data";

// Japan prefecture TopoJSON
const GEO_URL =
  "https://raw.githubusercontent.com/dataofjapan/land/master/japan.topojson";

// Prefecture name to ID mapping (JIS X 0401)
const prefectureNameToId: Record<string, string> = {
  北海道: "1",
  青森県: "2",
  岩手県: "3",
  宮城県: "4",
  秋田県: "5",
  山形県: "6",
  福島県: "7",
  茨城県: "8",
  栃木県: "9",
  群馬県: "10",
  埼玉県: "11",
  千葉県: "12",
  東京都: "13",
  神奈川県: "14",
  新潟県: "15",
  富山県: "16",
  石川県: "17",
  福井県: "18",
  山梨県: "19",
  長野県: "20",
  岐阜県: "21",
  静岡県: "22",
  愛知県: "23",
  三重県: "24",
  滋賀県: "25",
  京都府: "26",
  大阪府: "27",
  兵庫県: "28",
  奈良県: "29",
  和歌山県: "30",
  鳥取県: "31",
  島根県: "32",
  岡山県: "33",
  広島県: "34",
  山口県: "35",
  徳島県: "36",
  香川県: "37",
  愛媛県: "38",
  高知県: "39",
  福岡県: "40",
  佐賀県: "41",
  長崎県: "42",
  熊本県: "43",
  大分県: "44",
  宮崎県: "45",
  鹿児島県: "46",
  沖縄県: "47",
};

// ID to prefecture name mapping
const prefectureIdToName: Record<string, string> = {
  "1": "北海道",
  "2": "青森県",
  "3": "岩手県",
  "4": "宮城県",
  "5": "秋田県",
  "6": "山形県",
  "7": "福島県",
  "8": "茨城県",
  "9": "栃木県",
  "10": "群馬県",
  "11": "埼玉県",
  "12": "千葉県",
  "13": "東京都",
  "14": "神奈川県",
  "15": "新潟県",
  "16": "富山県",
  "17": "石川県",
  "18": "福井県",
  "19": "山梨県",
  "20": "長野県",
  "21": "岐阜県",
  "22": "静岡県",
  "23": "愛知県",
  "24": "三重県",
  "25": "滋賀県",
  "26": "京都府",
  "27": "大阪府",
  "28": "兵庫県",
  "29": "奈良県",
  "30": "和歌山県",
  "31": "鳥取県",
  "32": "島根県",
  "33": "岡山県",
  "34": "広島県",
  "35": "山口県",
  "36": "徳島県",
  "37": "香川県",
  "38": "愛媛県",
  "39": "高知県",
  "40": "福岡県",
  "41": "佐賀県",
  "42": "長崎県",
  "43": "熊本県",
  "44": "大分県",
  "45": "宮崎県",
  "46": "鹿児島県",
  "47": "沖縄県",
};

// Get prefecture names from IDs
const getPrefectureNames = (ids: string[]): string => {
  return ids.map((id) => prefectureIdToName[id]).join("・");
};

// Map configuration
const mainMapConfig = {
  center: [137, 38] as [number, number],
  scale: 1600,
  prefectureIds: Array.from({ length: 46 }, (_, i) => String(i + 1)),
};

const okinawaConfig = {
  center: [127.6, 26.5] as [number, number],
  scale: 20000,
  prefectureIds: ["47"],
};

interface MapComponentProps {
  highlightedPrefectures: string[];
  config: {
    center: [number, number];
    scale: number;
    prefectureIds: string[];
  };
  style?: React.CSSProperties;
}

const MapComponent = memo(function MapComponent({
  highlightedPrefectures,
  config,
  style,
}: MapComponentProps) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        center: config.center,
        scale: config.scale,
      }}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#a5d8ff",
        ...style,
      }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies
            .filter((geo) => {
              const prefName = geo.properties.nam_ja || geo.properties.name;
              const prefId = prefectureNameToId[prefName];
              return config.prefectureIds.includes(prefId);
            })
            .map((geo) => {
              const prefName = geo.properties.nam_ja || geo.properties.name;
              const prefId = prefectureNameToId[prefName];
              const isHighlighted = highlightedPrefectures.includes(prefId);

              const fill = isHighlighted ? "#ef4444" : "#d4d4d4";
              const stroke = isHighlighted ? "#b91c1c" : "#737373";
              const strokeWidth = isHighlighted ? 1.5 : 0.5;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill, stroke, strokeWidth, outline: "none" },
                    hover: { fill, stroke, strokeWidth, outline: "none" },
                    pressed: { fill, outline: "none" },
                  }}
                />
              );
            })
        }
      </Geographies>
    </ComposableMap>
  );
});

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => 0.5 - Math.random());
}

const RomajiDisplay: React.FC<{
  input: string;
  romaji: string;
  showMistake: boolean;
}> = ({ input, romaji, showMistake }) => (
  <p
    className={`text-base text-center font-mono ${showMistake ? "animate-shake text-red-500" : ""}`}
  >
    <span className={showMistake ? "" : "text-green-600"}>{input}</span>
    <span className={showMistake ? "" : "text-gray-400"}>
      {romaji.slice(input.length)}
    </span>
  </p>
);

type GameState = "idle" | "playing" | "finished";

export default function HeritageTypingGame() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [shuffledHeritages, setShuffledHeritages] = useState<Heritage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showMistakeEffect, setShowMistakeEffect] = useState(false);

  const itemCount = heritages.length;
  const currentHeritage = shuffledHeritages[currentIndex] || null;

  // Blinking effect for idle/finished state
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

  // Initialize shuffled heritages
  useEffect(() => {
    setShuffledHeritages(shuffleArray(heritages));
  }, []);

  const resetGame = useCallback(() => {
    setGameState("idle");
    setShuffledHeritages(shuffleArray(heritages));
    setCurrentIndex(0);
    setInput("");
    setStartTime(null);
    setEndTime(null);
    setCurrentTime(0);
    setMistakeCount(0);
    setTotalKeystrokes(0);
  }, []);

  const startGame = useCallback(() => {
    const newHeritages = shuffleArray(heritages);
    setShuffledHeritages(newHeritages);
    setGameState("playing");
    setStartTime(Date.now());
    setCurrentTime(0);
    setCurrentIndex(0);
    setInput("");
    setMistakeCount(0);
    setTotalKeystrokes(0);
  }, []);

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (gameState === "idle" || gameState === "finished") {
          startGame();
        }
        return;
      }

      if (e.code === "Escape" && gameState === "playing") {
        resetGame();
        return;
      }

      if (gameState !== "playing" || !currentHeritage) return;

      if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        const newInput = (input + e.key).toLowerCase();
        setTotalKeystrokes((prev) => prev + 1);

        if (currentHeritage.romaji.startsWith(newInput)) {
          setInput(newInput);
          if (newInput === currentHeritage.romaji) {
            if (currentIndex + 1 >= shuffledHeritages.length) {
              setEndTime(Date.now());
              setGameState("finished");
            } else {
              setCurrentIndex((prev) => prev + 1);
              setInput("");
            }
          }
        } else {
          setMistakeCount((prev) => prev + 1);
          setShowMistakeEffect(true);
          setTimeout(() => setShowMistakeEffect(false), 300);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    gameState,
    startGame,
    resetGame,
    currentHeritage,
    currentIndex,
    shuffledHeritages.length,
    input,
  ]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === "playing") {
      interval = setInterval(() => {
        setCurrentTime((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const calculateAverageTypingSpeed = useCallback(() => {
    if (startTime && endTime && totalKeystrokes > 0) {
      const totalTimeInSeconds = (endTime - startTime) / 1000;
      return (totalKeystrokes / totalTimeInSeconds).toFixed(2);
    }
    return "0.00";
  }, [startTime, endTime, totalKeystrokes]);

  return (
    <div className="h-screen flex flex-col pt-11 lg:pt-12">
      <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-6 py-10 overflow-hidden">
        {/* Header */}
        <div className="shrink-0 text-center mb-6 w-full">
          <h1 className="text-xl font-bold text-gray-800">
            日本の世界遺産タイピング（全{itemCount}問）
          </h1>
        </div>

        {/* Map area */}
        <div className="relative flex-1 min-h-0 min-w-0 w-full bg-white rounded-lg shadow-lg overflow-hidden mb-4">
          <MapComponent
            highlightedPrefectures={
              gameState === "playing" && currentHeritage
                ? currentHeritage.prefectureIds
                : []
            }
            config={mainMapConfig}
          />

          {/* Okinawa inset */}
          <div className="absolute bottom-4 left-4 w-40 h-32 border-2 border-gray-400 rounded-lg overflow-hidden shadow-lg bg-white">
            <div className="absolute top-1 left-2 text-xs font-bold text-gray-600 z-10">
              沖縄県
            </div>
            <MapComponent
              highlightedPrefectures={
                gameState === "playing" && currentHeritage
                  ? currentHeritage.prefectureIds
                  : []
              }
              config={okinawaConfig}
            />
          </div>

          {/* Heritage image overlay */}
          {gameState === "playing" && currentHeritage && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-white/95 p-2 rounded-lg shadow-lg border border-gray-200">
                <Image
                  src={`/japan-heritage/${currentHeritage.id}.jpg`}
                  alt={currentHeritage.name}
                  width={140}
                  height={90}
                  className="object-cover rounded w-35 h-auto"
                />
              </div>
            </div>
          )}

          {/* Idle/Finished overlay */}
          {(gameState === "idle" || gameState === "finished") && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20">
              <div className="bg-white/95 rounded-xl shadow-xl p-6 text-center max-w-md mx-4">
                {gameState === "idle" ? (
                  <>
                    <p className="text-gray-700 mb-3">
                      日本の世界遺産をタイピングしよう！
                    </p>
                    <p
                      className={`text-xl font-semibold text-amber-600 transition-opacity duration-500 ${
                        isVisible ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      スペースキーを押してゲームを開始
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      ※ESCキーで中断できます
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      ゲーム終了！
                    </h3>
                    {startTime !== null && endTime !== null && (
                      <>
                        <div className="flex justify-center gap-6 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">タイム</p>
                            <p className="text-lg font-bold text-gray-800">
                              {formatTime(endTime - startTime)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">ミス</p>
                            <p className="text-lg font-bold text-gray-800">
                              {mistakeCount}回
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">速度</p>
                            <p className="text-lg font-bold text-gray-800">
                              {calculateAverageTypingSpeed()}打/秒
                            </p>
                          </div>
                        </div>
                        <ShareButtons
                          time={formatTime(endTime - startTime)}
                          mistakes={mistakeCount}
                          speed={calculateAverageTypingSpeed()}
                          gameName="日本の世界遺産タイピング"
                          mode=""
                        />
                      </>
                    )}
                    <p
                      className={`text-base font-semibold text-amber-600 transition-opacity duration-500 mt-4 ${
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

        {/* Input area during play */}
        {gameState === "playing" && currentHeritage && (
          <div className="shrink-0 bg-white rounded-lg shadow-lg p-4 mb-3">
            <div className="max-w-lg mx-auto">
              {/* Heritage info and input */}
              <div className="text-center mb-2">
                <p className="text-sm text-gray-500 mb-1">
                  {currentHeritage.type === "cultural"
                    ? "文化遺産"
                    : "自然遺産"}{" "}
                  ・ {currentHeritage.year}年登録 ・{" "}
                  {getPrefectureNames(currentHeritage.prefectureIds)}
                </p>
                <p className="text-xl font-bold text-gray-800">
                  {currentHeritage.name}
                </p>
                <RomajiDisplay
                  input={input}
                  romaji={currentHeritage.romaji}
                  showMistake={showMistakeEffect}
                />
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                <span>経過時間: {formatTime(currentTime)}</span>
                <span>ミス: {mistakeCount}回</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="h-2 rounded-full transition-all duration-300 bg-amber-500"
                  style={{
                    width: `${(currentIndex / itemCount) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                <span>ESCキーで中断</span>
                <span>
                  {currentIndex} / {itemCount}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="shrink-0 text-center mt-4">
          <Link
            href="/japanmap"
            className="inline-flex items-center px-6 py-2 text-sm rounded-full bg-white text-gray-600 font-medium shadow-md hover:shadow-lg hover:text-amber-600 transition-all"
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
    </div>
  );
}
