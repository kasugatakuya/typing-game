import { Metadata } from "next";
import { OtherTypingGame } from "@/app/(other-typing)/components/OtherTypingGame";
import { constellations } from "@/app/(other-typing)/constellation/data";

export const metadata: Metadata = {
  title: "88星座タイピング | 雑学タイピング",
  description: "88星座をタイピングで覚えよう！",
};

export default function AllConstellationsPage() {
  return (
    <OtherTypingGame
      items={constellations}
      title="88星座タイピング"
      backUrl="/constellation"
      themeColor="text-yellow-500"
      gameMode="constellation-all"
    />
  );
}
