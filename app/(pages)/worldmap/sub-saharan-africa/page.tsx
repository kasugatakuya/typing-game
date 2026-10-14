import type { Metadata } from "next";
import { worldMapMetadata, resolveWorldMapMode } from "@/app/utils/gameMetadata";
import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import subSaharanAfricaData from "@/app/data/subSaharanAfrica.json";

interface PageProps {
  searchParams: Promise<{ mode?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  return worldMapMetadata("サブサハラ・アフリカ", resolveWorldMapMode(params.mode), subSaharanAfricaData.length);
}

export default async function SubSaharanAfrica({ searchParams }: PageProps) {
  const params = await searchParams;
  const gameMode = params.mode === "capital" ? "capital" : "country";

  return (
    <WorldMapTypingGame
      allCountries={subSaharanAfricaData}
      region="sub-saharan-africa"
      regionName="サブサハラ・アフリカ"
      gameMode={gameMode}
    />
  );
}
