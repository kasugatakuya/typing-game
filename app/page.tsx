export default function Home() {
  const gameCategories = [
    {
      title: "世界の国 タイピング 練習",
      baseUrl: "/country/game",
      modes: [
        { name: "かんたん", path: "/easy" },
        { name: "ふつう", path: "/normal" },
        { name: "むずかしい", path: "/hard" },
      ],
    },
    {
      title: "世界の首都 タイピング 練習",
      baseUrl: "/capitals/game",
      modes: [
        { name: "かんたん", path: "/easy" },
        { name: "ふつう", path: "/normal" },
        { name: "むずかしい", path: "/hard" },
      ],
    },
    {
      title: "世界遺産 タイピング 練習",
      baseUrl: "/heritage/game",
      modes: [
        { name: "かんたん", path: "/easy" },
        { name: "ふつう", path: "/normal" },
        { name: "むずかしい", path: "/hard" },
      ],
    },
    {
      title: "都道府県 タイピング 練習",
      baseUrl: "/prefectures/game",
      modes: [
        { name: "かんたん", path: "/easy" },
        { name: "ふつう", path: "/normal" },
        { name: "タイムトライアル", path: "/time-trial" },
      ],
    },
    {
      title: "県庁所在地 タイピング 練習",
      baseUrl: "/prefecturalCapitals/game",
      modes: [
        { name: "かんたん", path: "/easy" },
        { name: "ふつう", path: "/normal" },
        { name: "タイムトライアル", path: "/time-trial" },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダーセクション */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            タイピングで学ぶ地理
          </h1>
          <p className="text-xl text-gray-600 mb-3">
            楽しくゲーム感覚で遊ぼう!
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            国旗、主要国の首都、主要国の世界遺産、都道府県、県庁所在地が出てきます
          </p>
        </div>

        {/* ゲームカテゴリーセクション */}
        <div className="grid gap-8 md:gap-12">
          {gameCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <div className="bg-gradient-to-r from-red-400 to-red-500 p-4">
                <h2 className="text-2xl font-bold text-white text-center">
                  {category.title}
                </h2>
              </div>
              <div className="p-6">
                <p className="text-center text-gray-600 mb-6">
                  好きなコースを選んでください
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {category.modes.map((mode, modeIndex) => (
                    <a
                      key={modeIndex}
                      href={category.baseUrl + mode.path}
                      className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-orange-300 to-orange-400 text-white font-medium transition-all duration-200 hover:from-orange-400 hover:to-orange-500 hover:shadow-md transform hover:-translate-y-1 active:translate-y-0"
                    >
                      {mode.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 将来的なユーザー登録セクション */}
        {/* <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <p className="text-gray-700 mb-4">
            ユーザー登録する事でゲームの記録をつける事が出来ます。
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-700">
              新規ユーザー登録
            </button>
            <button className="px-6 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-700">
              Googleでユーザー登録
            </button>
          </div>
        </div> */}
      </div>
    </main>
  );
}
