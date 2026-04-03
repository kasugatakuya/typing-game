import { Metadata } from "next";
import { OtherTypingGame } from "../../components/OtherTypingGame";
import { allElements } from "../data";

export const metadata: Metadata = {
  title: "全118元素タイピング | 雑学タイピング",
  description: "全118種類の元素をタイピングで覚えよう！",
};

export default function AllElementsPage() {
  return (
    <OtherTypingGame
      items={allElements}
      title="全118元素"
      backUrl="/periodic-table"
      themeColor="text-blue-500"
    />
  );
}
