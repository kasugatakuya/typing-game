"use client";

import { JapanMapTypingGame } from "@/app/components/JapanMapTypingGame";
import prefectures from "@/app/prefectures.json";

export default function HokkaidoPage() {
  const prefectureIds = ["1"];
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
      region="hokkaido"
      regionName="北海道地方"
    />
  );
}
