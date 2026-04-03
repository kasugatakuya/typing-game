"use client";

import React from "react";

interface YamanoteSVGProps {
  currentStation: string | null;
  completedStations: string[];
}

// 山手線30駅の位置（円形に配置）
// 右が東京、左が新大久保、上が田端/西日暮里、下が五反田/大崎
// textOffset: テキスト位置の微調整, textXY: [x, y]の追加オフセット
const stations: {
  name: string;
  angle: number;
  textOffset: number;
  textXY?: [number, number];
}[] = [
  { name: "東京", angle: 0, textOffset: 0 },
  { name: "有楽町", angle: 12, textOffset: 0 },
  { name: "新橋", angle: 24, textOffset: 0 },
  { name: "浜松町", angle: 36, textOffset: 0 },
  { name: "田町", angle: 48, textOffset: 0 },
  { name: "高輪ゲートウェイ", angle: 60, textOffset: 8, textXY: [-2, -5] },
  { name: "品川", angle: 72, textOffset: 0 },
  { name: "大崎", angle: 84, textOffset: 0 },
  { name: "五反田", angle: 96, textOffset: 0, textXY: [10, 0] },
  { name: "目黒", angle: 108, textOffset: 0 },
  { name: "恵比寿", angle: 120, textOffset: 0 },
  { name: "渋谷", angle: 132, textOffset: 0 },
  { name: "原宿", angle: 144, textOffset: 0 },
  { name: "代々木", angle: 156, textOffset: 0 },
  { name: "新宿", angle: 168, textOffset: 0 },
  { name: "新大久保", angle: 180, textOffset: 4 },
  { name: "高田馬場", angle: 192, textOffset: 4 },
  { name: "目白", angle: 204, textOffset: 0 },
  { name: "池袋", angle: 216, textOffset: 0 },
  { name: "大塚", angle: 228, textOffset: 0 },
  { name: "巣鴨", angle: 240, textOffset: 0 },
  { name: "駒込", angle: 252, textOffset: 0 },
  { name: "田端", angle: 264, textOffset: 0 },
  { name: "西日暮里", angle: 276, textOffset: 6, textXY: [-15, 5] },
  { name: "日暮里", angle: 288, textOffset: 0 },
  { name: "鶯谷", angle: 300, textOffset: 0 },
  { name: "上野", angle: 312, textOffset: 0 },
  { name: "御徒町", angle: 324, textOffset: 0 },
  { name: "秋葉原", angle: 336, textOffset: 0 },
  { name: "神田", angle: 348, textOffset: 0 },
];

export function YamanoteSVG({
  currentStation,
  completedStations,
}: YamanoteSVGProps) {
  const centerX = 200;
  const centerY = 200;
  const radius = 130;
  const stationRadius = 7;

  // 角度から座標を計算
  const getPosition = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad),
    };
  };

  // テキストの位置を調整（円の外側に配置）
  const getTextPosition = (angle: number, offset: number = 0) => {
    const rad = (angle * Math.PI) / 180;
    const textRadius = radius + 22 + offset;
    return {
      x: centerX + textRadius * Math.cos(rad),
      y: centerY + textRadius * Math.sin(rad),
    };
  };

  // テキストのアンカーを決定
  const getTextAnchor = (angle: number) => {
    const normalizedAngle = ((angle % 360) + 360) % 360;
    if (normalizedAngle > 90 && normalizedAngle < 270) {
      return "end";
    } else if (normalizedAngle === 90 || normalizedAngle === 270) {
      return "middle";
    }
    return "start";
  };

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full max-w-[380px] mx-auto">
      {/* 背景 */}
      <rect width="400" height="400" fill="#f8fafc" rx="12" />

      {/* 路線の円（緑色） */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="#22c55e"
        strokeWidth="4"
      />

      {/* 駅と駅名 */}
      {stations.map((station) => {
        const pos = getPosition(station.angle);
        const textPos = getTextPosition(station.angle, station.textOffset);
        const isCurrent = station.name === currentStation;
        const isCompleted = completedStations.includes(station.name);
        const [extraX, extraY] = station.textXY || [0, 0];

        return (
          <g key={station.name}>
            {/* 駅の円 */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={stationRadius}
              fill={isCurrent ? "#ef4444" : isCompleted ? "#22c55e" : "#ffffff"}
              stroke={isCurrent ? "#b91c1c" : "#22c55e"}
              strokeWidth="1.5"
            />
            {/* 駅名 */}
            <text
              x={textPos.x + extraX}
              y={textPos.y + extraY}
              textAnchor={getTextAnchor(station.angle)}
              dominantBaseline="middle"
              fontSize={station.name.length > 4 ? "8" : "9"}
              fill={isCurrent ? "#ef4444" : isCompleted ? "#22c55e" : "#374151"}
              fontWeight={isCurrent ? "bold" : "normal"}
            >
              {station.name}
            </text>
          </g>
        );
      })}

      {/* 中央のラベル */}
      <text
        x={centerX}
        y={centerY - 12}
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#22c55e"
      >
        山手線
      </text>
      <text
        x={centerX}
        y={centerY + 14}
        textAnchor="middle"
        fontSize="12"
        fill="#6b7280"
      >
        {completedStations.length} / {stations.length}
      </text>
    </svg>
  );
}
