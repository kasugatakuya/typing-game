"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DeckList } from "@/app/(english)/components/DeckList";
import {
  DECKS_BY_SECTION,
  resolveGenre,
  sectionPath,
} from "@/app/(english)/data";
import {
  SECTION_GENRES,
  type EnglishSection,
} from "@/app/(english)/data/types";
import { countMastered, useEnglishProgress } from "@/app/(english)/lib/progress";

/** デッキ一覧。ジャンルのタブ（URL の ?genre=）で絞り込む */
export function DeckBrowser({ section }: { section: EnglishSection }) {
  const genre = resolveGenre(section, useSearchParams().get("genre"));
  const progress = useEnglishProgress();
  const decks = DECKS_BY_SECTION[section].filter((d) => d.genre === genre.id);
  const total = decks.reduce((sum, d) => sum + d.items.length, 0);
  const mastered = decks.reduce((sum, d) => sum + countMastered(d, progress), 0);
  const unit = section === "words" ? "語" : "文";

  return (
    <div>
      <nav
        aria-label="ジャンル"
        className="flex flex-wrap justify-center gap-2 mb-6"
      >
        {SECTION_GENRES[section].map((g) => (
          <Link
            key={g.id}
            href={`${sectionPath(section)}?genre=${g.id}`}
            scroll={false}
            aria-current={g.id === genre.id ? "page" : undefined}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              g.id === genre.id
                ? "bg-indigo-600 text-white shadow"
                : "bg-white text-gray-600 shadow-sm hover:text-indigo-600"
            }`}
          >
            {g.label}
          </Link>
        ))}
      </nav>

      <p className="text-center text-sm text-gray-600 mb-6">
        {genre.description}
        <span className="block text-xs text-gray-500 mt-1">
          {decks.length}デッキ・全{total}
          {unit}／覚えた数 {mastered}
        </span>
      </p>

      <DeckList decks={decks} />
    </div>
  );
}
