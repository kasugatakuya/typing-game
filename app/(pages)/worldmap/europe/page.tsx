import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import europeData from "@/app/data/europe.json";

export default function Europe() {
  return (
    <WorldMapTypingGame
      allCountries={europeData}
      region="europe"
      regionName="ヨーロッパ"
    />
  );
}
