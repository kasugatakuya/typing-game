import { Metadata } from "next";
import PeriodicTableTypingGame from "@/app/(other-typing)/periodic-table/components/PeriodicTableTypingGame";
import { getElementsByCategory } from "@/app/(other-typing)/periodic-table/data";

export const metadata: Metadata = {
  title: "ランタノイドタイピング | 雑学タイピング",
  description: "ランタノイド15元素をタイピングで覚えよう！",
};

export default function LanthanidesPage() {
  const elements = getElementsByCategory("lanthanides");

  return (
    <PeriodicTableTypingGame
      elements={elements}
      title="ランタノイド（57-71）"
      backUrl="/periodic-table"
    />
  );
}
