import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import oceaniaData from "@/app/data/oceania.json";

export default function Oceania() {
  return (
    <WorldMapTypingGame
      allCountries={oceaniaData}
      region="oceania"
      regionName="オセアニア"
    />
  );
}
