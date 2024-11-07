import Link from "next/link";
export default function Heritage() {
  return (
    <div className="h-screen">
      <main className="mt-32">
        <div className="text-center">ホーム</div>
      </main>
      <div className="text-center m-10">
        <div className="text-xl">楽しくゲーム感覚で遊ぼう!</div>
        <div>主要国の世界遺産が出てきます</div>
        <div className="text-3xl border bg-red-300 p-3">
          世界遺産 タイピング 練習
        </div>
        <div className="my-10">好きなコースを選んでください</div>

        <div className="my-5">
          <Link
            className="border rounded-full bg-orange-300 px-10 py-3"
            href="/heritage/game/easy"
          >
            かんたん
          </Link>
          <Link
            className="border rounded-full bg-orange-300 px-10 py-3"
            href="/heritage/game/normal"
          >
            ふつう
          </Link>
          <Link
            className="border rounded-full bg-orange-300 px-10 py-3"
            href="/heritage/game/hard"
          >
            むずかしい
          </Link>
        </div>

        {/* <div className="border bg-blue-300 pb-7">
          <div className="my-3">
            ユーザー登録する事でゲームの記録をつける事が出来ます。
          </div>
          <a className="border rounded-full bg-white px-10 py-3" href="/game">
            新規ユーザー登録
          </a>
          <a className="border rounded-full bg-white px-10 py-3" href="/game">
            Googleでユーザー登録
          </a>
        </div> */}
      </div>
    </div>
  );
}
