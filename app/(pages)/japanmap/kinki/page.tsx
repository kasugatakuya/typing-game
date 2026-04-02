"use client";

import { JapanMapTypingGame } from "@/app/components/JapanMapTypingGame";
import prefectures from "@/app/prefectures.json";

export default function KinkiPage() {
  const prefectureIds = ["24", "25", "26", "27", "28", "29", "30"];
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
      region="kinki"
      regionName="近畿地方"
    />
  );
}
