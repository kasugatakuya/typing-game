import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import northAfricaData from "@/app/data/northAfrica.json";

export default function NorthAfrica() {
  return (
    <WorldMapTypingGame
      allCountries={northAfricaData}
      region="north-africa"
      regionName="北アフリカ"
    />
  );
}
