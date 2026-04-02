"use client";

import { JapanMapTypingGame } from "@/app/components/JapanMapTypingGame";
import prefectures from "@/app/prefectures.json";

export default function ChubuPage() {
  const prefectureIds = ["15", "16", "17", "18", "19", "20", "21", "22", "23"];
  const prefectureData = prefectures
    .filter((p) => prefectureIds.includes(p.id))
    .map((p) => ({
      id: p.id,
      name: p.name,
      romaji: p.romaji,
    }));

  return (
    <JapanMapTypingGame
      allPrefectures={prefectureData}
      region="chubu"
      regionName="中部地方"
    />
  );
}
