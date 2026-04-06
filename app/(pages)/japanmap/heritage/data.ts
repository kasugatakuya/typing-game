export interface Heritage {
  id: string;
  name: string;
  romaji: string;
  year: number;
  type: "cultural" | "natural";
  prefectureIds: string[]; // 関連する都道府県のID（JIS X 0401）
}

// 日本の世界遺産26件（登録順）
export const heritages: Heritage[] = [
  {
    id: "660",
    name: "法隆寺",
    romaji: "houryuuji",
    year: 1993,
    type: "cultural",
    prefectureIds: ["29"], // 奈良県
  },
  {
    id: "661",
    name: "姫路城",
    romaji: "himejijou",
    year: 1993,
    type: "cultural",
    prefectureIds: ["28"], // 兵庫県
  },
  {
    id: "662",
    name: "屋久島",
    romaji: "yakushima",
    year: 1993,
    type: "natural",
    prefectureIds: ["46"], // 鹿児島県
  },
  {
    id: "663",
    name: "白神山地",
    romaji: "shirakamisanchi",
    year: 1993,
    type: "natural",
    prefectureIds: ["2", "5"], // 青森県、秋田県
  },
  {
    id: "688",
    name: "古都京都",
    romaji: "kotokyouto",
    year: 1994,
    type: "cultural",
    prefectureIds: ["26", "25"], // 京都府、滋賀県
  },
  {
    id: "734",
    name: "白川郷・五箇山",
    romaji: "shirakawagougokayama",
    year: 1995,
    type: "cultural",
    prefectureIds: ["21", "16"], // 岐阜県、富山県
  },
  {
    id: "775",
    name: "原爆ドーム",
    romaji: "genbakudoomu",
    year: 1996,
    type: "cultural",
    prefectureIds: ["34"], // 広島県
  },
  {
    id: "776",
    name: "厳島神社",
    romaji: "itsukushimajinja",
    year: 1996,
    type: "cultural",
    prefectureIds: ["34"], // 広島県
  },
  {
    id: "870",
    name: "古都奈良",
    romaji: "kotonara",
    year: 1998,
    type: "cultural",
    prefectureIds: ["29"], // 奈良県
  },
  {
    id: "913",
    name: "日光の社寺",
    romaji: "nikkounoshaji",
    year: 1999,
    type: "cultural",
    prefectureIds: ["9"], // 栃木県
  },
  {
    id: "972",
    name: "琉球王国のグスク",
    romaji: "ryuukyuuoukokunogusku",
    year: 2000,
    type: "cultural",
    prefectureIds: ["47"], // 沖縄県
  },
  {
    id: "1142",
    name: "紀伊山地の霊場",
    romaji: "kiisanchinoreibjou",
    year: 2004,
    type: "cultural",
    prefectureIds: ["30", "29", "24"], // 和歌山県、奈良県、三重県
  },
  {
    id: "1193",
    name: "知床",
    romaji: "shiretoko",
    year: 2005,
    type: "natural",
    prefectureIds: ["1"], // 北海道
  },
  {
    id: "1246",
    name: "石見銀山",
    romaji: "iwamiginzan",
    year: 2007,
    type: "cultural",
    prefectureIds: ["32"], // 島根県
  },
  {
    id: "1277",
    name: "平泉",
    romaji: "hiraizumi",
    year: 2011,
    type: "cultural",
    prefectureIds: ["3"], // 岩手県
  },
  {
    id: "1321",
    name: "小笠原諸島",
    romaji: "ogasawarashotou",
    year: 2011,
    type: "natural",
    prefectureIds: ["13"], // 東京都
  },
  {
    id: "1362",
    name: "富士山",
    romaji: "fujisan",
    year: 2013,
    type: "cultural",
    prefectureIds: ["19", "22"], // 山梨県、静岡県
  },
  {
    id: "1418",
    name: "富岡製糸場",
    romaji: "tomiokaseishijou",
    year: 2014,
    type: "cultural",
    prefectureIds: ["10"], // 群馬県
  },
  {
    id: "1449",
    name: "明治日本の産業革命遺産",
    romaji: "meijinihonnosangyoukakumeiisan",
    year: 2015,
    type: "cultural",
    prefectureIds: ["40", "41", "42", "43", "46", "35", "3", "22"], // 福岡、佐賀、長崎、熊本、鹿児島、山口、岩手、静岡
  },
  {
    id: "1484",
    name: "国立西洋美術館",
    romaji: "kokuritsuseiyoubijutsukan",
    year: 2016,
    type: "cultural",
    prefectureIds: ["13"], // 東京都
  },
  {
    id: "1495",
    name: "宗像・沖ノ島",
    romaji: "munakataokinoshima",
    year: 2017,
    type: "cultural",
    prefectureIds: ["40"], // 福岡県
  },
  {
    id: "1535",
    name: "潜伏キリシタン関連遺産",
    romaji: "senpukukirishitankanrenisan",
    year: 2018,
    type: "cultural",
    prefectureIds: ["42", "43"], // 長崎県、熊本県
  },
  {
    id: "1574",
    name: "百舌鳥・古市古墳群",
    romaji: "mozufuruichikofungun",
    year: 2019,
    type: "cultural",
    prefectureIds: ["27"], // 大阪府
  },
  {
    id: "1593",
    name: "奄美・沖縄",
    romaji: "amamiokinawa",
    year: 2021,
    type: "natural",
    prefectureIds: ["46", "47"], // 鹿児島県、沖縄県
  },
  {
    id: "1632",
    name: "北海道・北東北の縄文遺跡群",
    romaji: "hokkaidoukitatouhokunojoumonisakigun",
    year: 2021,
    type: "cultural",
    prefectureIds: ["1", "2", "3", "5"], // 北海道、青森、岩手、秋田
  },
  {
    id: "1698",
    name: "佐渡島の金山",
    romaji: "sadogashimanokinzan",
    year: 2024,
    type: "cultural",
    prefectureIds: ["15"], // 新潟県
  },
];
