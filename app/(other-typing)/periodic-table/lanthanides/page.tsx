import { Metadata } from "next";
import { OtherTypingGame } from "../../components/OtherTypingGame";
import { lanthanides } from "../data";

export const metadata: Metadata = {
  title: "ランタノイドタイピング | 雑学タイピング",
  description: "ランタノイド15元素をタイピングで覚えよう！",
};

export default function LanthanidesPage() {
  return (
    <OtherTypingGame
      items={lanthanides}
      title="ランタノイド（57-71）"
      backUrl="/periodic-table"
      themeColor="text-blue-500"
    />
  );
}
