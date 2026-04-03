import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import southernEuropeData from "@/app/data/southernEurope.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export default async function SouthernEurope({ searchParams }: PageProps) {
  const params = await searchParams;
  const gameMode = params.mode === "capital" ? "capital" : "country";

  return (
    <WorldMapTypingGame
      allCountries={southernEuropeData}
      region="southern-europe"
      regionName="ロシア・その他ヨーロッパ"
      gameMode={gameMode}
    />
  );
}
