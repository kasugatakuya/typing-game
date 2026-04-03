import { Metadata } from "next";
import { OtherTypingGame } from "../components/OtherTypingGame";
import { elements } from "./data";

export const metadata: Metadata = {
  title: "元素周期表タイピング | 雑学タイピング",
  description: "118種類の元素をタイピングで覚えよう！",
};

export default function PeriodicTablePage() {
  return (
    <OtherTypingGame
      items={elements}
      title="元素周期表タイピング"
      backUrl="/other"
      themeColor="text-blue-500"
    />
  );
}
