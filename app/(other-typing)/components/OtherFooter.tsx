import Link from "next/link";

export default function OtherFooter() {
  return (
    <footer className="bg-teal-800">
      <div className="text-center py-8">
        <p className="text-sm mb-3">
          <Link href="/" className="text-teal-200 hover:text-white">
            地理タイピング
          </Link>
          <span className="text-teal-400 mx-2">|</span>
          <Link href="/english" className="text-teal-200 hover:text-white">
            英語タイピング
          </Link>
        </p>
        <p className="text-teal-400 text-sm">
          © 2024-{new Date().getFullYear()} 雑学タイピング
        </p>
      </div>
    </footer>
  );
}
