import type { Metadata } from "next";
import { japanMapMetadata, resolveJapanMapMode } from "@/app/utils/gameMetadata";
import { JapanMapTypingGame } from "@/app/components/JapanMapTypingGame";
import prefectures from "@/app/prefectures.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

type GameMode = "prefecture" | "capital" | "bird" | "flower" | "tree";

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return japanMapMetadata("中国・四国地方", resolveJapanMapMode(params.mode), 9);
}

export default async function ChugokuShikokuPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const validModes: GameMode[] = ["prefecture", "capital", "bird", "flower", "tree"];
  const gameMode: GameMode = validModes.includes(params.mode as GameMode)
    ? (params.mode as GameMode)
    : "prefecture";

  const prefectureIds = ["31", "32", "33", "34", "35", "36", "37", "38", "39"];
  const prefectureData = prefectures
    .filter((p) => prefectureIds.includes(p.id))
    .map((p) => ({
      id: p.id,
      name: p.name,
      romaji: p.romaji,
      subName: p.subName,
      subRomaji: p.subRomaji,
      birdName: p.birdName,
      birdRomaji: p.birdRomaji,
      flowerName: p.flowerName,
      flowerRomaji: p.flowerRomaji,
      treeName: p.treeName,
      treeRomaji: p.treeRomaji,
    }));

  return (
    <JapanMapTypingGame
      allPrefectures={prefectureData}
      region="chugoku-shikoku"
      regionName="中国・四国地方"
      gameMode={gameMode}
    />
  );
}
