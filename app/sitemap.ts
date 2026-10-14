import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/utils/gameMetadata";

// 公開ページ一覧。ログインが必要な /login /mypage は含めない。
// ゲームページを追加したらここにも追記する。

const TOP_PAGES = ["/", "/worldmap", "/japanmap", "/other", "/ranking"];

const WORLD_REGIONS = [
  "north-america",
  "south-america",
  "western-europe",
  "eastern-europe",
  "southern-europe",
  "east-asia",
  "west-asia",
  "central-asia",
  "oceania",
  "north-africa",
  "west-africa",
  "sub-saharan-africa",
];

const JAPAN_REGIONS = [
  "all",
  "hokkaido-tohoku",
  "kanto",
  "chubu",
  "kinki",
  "chugoku-shikoku",
  "kyushu",
  "heritage",
];

const OTHER_PAGES = [
  "/yamanote",
  "/periodic-table",
  "/periodic-table/basic",
  "/periodic-table/transition",
  "/periodic-table/heavy",
  "/periodic-table/lanthanides",
  "/periodic-table/actinides",
  "/periodic-table/superheavy",
  "/periodic-table/all",
  "/constellation",
  "/constellation/zodiac",
  "/constellation/all",
  "/eto",
  "/planets",
  "/shichifukujin",
  "/yojijukugo",
  "/kotowaza",
  "/nandoku",
];

const STATIC_PAGES = ["/about"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  ): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    ...TOP_PAGES.map((p) => entry(p, p === "/" ? 1.0 : 0.9, "weekly")),
    ...WORLD_REGIONS.map((r) => entry(`/worldmap/${r}`, 0.8)),
    ...JAPAN_REGIONS.map((r) => entry(`/japanmap/${r}`, 0.8)),
    ...OTHER_PAGES.map((p) => entry(p, 0.7)),
    ...STATIC_PAGES.map((p) => entry(p, 0.3, "yearly")),
  ];
}
