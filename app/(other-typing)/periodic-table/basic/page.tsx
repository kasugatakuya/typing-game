import { Metadata } from "next";
import { OtherTypingGame } from "../../components/OtherTypingGame";
import { basicElements } from "../data";

export const metadata: Metadata = {
  title: "基本20元素タイピング | 雑学タイピング",
  description: "水素からカルシウムまでの基本20元素をタイピングで覚えよう！",
};

export default function BasicElementsPage() {
  return (
    <OtherTypingGame
      items={basicElements}
      title="基本20元素"
      backUrl="/periodic-table"
      themeColor="text-blue-500"
    />
  );
}
