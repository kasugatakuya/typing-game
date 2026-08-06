import { Metadata } from "next";
import { OtherTypingGame } from "@/app/(other-typing)/components/OtherTypingGame";
import { kotowaza } from "@/app/(other-typing)/kotowaza/data";

export const metadata: Metadata = {
  title: "ことわざタイピング | 雑学タイピング",
  description: "有名なことわざ30個を意味と一緒にタイピングで覚えよう！",
};

export default function KotowazaPage() {
  return (
    <OtherTypingGame
      items={kotowaza}
      title="ことわざタイピング"
      backUrl="/other"
      themeColor="text-orange-500"
      gameMode="kotowaza"
    />
  );
}
