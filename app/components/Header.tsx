"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  {
    href: "/worldmap",
    label: "世界地図",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: "/japanmap",
    label: "日本地図",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-800 shadow-lg">
      <nav
        className="flex items-center px-6 py-2 lg:px-10 lg:py-3 justify-between max-w-7xl mx-auto"
        aria-label="Global"
      >
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="bg-slate-700 rounded-lg p-1.5">
            <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-white">
            地理タイピング
          </span>
        </Link>

        {/* デスクトップメニュー */}
        <div className="hidden lg:flex lg:gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* ハンバーガーメニューボタン */}
        <button
          className="lg:hidden relative w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
          onClick={toggleMenu}
          aria-label="メニュー"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-4">
            <span
              className={`absolute top-0 left-0 w-full h-0.5 bg-slate-300 rounded-full transition-all duration-300 ${
                isMenuOpen
                  ? "rotate-45 translate-y-1.75"
                  : "rotate-0 translate-y-0"
              }`}
            />
            <span
              className={`absolute top-1/2 left-0 w-full h-0.5 bg-slate-300 rounded-full -translate-y-1/2 transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-slate-300 rounded-full transition-all duration-300 ${
                isMenuOpen
                  ? "-rotate-45 -translate-y-1.75"
                  : "rotate-0 translate-y-0"
              }`}
            />
          </div>
        </button>

        {/* モバイルメニュー */}
        <div
          className={`lg:hidden fixed left-0 right-0 bg-slate-800 border-t border-slate-700 transition-all duration-300 ${
            isMenuOpen ? "top-16 opacity-100" : "-top-full opacity-0"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-6 py-4 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border-b border-slate-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
