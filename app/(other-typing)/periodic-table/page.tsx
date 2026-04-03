import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "元素周期表タイピング | 雑学タイピング",
  description: "元素周期表をカテゴリ別にタイピングで覚えよう！",
};

// アイコンコンポーネント
const AtomIcon = ({ className }: { className?: string }) => (
  <svg
    className={className || "w-10 h-10"}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <ellipse cx="12" cy="12" rx="9" ry="4" strokeWidth={1.5} />
    <ellipse
      cx="12"
      cy="12"
      rx="9"
      ry="4"
      strokeWidth={1.5}
      transform="rotate(60 12 12)"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="9"
      ry="4"
      strokeWidth={1.5}
      transform="rotate(120 12 12)"
    />
  </svg>
);

export default function PeriodicTableSelectPage() {
  const modes = [
    {
      id: "basic",
      title: "基本20元素",
      description: "水素〜カルシウム",
      count: 20,
    },
    {
      id: "transition",
      title: "遷移金属など",
      description: "21-54番元素",
      count: 34,
    },
    {
      id: "heavy",
      title: "重元素",
      description: "55-88番元素",
      count: 19,
    },
    {
      id: "lanthanides",
      title: "ランタノイド",
      description: "57-71番元素",
      count: 15,
    },
    {
      id: "actinides",
      title: "アクチノイド",
      description: "89-103番元素",
      count: 15,
    },
    {
      id: "superheavy",
      title: "超重元素",
      description: "104-118番元素",
      count: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 to-slate-100 pt-24 pb-8 mt-4">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            元素周期表タイピング
          </h1>
          <p className="text-gray-600">カテゴリを選んでください</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {modes.map((mode) => (
            <Link
              key={mode.id}
              href={`/periodic-table/${mode.id}`}
              className="block group"
            >
              <div className="bg-white rounded-xl shadow-lg p-5 transition-all hover:shadow-xl hover:-translate-y-1 h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="text-gray-600 group-hover:text-blue-500 transition-colors mb-3">
                    <AtomIcon className="w-10 h-10" />
                  </div>
                  <h2 className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {mode.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {mode.description}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">全{mode.count}問</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 全118元素 - フル幅 */}
        <Link href="/periodic-table/all" className="block group mb-6">
          <div className="bg-linear-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg p-5 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-center gap-5">
              <div className="text-white">
                <AtomIcon className="w-12 h-12" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-white">
                  全118元素に挑戦！
                </h2>
                <p className="text-white/80">全ての元素をマスターしよう</p>
              </div>
              <svg
                className="w-7 h-7 text-white/80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>

        <div className="text-center mt-10">
          <Link
            href="/other"
            className="inline-flex items-center px-5 py-1.5 text-sm rounded-full bg-white text-gray-600 font-medium shadow-md hover:shadow-lg hover:text-teal-600 transition-all"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
