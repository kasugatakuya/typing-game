"use client";

import { JapanMapTypingGame } from "@/app/components/JapanMapTypingGame";
import prefectures from "@/app/prefectures.json";

export default function KyushuPage() {
  const prefectureIds = ["40", "41", "42", "43", "44", "45", "46", "47"];
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
      region="kyushu"
      regionName="九州・沖縄地方"
    />
  );
}
