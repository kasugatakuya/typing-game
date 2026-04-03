import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import eastAsiaData from "@/app/data/eastAsia.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export default async function EastAsia({ searchParams }: PageProps) {
  const params = await searchParams;
  const gameMode = params.mode === "capital" ? "capital" : "country";

  return (
    <WorldMapTypingGame
      allCountries={eastAsiaData}
      region="east-asia"
      regionName="東アジア・東南アジア・南アジア"
      gameMode={gameMode}
    />
  );
}
