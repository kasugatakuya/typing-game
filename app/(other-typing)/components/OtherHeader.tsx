"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/periodic-table", label: "元素周期表" },
  { href: "/yamanote", label: "山手線" },
  { href: "/constellation", label: "星座" },
  { href: "/eto", label: "干支" },
  { href: "/shichifukujin", label: "七福神" },
];

export default function OtherHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="bg-teal-700 rounded-lg p-1.5">
            <svg
              className="w-6 h-6 text-teal-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold text-white">
            雑学タイピング
          </span>
        </Link>

        <div className="hidden lg:flex lg:gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg text-teal-200 hover:text-white hover:bg-teal-700 transition-colors font-medium text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="lg:hidden relative w-10 h-10 rounded-lg bg-teal-700 hover:bg-teal-600 transition-colors"
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

        <div
          className={`lg:hidden fixed left-0 right-0 bg-teal-800 border-t border-teal-700 transition-all duration-300 ${
            isMenuOpen ? "top-14 opacity-100" : "-top-full opacity-0"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-6 py-4 text-teal-200 hover:text-white hover:bg-teal-700 transition-colors border-b border-teal-700 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
