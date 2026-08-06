import Link from "next/link";

interface BackLinkProps {
  href: string;
  label?: string;
  /**
   * gray: 地図ゲームで使うグラデーションのピル型ボタン
   * white: その他ゲームで使う白背景 + 矢印アイコンのボタン
   */
  variant?: "gray" | "white";
  hoverColorClass?: string;
}

export function BackLink({
  href,
  label = "戻る",
  variant = "white",
  hoverColorClass = "hover:text-teal-600",
}: BackLinkProps) {
  if (variant === "gray") {
    return (
      <Link
        href={href}
        className="inline-block px-5 py-1.5 text-sm rounded-full bg-linear-to-r from-gray-400 to-gray-500 text-white font-medium transition-all duration-200 hover:from-gray-500 hover:to-gray-600 hover:shadow-md"
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center px-6 py-2 text-sm rounded-full bg-white text-gray-600 font-medium shadow-md hover:shadow-lg ${hoverColorClass} transition-all`}
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {label}
    </Link>
  );
}
