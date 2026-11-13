import { Metadata } from "next";
import { OtherTypingGame } from "@/app/(other-typing)/components/OtherTypingGame";
import { planetsEnglish } from "@/app/(other-typing)/planets/data";

export const metadata: Metadata = {
  title: "太陽系タイピング（英単語） | 雑学タイピング",
  description: "太陽系の8惑星の英語名（Mercury, Venus, Earth など）をタイピングで覚えよう！",
};

export default function PlanetsEnglishPage() {
  return (
    <OtherTypingGame
      items={planetsEnglish}
      title="太陽系タイピング（英単語）"
      backUrl="/other"
      themeColor="text-purple-500"
      gameMode="planets-english"
      instruction="惑星の英語名をタイピングしよう！"
      variants={[
        { label: "日本語", href: "/planets" },
        { label: "英単語", href: "/planets/english", active: true },
      ]}
    />
  );
}
