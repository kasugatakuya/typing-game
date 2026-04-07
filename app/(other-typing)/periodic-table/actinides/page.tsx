import { Metadata } from "next";
import PeriodicTableTypingGame from "@/app/(other-typing)/periodic-table/components/PeriodicTableTypingGame";
import { getElementsByCategory } from "@/app/(other-typing)/periodic-table/data";

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
