"use client";

import { JapanMapTypingGame } from "@/app/components/JapanMapTypingGame";
import prefectures from "@/app/prefectures.json";

export default function KantoPage() {
  const prefectureIds = ["8", "9", "10", "11", "12", "13", "14"];
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
      region="kanto"
      regionName="関東地方"
    />
  );
}
