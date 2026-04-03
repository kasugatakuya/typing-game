import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "雑学タイピング | 楽しく学べるタイピングゲーム",
  description:
    "元素周期表、山手線、星座、干支、七福神をタイピングで覚えよう！楽しみながら雑学とタイピングスキルが身につきます。",
};

export default function OtherTypingHome() {
  const categories = [
    {
      id: "periodic-table",
      title: "元素周期表",
      description: "118種類の元素をタイピング",
      icon: "⚛️",
      color: "from-blue-500 to-indigo-500",
      count: 118,
    },
    {
      id: "yamanote",
      title: "山手線",
      description: "30駅をぐるっと一周",
      icon: "🚃",
      color: "from-green-500 to-emerald-500",
      count: 30,
    },
    {
      id: "constellation",
      title: "星座",
      description: "12星座と88星座",
      icon: "⭐",
      color: "from-yellow-500 to-orange-500",
      count: 88,
    },
    {
      id: "eto",
      title: "干支",
      description: "十二支をマスター",
      icon: "🐉",
      color: "from-red-500 to-rose-500",
      count: 12,
    },
    {
      id: "shichifukujin",
      title: "七福神",
      description: "7柱の神様を覚えよう",
      icon: "🎍",
      color: "from-amber-500 to-yellow-500",
      count: 7,
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
                  <div className="text-5xl mb-4 text-center">
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
            <span className="mr-2">🌍</span>
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
          <p className="text-gray-500 text-sm mt-2">
            世界地図・日本地図
          </p>
        </div>
      </div>
    </div>
  );
}
