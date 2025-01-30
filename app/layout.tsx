import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "地理タイピング",
  description:
    "地理タイピングは、タイピング練習をしながら地理を学ぶことができます。",
  keywords:
    "地理タイピング, タイピング, ゲーム, 人気, 国, 都道府県, 首都, 県庁所在地, 世界遺産, 国旗, 地理, 学習, 地球, オンライン, 無料, 練習",

  metadataBase: new URL("https://typing-game-rho-weld.vercel.app"),

  openGraph: {
    title: "地理タイピング",
    description:
      "地理タイピングは、タイピング練習をしながら地理を学ぶことができます。",
    type: "website",
    siteName: "地理タイピング", // これを追加
    url: "https://typing-game-rho-weld.vercel.app", // これを追加
  },

  alternates: {
    canonical: "https://typing-game-rho-weld.vercel.app",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: "/earth.png",
  },

  // verification を追加（Google Search Consoleを使用している場合）
  // Google Search Console の設定→所有権の確認→HTMLタグのコードのcontent属性の値を指定
  verification: {
    google: "r4vs5K6kyRpFbT2eQ3xlFxlQbUmRrk_8z6irkNv4HmM",
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
