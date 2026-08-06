import { Metadata } from "next";
import { OtherTypingGame } from "@/app/(other-typing)/components/OtherTypingGame";
import { yojijukugo } from "@/app/(other-typing)/yojijukugo/data";

export const metadata: Metadata = {
  title: "四字熟語タイピング | 雑学タイピング",
  description: "よく使う四字熟語30個を意味と一緒にタイピングで覚えよう！",
};

export default function YojijukugoPage() {
  return (
    <OtherTypingGame
      items={yojijukugo}
      title="四字熟語タイピング"
      backUrl="/other"
      themeColor="text-indigo-500"
      gameMode="yojijukugo"
    />
  );
}
