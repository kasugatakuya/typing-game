import type { Metadata } from "next";
import { worldMapMetadata, resolveWorldMapMode } from "@/app/utils/gameMetadata";
import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import oceaniaData from "@/app/data/oceania.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return worldMapMetadata("オセアニア", resolveWorldMapMode(params.mode), oceaniaData.length);
}

export default async function Oceania({ searchParams }: PageProps) {
  const params = await searchParams;
  const gameMode = params.mode === "capital" ? "capital" : "country";

  return (
    <WorldMapTypingGame
      allCountries={oceaniaData}
      region="oceania"
      regionName="オセアニア"
      gameMode={gameMode}
    />
  );
}
