import { WorldMapTypingGame } from "@/app/components/WorldMapTypingGame";
import subSaharanAfricaData from "@/app/data/subSaharanAfrica.json";

export default function SubSaharanAfrica() {
  return (
    <WorldMapTypingGame
      allCountries={subSaharanAfricaData}
      region="sub-saharan-africa"
      regionName="サブサハラ・アフリカ"
    />
  );
}
