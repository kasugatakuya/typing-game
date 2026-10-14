import type { Metadata } from "next";
import { worldMapMetadata, resolveWorldMapMode } from "@/app/utils/gameMetadata";
import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import southernEuropeData from "@/app/data/southernEurope.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return worldMapMetadata("ロシア・その他ヨーロッパ", resolveWorldMapMode(params.mode), southernEuropeData.length);
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
