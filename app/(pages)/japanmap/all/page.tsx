"use client";

import { JapanMapTypingGame } from "@/app/components/JapanMapTypingGame";
import prefectures from "@/app/prefectures.json";

export default function AllJapanPage() {
  const prefectureData = prefectures.map((p) => ({
    id: p.id,
    name: p.name,
    romaji: p.romaji,
  }));

  return (
    <JapanMapTypingGame
      allPrefectures={prefectureData}
      region="all"
      regionName="日本全国"
    />
  );
}
