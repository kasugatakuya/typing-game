import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import easternEuropeData from "@/app/data/easternEurope.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export default async function EasternEurope({ searchParams }: PageProps) {
  const params = await searchParams;
  const gameMode = params.mode === "capital" ? "capital" : "country";

  return (
    <WorldMapTypingGame
      allCountries={easternEuropeData}
      region="eastern-europe"
      regionName="東ヨーロッパ"
      gameMode={gameMode}
    />
  );
}
