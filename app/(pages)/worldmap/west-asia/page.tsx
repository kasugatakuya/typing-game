import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import westAsiaData from "@/app/data/westAsia.json";

export default function WestAsia() {
  return (
    <WorldMapTypingGame
      allCountries={westAsiaData}
      region="west-asia"
      regionName="西アジア（中東）"
    />
  );
}
