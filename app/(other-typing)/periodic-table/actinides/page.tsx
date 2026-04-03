import { Metadata } from "next";
import PeriodicTableTypingGame from "../components/PeriodicTableTypingGame";
import { getElementsByCategory } from "../data";

export const metadata: Metadata = {
  title: "アクチノイドタイピング | 雑学タイピング",
  description: "アクチノイド15元素をタイピングで覚えよう！",
};

export default function ActinidesPage() {
  const elements = getElementsByCategory("actinides");

  return (
    <PeriodicTableTypingGame
      elements={elements}
      title="アクチノイド（89-103）"
      backUrl="/periodic-table"
    />
  );
}
