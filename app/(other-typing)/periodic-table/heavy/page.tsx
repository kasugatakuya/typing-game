import { Metadata } from "next";
import { OtherTypingGame } from "../../components/OtherTypingGame";
import { heavyElements } from "../data";

export const metadata: Metadata = {
  title: "重元素タイピング | 雑学タイピング",
  description: "セシウムからラジウムまでの重元素をタイピングで覚えよう！",
};

export default function HeavyElementsPage() {
  return (
    <OtherTypingGame
      items={heavyElements}
      title="重元素（55-88）"
      backUrl="/periodic-table"
      themeColor="text-blue-500"
    />
  );
}
