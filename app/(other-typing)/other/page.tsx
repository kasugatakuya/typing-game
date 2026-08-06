import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "雑学タイピング | 楽しく学べるタイピングゲーム",
  description:
    "元素周期表、山手線、星座、干支、七福神をタイピングで覚えよう！楽しみながら雑学とタイピングスキルが身につきます。",
};

// SVGアイコンコンポーネント
const TrainIcon = () => (
  <svg
    className="w-9 h-9"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
    <circle cx="12" cy="12" r="8" strokeWidth={1.5} />
    <circle cx="8" cy="17" r="1.5" fill="currentColor" />
    <circle cx="16" cy="17" r="1.5" fill="currentColor" />
  </svg>
);

const StarIcon = () => (
  <svg
    className="w-9 h-9"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const ZodiacIcon = () => (
  <svg
    className="w-9 h-9"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 3v18M3 12h18M5.64 5.64l12.72 12.72M18.36 5.64L5.64 18.36"
    />
  </svg>
);

const ShrineIcon = () => (
  <svg
    className="w-9 h-9"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 21h18M5 21V10l7-7 7 7v11M9 21v-6h6v6"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2 10h20"
    />
  </svg>
);

const AtomIcon = () => (
  <svg
    className="w-9 h-9"
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

const PlanetIcon = () => (
  <svg
    className="w-9 h-9"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="5" strokeWidth={1.5} />
    <ellipse
      cx="12"
      cy="12"
      rx="10"
      ry="3"
      strokeWidth={1.5}
      transform="rotate(-20 12 12)"
    />
  </svg>
);

const BookIcon = () => (
  <svg
    className="w-9 h-9"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const SpeechIcon = () => (
  <svg
    className="w-9 h-9"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const BrushIcon = () => (
  <svg
    className="w-9 h-9"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
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
    {
      id: "planets",
      title: "太陽系",
      description: "8つの惑星をマスター",
      icon: <PlanetIcon />,
      color: "from-purple-500 to-violet-500",
      count: 8,
    },
    {
      id: "yojijukugo",
      title: "四字熟語",
      description: "意味と一緒に覚えよう",
      icon: <BookIcon />,
      color: "from-indigo-500 to-blue-500",
      count: 30,
    },
    {
      id: "kotowaza",
      title: "ことわざ",
      description: "有名なことわざをマスター",
      icon: <SpeechIcon />,
      color: "from-orange-500 to-amber-500",
      count: 30,
    },
    {
      id: "nandoku",
      title: "難読漢字",
      description: "読めそうで読めない漢字",
      icon: <BrushIcon />,
      color: "from-purple-500 to-fuchsia-500",
      count: 30,
    },
  ];

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-linear-to-b from-teal-50 to-slate-100 pt-22 md:pt-26 pb-4 flex flex-col">
      <div className="container mx-auto px-4 flex-1 flex flex-col md:min-h-0">
        <div className="text-center shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            雑学タイピング
          </h1>
          <p className="text-gray-600 text-sm">
            楽しく学んで、タイピングスキルも向上！
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto w-full">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className="group block"
            >
              <div className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative px-4 py-4 flex flex-col items-center">
                  <div className="text-gray-600 group-hover:text-white transition-colors mb-1">
                    {category.icon}
                  </div>
                  <h2 className="text-base font-bold text-gray-800 text-center group-hover:text-white transition-colors">
                    {category.title}
                  </h2>
                  <p className="text-gray-500 text-center text-xs group-hover:text-white/80 transition-colors">
                    {category.description}
                  </p>
                  <p className="text-gray-400 text-center text-[11px] group-hover:text-white/70 transition-colors">
                    全{category.count}問
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 mb-6 shrink-0">
          <Link
            href="/"
            className="inline-flex items-center px-5 py-2 text-sm rounded-full bg-slate-600 text-white font-medium hover:bg-slate-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">
              <svg
                className="w-4 h-4"
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
          <p className="text-gray-500 text-xs mt-1">世界地図・日本地図</p>
        </div>
      </div>
    </div>
  );
}
