import type { Metadata } from "next";
import { worldMapMetadata, resolveWorldMapMode } from "@/app/utils/gameMetadata";
import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import westernEuropeData from "@/app/data/westernEurope.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return worldMapMetadata("西ヨーロッパ", resolveWorldMapMode(params.mode), westernEuropeData.length);
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
