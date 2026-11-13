"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/contexts/AuthContext";

const links = [
  { href: "/english/words", label: "単語", className: "" },
  { href: "/english/phrases", label: "会話", className: "" },
  { href: "/english/grammar", label: "文法", className: "" },
  { href: "/english/review", label: "復習", className: "hidden sm:block" },
  // スマホ幅では入りきらないため隠す（フッターから移動できる）
  { href: "/ranking", label: "ランキング", className: "hidden sm:block" },
];

// 他のタイピングへのリンク（狭い画面ではフッターから移動できる）
const siteLinks = [
  { href: "/", label: "地理タイピング" },
  { href: "/other", label: "雑学タイピング" },
];

export default function EnglishHeader() {
  const { user, profile, isLoading } = useAuth();

  return (
    <header className="fixed top-0 w-full z-50 bg-indigo-800 shadow-lg">
      <nav
        className="flex items-center justify-between gap-2 px-4 py-2 lg:px-10 lg:py-3 max-w-7xl mx-auto min-h-14"
        aria-label="Global"
      >
        <Link
          href="/english"
          className="shrink-0 text-base sm:text-lg font-semibold text-white hover:opacity-80 transition-opacity"
        >
          英語タイピング
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 sm:px-3 xl:px-4 py-2 rounded-lg text-sm sm:text-base font-medium whitespace-nowrap text-indigo-200 hover:text-white hover:bg-indigo-700 transition-colors ${link.className}`}
            >
              {link.label}
            </Link>
          ))}
          {siteLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden lg:block px-3 xl:px-4 py-2 rounded-lg font-medium whitespace-nowrap text-indigo-200 hover:text-white hover:bg-indigo-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {!isLoading &&
            (user ? (
              <Link
                href="/mypage"
                aria-label="マイページ"
                className="ml-1 sm:ml-2 shrink-0"
              >
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.display_name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                    {profile?.display_name?.charAt(0) ??
                      user.email?.charAt(0) ??
                      "?"}
                  </span>
                )}
              </Link>
            ) : (
              <Link
                href="/login"
                className="ml-1 sm:ml-2 shrink-0 whitespace-nowrap px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg font-medium transition-colors"
              >
                ログイン
              </Link>
            ))}
        </div>
      </nav>
    </header>
  );
}
