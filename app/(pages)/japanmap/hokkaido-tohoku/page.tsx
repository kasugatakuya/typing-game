import { JapanMapTypingGame } from "@/app/components/JapanMapTypingGame";
import prefectures from "@/app/prefectures.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

type GameMode = "prefecture" | "capital" | "bird" | "flower" | "tree";

export default async function HokkaidoTohokuPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const validModes: GameMode[] = ["prefecture", "capital", "bird", "flower", "tree"];
  const gameMode: GameMode = validModes.includes(params.mode as GameMode)
    ? (params.mode as GameMode)
    : "prefecture";

  const prefectureIds = ["1", "2", "3", "4", "5", "6", "7"];
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
      region="hokkaido-tohoku"
      regionName="北海道・東北地方"
      gameMode={gameMode}
    />
  );
}
