import { wordDecks } from "./words";
import { phraseDecks } from "./phrases";
import { grammarDecks } from "./grammar";
import {
  SECTION_LABELS,
  SECTION_GENRES,
  type EnglishItem,
  type GenreInfo,
  type EnglishDeck,
  type EnglishSection,
} from "./types";

export const ENGLISH_SECTIONS: EnglishSection[] = ["words", "phrases", "grammar"];

export const DECKS_BY_SECTION: Record<EnglishSection, EnglishDeck[]> = {
  words: wordDecks,
  phrases: phraseDecks,
  grammar: grammarDecks,
};

export const ALL_DECKS: EnglishDeck[] = [
  ...wordDecks,
  ...phraseDecks,
  ...grammarDecks,
];

export function findDeck(section: string, deckId: string): EnglishDeck | undefined {
  return ALL_DECKS.find((d) => d.section === section && d.id === deckId);
}

/** ランキング用のモード ID。「覚えたか確認」モードは -test を付けて別集計にする */
export function rankingModeId(deck: EnglishDeck, isTest: boolean): string {
  return `${deck.section}-${deck.id}${isTest ? "-test" : ""}`;
}

/** app/types/score.ts の GAME_MODES.english に入れるモード定義（デッキから自動生成） */
export const ENGLISH_GAME_MODES: Record<
  string,
  { displayName: string; questionCount: number }
> = Object.fromEntries(
  ALL_DECKS.flatMap((deck) => {
    const name = `${SECTION_LABELS[deck.section]}・${deck.title}`;
    const questionCount = deck.items.length;
    return [
      [rankingModeId(deck, false), { displayName: name, questionCount }],
      [
        rankingModeId(deck, true),
        { displayName: `${name}（確認モード）`, questionCount },
      ],
    ];
  }),
);

let itemIndex: Map<string, { deck: EnglishDeck; item: EnglishItem }> | null =
  null;

/** 学習記録のキー（"<section>/<deck id>/<英語>"）から元の問題を引く */
export function findItemByProgressKey(key: string) {
  if (!itemIndex) {
    itemIndex = new Map();
    for (const deck of ALL_DECKS) {
      for (const item of deck.items) {
        itemIndex.set(`${deck.section}/${deck.id}/${item.en}`, { deck, item });
      }
    }
  }
  return itemIndex.get(key);
}

export function isEnglishSection(value: string): value is EnglishSection {
  return (ENGLISH_SECTIONS as string[]).includes(value);
}

export function sectionPath(section: EnglishSection): string {
  return `/english/${section}`;
}

/** URL の ?genre= からそのセクションのジャンルを決める。不正な値は先頭（既定）のジャンルにする */
export function resolveGenre(
  section: EnglishSection,
  value: string | null,
): GenreInfo {
  const genres = SECTION_GENRES[section];
  return genres.find((genre) => genre.id === value) ?? genres[0];
}

/** デッキが載っている一覧ページ（ジャンルのタブを指定する） */
export function deckListPath(deck: EnglishDeck): string {
  return `${sectionPath(deck.section)}?genre=${deck.genre}`;
}

export function deckPath(deck: EnglishDeck): string {
  return `/english/${deck.section}/${deck.id}`;
}
