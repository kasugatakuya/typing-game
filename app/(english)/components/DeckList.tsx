"use client";

import Link from "next/link";
import { deckPath } from "@/app/(english)/data";
import type { EnglishDeck } from "@/app/(english)/data/types";
import { countMastered, useEnglishProgress } from "@/app/(english)/lib/progress";

/** デッキ一覧。カードごとに「覚えた数」の進捗を表示する */
export function DeckList({ decks }: { decks: EnglishDeck[] }) {
  const progress = useEnglishProgress();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {decks.map((deck) => {
        const total = deck.items.length;
        const mastered = countMastered(deck, progress);
        return (
          <Link
            key={deck.id}
            href={deckPath(deck)}
            className="group block bg-white rounded-2xl shadow-md p-5 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          >
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
              {deck.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{deck.description}</p>
            <div className="mt-4">
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
