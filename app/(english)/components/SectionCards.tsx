"use client";

import Link from "next/link";
import {
  DECKS_BY_SECTION,
  ENGLISH_SECTIONS,
  sectionPath,
} from "@/app/(english)/data";
import { SECTION_INTRO, SECTION_LABELS } from "@/app/(english)/data/types";
import { countMastered, useEnglishProgress } from "@/app/(english)/lib/progress";

/** 英語トップの入口カード（単語・会話・文法）。セクション全体の「覚えた数」を表示する */
export function SectionCards() {
  const progress = useEnglishProgress();

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {ENGLISH_SECTIONS.map((section) => {
        const decks = DECKS_BY_SECTION[section];
        const total = decks.reduce((sum, d) => sum + d.items.length, 0);
        const mastered = decks.reduce(
          (sum, d) => sum + countMastered(d, progress),
          0,
        );
        return (
          <Link
            key={section}
            href={sectionPath(section)}
            className="group flex flex-col bg-white rounded-2xl shadow-lg p-6 transition-all duration-200 hover:shadow-2xl hover:-translate-y-1"
          >
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
              {SECTION_LABELS[section]}
            </h2>
            <p className="text-sm text-gray-600 mt-2 grow">
              {SECTION_INTRO[section]}
            </p>
            <p className="text-xs text-gray-500 mt-4">
              {decks.length}デッキ・全{total}
              {section === "words" ? "語" : "文"}
            </p>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>覚えた数</span>
                <span>
                  {mastered} / {total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${(mastered / total) * 100}%` }}
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
