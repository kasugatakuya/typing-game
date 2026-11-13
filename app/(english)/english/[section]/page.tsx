import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { DeckBrowser } from "@/app/(english)/components/DeckBrowser";
import { BackLink } from "@/app/components/game/BackLink";
import {
  DECKS_BY_SECTION,
  ENGLISH_SECTIONS,
  isEnglishSection,
  sectionPath,
} from "@/app/(english)/data";
import {
  SECTION_INTRO,
  SECTION_LABELS,
  SECTION_GENRES,
} from "@/app/(english)/data/types";

interface PageProps {
  params: Promise<{ section: string }>;
}

// 単語・会話・文法の3ページだけを静的生成し、それ以外は 404 にする
export const dynamicParams = false;

export function generateStaticParams() {
  return ENGLISH_SECTIONS.map((section) => ({ section }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section } = await params;
  if (!isEnglishSection(section)) return {};

  const label = SECTION_LABELS[section];
  const decks = DECKS_BY_SECTION[section];
  const title = `${label}タイピング | 英語タイピング`;
  const total = decks.reduce((sum, d) => sum + d.items.length, 0);
  const description = `${label}をタイピングで学習。${SECTION_GENRES[section]
    .map((g) => g.label)
    .join("・")}のジャンル別に全${total}${section === "words" ? "語" : "文"}。意味だけを見て打つ確認モードつき。`;
  return {
    title,
    description,
    alternates: { canonical: sectionPath(section) },
    openGraph: { title, description, type: "website", siteName: "英語タイピング" },
  };
}

export default async function EnglishSectionPage({ params }: PageProps) {
  const { section } = await params;
  if (!isEnglishSection(section)) notFound();

  return (
    <main className="min-h-screen bg-linear-to-b from-indigo-50 to-slate-100 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {SECTION_LABELS[section]}
          </h1>
          <p className="text-gray-600">{SECTION_INTRO[section]}</p>
        </div>

        {/* ジャンルのタブは URL の ?genre= で切り替える */}
        <Suspense fallback={null}>
          <DeckBrowser section={section} />
        </Suspense>

        <div className="text-center mt-10">
          <BackLink href="/english" hoverColorClass="hover:text-indigo-600" />
        </div>
      </div>
    </main>
  );
}
