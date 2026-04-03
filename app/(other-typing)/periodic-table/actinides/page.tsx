import { Metadata } from "next";
import { OtherTypingGame } from "../../components/OtherTypingGame";
import { actinides } from "../data";

export const metadata: Metadata = {
  title: "アクチノイドタイピング | 雑学タイピング",
  description: "アクチノイド15元素をタイピングで覚えよう！",
};

export default function ActinidesPage() {
  return (
    <OtherTypingGame
      items={actinides}
      title="アクチノイド（89-103）"
      backUrl="/periodic-table"
      themeColor="text-blue-500"
    />
  );
}
