import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import westAfricaData from "@/app/data/westAfrica.json";

export default function WestAfrica() {
  return (
    <WorldMapTypingGame
      allCountries={westAfricaData}
      region="west-africa"
      regionName="西アフリカ"
    />
  );
}
