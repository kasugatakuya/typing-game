import type { Metadata } from "next";
import { worldMapMetadata, resolveWorldMapMode } from "@/app/utils/gameMetadata";
import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import westAsiaData from "@/app/data/westAsia.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return worldMapMetadata("西アジア（中東）", resolveWorldMapMode(params.mode), westAsiaData.length);
}

export default async function WestAsia({ searchParams }: PageProps) {
  const params = await searchParams;
  const gameMode = params.mode === "capital" ? "capital" : "country";

  return (
    <WorldMapTypingGame
      allCountries={westAsiaData}
      region="west-asia"
      regionName="西アジア（中東）"
      gameMode={gameMode}
    />
  );
}
