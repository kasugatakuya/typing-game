// 元素データ型
export type Element = {
  number: number;
  symbol: string;
  name: string;
  romaji: string;
  row: number;
  col: number;
};

// 全118元素（位置情報付き）
export const allElementsWithPosition: Element[] = [
  // 周期1
  { number: 1, symbol: "H", name: "水素", romaji: "suiso", row: 1, col: 1 },
  { number: 2, symbol: "He", name: "ヘリウム", romaji: "heriumu", row: 1, col: 18 },
  // 周期2
  { number: 3, symbol: "Li", name: "リチウム", romaji: "richiumu", row: 2, col: 1 },
  { number: 4, symbol: "Be", name: "ベリリウム", romaji: "beririumu", row: 2, col: 2 },
  { number: 5, symbol: "B", name: "ホウ素", romaji: "houso", row: 2, col: 13 },
  { number: 6, symbol: "C", name: "炭素", romaji: "tanso", row: 2, col: 14 },
  { number: 7, symbol: "N", name: "窒素", romaji: "chisso", row: 2, col: 15 },
  { number: 8, symbol: "O", name: "酸素", romaji: "sanso", row: 2, col: 16 },
  { number: 9, symbol: "F", name: "フッ素", romaji: "fusso", row: 2, col: 17 },
  { number: 10, symbol: "Ne", name: "ネオン", romaji: "neon", row: 2, col: 18 },
  // 周期3
  { number: 11, symbol: "Na", name: "ナトリウム", romaji: "natoriumu", row: 3, col: 1 },
  { number: 12, symbol: "Mg", name: "マグネシウム", romaji: "maguneshiumu", row: 3, col: 2 },
  { number: 13, symbol: "Al", name: "アルミニウム", romaji: "aruminiumu", row: 3, col: 13 },
  { number: 14, symbol: "Si", name: "ケイ素", romaji: "keiso", row: 3, col: 14 },
  { number: 15, symbol: "P", name: "リン", romaji: "rin", row: 3, col: 15 },
  { number: 16, symbol: "S", name: "硫黄", romaji: "iou", row: 3, col: 16 },
  { number: 17, symbol: "Cl", name: "塩素", romaji: "enso", row: 3, col: 17 },
  { number: 18, symbol: "Ar", name: "アルゴン", romaji: "arugon", row: 3, col: 18 },
  // 周期4
  { number: 19, symbol: "K", name: "カリウム", romaji: "kariumu", row: 4, col: 1 },
  { number: 20, symbol: "Ca", name: "カルシウム", romaji: "karushiumu", row: 4, col: 2 },
  { number: 21, symbol: "Sc", name: "スカンジウム", romaji: "sukanjiumu", row: 4, col: 3 },
  { number: 22, symbol: "Ti", name: "チタン", romaji: "chitan", row: 4, col: 4 },
  { number: 23, symbol: "V", name: "バナジウム", romaji: "banajiumu", row: 4, col: 5 },
  { number: 24, symbol: "Cr", name: "クロム", romaji: "kuromu", row: 4, col: 6 },
  { number: 25, symbol: "Mn", name: "マンガン", romaji: "mangan", row: 4, col: 7 },
  { number: 26, symbol: "Fe", name: "鉄", romaji: "tetsu", row: 4, col: 8 },
  { number: 27, symbol: "Co", name: "コバルト", romaji: "kobaruto", row: 4, col: 9 },
  { number: 28, symbol: "Ni", name: "ニッケル", romaji: "nikkeru", row: 4, col: 10 },
  { number: 29, symbol: "Cu", name: "銅", romaji: "dou", row: 4, col: 11 },
  { number: 30, symbol: "Zn", name: "亜鉛", romaji: "aen", row: 4, col: 12 },
  { number: 31, symbol: "Ga", name: "ガリウム", romaji: "gariumu", row: 4, col: 13 },
  { number: 32, symbol: "Ge", name: "ゲルマニウム", romaji: "gerumaniumu", row: 4, col: 14 },
  { number: 33, symbol: "As", name: "ヒ素", romaji: "hiso", row: 4, col: 15 },
  { number: 34, symbol: "Se", name: "セレン", romaji: "seren", row: 4, col: 16 },
  { number: 35, symbol: "Br", name: "臭素", romaji: "shuuso", row: 4, col: 17 },
  { number: 36, symbol: "Kr", name: "クリプトン", romaji: "kuriputon", row: 4, col: 18 },
  // 周期5
  { number: 37, symbol: "Rb", name: "ルビジウム", romaji: "rubijiumu", row: 5, col: 1 },
  { number: 38, symbol: "Sr", name: "ストロンチウム", romaji: "sutoronchiumu", row: 5, col: 2 },
  { number: 39, symbol: "Y", name: "イットリウム", romaji: "ittoriumu", row: 5, col: 3 },
  { number: 40, symbol: "Zr", name: "ジルコニウム", romaji: "jirukoniumu", row: 5, col: 4 },
  { number: 41, symbol: "Nb", name: "ニオブ", romaji: "niobu", row: 5, col: 5 },
  { number: 42, symbol: "Mo", name: "モリブデン", romaji: "moribuden", row: 5, col: 6 },
  { number: 43, symbol: "Tc", name: "テクネチウム", romaji: "tekunechiumu", row: 5, col: 7 },
  { number: 44, symbol: "Ru", name: "ルテニウム", romaji: "ruteniumu", row: 5, col: 8 },
  { number: 45, symbol: "Rh", name: "ロジウム", romaji: "rojiumu", row: 5, col: 9 },
  { number: 46, symbol: "Pd", name: "パラジウム", romaji: "parajiumu", row: 5, col: 10 },
  { number: 47, symbol: "Ag", name: "銀", romaji: "gin", row: 5, col: 11 },
  { number: 48, symbol: "Cd", name: "カドミウム", romaji: "kadomiumu", row: 5, col: 12 },
  { number: 49, symbol: "In", name: "インジウム", romaji: "injiumu", row: 5, col: 13 },
  { number: 50, symbol: "Sn", name: "スズ", romaji: "suzu", row: 5, col: 14 },
  { number: 51, symbol: "Sb", name: "アンチモン", romaji: "anchimon", row: 5, col: 15 },
  { number: 52, symbol: "Te", name: "テルル", romaji: "teruru", row: 5, col: 16 },
  { number: 53, symbol: "I", name: "ヨウ素", romaji: "youso", row: 5, col: 17 },
  { number: 54, symbol: "Xe", name: "キセノン", romaji: "kisenon", row: 5, col: 18 },
  // 周期6
  { number: 55, symbol: "Cs", name: "セシウム", romaji: "seshiumu", row: 6, col: 1 },
  { number: 56, symbol: "Ba", name: "バリウム", romaji: "bariumu", row: 6, col: 2 },
  // ランタノイド（行9に配置）
  { number: 57, symbol: "La", name: "ランタン", romaji: "rantan", row: 9, col: 3 },
  { number: 58, symbol: "Ce", name: "セリウム", romaji: "seriumu", row: 9, col: 4 },
  { number: 59, symbol: "Pr", name: "プラセオジム", romaji: "puraseojimu", row: 9, col: 5 },
  { number: 60, symbol: "Nd", name: "ネオジム", romaji: "neojimu", row: 9, col: 6 },
  { number: 61, symbol: "Pm", name: "プロメチウム", romaji: "puromechiumu", row: 9, col: 7 },
  { number: 62, symbol: "Sm", name: "サマリウム", romaji: "samariumu", row: 9, col: 8 },
  { number: 63, symbol: "Eu", name: "ユウロピウム", romaji: "yuuropiumu", row: 9, col: 9 },
  { number: 64, symbol: "Gd", name: "ガドリニウム", romaji: "gadoriniumu", row: 9, col: 10 },
  { number: 65, symbol: "Tb", name: "テルビウム", romaji: "terubiumu", row: 9, col: 11 },
  { number: 66, symbol: "Dy", name: "ジスプロシウム", romaji: "jisupuroshiumu", row: 9, col: 12 },
  { number: 67, symbol: "Ho", name: "ホルミウム", romaji: "horumiumu", row: 9, col: 13 },
  { number: 68, symbol: "Er", name: "エルビウム", romaji: "erubiumu", row: 9, col: 14 },
  { number: 69, symbol: "Tm", name: "ツリウム", romaji: "tsuriumu", row: 9, col: 15 },
  { number: 70, symbol: "Yb", name: "イッテルビウム", romaji: "itterubiumu", row: 9, col: 16 },
  { number: 71, symbol: "Lu", name: "ルテチウム", romaji: "rutechiumu", row: 9, col: 17 },
  // 周期6続き
  { number: 72, symbol: "Hf", name: "ハフニウム", romaji: "hafuniumu", row: 6, col: 4 },
  { number: 73, symbol: "Ta", name: "タンタル", romaji: "tantaru", row: 6, col: 5 },
  { number: 74, symbol: "W", name: "タングステン", romaji: "tangusuten", row: 6, col: 6 },
  { number: 75, symbol: "Re", name: "レニウム", romaji: "reniumu", row: 6, col: 7 },
  { number: 76, symbol: "Os", name: "オスミウム", romaji: "osumiumu", row: 6, col: 8 },
  { number: 77, symbol: "Ir", name: "イリジウム", romaji: "irijiumu", row: 6, col: 9 },
  { number: 78, symbol: "Pt", name: "白金", romaji: "hakkin", row: 6, col: 10 },
  { number: 79, symbol: "Au", name: "金", romaji: "kin", row: 6, col: 11 },
  { number: 80, symbol: "Hg", name: "水銀", romaji: "suigin", row: 6, col: 12 },
  { number: 81, symbol: "Tl", name: "タリウム", romaji: "tariumu", row: 6, col: 13 },
  { number: 82, symbol: "Pb", name: "鉛", romaji: "namari", row: 6, col: 14 },
  { number: 83, symbol: "Bi", name: "ビスマス", romaji: "bisumasu", row: 6, col: 15 },
  { number: 84, symbol: "Po", name: "ポロニウム", romaji: "poroniumu", row: 6, col: 16 },
  { number: 85, symbol: "At", name: "アスタチン", romaji: "asutachin", row: 6, col: 17 },
  { number: 86, symbol: "Rn", name: "ラドン", romaji: "radon", row: 6, col: 18 },
  // 周期7
  { number: 87, symbol: "Fr", name: "フランシウム", romaji: "furanshiumu", row: 7, col: 1 },
  { number: 88, symbol: "Ra", name: "ラジウム", romaji: "rajiumu", row: 7, col: 2 },
  // アクチノイド（行10に配置）
  { number: 89, symbol: "Ac", name: "アクチニウム", romaji: "akuchiniumu", row: 10, col: 3 },
  { number: 90, symbol: "Th", name: "トリウム", romaji: "toriumu", row: 10, col: 4 },
  { number: 91, symbol: "Pa", name: "プロトアクチニウム", romaji: "purotoakuchiniumu", row: 10, col: 5 },
  { number: 92, symbol: "U", name: "ウラン", romaji: "uran", row: 10, col: 6 },
  { number: 93, symbol: "Np", name: "ネプツニウム", romaji: "neputsuniumu", row: 10, col: 7 },
  { number: 94, symbol: "Pu", name: "プルトニウム", romaji: "purutoniumu", row: 10, col: 8 },
  { number: 95, symbol: "Am", name: "アメリシウム", romaji: "amerishiumu", row: 10, col: 9 },
  { number: 96, symbol: "Cm", name: "キュリウム", romaji: "kyuriumu", row: 10, col: 10 },
  { number: 97, symbol: "Bk", name: "バークリウム", romaji: "baakuriumu", row: 10, col: 11 },
  { number: 98, symbol: "Cf", name: "カリホルニウム", romaji: "karihoruniumu", row: 10, col: 12 },
  { number: 99, symbol: "Es", name: "アインスタイニウム", romaji: "ainsutainiumu", row: 10, col: 13 },
  { number: 100, symbol: "Fm", name: "フェルミウム", romaji: "ferumiumu", row: 10, col: 14 },
  { number: 101, symbol: "Md", name: "メンデレビウム", romaji: "menderebiumu", row: 10, col: 15 },
  { number: 102, symbol: "No", name: "ノーベリウム", romaji: "nooberiumu", row: 10, col: 16 },
  { number: 103, symbol: "Lr", name: "ローレンシウム", romaji: "roorenshiumu", row: 10, col: 17 },
  // 周期7続き
  { number: 104, symbol: "Rf", name: "ラザホージウム", romaji: "razahoojiumu", row: 7, col: 4 },
  { number: 105, symbol: "Db", name: "ドブニウム", romaji: "dobuniumu", row: 7, col: 5 },
  { number: 106, symbol: "Sg", name: "シーボーギウム", romaji: "shiiboogiumu", row: 7, col: 6 },
  { number: 107, symbol: "Bh", name: "ボーリウム", romaji: "booriumu", row: 7, col: 7 },
  { number: 108, symbol: "Hs", name: "ハッシウム", romaji: "hasshiumu", row: 7, col: 8 },
  { number: 109, symbol: "Mt", name: "マイトネリウム", romaji: "maitoneriumu", row: 7, col: 9 },
  { number: 110, symbol: "Ds", name: "ダームスタチウム", romaji: "daamusutachiumu", row: 7, col: 10 },
  { number: 111, symbol: "Rg", name: "レントゲニウム", romaji: "rentogeniumu", row: 7, col: 11 },
  { number: 112, symbol: "Cn", name: "コペルニシウム", romaji: "koperunishiumu", row: 7, col: 12 },
  { number: 113, symbol: "Nh", name: "ニホニウム", romaji: "nihoniumu", row: 7, col: 13 },
  { number: 114, symbol: "Fl", name: "フレロビウム", romaji: "furerobiumu", row: 7, col: 14 },
  { number: 115, symbol: "Mc", name: "モスコビウム", romaji: "mosukobiumu", row: 7, col: 15 },
  { number: 116, symbol: "Lv", name: "リバモリウム", romaji: "ribamoriumu", row: 7, col: 16 },
  { number: 117, symbol: "Ts", name: "テネシン", romaji: "teneshin", row: 7, col: 17 },
  { number: 118, symbol: "Og", name: "オガネソン", romaji: "oganeson", row: 7, col: 18 },
];

// カテゴリ別にフィルタリングする関数
export const getElementsByCategory = (category: string): Element[] => {
  switch (category) {
    case "basic":
      return allElementsWithPosition.filter((e) => e.number <= 20);
    case "transition":
      return allElementsWithPosition.filter(
        (e) => e.number >= 21 && e.number <= 54
      );
    case "heavy":
      return allElementsWithPosition.filter(
        (e) =>
          (e.number >= 55 && e.number <= 56) ||
          (e.number >= 72 && e.number <= 88)
      );
    case "lanthanides":
      return allElementsWithPosition.filter(
        (e) => e.number >= 57 && e.number <= 71
      );
    case "actinides":
      return allElementsWithPosition.filter(
        (e) => e.number >= 89 && e.number <= 103
      );
    case "superheavy":
      return allElementsWithPosition.filter(
        (e) => e.number >= 104 && e.number <= 118
      );
    case "all":
    default:
      return [...allElementsWithPosition].sort((a, b) => a.number - b.number);
  }
};

// 旧データ形式への互換性のため
export const basicElements = getElementsByCategory("basic").map((e) => ({
  name: e.name,
  romaji: e.romaji,
  hint: `${e.symbol} (${e.number})`,
}));

export const transitionElements = getElementsByCategory("transition").map(
  (e) => ({
    name: e.name,
    romaji: e.romaji,
    hint: `${e.symbol} (${e.number})`,
  })
);

export const heavyElements = getElementsByCategory("heavy").map((e) => ({
  name: e.name,
  romaji: e.romaji,
  hint: `${e.symbol} (${e.number})`,
}));

export const lanthanides = getElementsByCategory("lanthanides").map((e) => ({
  name: e.name,
  romaji: e.romaji,
  hint: `${e.symbol} (${e.number})`,
}));

export const actinides = getElementsByCategory("actinides").map((e) => ({
  name: e.name,
  romaji: e.romaji,
  hint: `${e.symbol} (${e.number})`,
}));

export const superheavyElements = getElementsByCategory("superheavy").map(
  (e) => ({
    name: e.name,
    romaji: e.romaji,
    hint: `${e.symbol} (${e.number})`,
  })
);

export const allElements = getElementsByCategory("all").map((e) => ({
  name: e.name,
  romaji: e.romaji,
  hint: `${e.symbol} (${e.number})`,
}));
