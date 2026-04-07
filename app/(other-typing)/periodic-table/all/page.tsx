import { Metadata } from "next";
import PeriodicTableTypingGame from "@/app/(other-typing)/periodic-table/components/PeriodicTableTypingGame";
import { getElementsByCategory } from "@/app/(other-typing)/periodic-table/data";

export const metadata: Metadata = {
  title: "全118元素タイピング | 雑学タイピング",
  description: "全118種類の元素をタイピングで覚えよう！",
};

export default function AllElementsPage() {
  const elements = getElementsByCategory("all");

  return (
    <PeriodicTableTypingGame
      elements={elements}
      title="全118元素"
      backUrl="/periodic-table"
    />
  );
}
