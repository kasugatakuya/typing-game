import type { Metadata } from "next";
import { worldMapMetadata, resolveWorldMapMode } from "@/app/utils/gameMetadata";
import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import northAmericaData from "@/app/data/northAmerica.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return worldMapMetadata("北アメリカ", resolveWorldMapMode(params.mode), northAmericaData.length);
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
