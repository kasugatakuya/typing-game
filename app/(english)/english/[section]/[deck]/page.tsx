import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishTypingGame } from "@/app/(english)/components/EnglishTypingGame";
import { ALL_DECKS, deckPath, findDeck } from "@/app/(english)/data";
import { SECTION_LABELS } from "@/app/(english)/data/types";

interface PageProps {
  params: Promise<{ section: string; deck: string }>;
}

// 定義済みのデッキだけを静的生成し、それ以外は 404 にする
export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_DECKS.map((deck) => ({ section: deck.section, deck: deck.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section, deck: deckId } = await params;
  const deck = findDeck(section, deckId);
  if (!deck) return {};

  const label = SECTION_LABELS[deck.section];
  const title = `${deck.title}（${label}） | 英語タイピング`;
  const description = `${label}「${deck.title}」をタイピングで学習。${deck.description}。全${deck.items.length}問、意味だけを見て打つ確認モードつき。`;
  return {
    title,
    description,
    alternates: { canonical: deckPath(deck) },
    openGraph: { title, description, type: "website", siteName: "英語タイピング" },
  };
}

export default async function EnglishDeckPage({ params }: PageProps) {
  const { section, deck: deckId } = await params;
  const deck = findDeck(section, deckId);
  if (!deck) notFound();

  return <EnglishTypingGame deck={deck} />;
}
