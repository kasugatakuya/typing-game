import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "タイピングゲーム",
  description:
    "タイピングゲームは、指定された文字列を入力するゲームです。指定された文字列を入力することで、スコアが加算されます。",
  keywords:
    "タイピングゲーム, タイピング, ゲーム, 人気, 国, 都道府県, 首都, 県庁所在地, 世界遺産, 国旗",
  openGraph: {
    title: "タイピングゲーム",
    description:
      "タイピングゲームは、指定された文字列を入力するゲームです。指定された文字列を入力することで、スコアが加算されます。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <header className="fixed top-0 w-full bg-black text-white z-10">
          <nav
            className="flex items-center px-6 py-2 lg:px-10 lg:py-5 justify-between"
            aria-label="Global"
          >
            <Link href="/" className="font-bold">
              <div className="lg:text-xl">地理タイピング</div>
            </Link>
            <div className="flex lg:gap-10 gap-3">
              <Link href="/country/game/normal" className="font-bold">
                <div className="lg:text-xl">国</div>
              </Link>
              <Link href="/capitals/game/normal" className="font-bold">
                <div className="lg:text-xl">首都</div>
              </Link>
              <Link href="/heritage/game/normal" className="font-bold">
                <div className="lg:text-xl">世界遺産</div>
              </Link>
              <Link href="/prefectures/game/normal" className="font-bold">
                <div className="lg:text-xl">都道府県</div>
              </Link>
              <Link
                href="/prefecturalCapitals/game/normal"
                className="font-bold"
              >
                <div className="lg:text-xl">県庁所在地</div>
              </Link>
            </div>
          </nav>
        </header>

        {children}

        <footer className="text-md py-8 text-center bg-black text-white">
          <p>© タイピングゲーム 2020-{new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  );
}
