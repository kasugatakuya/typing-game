import { JapanMapTypingGame } from "@/app/components/JapanMapTypingGame";
import prefectures from "@/app/prefectures.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

type GameMode = "prefecture" | "capital" | "bird" | "flower" | "tree";

export default async function ChubuPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const validModes: GameMode[] = ["prefecture", "capital", "bird", "flower", "tree"];
  const gameMode: GameMode = validModes.includes(params.mode as GameMode)
    ? (params.mode as GameMode)
    : "prefecture";

  const prefectureIds = ["15", "16", "17", "18", "19", "20", "21", "22", "23"];
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
      region="chubu"
      regionName="中部地方"
      gameMode={gameMode}
    />
  );
}
