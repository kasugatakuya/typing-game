export interface QuestionTimestamp {
  questionIndex: number;
  startTime: number;
  endTime: number;
  romajiLength: number;
  targetRomaji: string;
}

export interface ScoreSubmitRequest {
  gameCategory: "worldmap" | "japanmap" | "other";
  gameMode: string;
  clearTimeMs: number;
  mistakeCount: number;
  keystrokeCount: number;
  questionCount: number;
  questionTimestamps: QuestionTimestamp[];
}

export interface ScoreSubmitResponse {
  success: boolean;
  scoreId?: string;
  rank?: number;
  isVerified: boolean;
  error?: string;
}

export interface RankingEntry {
  rank: number;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  clearTimeMs: number;
  clearTimeFormatted: string;
  mistakeCount: number;
  playedAt: string;
  gameMode: string;
  gameModeDisplayName: string;
}

export interface RankingResponse {
  rankings: RankingEntry[];
  total: number;
  period: {
    type: "all" | "monthly" | "weekly" | "daily";
    startDate?: string;
    endDate?: string;
  };
}

export type GameCategory = "worldmap" | "japanmap" | "other";
export type RankingPeriod = "all" | "monthly" | "weekly" | "daily";

export const GAME_CATEGORIES: Record<GameCategory, string> = {
  worldmap: "世界地図",
  japanmap: "日本地図",
  other: "雑学",
};

export const RANKING_PERIODS: Record<RankingPeriod, string> = {
  all: "全期間",
  monthly: "月間",
  weekly: "週間",
  daily: "今日",
};

export const GAME_MODES: Record<
  GameCategory,
  Record<string, { displayName: string; questionCount: number }>
> = {
  worldmap: {
    "east-asia-country": { displayName: "東・東南・南アジア・国名", questionCount: 24 },
    "east-asia-capital": { displayName: "東・東南・南アジア・首都名", questionCount: 24 },
    "western-europe-country": {
      displayName: "西ヨーロッパ・国名",
      questionCount: 17,
    },
    "western-europe-capital": {
      displayName: "西ヨーロッパ・首都名",
      questionCount: 17,
    },
    "south-america-country": {
      displayName: "南アメリカ・国名",
      questionCount: 12,
    },
    "south-america-capital": {
      displayName: "南アメリカ・首都名",
      questionCount: 12,
    },
    "oceania-country": { displayName: "オセアニア・国名", questionCount: 14 },
    "oceania-capital": { displayName: "オセアニア・首都名", questionCount: 14 },
    "north-africa-country": {
      displayName: "北アフリカ・国名",
      questionCount: 6,
    },
    "north-africa-capital": {
      displayName: "北アフリカ・首都名",
      questionCount: 6,
    },
    "central-asia-country": {
      displayName: "中央アジア・コーカサス・国名",
      questionCount: 8,
    },
    "central-asia-capital": {
      displayName: "中央アジア・コーカサス・首都名",
      questionCount: 8,
    },
    "eastern-europe-country": {
      displayName: "東ヨーロッパ・国名",
      questionCount: 18,
    },
    "eastern-europe-capital": {
      displayName: "東ヨーロッパ・首都名",
      questionCount: 18,
    },
    "west-africa-country": {
      displayName: "西アフリカ・国名",
      questionCount: 11,
    },
    "west-africa-capital": {
      displayName: "西アフリカ・首都名",
      questionCount: 11,
    },
    "north-america-country": { displayName: "北アメリカ・国名", questionCount: 23 },
    "north-america-capital": { displayName: "北アメリカ・首都名", questionCount: 23 },
    "sub-saharan-africa-country": {
      displayName: "サブサハラ・アフリカ・国名",
      questionCount: 33,
    },
    "sub-saharan-africa-capital": {
      displayName: "サブサハラ・アフリカ・首都名",
      questionCount: 33,
    },
    "west-asia-country": { displayName: "西アジア（中東）・国名", questionCount: 15 },
    "west-asia-capital": { displayName: "西アジア（中東）・首都名", questionCount: 15 },
    "southern-europe-country": {
      displayName: "ロシア・その他・国名",
      questionCount: 5,
    },
    "southern-europe-capital": {
      displayName: "ロシア・その他・首都名",
      questionCount: 5,
    },
  },
  japanmap: {
    // 全国
    "all-prefecture": { displayName: "全国・都道府県名", questionCount: 47 },
    "all-capital": { displayName: "全国・県庁所在地", questionCount: 47 },
    "all-bird": { displayName: "全国・県鳥", questionCount: 47 },
    "all-flower": { displayName: "全国・県花", questionCount: 47 },
    "all-tree": { displayName: "全国・県木", questionCount: 47 },
    // 北海道・東北地方
    "hokkaido-tohoku-prefecture": {
      displayName: "北海道・東北地方・都道府県名",
      questionCount: 7,
    },
    "hokkaido-tohoku-capital": {
      displayName: "北海道・東北地方・県庁所在地",
      questionCount: 7,
    },
    "hokkaido-tohoku-bird": {
      displayName: "北海道・東北地方・県鳥",
      questionCount: 7,
    },
    "hokkaido-tohoku-flower": {
      displayName: "北海道・東北地方・県花",
      questionCount: 7,
    },
    "hokkaido-tohoku-tree": {
      displayName: "北海道・東北地方・県木",
      questionCount: 7,
    },
    // 関東地方
    "kanto-prefecture": { displayName: "関東地方・都道府県名", questionCount: 7 },
    "kanto-capital": { displayName: "関東地方・県庁所在地", questionCount: 7 },
    "kanto-bird": { displayName: "関東地方・県鳥", questionCount: 7 },
    "kanto-flower": { displayName: "関東地方・県花", questionCount: 7 },
    "kanto-tree": { displayName: "関東地方・県木", questionCount: 7 },
    // 中部地方
    "chubu-prefecture": { displayName: "中部地方・都道府県名", questionCount: 9 },
    "chubu-capital": { displayName: "中部地方・県庁所在地", questionCount: 9 },
    "chubu-bird": { displayName: "中部地方・県鳥", questionCount: 9 },
    "chubu-flower": { displayName: "中部地方・県花", questionCount: 9 },
    "chubu-tree": { displayName: "中部地方・県木", questionCount: 9 },
    // 近畿地方
    "kinki-prefecture": { displayName: "近畿地方・都道府県名", questionCount: 7 },
    "kinki-capital": { displayName: "近畿地方・県庁所在地", questionCount: 7 },
    "kinki-bird": { displayName: "近畿地方・県鳥", questionCount: 7 },
    "kinki-flower": { displayName: "近畿地方・県花", questionCount: 7 },
    "kinki-tree": { displayName: "近畿地方・県木", questionCount: 7 },
    // 中国・四国地方
    "chugoku-shikoku-prefecture": {
      displayName: "中国・四国地方・都道府県名",
      questionCount: 9,
    },
    "chugoku-shikoku-capital": {
      displayName: "中国・四国地方・県庁所在地",
      questionCount: 9,
    },
    "chugoku-shikoku-bird": {
      displayName: "中国・四国地方・県鳥",
      questionCount: 9,
    },
    "chugoku-shikoku-flower": {
      displayName: "中国・四国地方・県花",
      questionCount: 9,
    },
    "chugoku-shikoku-tree": {
      displayName: "中国・四国地方・県木",
      questionCount: 9,
    },
    // 九州・沖縄地方
    "kyushu-prefecture": { displayName: "九州・沖縄地方・都道府県名", questionCount: 8 },
    "kyushu-capital": { displayName: "九州・沖縄地方・県庁所在地", questionCount: 8 },
    "kyushu-bird": { displayName: "九州・沖縄地方・県鳥", questionCount: 8 },
    "kyushu-flower": { displayName: "九州・沖縄地方・県花", questionCount: 8 },
    "kyushu-tree": { displayName: "九州・沖縄地方・県木", questionCount: 8 },
    // 世界遺産
    heritage: { displayName: "日本の世界遺産", questionCount: 26 },
  },
  other: {
    yamanote: { displayName: "山手線", questionCount: 30 },
    "periodic-table-basic": {
      displayName: "元素記号・基本",
      questionCount: 20,
    },
    "periodic-table-all": { displayName: "元素記号・全て", questionCount: 118 },
    "periodic-table-transition": {
      displayName: "元素記号・遷移金属",
      questionCount: 38,
    },
    "periodic-table-lanthanides": {
      displayName: "元素記号・ランタノイド",
      questionCount: 15,
    },
    "periodic-table-actinides": {
      displayName: "元素記号・アクチノイド",
      questionCount: 15,
    },
    "periodic-table-heavy": {
      displayName: "元素記号・重元素",
      questionCount: 20,
    },
    "periodic-table-superheavy": {
      displayName: "元素記号・超重元素",
      questionCount: 15,
    },
    "constellation-12": { displayName: "12星座", questionCount: 12 },
    "constellation-all": { displayName: "全88星座", questionCount: 88 },
    eto: { displayName: "干支", questionCount: 12 },
    planets: { displayName: "太陽系惑星", questionCount: 8 },
    shichifukujin: { displayName: "七福神", questionCount: 7 },
  },
};
