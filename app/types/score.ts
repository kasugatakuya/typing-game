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
    "east-asia-country": { displayName: "東アジア・国名", questionCount: 6 },
    "east-asia-capital": { displayName: "東アジア・首都名", questionCount: 6 },
    "western-europe-country": {
      displayName: "西ヨーロッパ・国名",
      questionCount: 9,
    },
    "western-europe-capital": {
      displayName: "西ヨーロッパ・首都名",
      questionCount: 9,
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
      displayName: "中央アジア・国名",
      questionCount: 5,
    },
    "central-asia-capital": {
      displayName: "中央アジア・首都名",
      questionCount: 5,
    },
    "eastern-europe-country": {
      displayName: "東ヨーロッパ・国名",
      questionCount: 10,
    },
    "eastern-europe-capital": {
      displayName: "東ヨーロッパ・首都名",
      questionCount: 10,
    },
    "west-africa-country": {
      displayName: "西アフリカ・国名",
      questionCount: 16,
    },
    "west-africa-capital": {
      displayName: "西アフリカ・首都名",
      questionCount: 16,
    },
    "north-america-country": { displayName: "北米・国名", questionCount: 23 },
    "north-america-capital": { displayName: "北米・首都名", questionCount: 23 },
    "sub-saharan-africa-country": {
      displayName: "サブサハラアフリカ・国名",
      questionCount: 24,
    },
    "sub-saharan-africa-capital": {
      displayName: "サブサハラアフリカ・首都名",
      questionCount: 24,
    },
    "west-asia-country": { displayName: "西アジア・国名", questionCount: 18 },
    "west-asia-capital": { displayName: "西アジア・首都名", questionCount: 18 },
    "southern-europe-country": {
      displayName: "南ヨーロッパ・国名",
      questionCount: 15,
    },
    "southern-europe-capital": {
      displayName: "南ヨーロッパ・首都名",
      questionCount: 15,
    },
  },
  japanmap: {
    "all-prefecture": { displayName: "全国・都道府県名", questionCount: 47 },
    "all-capital": { displayName: "全国・県庁所在地", questionCount: 47 },
    "all-bird": { displayName: "全国・県鳥", questionCount: 47 },
    "all-flower": { displayName: "全国・県花", questionCount: 47 },
    "all-tree": { displayName: "全国・県木", questionCount: 47 },
    "hokkaido-tohoku-prefecture": {
      displayName: "北海道・東北・都道府県名",
      questionCount: 7,
    },
    "hokkaido-tohoku-capital": {
      displayName: "北海道・東北・県庁所在地",
      questionCount: 7,
    },
    "kanto-prefecture": { displayName: "関東・都道府県名", questionCount: 7 },
    "kanto-capital": { displayName: "関東・県庁所在地", questionCount: 7 },
    "chubu-prefecture": { displayName: "中部・都道府県名", questionCount: 9 },
    "chubu-capital": { displayName: "中部・県庁所在地", questionCount: 9 },
    "kinki-prefecture": { displayName: "近畿・都道府県名", questionCount: 7 },
    "kinki-capital": { displayName: "近畿・県庁所在地", questionCount: 7 },
    "chugoku-shikoku-prefecture": {
      displayName: "中国・四国・都道府県名",
      questionCount: 9,
    },
    "chugoku-shikoku-capital": {
      displayName: "中国・四国・県庁所在地",
      questionCount: 9,
    },
    "kyushu-prefecture": { displayName: "九州・都道府県名", questionCount: 8 },
    "kyushu-capital": { displayName: "九州・県庁所在地", questionCount: 8 },
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
