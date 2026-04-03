import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import westAfricaData from "@/app/data/westAfrica.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export default async function WestAfrica({ searchParams }: PageProps) {
  const params = await searchParams;
  const gameMode = params.mode === "capital" ? "capital" : "country";

  return (
    <WorldMapTypingGame
      allCountries={westAfricaData}
      region="west-africa"
      regionName="西アフリカ"
      gameMode={gameMode}
    />
  );
}
