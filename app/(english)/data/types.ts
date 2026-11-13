export type EnglishSection = "words" | "phrases" | "grammar";

export interface EnglishItem {
  /** タイピングする英語（単語または文） */
  en: string;
  /** 日本語の意味 */
  ja: string;
  /** 補足（文法のポイントなど）。出題中に日本語の下に表示する */
  note?: string;
  /**
   * 学習記録のキー。デッキをまたいで出題する復習では、
   * 元のデッキの記録を更新するためにこの値を使う（通常は省略）
   */
  progressKey?: string;
}

/** 英単語のジャンル（レベル別・テーマ別） */
export type WordGenre =
  | "junior"
  | "high"
  | "toeic600"
  | "toeic730"
  | "toeic860"
  | "theme";

/** 英会話フレーズのジャンル */
export type PhraseGenre = "basic" | "native" | "business";

/** 英文法のジャンル */
export type GrammarGenre = "basic" | "toeic" | "conversation";

export type DeckGenre = WordGenre | PhraseGenre | GrammarGenre;

export interface GenreInfo {
  id: DeckGenre;
  label: string;
  description: string;
}

/** セクションごとのジャンル一覧。先頭が既定のタブになる */
export const SECTION_GENRES: Record<EnglishSection, GenreInfo[]> = {
  words: [
    {
      id: "junior",
      label: "中学英単語",
      description: "まず押さえたい基本の単語",
    },
    {
      id: "high",
      label: "高校英単語",
      description: "読解や入試でよく出る、一段上の単語",
    },
    {
      id: "toeic600",
      label: "TOEIC 600点",
      description: "オフィスや買い物・出張などの基本ビジネス単語",
    },
    {
      id: "toeic730",
      label: "TOEIC 730点",
      description: "契約・人事・経理などで使う中級ビジネス単語",
    },
    {
      id: "toeic860",
      label: "TOEIC 860点",
      description: "文書や長文で差がつく上級ビジネス単語",
    },
    {
      id: "theme",
      label: "テーマ別",
      description: "旅行・仕事・テクノロジーなど場面ごとの単語",
    },
  ],
  phrases: [
    {
      id: "basic",
      label: "基本フレーズ",
      description: "あいさつや買い物など、最初に覚えたい定番の会話文",
    },
    {
      id: "native",
      label: "ネイティブの日常会話",
      description: "雑談・相づち・句動詞など、実際の会話でよく使われる自然な表現",
    },
    {
      id: "business",
      label: "TOEIC・ビジネス",
      description: "電話・メール・会議・案内放送など、TOEIC頻出の場面と仕事で使う表現",
    },
  ],
  grammar: [
    {
      id: "basic",
      label: "基本文法",
      description: "be動詞から仮定法まで、文の形の基礎",
    },
    {
      id: "toeic",
      label: "TOEIC文法",
      description: "品詞・時制・前置詞と接続詞など、TOEICの文法問題で問われるポイント",
    },
    {
      id: "conversation",
      label: "会話で使う文法",
      description: "ていねいな依頼・提案・後悔など、話すときに役立つ文の形",
    },
  ],
};

export interface EnglishDeck {
  id: string;
  section: EnglishSection;
  /** 一覧ページのタブ分けに使うジャンル */
  genre: DeckGenre;
  title: string;
  description: string;
  /** 文法デッキの解説。開始前の画面に表示する */
  points?: string[];
  items: EnglishItem[];
}

/** 各セクションの一覧ページ・トップのカードに出す紹介文 */
export const SECTION_INTRO: Record<EnglishSection, string> = {
  words: "意味を見ながら打って覚え、意味だけを見て打って確認しよう。",
  phrases: "そのまま使える会話文を、文ごとタイピングして身につけよう。",
  grammar: "ポイントを読んでから例文を打ち、文の形を手で覚えよう。",
};

export const SECTION_LABELS: Record<EnglishSection, string> = {
  words: "英単語",
  phrases: "英会話フレーズ",
  grammar: "英文法",
};
