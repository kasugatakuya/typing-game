/**
 * ローマ字入力ゆれ対応のマッチャー
 *
 * データの正規表記（ヘボン式・かな準拠）に対して、一般的な別表記
 * （si/shi, hu/fu, ti/chi, tu/tsu, zi/ji, sya/sha, tya/cha, zya/ja/jya など）や
 * 「ん」の n/nn ゆれを許容して入力を判定する。
 *
 * 正規表記の「ん」の書き方の前提:
 * - 母音・y・な行の前では "nn"（例: ぎしんあんき → gishinnanki）
 * - それ以外の子音の前・語末では "n"（例: しんじゅく → shinjuku）
 */

export interface RomajiMatch {
  status: "invalid" | "prefix" | "complete";
  /** タイプ済み部分 + 選択中の表記に沿った残りの全体表示 */
  display: string;
}

/** 入力ゆれグループ（各グループ内は相互に許容。表示は正規表記側を優先） */
const ALT_GROUPS: string[][] = [
  ["sha", "sya"],
  ["shu", "syu"],
  ["sho", "syo"],
  ["shi", "si"],
  ["cha", "tya"],
  ["chu", "tyu"],
  ["cho", "tyo"],
  ["chi", "ti"],
  ["tsu", "tu"],
  ["fu", "hu"],
  ["ja", "jya", "zya"],
  ["ju", "jyu", "zyu"],
  ["jo", "jyo", "zyo"],
  ["ji", "zi"],
];

const VOWELS = "aiueo";

interface Segment {
  /** 許容される表記のリスト。先頭が表示に使う優先表記 */
  alts: string[];
}

/** 正規表記のローマ字をセグメント（かな1文字相当の単位）に分解する */
function parseSegments(romaji: string): Segment[] {
  const segments: Segment[] = [];
  let i = 0;

  while (i < romaji.length) {
    const char = romaji[i];
    const next = romaji[i + 1];

    if (char === "n") {
      if (next === "n") {
        // 正規表記 "nn" = ん（母音・y・な行の前なので nn 必須）
        segments.push({ alts: ["nn"] });
        i += 2;
        continue;
      }
      if (next === undefined || (!VOWELS.includes(next) && next !== "y")) {
        // 子音の前・語末の ん: n / nn どちらでも可
        segments.push({ alts: ["n", "nn"] });
        i += 1;
        continue;
      }
      // na, ni, nya などの通常の「な行」は下の通常処理へ
    }

    // 入力ゆれグループに一致するか（長い表記から優先して照合）
    const rest = romaji.slice(i);
    let matched: Segment | null = null;
    for (const group of ALT_GROUPS) {
      const form = group.find((f) => rest.startsWith(f));
      if (form) {
        // データで使われている表記を表示優先にする
        matched = { alts: [form, ...group.filter((f) => f !== form)] };
        break;
      }
    }
    if (matched) {
      segments.push(matched);
      i += matched.alts[0].length;
      continue;
    }

    segments.push({ alts: [char] });
    i += 1;
  }

  return segments;
}

function matchSegments(
  segments: Segment[],
  segIndex: number,
  input: string,
  pos: number,
): RomajiMatch | null {
  if (pos === input.length) {
    const remaining = segments
      .slice(segIndex)
      .map((s) => s.alts[0])
      .join("");
    return {
      status: segIndex === segments.length ? "complete" : "prefix",
      display: remaining,
    };
  }

  // 入力が残っているのにセグメントを消費し尽くした
  if (segIndex === segments.length) return null;

  const restInput = input.slice(pos);
  for (const alt of segments[segIndex].alts) {
    if (restInput.startsWith(alt)) {
      const sub = matchSegments(segments, segIndex + 1, input, pos + alt.length);
      if (sub) {
        return { status: sub.status, display: alt + sub.display };
      }
    } else if (alt.startsWith(restInput)) {
      // 入力がこの表記の途中まで進んでいる
      const remaining = segments
        .slice(segIndex + 1)
        .map((s) => s.alts[0])
        .join("");
      return { status: "prefix", display: alt + remaining };
    }
  }

  return null;
}

/**
 * 入力が正規表記（+入力ゆれ）の有効なプレフィックス/完全一致かを判定する。
 * display には「入力済み文字列 + 残りの表示用ローマ字」を返す。
 */
export function matchRomaji(canonical: string, input: string): RomajiMatch {
  const result = matchSegments(parseSegments(canonical), 0, input, 0);
  return result ?? { status: "invalid", display: canonical };
}
