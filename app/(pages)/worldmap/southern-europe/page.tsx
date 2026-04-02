import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import southernEuropeData from "@/app/data/southernEurope.json";

export default function SouthernEurope() {
  return (
    <WorldMapTypingGame
      allCountries={southernEuropeData}
      region="southern-europe"
      regionName="ロシア・その他ヨーロッパ"
    />
  );
}
