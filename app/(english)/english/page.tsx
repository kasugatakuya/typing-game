import type { Metadata } from "next";
import { ReviewSummaryBar } from "@/app/(english)/components/ReviewSummaryBar";
import { SectionCards } from "@/app/(english)/components/SectionCards";

const title = "英語タイピング | タイピングで覚える英単語・英会話・英文法";
const description =
  "英単語・英会話フレーズ・英文法をタイピングしながら学べる無料ゲーム。日本語の意味だけを見て英語を打つ確認モードで、覚えたかどうかをチェックできます。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/english" },
  openGraph: { title, description, type: "website", siteName: "英語タイピング" },
};

export default function EnglishTopPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-indigo-50 to-slate-100 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            タイピングで学ぶ英語
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            「見て覚える」で英語を見ながら打ち、「覚えたか確認」で日本語の意味だけを見て打つ。2つのモードを繰り返して、単語・会話・文法を定着させましょう。
          </p>
        </div>

        <ReviewSummaryBar />
        <SectionCards />

        <p className="text-center text-xs text-gray-500 mt-10">
          学習の記録はこのブラウザに保存されます。
        </p>
      </div>
    </main>
  );
}
