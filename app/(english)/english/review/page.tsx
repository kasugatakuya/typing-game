import type { Metadata } from "next";
import { Suspense } from "react";
import { ReviewHub } from "@/app/(english)/components/ReviewHub";

export const metadata: Metadata = {
  title: "復習 | 英語タイピング",
  description:
    "覚えた英単語・フレーズを忘れる前に出し直す復習と、苦手な問題のまとめ出題。",
  // 内容が利用者ごとの学習記録なので検索結果には出さない
  robots: { index: false },
};

export default function EnglishReviewPage() {
  return (
    // 復習の種類は URL の ?type= で切り替える
    <Suspense fallback={null}>
      <ReviewHub />
    </Suspense>
  );
}
