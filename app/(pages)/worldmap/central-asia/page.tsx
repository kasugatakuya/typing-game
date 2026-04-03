import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import centralAsiaData from "@/app/data/centralAsia.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export default async function CentralAsia({ searchParams }: PageProps) {
  const params = await searchParams;
  const gameMode = params.mode === "capital" ? "capital" : "country";

  return (
    <WorldMapTypingGame
      allCountries={centralAsiaData}
      region="central-asia"
      regionName="中央アジア・コーカサス"
      gameMode={gameMode}
    />
  );
}
