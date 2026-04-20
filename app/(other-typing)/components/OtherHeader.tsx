"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";

const links = [
  {
    href: "/yamanote",
    label: "山手線",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        <circle cx="12" cy="12" r="8" strokeWidth={2} />
        <circle cx="8" cy="17" r="1.5" fill="currentColor" />
        <circle cx="16" cy="17" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: "/constellation",
    label: "星座",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    href: "/eto",
    label: "干支",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" strokeWidth={2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18M3 12h18M5.64 5.64l12.72 12.72M18.36 5.64L5.64 18.36" />
      </svg>
    ),
  },
  {
    href: "/shichifukujin",
    label: "七福神",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M5 21V10l7-7 7 7v11M9 21v-6h6v6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 10h20" />
      </svg>
    ),
  },
  {
    href: "/periodic-table",
    label: "元素周期表",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="9" ry="4" strokeWidth={2} />
        <ellipse cx="12" cy="12" rx="9" ry="4" strokeWidth={2} transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="4" strokeWidth={2} transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    href: "/planets",
    label: "太陽系",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="5" strokeWidth={2} />
        <ellipse cx="12" cy="12" rx="10" ry="3" strokeWidth={2} transform="rotate(-20 12 12)" />
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
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-teal-200 hover:text-white hover:bg-teal-700 transition-colors"
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}

          {/* ランキングリンク */}
          <Link
            href="/ranking"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-teal-200 hover:text-white hover:bg-teal-700 transition-colors"
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
          {links.map((link) => (
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
