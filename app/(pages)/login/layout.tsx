import type { Metadata } from "next";

// page.tsx がクライアントコンポーネントのため、メタデータはここで定義する
export const metadata: Metadata = {
  title: "ログイン | 地理タイピング",
  description: "ランキングに参加するためのログイン・新規登録ページです。",
  robots: { index: false, follow: true },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
