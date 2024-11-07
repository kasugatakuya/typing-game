import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header";

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
        <Header />
        {children}
        <footer className="text-md py-8 text-center bg-black text-white">
          <p>© 地理タイピング 2023-{new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  );
}
