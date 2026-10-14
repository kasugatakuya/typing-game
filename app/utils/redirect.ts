/**
 * リダイレクト先として安全なサイト内パスだけを許可する。
 * 外部URL（https://evil.com）やプロトコル相対URL（//evil.com）、
 * バックスラッシュによるすり抜け（/\evil.com）はすべて "/" に落とす。
 */
export function safeRedirectPath(
  value: string | null | undefined,
  fallback = "/",
): string {
  if (!value) return fallback;
  if (!value.startsWith("/")) return fallback;
  if (value.startsWith("//") || value.startsWith("/\\")) return fallback;
  if (/[\r\n]/.test(value)) return fallback;
  return value;
}
