import { Metadata } from "next";
import PeriodicTableTypingGame from "@/app/(other-typing)/periodic-table/components/PeriodicTableTypingGame";
import { getElementsByCategory } from "@/app/(other-typing)/periodic-table/data";

export const metadata: Metadata = {
  title: "遷移金属タイピング | 雑学タイピング",
  description: "遷移金属などの元素（21-54）をタイピングで覚えよう！",
};

export default function TransitionElementsPage() {
  const elements = getElementsByCategory("transition");

  return (
    <PeriodicTableTypingGame
      elements={elements}
      title="遷移金属など（21-54）"
      backUrl="/periodic-table"
    />
  );
}
