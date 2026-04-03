import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "星座タイピング | 雑学タイピング",
  description: "12星座と88星座をタイピングで覚えよう！",
};

// 12星座用アイコン（円形に十二分割）
const ZodiacIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18M3 12h18M5.64 5.64l12.72 12.72M18.36 5.64L5.64 18.36" />
  </svg>
);

// 88星座用アイコン（星）
const StarIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

export default function ConstellationSelectPage() {
  const modes = [
    {
      id: "zodiac",
      title: "12星座（黄道十二宮）",
      description: "誕生日で決まる12の星座",
      count: 12,
      icon: <ZodiacIcon />,
    },
    {
      id: "all",
      title: "88星座",
      description: "国際天文学連合が定めた全星座",
      count: 88,
      icon: <StarIcon />,
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
                  <div className="text-gray-600 group-hover:text-yellow-500 transition-colors">{mode.icon}</div>
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
