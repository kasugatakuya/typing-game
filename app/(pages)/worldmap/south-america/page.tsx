import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import southAmericaData from "@/app/data/southAmerica.json";

export default function SouthAmerica() {
  return (
    <WorldMapTypingGame
      allCountries={southAmericaData}
      region="south-america"
      regionName="南アメリカ"
    />
  );
}
