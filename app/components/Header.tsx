"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/worldmap", label: "世界地図" },
  { href: "/japanmap", label: "日本地図" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full bg-black text-white z-10">
      <nav
        className="flex items-center px-6 py-2 lg:px-10 lg:py-5 justify-between"
        aria-label="Global"
      >
        <Link href="/" className="font-bold">
          <div className="lg:text-xl">地理タイピング</div>
        </Link>

        {/* デスクトップメニュー */}
        <div className="hidden lg:flex lg:gap-10">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="font-bold">
              <div className="lg:text-xl">{link.label}</div>
            </Link>
          ))}
        </div>

        {/* ハンバーガーメニューボタン */}
        <button
          className="lg:hidden relative w-6 h-6 p-2"
          onClick={toggleMenu}
          aria-label="メニュー"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-4">
            <span
              className={`absolute top-0 left-0 w-full h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen
                  ? "rotate-45 translate-y-1.75"
                  : "rotate-0 translate-y-0"
              }`}
            />
            <span
              className={`absolute top-1/2 left-0 w-full h-0.5 bg-white -translate-y-1/2 transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen
                  ? "-rotate-45 -translate-y-1.75"
                  : "rotate-0 translate-y-0"
              }`}
            />
          </div>
        </button>

        {/* モバイルメニュー */}
        <div
          className={`lg:hidden fixed left-0 right-0 bg-black transition-all duration-300 ${
            isMenuOpen ? "top-13 opacity-100" : "-top-full opacity-0"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-6 py-3 font-bold hover:bg-gray-800"
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
