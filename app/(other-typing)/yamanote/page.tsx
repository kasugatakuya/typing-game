import { Metadata } from "next";
import { OtherTypingGame } from "../components/OtherTypingGame";
import { stations } from "./data";

export const metadata: Metadata = {
  title: "山手線タイピング | 雑学タイピング",
  description: "山手線30駅をタイピングで覚えよう！",
};

export default function YamanotePage() {
  return (
    <OtherTypingGame
      items={stations}
      title="山手線タイピング"
      backUrl="/other"
      themeColor="text-green-500"
    />
  );
}
