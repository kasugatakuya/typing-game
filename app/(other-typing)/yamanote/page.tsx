import { Metadata } from "next";
import { YamanoteTypingGame } from "@/app/(other-typing)/components/YamanoteTypingGame";
import { stations } from "@/app/(other-typing)/yamanote/data";

export const metadata: Metadata = {
  title: "山手線タイピング | 雑学タイピング",
  description: "山手線30駅をタイピングで覚えよう！",
};

export default function YamanotePage() {
  return <YamanoteTypingGame stations={stations} />;
}
