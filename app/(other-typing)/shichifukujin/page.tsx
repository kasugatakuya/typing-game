import { Metadata } from "next";
import { OtherTypingGame } from "../components/OtherTypingGame";
import { shichifukujin } from "./data";

export const metadata: Metadata = {
  title: "七福神タイピング | 雑学タイピング",
  description: "七福神をタイピングで覚えよう！",
};

export default function ShichifukujinPage() {
  return (
    <OtherTypingGame
      items={shichifukujin}
      title="七福神タイピング"
      backUrl="/other"
      themeColor="text-amber-500"
    />
  );
}
