import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import westernEuropeData from "@/app/data/westernEurope.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export default async function WesternEurope({ searchParams }: PageProps) {
  const params = await searchParams;
  const gameMode = params.mode === "capital" ? "capital" : "country";

  return (
    <WorldMapTypingGame
      allCountries={westernEuropeData}
      region="western-europe"
      regionName="西ヨーロッパ"
      gameMode={gameMode}
    />
  );
}
