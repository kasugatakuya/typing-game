"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BackLink } from "@/app/components/game/BackLink";
import { EnglishTypingGame } from "@/app/(english)/components/EnglishTypingGame";
import type { EnglishDeck } from "@/app/(english)/data/types";
import type { EnglishTypingMode } from "@/app/(english)/hooks/useEnglishTyping";
import { REVIEW_INTERVAL_DAYS } from "@/app/(english)/lib/progress";
import {
  REVIEW_BATCH_SIZE,
  REVIEW_LABELS,
  isReviewType,
  useReviewSummary,
  type ReviewType,
} from "@/app/(english)/lib/review";

// 復習は「覚えたか確認」モードだけで行う（正誤が学習記録に反映される）
const REVIEW_MODES: EnglishTypingMode[] = ["test"];

const EMPTY_MESSAGES: Record<ReviewType, string> = {
  due: "今日の復習はすべて終わりました。",
  weak: "苦手な問題はありません。",
};

const CARD_TEXT: Record<ReviewType, { description: string; empty: string }> = {
  due: {
    description: "覚えてから時間がたち、忘れかけている頃の問題を出し直します。",
    empty: "今は復習する問題がありません",
  },
  weak: {
    description:
      "確認モードで答えを見た問題を、間違えた回数の多い順に出題します。",
    empty: "苦手な問題はありません",
  },
};

function formatDate(ms: number): string {
  const date = new Date(ms);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

export function ReviewHub() {
  const param = useSearchParams().get("type");
  const summary = useReviewSummary();

  if (isReviewType(param)) {
    // デッキをまたいで集めた問題を、1回分のデッキとして出題する。
    // 答えるたびに一覧から抜けていくので、終わったら次の問題に進める
    const deck: EnglishDeck = {
      id: `review-${param}`,
      section: "words",
      genre: "junior",
      title: REVIEW_LABELS[param],
      description: "",
      items: summary[param].slice(0, REVIEW_BATCH_SIZE),
    };
    return (
      <EnglishTypingGame
        key={param}
        deck={deck}
        modes={REVIEW_MODES}
        rankable={false}
        heading={`${REVIEW_LABELS[param]}（残り${summary[param].length}問）`}
        unit="問"
        backHref="/english/review"
        emptyMessage={EMPTY_MESSAGES[param]}
      />
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-indigo-50 to-slate-100 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">復習</h1>
          <p className="text-gray-600">
            「覚えたか確認」の結果をもとに、忘れる前に出し直す問題と苦手な問題をまとめて出題します。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {(["due", "weak"] as const).map((type) => {
            const count = summary[type].length;
            return (
              <div
                key={type}
                className="flex flex-col bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-gray-800">
                  {REVIEW_LABELS[type]}
                </h2>
                <p className="text-sm text-gray-600 mt-2 grow">
                  {CARD_TEXT[type].description}
                </p>
                <p className="mt-4">
                  <span className="text-3xl font-bold text-indigo-600">
                    {count}
                  </span>
                  <span className="text-sm text-gray-600 ml-1">問</span>
                </p>
                {count > 0 ? (
                  <Link
                    href={`/english/review?type=${type}`}
                    className="mt-4 inline-block text-center px-5 py-2.5 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                  >
                    {Math.min(count, REVIEW_BATCH_SIZE)}問を復習する
                  </Link>
                ) : (
                  <p className="mt-4 text-center px-5 py-2.5 rounded-full bg-gray-100 text-gray-500 text-sm">
                    {CARD_TEXT[type].empty}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white/70 rounded-2xl p-5 text-sm text-gray-600">
          <p className="font-bold text-gray-700 mb-1">復習のしくみ</p>
          <p>
            答えを見ずに打てた問題は、{REVIEW_INTERVAL_DAYS.join("日後 → ")}
            日後と間隔を広げながら出し直します。答えを見た問題は最初の段階に戻り、「苦手な問題」に入ります。
          </p>
          <p className="mt-2">
            復習待ちの問題: {summary.scheduledCount}問
            {summary.nextDueAt !== null &&
              `（次回は${formatDate(summary.nextDueAt)}から）`}
          </p>
        </div>

        <div className="text-center mt-10">
          <BackLink href="/english" hoverColorClass="hover:text-indigo-600" />
        </div>
      </div>
    </main>
  );
}
