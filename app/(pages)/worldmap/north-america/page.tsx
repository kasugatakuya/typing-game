import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import northAmericaData from "@/app/data/northAmerica.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export default async function NorthAmerica({ searchParams }: PageProps) {
  const params = await searchParams;
  const gameMode = params.mode === "capital" ? "capital" : "country";

  return (
    <WorldMapTypingGame
      allCountries={northAmericaData}
      region="north-america"
      regionName="北アメリカ"
      gameMode={gameMode}
    />
  );
}
