import Link from "next/link";

export default function WorldMap() {
  const regions = [
    {
      id: "north-america",
      name: "北アメリカ",
      description: "カナダ、アメリカなど（全23問）",
      available: true,
    },
    {
      id: "south-america",
      name: "南アメリカ",
      description: "ブラジル、アルゼンチンなど（全12問）",
      available: true,
    },
    {
      id: "western-europe",
      name: "西ヨーロッパ",
      description: "イギリス、フランスなど（全17問）",
      available: true,
    },
    {
      id: "eastern-europe",
      name: "東ヨーロッパ",
      description: "ポーランド、ウクライナなど（全18問）",
      available: true,
    },
    {
      id: "southern-europe",
      name: "ロシア・その他",
      description: "ロシア、キプロスなど（全5問）",
      available: true,
    },
    {
      id: "east-asia",
      name: "東・東南・南アジア",
      description: "日本、中国など（全24問）",
      available: true,
    },
    {
      id: "west-asia",
      name: "西アジア（中東）",
      description: "トルコ、イランなど（全15問）",
      available: true,
    },
    {
      id: "central-asia",
      name: "中央アジア・コーカサス",
      description: "カザフスタンなど（全8問）",
      available: true,
    },
    {
      id: "oceania",
      name: "オセアニア",
      description: "オーストラリアなど（全14問）",
      available: true,
    },
    {
      id: "north-africa",
      name: "北アフリカ",
      description: "エジプト、モロッコなど（全6問）",
      available: true,
    },
    {
      id: "west-africa",
      name: "西アフリカ",
      description: "マリ、ギニアなど（全11問）",
      available: true,
    },
    {
      id: "sub-saharan-africa",
      name: "サブサハラ・アフリカ",
      description: "ケニア、ナイジェリアなど（全33問）",
      available: true,
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 pt-16 lg:pt-20 overflow-auto mt-7">
      <div className="container mx-auto px-4">
        {/* ヘッダーセクション */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            世界地図タイピング
          </h1>
          <p className="text-base text-gray-600">
            地図上の国の名前をタイピングしよう！
          </p>
        </div>

        {/* 地域選択グリッド */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {regions.map((region) => (
            <div
              key={region.id}
              className={`bg-white rounded-lg shadow overflow-hidden transition-transform flex flex-col ${
                region.available
                  ? "hover:scale-[1.02] cursor-pointer"
                  : "opacity-60"
              }`}
            >
              <div
                className={`py-1 px-2 ${
                  region.available
                    ? "bg-gradient-to-r from-blue-400 to-blue-500"
                    : "bg-gradient-to-r from-gray-400 to-gray-500"
                }`}
              >
                <h2 className="text-lg font-bold text-white text-center">
                  {region.name}
                </h2>
              </div>
              <div className="p-2 flex flex-col flex-grow">
                <p className="text-gray-600 text-sm mb-3 text-center flex-grow">
                  {region.description}
                </p>
                {region.available ? (
                  <div className="flex justify-center">
                    <Link
                      href={`/worldmap/${region.id}`}
                      className="px-5 py-1.5 text-sm rounded-full bg-gradient-to-r from-blue-300 to-blue-400 text-white font-medium transition-all duration-200 hover:from-blue-400 hover:to-blue-500 hover:shadow-md"
                    >
                      プレイする
                    </Link>
                  </div>
                ) : (
                  <p className="text-center text-gray-400 text-xs">
                    Coming Soon...
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ホームに戻るリンク */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-block px-5 py-1.5 text-sm rounded-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-medium transition-all duration-200 hover:from-gray-500 hover:to-gray-600 hover:shadow-md"
          >
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
