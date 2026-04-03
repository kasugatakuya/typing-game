import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "星座タイピング | 雑学タイピング",
  description: "12星座と88星座をタイピングで覚えよう！",
};

export default function ConstellationSelectPage() {
  const modes = [
    {
      id: "zodiac",
      title: "12星座（黄道十二宮）",
      description: "誕生日で決まる12の星座",
      count: 12,
      icon: "♈",
    },
    {
      id: "all",
      title: "88星座",
      description: "国際天文学連合が定めた全星座",
      count: 88,
      icon: "⭐",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-slate-100 py-12 pt-24">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            星座タイピング
          </h1>
          <p className="text-gray-600">モードを選んでください</p>
        </div>

        <div className="space-y-4">
          {modes.map((mode) => (
            <Link
              key={mode.id}
              href={`/constellation/${mode.id}`}
              className="block group"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{mode.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-yellow-600 transition-colors">
                      {mode.title}
                    </h2>
                    <p className="text-gray-500 text-sm">{mode.description}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      全{mode.count}問
                    </p>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-yellow-500 transition-colors"
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
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/other"
            className="inline-flex items-center px-6 py-2 text-sm rounded-full bg-white text-gray-600 font-medium shadow-md hover:shadow-lg hover:text-teal-600 transition-all"
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
