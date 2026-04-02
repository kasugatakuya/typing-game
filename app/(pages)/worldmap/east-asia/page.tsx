import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import eastAsiaData from "@/app/data/eastAsia.json";

export default function EastAsia() {
  return (
    <WorldMapTypingGame
      allCountries={eastAsiaData}
      region="east-asia"
      regionName="東アジア・東南アジア・南アジア"
    />
  );
}
