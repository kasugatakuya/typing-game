import type { Metadata } from "next";
import HeritageTypingGame from "@/app/(pages)/japanmap/heritage/HeritageTypingGame";

export const metadata: Metadata = {
  title: "日本の世界遺産タイピング | 地理タイピング",
  description:
    "日本の世界遺産26件を地図と写真を見ながらタイピング練習。無料で遊べる地理学習タイピングゲームです。",
};

export default function HeritagePage() {
  return <HeritageTypingGame />;
}
