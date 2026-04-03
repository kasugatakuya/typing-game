import Link from "next/link";

const links = [
  { href: "/worldmap", label: "世界地図" },
  { href: "/japanmap", label: "日本地図" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-800">
      <div className="text-center py-8">
        <p className="text-slate-500 text-sm">
          © 2024-{new Date().getFullYear()} 地理タイピング
        </p>
      </div>
    </footer>
  );
}
