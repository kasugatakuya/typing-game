import { Metadata } from "next";
import { OtherTypingGame } from "../../components/OtherTypingGame";
import { superheavyElements } from "../data";

export const metadata: Metadata = {
  title: "超重元素タイピング | 雑学タイピング",
  description: "超重元素15種をタイピングで覚えよう！",
};

export default function SuperheavyElementsPage() {
  return (
    <OtherTypingGame
      items={superheavyElements}
      title="超重元素（104-118）"
      backUrl="/periodic-table"
      themeColor="text-blue-500"
    />
  );
}
