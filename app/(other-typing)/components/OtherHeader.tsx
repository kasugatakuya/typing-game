"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";

// 他のタイピング（地理・英語）へのリンク
const siteLinks = [
  {
    href: "/",
    label: "地理タイピング",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: "/english",
    label: "英語タイピング",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
];

export default function OtherHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, isLoading, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-teal-800 shadow-lg">
      <nav
        className="flex items-center px-6 py-2 lg:px-10 lg:py-3 justify-between max-w-7xl mx-auto"
        aria-label="Global"
      >
        <Link
          href="/other"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-lg font-semibold text-white">
            雑学タイピング
          </span>
        </Link>

        {/* デスクトップメニュー */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">

          {/* ランキングリンク */}
          <Link
            href="/ranking"
            className="flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap text-teal-200 hover:text-white hover:bg-teal-700 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className="font-medium">ランキング</span>
          </Link>
          {siteLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap text-teal-200 hover:text-white hover:bg-teal-700 transition-colors"
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}

          {/* ユーザーメニュー */}
          {!isLoading && (
            <>
              {user ? (
                <div className="relative ml-2">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-teal-700 transition-colors"
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
                      <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {profile?.display_name?.charAt(0) ?? user.email?.charAt(0) ?? "?"}
                        </span>
                      </div>
                    )}
                    <span className="text-teal-200 text-sm max-w-24 truncate">
                      {profile?.display_name ?? "読込中..."}
                    </span>
                    <svg
                      className={`w-4 h-4 text-teal-300 transition-transform ${
                        showUserMenu ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-teal-700 rounded-lg shadow-lg py-1 z-50">
                      <Link
                        href="/mypage"
                        className="block px-4 py-2 text-sm text-teal-200 hover:bg-teal-600 hover:text-white"
                        onClick={() => setShowUserMenu(false)}
                      >
                        マイページ
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-teal-200 hover:bg-teal-600 hover:text-white"
                      >
                        ログアウト
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="ml-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium transition-colors"
                >
                  ログイン
                </Link>
              )}
            </>
          )}
        </div>

        {/* ハンバーガーメニューボタン */}
        <div className="lg:hidden flex items-center gap-2">
          {/* モバイル: ユーザーアバター or ログインボタン */}
          {!isLoading && (
            <>
              {user ? (
                <Link href="/mypage">
                  {profile?.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt={profile.display_name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {profile?.display_name?.charAt(0) ?? user.email?.charAt(0) ?? "?"}
                      </span>
                    </div>
                  )}
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-sm rounded-lg font-medium transition-colors"
                >
                  ログイン
                </Link>
              )}
            </>
          )}

          <button
            className="relative w-10 h-10 rounded-lg bg-teal-700 hover:bg-teal-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニュー"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-4">
              <span
                className={`absolute top-0 left-0 w-full h-0.5 bg-teal-200 rounded-full transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.75" : ""
                }`}
              />
              <span
                className={`absolute top-1/2 left-0 w-full h-0.5 bg-teal-200 rounded-full -translate-y-1/2 transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-teal-200 rounded-full transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.75" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* モバイルメニュー */}
        <div
          className={`lg:hidden fixed left-0 right-0 bg-teal-800 border-t border-teal-700 transition-all duration-300 ${
            isMenuOpen ? "top-14 opacity-100" : "-top-full opacity-0"
          }`}
        >
          {/* ランキングリンク */}
          <Link
            href="/ranking"
            className="flex items-center gap-3 px-6 py-4 text-teal-200 hover:text-white hover:bg-teal-700 transition-colors border-b border-teal-700"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className="font-medium">ランキング</span>
          </Link>
          {siteLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-6 py-4 text-teal-200 hover:text-white hover:bg-teal-700 transition-colors border-b border-teal-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
          {user && (
            <>
              <Link
                href="/mypage"
                className="flex items-center gap-3 px-6 py-4 text-teal-200 hover:text-white hover:bg-teal-700 transition-colors border-b border-teal-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="font-medium">マイページ</span>
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 px-6 py-4 text-teal-200 hover:text-white hover:bg-teal-700 transition-colors border-b border-teal-700 w-full"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium">ログアウト</span>
              </button>
            </>
          )}
        </div>
      </nav>

      {/* クリックアウトでユーザーメニューを閉じる */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
}
