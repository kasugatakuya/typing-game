import type { Metadata } from "next";
import { worldMapMetadata, resolveWorldMapMode } from "@/app/utils/gameMetadata";
import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import easternEuropeData from "@/app/data/easternEurope.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return worldMapMetadata("東ヨーロッパ", resolveWorldMapMode(params.mode), easternEuropeData.length);
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
