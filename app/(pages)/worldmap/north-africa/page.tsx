import type { Metadata } from "next";
import { worldMapMetadata, resolveWorldMapMode } from "@/app/utils/gameMetadata";
import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import northAfricaData from "@/app/data/northAfrica.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return worldMapMetadata("北アフリカ", resolveWorldMapMode(params.mode), northAfricaData.length);
}

export default async function NorthAfrica({ searchParams }: PageProps) {
  const params = await searchParams;
  const gameMode = params.mode === "capital" ? "capital" : "country";

  return (
    <WorldMapTypingGame
      allCountries={northAfricaData}
      region="north-africa"
      regionName="北アフリカ"
      gameMode={gameMode}
    />
  );
}
