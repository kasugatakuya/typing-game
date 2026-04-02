import Link from "next/link";

export default function WorldMap() {
  const regions = [
    {
      id: "north-america",
      name: "北アメリカ",
      description: "カナダ、アメリカ、メキシコ、中米、カリブ海諸国（全23問）",
      available: true,
    },
    {
      id: "south-america",
      name: "南アメリカ",
      description: "ブラジル、アルゼンチン、チリなど（全12問）",
      available: true,
    },
    {
      id: "europe",
      name: "ヨーロッパ",
      description: "イギリス、フランス、ドイツなど（全35問）",
      available: true,
    },
    {
      id: "asia",
      name: "アジア",
      description: "日本、中国、韓国、インドなど",
      available: false,
    },
    {
      id: "oceania",
      name: "オセアニア",
      description: "オーストラリア、ニュージーランドなど（全14問）",
      available: true,
    },
    {
      id: "africa",
      name: "アフリカ",
      description: "エジプト、南アフリカ、ケニアなど",
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 mt-11 lg:mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダーセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            世界地図タイピング
          </h1>
          <p className="text-xl text-gray-600 mb-3">
            地図上でハイライトされた国の名前をタイピングしよう！
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            地域を選んでプレイできます。地図を見ながら国の位置と名前を覚えよう！
          </p>
        </div>

        {/* 地域選択グリッド */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {regions.map((region) => (
            <div
              key={region.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform flex flex-col ${
                region.available
                  ? "hover:scale-105 cursor-pointer"
                  : "opacity-60"
              }`}
            >
              <div
                className={`p-4 ${
                  region.available
                    ? "bg-gradient-to-r from-blue-400 to-blue-500"
                    : "bg-gradient-to-r from-gray-400 to-gray-500"
                }`}
              >
                <h2 className="text-xl font-bold text-white text-center">
                  {region.name}
                </h2>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-gray-600 text-sm mb-4 text-center flex-grow">
                  {region.description}
                </p>
                {region.available ? (
                  <div className="flex justify-center">
                    <Link
                      href={`/worldmap/${region.id}`}
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-300 to-blue-400 text-white font-medium transition-all duration-200 hover:from-blue-400 hover:to-blue-500 hover:shadow-md"
                    >
                      プレイする
                    </Link>
                  </div>
                ) : (
                  <p className="text-center text-gray-400 text-sm">
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
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-medium transition-all duration-200 hover:from-gray-500 hover:to-gray-600 hover:shadow-md"
          >
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
