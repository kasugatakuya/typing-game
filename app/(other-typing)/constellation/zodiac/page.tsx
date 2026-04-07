import { Metadata } from "next";
import { OtherTypingGame } from "@/app/(other-typing)/components/OtherTypingGame";
import { zodiacSigns } from "@/app/(other-typing)/constellation/data";

export const metadata: Metadata = {
  title: "12星座タイピング | 雑学タイピング",
  description: "12星座をタイピングで覚えよう！",
};

export default function ZodiacPage() {
  return (
    <OtherTypingGame
      items={zodiacSigns}
      title="12星座タイピング"
      backUrl="/constellation"
      themeColor="text-yellow-500"
    />
  );
}
