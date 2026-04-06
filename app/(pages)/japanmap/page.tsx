import Link from "next/link";

export default function JapanMap() {
  const regions = [
    {
      id: "all",
      name: "日本全国",
      description: "全47都道府県",
      isAll: true,
    },
    {
      id: "hokkaido-tohoku",
      name: "北海道・東北地方",
      description: "北海道、青森、岩手、宮城など（全7問）",
    },
    {
      id: "kanto",
      name: "関東地方",
      description: "東京、神奈川、千葉など（全7問）",
    },
    {
      id: "chubu",
      name: "中部地方",
      description: "愛知、新潟、長野など（全9問）",
    },
    {
      id: "kinki",
      name: "近畿地方",
      description: "大阪、京都、兵庫など（全7問）",
    },
    {
      id: "chugoku-shikoku",
      name: "中国・四国地方",
      description: "広島、岡山、愛媛、香川など（全9問）",
    },
    {
      id: "kyushu",
      name: "九州・沖縄地方",
      description: "福岡、熊本、沖縄など（全8問）",
    },
  ];

  const modesRow1 = [
    { key: "", label: "都道府県", color: "bg-rose-500 hover:bg-rose-600" },
    {
      key: "?mode=capital",
      label: "県庁所在地",
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  const modesRow2 = [
    {
      key: "?mode=bird",
      label: "県鳥",
      color: "bg-amber-500 hover:bg-amber-600",
    },
    {
      key: "?mode=flower",
      label: "県花",
      color: "bg-pink-500 hover:bg-pink-600",
    },
    {
      key: "?mode=tree",
      label: "県木",
      color: "bg-emerald-500 hover:bg-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-rose-50 to-orange-50 py-6 pt-20 lg:pt-23">
      <div className="container mx-auto px-4">
        {/* ヘッダーセクション */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            日本地図タイピング
          </h1>
          <p className="text-gray-600">
            地図上の都道府県・県庁所在地・県鳥・県花・県木をタイピングしよう！
          </p>
        </div>

        {/* 地域選択グリッド */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {regions.map((region) => (
            <div
              key={region.id}
              className={`group relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
                region.isAll ? "md:col-span-2 lg:col-span-3" : ""
              }`}
            >
              {/* ホバー時のグラデーション背景 */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  region.isAll
                    ? "bg-linear-to-br from-rose-500 via-orange-400 to-amber-400"
                    : "bg-linear-to-br from-rose-500 to-orange-400"
                }`}
              />

              {/* カード内容 */}
              <div className="relative p-3">
                {/* 地域名 */}
                <div className="flex items-center justify-center gap-2 mb-1">
                  {region.isAll && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-linear-to-r from-rose-500 to-orange-400 text-white group-hover:bg-white/20">
                      ALL
                    </span>
                  )}
                  <h2 className="text-lg font-bold text-gray-800 text-center group-hover:text-white transition-colors duration-300">
                    {region.name}
                  </h2>
                </div>

                {/* 説明 */}
                <p className="text-sm text-gray-500 text-center mb-4 group-hover:text-white/80 transition-colors duration-300">
                  {region.description}
                </p>

                {/* モード選択ボタン */}
                {region.isAll ? (
                  <div className="flex justify-center gap-2">
                    {[...modesRow1, ...modesRow2].map((mode) => (
                      <Link
                        key={mode.key}
                        href={`/japanmap/${region.id}${mode.key}`}
                        className={`px-3 py-1 text-xs rounded-full text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1 ${mode.color}`}
                      >
                        {mode.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-center gap-2">
                      {modesRow1.map((mode) => (
                        <Link
                          key={mode.key}
                          href={`/japanmap/${region.id}${mode.key}`}
                          className={`px-3 py-1 text-xs rounded-full text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1 ${mode.color}`}
                        >
                          {mode.label}
                        </Link>
                      ))}
                    </div>
                    <div className="flex justify-center gap-2">
                      {modesRow2.map((mode) => (
                        <Link
                          key={mode.key}
                          href={`/japanmap/${region.id}${mode.key}`}
                          className={`px-3 py-1 text-xs rounded-full text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1 ${mode.color}`}
                        >
                          {mode.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 世界遺産タイピング */}
        <div className="max-w-5xl mx-auto mt-4">
          <Link
            href="/japanmap/heritage"
            className="group block bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative">
              {/* ホバー時のグラデーション背景 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-amber-500 via-orange-400 to-yellow-400" />

              {/* カード内容 */}
              <div className="relative p-5">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-linear-to-r from-amber-500 to-orange-400 text-white group-hover:bg-white/20">
                    NEW
                  </span>
                  <h2 className="text-lg font-bold text-gray-800 text-center group-hover:text-white transition-colors duration-300">
                    日本の世界遺産タイピング
                  </h2>
                </div>
                <p className="text-sm text-gray-500 text-center group-hover:text-white/80 transition-colors duration-300">
                  日本のユネスコ世界遺産（全26問）
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* ホームに戻るリンク */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-2 text-sm rounded-full bg-white text-gray-600 font-medium shadow-md transition-all duration-200 hover:shadow-lg hover:text-rose-600"
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
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
