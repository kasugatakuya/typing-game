import { Metadata } from "next";
import { OtherTypingGame } from "../../components/OtherTypingGame";
import { transitionElements } from "../data";

export const metadata: Metadata = {
  title: "遷移金属タイピング | 雑学タイピング",
  description: "遷移金属などの元素（21-54）をタイピングで覚えよう！",
};

export default function TransitionElementsPage() {
  return (
    <OtherTypingGame
      items={transitionElements}
      title="遷移金属など（21-54）"
      backUrl="/periodic-table"
      themeColor="text-blue-500"
    />
  );
}
