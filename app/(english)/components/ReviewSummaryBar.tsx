"use client";

import Link from "next/link";
import { REVIEW_LABELS, useReviewSummary } from "@/app/(english)/lib/review";

/** 英語トップに出す復習への入口。件数があるものを目立たせる */
export function ReviewSummaryBar() {
  const summary = useReviewSummary();

  return (
    <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 mb-8">
      {(["due", "weak"] as const).map((type) => {
        const count = summary[type].length;
        return (
          <Link
            key={type}
            href={count > 0 ? `/english/review?type=${type}` : "/english/review"}
            className={`flex items-center justify-between gap-6 px-5 py-3 rounded-2xl shadow-md transition-all hover:shadow-lg ${
              count > 0
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-white text-gray-600"
            }`}
          >
            <span className="font-medium">{REVIEW_LABELS[type]}</span>
            <span className="text-lg font-bold">{count}問</span>
          </Link>
        );
      })}
    </div>
  );
}
