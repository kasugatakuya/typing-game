import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "雑学タイピング | 楽しく学べるタイピングゲーム",
  description:
    "元素周期表、山手線、星座、干支、七福神をタイピングで覚えよう！楽しみながら雑学とタイピングスキルが身につきます。",
};

// SVGアイコンコンポーネント
const TrainIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    <circle cx="12" cy="12" r="8" strokeWidth={1.5} />
    <circle cx="8" cy="17" r="1.5" fill="currentColor" />
    <circle cx="16" cy="17" r="1.5" fill="currentColor" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const ZodiacIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18M3 12h18M5.64 5.64l12.72 12.72M18.36 5.64L5.64 18.36" />
  </svg>
);

const ShrineIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M5 21V10l7-7 7 7v11M9 21v-6h6v6" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 10h20" />
  </svg>
);

const AtomIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <ellipse cx="12" cy="12" rx="9" ry="4" strokeWidth={1.5} />
    <ellipse cx="12" cy="12" rx="9" ry="4" strokeWidth={1.5} transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="4" strokeWidth={1.5} transform="rotate(120 12 12)" />
  </svg>
);

export default function OtherTypingHome() {
  const categories = [
    {
      id: "yamanote",
      title: "山手線",
      description: "30駅をぐるっと一周",
      icon: <TrainIcon />,
      color: "from-green-500 to-emerald-500",
      count: 30,
    },
    {
      id: "constellation",
      title: "星座",
      description: "12星座と88星座",
      icon: <StarIcon />,
      color: "from-yellow-500 to-orange-500",
      count: 88,
    },
    {
      id: "eto",
      title: "干支",
      description: "十二支をマスター",
      icon: <ZodiacIcon />,
      color: "from-red-500 to-rose-500",
      count: 12,
    },
    {
      id: "shichifukujin",
      title: "七福神",
      description: "7柱の神様を覚えよう",
      icon: <ShrineIcon />,
      color: "from-amber-500 to-yellow-500",
      count: 7,
    },
    {
      id: "periodic-table",
      title: "元素周期表",
      description: "118種類の元素をタイピング",
      icon: <AtomIcon />,
      color: "from-blue-500 to-indigo-500",
      count: 118,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 to-slate-100 py-12 pt-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            雑学タイピング
          </h1>
          <p className="text-gray-600 text-lg">
            楽しく学んで、タイピングスキルも向上！
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className="group block"
            >
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative p-6">
                  <div className="flex justify-center mb-4 text-gray-600 group-hover:text-white transition-colors">
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 text-center mb-2 group-hover:text-white transition-colors">
                    {category.title}
                  </h2>
                  <p className="text-gray-500 text-center text-sm mb-2 group-hover:text-white/80 transition-colors">
                    {category.description}
                  </p>
                  <p className="text-gray-400 text-center text-xs group-hover:text-white/70 transition-colors">
                    全{category.count}問
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-full bg-slate-600 text-white font-medium hover:bg-slate-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            地理タイピングもチェック！
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
          <p className="text-gray-500 text-sm mt-2">世界地図・日本地図</p>
        </div>
      </div>
    </div>
  );
}
