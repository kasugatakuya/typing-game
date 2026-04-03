import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const gameCategories = [
    {
      title: "世界地図タイピング",
      baseUrl: "/worldmap",
      text: "地図上の国名と首都をタイピングしよう！",
      image: "/earth-map.png",
      gradient: "from-blue-500 to-cyan-400",
      hoverGradient: "hover:from-blue-600 hover:to-cyan-500",
      features: ["国名", "首都"],
    },
    {
      title: "日本地図タイピング",
      baseUrl: "/japanmap",
      text: "地図上の都道府県や県の情報をタイピングしよう！",
      image: "/japan-map.png",
      gradient: "from-rose-500 to-orange-400",
      hoverGradient: "hover:from-rose-600 hover:to-orange-500",
      features: ["都道府県", "県庁所在地", "県鳥", "県花", "県木"],
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 py-16 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダーセクション */}
        <div className="text-center mb-16 flex items-center justify-center">
          <div>
            <Link href="/worldmap">
              <Image
                width={200}
                height={200}
                src="/earth-map.png"
                alt="地球"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </Link>
          </div>
          <div className="mx-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              タイピングで学ぶ地理
            </h1>
            <p className="text-xl text-gray-600 mb-3">
              楽しくゲーム感覚で遊ぼう!
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              国名・首都、都道府県・県庁所在地・県鳥・県花・県木をタイピングで学ぼう
            </p>
          </div>
          <div>
            <Link href="/japanmap">
              <Image
                width={200}
                height={200}
                src="/japan-map.png"
                alt="日本地図"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </Link>
          </div>
        </div>

        {/* ゲームカテゴリーセクション */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {gameCategories.map((category, index) => (
            <Link key={index} href={category.baseUrl} className="group block">
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                {/* グラデーション背景 */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* カード内容 */}
                <div className="relative p-6">
                  {/* 画像 */}
                  <div className="flex justify-center mb-4">
                    <div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                  </div>

                  {/* タイトル */}
                  <h2 className="text-xl font-bold text-gray-800 text-center mb-2 group-hover:text-white transition-colors duration-300">
                    {category.title}
                  </h2>

                  {/* 説明 */}
                  <p className="text-sm text-gray-600 text-center mb-4 group-hover:text-white/90 transition-colors duration-300">
                    {category.text}
                  </p>

                  {/* 機能タグ */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {category.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 group-hover:bg-white/20 group-hover:text-white transition-colors duration-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
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
