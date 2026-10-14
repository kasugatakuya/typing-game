import type { Metadata } from "next";
import { worldMapMetadata, resolveWorldMapMode } from "@/app/utils/gameMetadata";
import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import centralAsiaData from "@/app/data/centralAsia.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return worldMapMetadata("中央アジア・コーカサス", resolveWorldMapMode(params.mode), centralAsiaData.length);
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
