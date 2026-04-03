"use client";

import Link from "next/link";
import { useState } from "react";

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
          <span className="text-lg font-semibold text-white">
            雑学タイピング
          </span>
        </Link>

        <div className="hidden lg:flex lg:gap-1">
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
              className="flex items-center gap-3 px-6 py-4 text-teal-200 hover:text-white hover:bg-teal-700 transition-colors border-b border-teal-700"
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
