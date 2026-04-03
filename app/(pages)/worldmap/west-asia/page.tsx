import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import westAsiaData from "@/app/data/westAsia.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export default async function WestAsia({ searchParams }: PageProps) {
  const params = await searchParams;
  const gameMode = params.mode === "capital" ? "capital" : "country";

  return (
    <WorldMapTypingGame
      allCountries={westAsiaData}
      region="west-asia"
      regionName="西アジア（中東）"
      gameMode={gameMode}
    />
  );
}
