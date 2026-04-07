import { Metadata } from "next";
import PeriodicTableTypingGame from "@/app/(other-typing)/periodic-table/components/PeriodicTableTypingGame";
import { getElementsByCategory } from "@/app/(other-typing)/periodic-table/data";

export const metadata: Metadata = {
  title: "基本20元素タイピング | 雑学タイピング",
  description: "水素からカルシウムまでの基本20元素をタイピングで覚えよう！",
};

export default function BasicElementsPage() {
  const elements = getElementsByCategory("basic");

  return (
    <PeriodicTableTypingGame
      elements={elements}
      title="基本20元素（1-20）"
      backUrl="/periodic-table"
    />
  );
}
