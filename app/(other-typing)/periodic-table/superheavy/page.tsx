import { Metadata } from "next";
import PeriodicTableTypingGame from "@/app/(other-typing)/periodic-table/components/PeriodicTableTypingGame";
import { getElementsByCategory } from "@/app/(other-typing)/periodic-table/data";

export const metadata: Metadata = {
  title: "超重元素タイピング | 雑学タイピング",
  description: "超重元素15種をタイピングで覚えよう！",
};

export default function SuperheavyElementsPage() {
  const elements = getElementsByCategory("superheavy");

  return (
    <PeriodicTableTypingGame
      elements={elements}
      title="超重元素（104-118）"
      backUrl="/periodic-table"
    />
  );
}
