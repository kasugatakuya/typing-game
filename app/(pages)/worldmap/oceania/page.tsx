import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import oceaniaData from "@/app/data/oceania.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export default async function Oceania({ searchParams }: PageProps) {
  const params = await searchParams;
  const gameMode = params.mode === "capital" ? "capital" : "country";

  return (
    <WorldMapTypingGame
      allCountries={oceaniaData}
      region="oceania"
      regionName="オセアニア"
      gameMode={gameMode}
    />
  );
}
