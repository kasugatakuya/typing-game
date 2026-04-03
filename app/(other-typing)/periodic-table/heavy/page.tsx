import { Metadata } from "next";
import PeriodicTableTypingGame from "../components/PeriodicTableTypingGame";
import { getElementsByCategory } from "../data";

export const metadata: Metadata = {
  title: "重元素タイピング | 雑学タイピング",
  description: "セシウムからラジウムまでの重元素をタイピングで覚えよう！",
};

export default function HeavyElementsPage() {
  const elements = getElementsByCategory("heavy");

  return (
    <PeriodicTableTypingGame
      elements={elements}
      title="重元素（55-88）"
      backUrl="/periodic-table"
    />
  );
}
