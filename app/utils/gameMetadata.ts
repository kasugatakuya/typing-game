import type { Metadata } from "next";

export const SITE_NAME = "地理タイピング";
export const SITE_URL = "https://typing-game-rho-weld.vercel.app";

export type WorldMapMode = "country" | "capital";
export type JapanMapMode = "prefecture" | "capital" | "bird" | "flower" | "tree";

const WORLD_MODE_LABELS: Record<WorldMapMode, string> = {
  country: "国名",
  capital: "首都名",
};

export const JAPAN_MODE_LABELS: Record<JapanMapMode, string> = {
  prefecture: "都道府県名",
  capital: "県庁所在地",
  bird: "県鳥",
  flower: "県花",
  tree: "県木",
};

export function resolveWorldMapMode(mode: string | undefined): WorldMapMode {
  return mode === "capital" ? "capital" : "country";
}

export function resolveJapanMapMode(mode: string | undefined): JapanMapMode {
  return mode !== undefined && mode in JAPAN_MODE_LABELS
    ? (mode as JapanMapMode)
    : "prefecture";
}

/** 世界地図タイピングの地域ページ用メタデータ */
export function worldMapMetadata(
  regionName: string,
  mode: WorldMapMode,
  questionCount?: number,
): Metadata {
  const label = WORLD_MODE_LABELS[mode];
  const count = questionCount ? `全${questionCount}問。` : "";
  const title = `${regionName}の${label}タイピング | ${SITE_NAME}`;
  const description = `${regionName}の${label}を地図と国旗を見ながらタイピング練習。${count}無料で遊べる地理学習タイピングゲームです。`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: SITE_NAME },
  };
}

/** 日本地図タイピングの地域ページ用メタデータ */
export function japanMapMetadata(
  regionName: string,
  mode: JapanMapMode,
  questionCount?: number,
): Metadata {
  const label = JAPAN_MODE_LABELS[mode];
  const count = questionCount ? `全${questionCount}問。` : "";
  const title = `${regionName}の${label}タイピング | ${SITE_NAME}`;
  const description = `${regionName}の${label}を地図を見ながらタイピング練習。${count}無料で遊べる地理学習タイピングゲームです。`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: SITE_NAME },
  };
}
