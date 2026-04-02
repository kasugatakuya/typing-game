import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import westernEuropeData from "@/app/data/westernEurope.json";

export default function WesternEurope() {
  return (
    <WorldMapTypingGame
      allCountries={westernEuropeData}
      region="western-europe"
      regionName="西ヨーロッパ"
    />
  );
}
