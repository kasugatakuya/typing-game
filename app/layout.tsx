import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "タイピングゲーム | 地理タイピング",
  description:
    "タイピングスキルを向上させる無料オンラインタイピングゲーム。地理を学びながら楽しくタイピング練習ができます。",
  keywords:
    "タイピングゲーム, 地理タイピング, タイピング練習, タイピング, ゲーム, 無料タイピング, 人気, 国, 都道府県, 首都, 県庁所在地, 世界遺産, 国旗, 地理, 学習, 地球, オンライン, 無料, 練習",
  applicationName: "地理タイピング",
  authors: [{ name: "地理タイピング" }],
  creator: "地理タイピング",
  publisher: "地理タイピング",

  metadataBase: new URL("https://typing-game-rho-weld.vercel.app"),

  openGraph: {
    title: "タイピングゲーム | 地理タイピング",
    description:
      "タイピングスキルを向上させる無料オンラインタイピングゲーム。地理を学びながら楽しくタイピング練習ができます。",
    type: "website",
    siteName: "地理タイピング",
    url: "https://typing-game-rho-weld.vercel.app",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "地理タイピング",
                url: "https://typing-game-rho-weld.vercel.app",
              },
              {
                "@context": "https://schema.org",
                "@type": "Game",
                name: "地理タイピング",
                description:
                  "タイピングスキルを向上させる無料オンラインタイピングゲーム。地理を学びながら楽しくタイピング練習ができます。",
                url: "https://typing-game-rho-weld.vercel.app",
                publisher: {
                  "@type": "Organization",
                  name: "地理タイピング",
                },
              },
            ]),
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
