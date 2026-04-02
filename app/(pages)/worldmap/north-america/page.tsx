import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import northAmericaData from "@/app/data/northAmerica.json";

export default function NorthAmerica() {
  return (
    <WorldMapTypingGame
      allCountries={northAmericaData}
      region="north-america"
      regionName="北アメリカ"
    />
  );
}
