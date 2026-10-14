import type { Metadata } from "next";

// page.tsx がクライアントコンポーネントのため、メタデータはここで定義する
export const metadata: Metadata = {
  title: "マイページ | 地理タイピング",
  description: "プレイ履歴と自己ベストを確認できるマイページです。",
  robots: { index: false, follow: false },
};

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
