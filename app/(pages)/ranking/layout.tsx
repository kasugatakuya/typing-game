import type { Metadata } from "next";

// page.tsx がクライアントコンポーネントのため、メタデータはここで定義する
export const metadata: Metadata = {
  title: "ランキング | 地理タイピング",
  description:
    "地理タイピングの各ゲームのクリアタイムランキング。全期間・月間・週間・今日の順位を確認できます。",
};

export default function RankingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
