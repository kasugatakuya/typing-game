import { Metadata } from "next";
import { OtherTypingGame } from "@/app/(other-typing)/components/OtherTypingGame";
import { planets } from "@/app/(other-typing)/planets/data";

export const metadata: Metadata = {
  title: "太陽系タイピング | 雑学タイピング",
  description: "太陽系の8惑星をタイピングで覚えよう！",
};

export default function PlanetsPage() {
  return (
    <OtherTypingGame
      items={planets}
      title="太陽系タイピング"
      backUrl="/other"
      themeColor="text-purple-500"
      gameMode="planets"
      variants={[
        { label: "日本語", href: "/planets", active: true },
        { label: "英単語", href: "/planets/english" },
      ]}
    />
  );
}
