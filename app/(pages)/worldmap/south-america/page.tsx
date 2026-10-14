import type { Metadata } from "next";
import { worldMapMetadata, resolveWorldMapMode } from "@/app/utils/gameMetadata";
import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import southAmericaData from "@/app/data/southAmerica.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return worldMapMetadata("南アメリカ", resolveWorldMapMode(params.mode), southAmericaData.length);
}

export default async function SouthAmerica({ searchParams }: PageProps) {
  const params = await searchParams;
  const gameMode = params.mode === "capital" ? "capital" : "country";

  return (
    <WorldMapTypingGame
      allCountries={southAmericaData}
      region="south-america"
      regionName="南アメリカ"
      gameMode={gameMode}
    />
  );
}
