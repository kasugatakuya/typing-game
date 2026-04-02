import Link from "next/link";

export default function JapanMap() {
  const regions = [
    {
      id: "all",
      name: "日本全国",
      description: "全47都道府県",
      available: true,
    },
    {
      id: "hokkaido",
      name: "北海道地方",
      description: "北海道（全1問）",
      available: true,
    },
    {
      id: "tohoku",
      name: "東北地方",
      description: "青森、岩手、宮城など（全6問）",
      available: true,
    },
    {
      id: "kanto",
      name: "関東地方",
      description: "東京、神奈川、千葉など（全7問）",
      available: true,
    },
    {
      id: "chubu",
      name: "中部地方",
      description: "愛知、新潟、長野など（全9問）",
      available: true,
    },
    {
      id: "kinki",
      name: "近畿地方",
      description: "大阪、京都、兵庫など（全7問）",
      available: true,
    },
    {
      id: "chugoku",
      name: "中国地方",
      description: "広島、岡山、山口など（全5問）",
      available: true,
    },
    {
      id: "shikoku",
      name: "四国地方",
      description: "愛媛、香川、高知など（全4問）",
      available: true,
    },
    {
      id: "kyushu",
      name: "九州・沖縄地方",
      description: "福岡、熊本、沖縄など（全8問）",
      available: true,
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 pt-16 lg:pt-20 overflow-auto mt-7">
      <div className="container mx-auto px-4">
        {/* ヘッダーセクション */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            日本地図タイピング
          </h1>
          <p className="text-base text-gray-600">
            地図上の都道府県名をタイピングしよう！
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
                  region.id === "all"
                    ? "bg-gradient-to-r from-green-400 to-green-500"
                    : region.available
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
                      href={`/japanmap/${region.id}`}
                      className={`px-5 py-1.5 text-sm rounded-full text-white font-medium transition-all duration-200 hover:shadow-md ${
                        region.id === "all"
                          ? "bg-gradient-to-r from-green-300 to-green-400 hover:from-green-400 hover:to-green-500"
                          : "bg-gradient-to-r from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500"
                      }`}
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
