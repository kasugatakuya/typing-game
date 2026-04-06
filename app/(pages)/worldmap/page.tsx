import Link from "next/link";

export default function WorldMap() {
  const regions = [
    {
      id: "north-america",
      name: "北アメリカ",
      description: "カナダ、アメリカなど",
      count: 23,
    },
    {
      id: "south-america",
      name: "南アメリカ",
      description: "ブラジル、アルゼンチンなど",
      count: 12,
    },
    {
      id: "western-europe",
      name: "西ヨーロッパ",
      description: "イギリス、フランスなど",
      count: 17,
    },
    {
      id: "eastern-europe",
      name: "東ヨーロッパ",
      description: "ポーランド、ウクライナなど",
      count: 18,
    },
    {
      id: "southern-europe",
      name: "ロシア・その他",
      description: "ロシア、キプロスなど",
      count: 5,
    },
    {
      id: "east-asia",
      name: "東・東南・南アジア",
      description: "日本、中国など",
      count: 24,
    },
    {
      id: "west-asia",
      name: "西アジア（中東）",
      description: "トルコ、イランなど",
      count: 15,
    },
    {
      id: "central-asia",
      name: "中央アジア・コーカサス",
      description: "カザフスタンなど",
      count: 8,
    },
    {
      id: "oceania",
      name: "オセアニア",
      description: "オーストラリアなど",
      count: 14,
    },
    {
      id: "north-africa",
      name: "北アフリカ",
      description: "エジプト、モロッコなど",
      count: 6,
    },
    {
      id: "west-africa",
      name: "西アフリカ",
      description: "マリ、ギニアなど",
      count: 11,
    },
    {
      id: "sub-saharan-africa",
      name: "サブサハラ・アフリカ",
      description: "ケニア、ナイジェリアなど",
      count: 33,
    },
  ];

  const modes = [
    { key: "", label: "国名", color: "bg-blue-500 hover:bg-blue-600" },
    {
      key: "?mode=capital",
      label: "首都",
      color: "bg-cyan-500 hover:bg-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-slate-100 py-6 pt-20 lg:pt-23">
      <div className="container mx-auto px-4">
        {/* ヘッダーセクション */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            世界地図タイピング
          </h1>
          <p className="text-gray-600">
            地図上の国名と首都をタイピングしよう！
          </p>
        </div>

        {/* 地域選択グリッド */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-5xl mx-auto">
          {regions.map((region) => (
            <div
              key={region.id}
              className="group relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {/* ホバー時のグラデーション背景 */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* カード内容 */}
              <div className="relative p-5 h-full flex flex-col">
                {/* 地域名 */}
                <h2 className="text-lg font-bold text-gray-800 text-center mb-1 group-hover:text-white transition-colors duration-300">
                  {region.name}
                </h2>

                {/* 説明 */}
                <div className="text-sm text-center mb-4 flex-1">
                  <p className="text-gray-500 group-hover:text-white/80 transition-colors duration-300">
                    {region.description}
                  </p>
                  <p className="text-gray-500 group-hover:text-white/80 transition-colors duration-300">
                    （全{region.count}問）
                  </p>
                </div>

                {/* モード選択ボタン */}
                <div className="flex justify-center gap-2">
                  {modes.map((mode) => (
                    <Link
                      key={mode.key}
                      href={`/worldmap/${region.id}${mode.key}`}
                      className={`px-5 py-1.5 text-sm rounded-full text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1 ${mode.color}`}
                    >
                      {mode.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ホームに戻るリンク */}
        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-2 text-sm rounded-full bg-white text-gray-600 font-medium shadow-md transition-all duration-200 hover:shadow-lg hover:text-blue-600"
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
