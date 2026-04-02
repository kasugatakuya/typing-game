import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import centralAsiaData from "@/app/data/centralAsia.json";

export default function CentralAsia() {
  return (
    <WorldMapTypingGame
      allCountries={centralAsiaData}
      region="central-asia"
      regionName="中央アジア・コーカサス"
    />
  );
}
