import { Metadata } from "next";
import { YamanoteTypingGame } from "../components/YamanoteTypingGame";
import { stations } from "./data";

export const metadata: Metadata = {
  title: "山手線タイピング | 雑学タイピング",
  description: "山手線30駅をタイピングで覚えよう！",
};

export default function YamanotePage() {
  return <YamanoteTypingGame stations={stations} />;
}
