import type { Metadata } from "next";
import { worldMapMetadata, resolveWorldMapMode } from "@/app/utils/gameMetadata";
import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import eastAsiaData from "@/app/data/eastAsia.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return worldMapMetadata("東アジア・東南アジア・南アジア", resolveWorldMapMode(params.mode), eastAsiaData.length);
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
