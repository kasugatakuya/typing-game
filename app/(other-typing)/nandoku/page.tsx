import { Metadata } from "next";
import { OtherTypingGame } from "@/app/(other-typing)/components/OtherTypingGame";
import { nandoku } from "@/app/(other-typing)/nandoku/data";

export const metadata: Metadata = {
  title: "難読漢字タイピング | 雑学タイピング",
  description: "読めそうで読めない難読漢字30個をタイピングで覚えよう！",
};

export default function NandokuPage() {
  return (
    <OtherTypingGame
      items={nandoku}
      title="難読漢字タイピング"
      backUrl="/other"
      themeColor="text-purple-500"
      gameMode="nandoku"
    />
  );
}
