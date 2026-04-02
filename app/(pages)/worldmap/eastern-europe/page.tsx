import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import easternEuropeData from "@/app/data/easternEurope.json";

export default function EasternEurope() {
  return (
    <WorldMapTypingGame
      allCountries={easternEuropeData}
      region="eastern-europe"
      regionName="東ヨーロッパ"
    />
  );
}
