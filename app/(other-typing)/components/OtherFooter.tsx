import Link from "next/link";

export default function OtherFooter() {
  return (
    <footer className="bg-teal-800">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link
            href="/other"
            className="text-white font-semibold hover:opacity-80 transition-opacity"
          >
            雑学タイピング
          </Link>
          <Link
            href="/"
            className="text-teal-300 hover:text-white transition-colors text-sm"
          >
            地理タイピングへ
          </Link>
        </div>
        <div className="mt-6 pt-6 border-t border-teal-700 text-center">
          <p className="text-teal-400 text-sm">
            © 2024-{new Date().getFullYear()} 雑学タイピング
          </p>
        </div>
      </div>
    </footer>
  );
}
