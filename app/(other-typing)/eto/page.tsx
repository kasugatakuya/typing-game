import { Metadata } from "next";
import { OtherTypingGame } from "@/app/(other-typing)/components/OtherTypingGame";
import { eto } from "@/app/(other-typing)/eto/data";

export const metadata: Metadata = {
  title: "干支タイピング | 雑学タイピング",
  description: "十二支をタイピングで覚えよう！",
};

export default function EtoPage() {
  return (
    <OtherTypingGame
      items={eto}
      title="干支タイピング"
      backUrl="/other"
      themeColor="text-red-500"
      gameMode="eto"
    />
  );
}
