"use client";

import React, { memo } from "react";
import Image from "next/image";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { RomajiDisplay } from "@/app/components/game/RomajiDisplay";
import { GameProgress } from "@/app/components/game/GameProgress";
import { GameResult } from "@/app/components/game/GameResult";
import { BackLink } from "@/app/components/game/BackLink";
import { MobileNotice } from "@/app/components/game/MobileNotice";
import { SoundToggle } from "@/app/components/game/SoundToggle";
import { PersonalBestBadge } from "@/app/components/game/PersonalBestBadge";
import { useTypingGame } from "@/app/hooks/useTypingGame";
import { heritages } from "@/app/(pages)/japanmap/heritage/data";

// 日本の都道府県 TopoJSON
const GEO_URL =
  "https://raw.githubusercontent.com/dataofjapan/land/master/japan.topojson";

// 都道府県名 → ID（JIS X 0401）
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

// ID → 都道府県名（上のマップから逆引きで生成）
const prefectureIdToName: Record<string, string> = Object.fromEntries(
  Object.entries(prefectureNameToId).map(([name, id]) => [id, name]),
);

// IDのリストから都道府県名の表示文字列を作る
const getPrefectureNames = (ids: string[]): string => {
  return ids.map((id) => prefectureIdToName[id]).join("・");
};

// 地図の設定
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

export default function HeritageTypingGame() {
  const {
    gameState,
    currentItem: currentHeritage,
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
  } = useTypingGame({ items: heritages });

  const highlightedPrefectures =
    gameState === "playing" && currentHeritage
      ? currentHeritage.prefectureIds
      : [];

  return (
    <div className="h-screen flex flex-col pt-11 lg:pt-12">
      <MobileNotice />
      <SoundToggle />
      <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-6 py-10 overflow-hidden">
        {/* ヘッダー */}
        <div className="shrink-0 text-center mb-6 w-full">
          <h1 className="text-xl font-bold text-gray-800">
            日本の世界遺産タイピング（全{itemCount}問）
          </h1>
        </div>

        {/* 地図表示エリア */}
        <div className="relative flex-1 min-h-0 min-w-0 w-full bg-white rounded-lg shadow-lg overflow-hidden mb-4">
          <MapComponent
            highlightedPrefectures={highlightedPrefectures}
            config={mainMapConfig}
          />

          {/* 沖縄の拡大地図 */}
          <div className="absolute bottom-4 left-4 w-40 h-32 border-2 border-gray-400 rounded-lg overflow-hidden shadow-lg bg-white">
            <div className="absolute top-1 left-2 text-xs font-bold text-gray-600 z-10">
              沖縄県
            </div>
            <MapComponent
              highlightedPrefectures={highlightedPrefectures}
              config={okinawaConfig}
            />
          </div>

          {/* 世界遺産の画像オーバーレイ */}
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

          {/* アイドル/終了状態のオーバーレイ */}
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
                    <PersonalBestBadge
                      gameCategory="japanmap"
                      gameMode="heritage"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      ゲーム終了！
                    </h3>
                    {startTime !== null && endTime !== null && (
                      <GameResult
                        gameName="日本の世界遺産タイピング"
                        gameCategory="japanmap"
                        gameMode="heritage"
                        clearTimeMs={clearTimeMs}
                        mistakeCount={mistakeCount}
                        keystrokeCount={totalKeystrokes}
                        questionCount={itemCount}
                        questionTimestamps={questionTimestamps}
                        averageSpeed={averageSpeed}
                      />
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

        {/* プレイ中の入力エリア */}
        {gameState === "playing" && currentHeritage && (
          <div className="shrink-0 bg-white rounded-lg shadow-lg p-4 mb-3">
            <div className="max-w-lg mx-auto">
              {/* 世界遺産の情報と入力 */}
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
                  romaji={displayRomaji}
                  showMistake={showMistakeEffect}
                  className="text-base"
                />
              </div>

              <GameProgress
                currentTime={currentTime}
                mistakeCount={mistakeCount}
                completedCount={completedCount}
                itemCount={itemCount}
                barColorClass="bg-amber-500"
              />
            </div>
          </div>
        )}

        {/* 戻るリンク */}
        <div className="shrink-0 text-center mt-4">
          <BackLink href="/japanmap" hoverColorClass="hover:text-amber-600" />
        </div>
      </div>
    </div>
  );
}
