import Link from "next/link";

export default function EnglishFooter() {
  return (
    <footer className="bg-indigo-800">
      <div className="text-center py-8">
        <p className="text-sm mb-3">
          <Link href="/" className="text-indigo-200 hover:text-white">
            地理タイピング
          </Link>
          <span className="text-indigo-400 mx-2">|</span>
          <Link href="/other" className="text-indigo-200 hover:text-white">
            雑学タイピング
          </Link>
          <span className="text-indigo-400 mx-2">|</span>
          <Link href="/ranking" className="text-indigo-200 hover:text-white">
            ランキング
          </Link>
        </p>
        <p className="text-indigo-400 text-sm">
          © 2024-{new Date().getFullYear()} 英語タイピング
        </p>
      </div>
    </footer>
  );
}
