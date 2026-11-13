import { Metadata } from "next";
import { OtherTypingGame } from "@/app/(other-typing)/components/OtherTypingGame";
import { etoEnglish } from "@/app/(other-typing)/eto/data";

export const metadata: Metadata = {
  title: "干支タイピング（英単語） | 雑学タイピング",
  description: "十二支の動物の英語名（Rat, Ox, Tiger など）をタイピングで覚えよう！",
};

export default function EtoEnglishPage() {
  return (
    <OtherTypingGame
      items={etoEnglish}
      title="干支タイピング（英単語）"
      backUrl="/other"
      themeColor="text-red-500"
      gameMode="eto-english"
      instruction="動物の英語名をタイピングしよう！"
      variants={[
        { label: "日本語", href: "/eto" },
        { label: "英単語", href: "/eto/english", active: true },
      ]}
    />
  );
}
