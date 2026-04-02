"use client";

import React from "react";

interface WorldMapSVGProps {
  highlightedCountry: string | null;
  region: "north-america" | "south-america" | "europe" | "asia" | "oceania" | "africa";
}

export function WorldMapSVG({ highlightedCountry, region }: WorldMapSVGProps) {
  if (region === "north-america") {
    return <NorthAmericaMap highlightedCountry={highlightedCountry} />;
  }
  if (region === "south-america") {
    return <SouthAmericaMap highlightedCountry={highlightedCountry} />;
  }
  if (region === "europe") {
    return <EuropeMap highlightedCountry={highlightedCountry} />;
  }
  return null;
}

function NorthAmericaMap({ highlightedCountry }: { highlightedCountry: string | null }) {
  const getCountryStyle = (countryId: string) => {
    const isHighlighted = highlightedCountry === countryId;
    return {
      fill: isHighlighted ? "#ef4444" : "#d4d4d4",
      stroke: isHighlighted ? "#b91c1c" : "#737373",
      strokeWidth: isHighlighted ? 1.2 : 0.4,
    };
  };

  return (
    <svg
      viewBox="0 0 500 570"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      style={{ backgroundColor: "#a5d8ff" }}
    >
      {/* カナダ本土 */}
      <path
        id="CA"
        d="M35,155 L50,158 L90,168 L140,180 L180,188 L220,185 L260,175 L290,162
           L300,145 L315,125 L335,105 L355,88 L360,70 L350,55 L330,48 L305,45 L280,42 L255,38 L230,35 L205,38 L180,42 L155,48 L130,55 L105,62 L85,72 L68,85
           L62,105 L72,125 L58,145 L65,158
           L60,178 L75,192 L60,208 L75,208 L60,192 L45,178 L35,155 Z
           M350,55 L372,48 L392,55 L408,70 L412,88 L400,108 L378,100 L360,88 Z
           M130,42 L152,32 L172,42 L162,58 L142,52 Z
           M188,28 L215,20 L240,32 L225,48 L198,42 Z
           M265,22 L295,18 L318,28 L302,45 L275,40 Z"
        {...getCountryStyle("CA")}
        className="transition-all duration-300"
      />

      {/* アメリカ本土 */}
      <path
        id="US"
        d="M50,158 L90,168 L140,180 L180,188 L220,185 L260,175 L290,162
           L302,172 L318,188 L328,210 L332,235 L325,258
           L312,275 L298,285 L295,290
           L265,292 L235,295 L205,298 L175,300 L145,295 L115,288 L90,278 L72,265 L78,250 L65,235 L75,218 L62,202 L72,185 L58,168 L50,158 Z"
        {...getCountryStyle("US")}
        className="transition-all duration-300"
      />

      {/* アラスカ */}
      <path
        id="US-AK"
        d="M12,85 L28,72 L48,78 L68,68 L85,80 L92,98 L82,115 L60,122 L38,118 L20,125 L8,112 L5,95 Z
           M25,130 L42,125 L52,138 L40,148 L22,142 Z"
        {...getCountryStyle("US")}
        className="transition-all duration-300"
      />

      {/* メキシコ本土 */}
      <path
        id="MX"
        d="M72,265 L90,278 L115,288 L145,295 L175,300 L190,315 L200,338 L205,362 L195,382 L175,392 L158,382 L148,362 L140,342 L130,325 L115,318 L98,325 L85,315 L72,295 L68,280 L72,265 Z"
        {...getCountryStyle("MX")}
        className="transition-all duration-300"
      />
      {/* バハカリフォルニア半島 */}
      <path
        id="MX-BC"
        d="M68,280 L58,302 L52,335 L48,362 L42,380 L38,362 L42,332 L48,302 L58,278 L68,280 Z"
        {...getCountryStyle("MX")}
        className="transition-all duration-300"
      />
      {/* ユカタン半島 */}
      <path
        id="MX-YU"
        d="M195,362 L215,352 L232,365 L242,358 L252,378 L238,395 L215,400 L195,382 Z"
        {...getCountryStyle("MX")}
        className="transition-all duration-300"
      />

      {/* グアテマラ */}
      <path
        id="GT"
        d="M198,405 L218,400 L228,412 L222,428 L205,435 L195,420 Z"
        {...getCountryStyle("GT")}
        className="transition-all duration-300"
      />

      {/* ベリーズ */}
      <path
        id="BZ"
        d="M228,392 L242,388 L250,405 L238,415 L226,405 Z"
        {...getCountryStyle("BZ")}
        className="transition-all duration-300"
      />

      {/* ホンジュラス */}
      <path
        id="HN"
        d="M228,418 L252,412 L278,425 L272,445 L248,452 L222,435 Z"
        {...getCountryStyle("HN")}
        className="transition-all duration-300"
      />

      {/* エルサルバドル */}
      <path
        id="SV"
        d="M205,438 L222,435 L228,452 L212,460 L202,450 Z"
        {...getCountryStyle("SV")}
        className="transition-all duration-300"
      />

      {/* ニカラグア */}
      <path
        id="NI"
        d="M248,458 L278,450 L298,472 L290,495 L265,502 L245,482 Z"
        {...getCountryStyle("NI")}
        className="transition-all duration-300"
      />

      {/* コスタリカ */}
      <path
        id="CR"
        d="M272,505 L298,498 L315,520 L302,538 L280,532 L265,515 Z"
        {...getCountryStyle("CR")}
        className="transition-all duration-300"
      />

      {/* パナマ */}
      <path
        id="PA"
        d="M308,535 L338,528 L372,542 L368,560 L335,560 L302,548 Z"
        {...getCountryStyle("PA")}
        className="transition-all duration-300"
      />

      {/* キューバ */}
      <path
        id="CU"
        d="M280,285 L312,280 L355,288 L385,302 L380,318 L345,325 L305,318 L278,302 Z"
        {...getCountryStyle("CU")}
        className="transition-all duration-300"
      />

      {/* ジャマイカ */}
      <path
        id="JM"
        d="M325,340 L352,335 L368,350 L350,362 L322,358 Z"
        {...getCountryStyle("JM")}
        className="transition-all duration-300"
      />

      {/* ハイチ */}
      <path
        id="HT"
        d="M385,322 L405,315 L418,332 L402,348 L382,338 Z"
        {...getCountryStyle("HT")}
        className="transition-all duration-300"
      />

      {/* ドミニカ共和国 */}
      <path
        id="DO"
        d="M418,315 L442,308 L458,325 L442,342 L418,335 Z"
        {...getCountryStyle("DO")}
        className="transition-all duration-300"
      />

      {/* バハマ */}
      <path
        id="BS"
        d="M365,255 L385,248 L402,265 L392,282 L372,278 L362,268 Z"
        {...getCountryStyle("BS")}
        className="transition-all duration-300"
      />

      {/* 小アンティル諸島 */}
      {/* セントクリストファー・ネイビス */}
      <path
        id="KN"
        d="M448,332 L456,327 L462,340 L455,348 L446,343 Z"
        {...getCountryStyle("KN")}
        className="transition-all duration-300"
      />

      {/* アンティグア・バーブーダ */}
      <path
        id="AG"
        d="M455,348 L463,343 L469,356 L462,364 L453,359 Z"
        {...getCountryStyle("AG")}
        className="transition-all duration-300"
      />

      {/* ドミニカ国 */}
      <path
        id="DM"
        d="M460,368 L468,363 L474,376 L467,384 L458,379 Z"
        {...getCountryStyle("DM")}
        className="transition-all duration-300"
      />

      {/* セントルシア */}
      <path
        id="LC"
        d="M462,390 L470,385 L476,398 L469,406 L460,401 Z"
        {...getCountryStyle("LC")}
        className="transition-all duration-300"
      />

      {/* セントビンセント・グレナディーン */}
      <path
        id="VC"
        d="M458,410 L466,405 L472,418 L465,426 L456,421 Z"
        {...getCountryStyle("VC")}
        className="transition-all duration-300"
      />

      {/* グレナダ */}
      <path
        id="GD"
        d="M452,430 L460,425 L466,438 L459,446 L450,441 Z"
        {...getCountryStyle("GD")}
        className="transition-all duration-300"
      />

      {/* バルバドス */}
      <path
        id="BB"
        d="M472,408 L480,403 L486,416 L479,424 L470,419 Z"
        {...getCountryStyle("BB")}
        className="transition-all duration-300"
      />

      {/* トリニダード・トバゴ */}
      <path
        id="TT"
        d="M458,452 L475,446 L488,462 L475,475 L455,468 Z"
        {...getCountryStyle("TT")}
        className="transition-all duration-300"
      />
    </svg>
  );
}

function SouthAmericaMap({ highlightedCountry }: { highlightedCountry: string | null }) {
  const getCountryStyle = (countryId: string) => {
    const isHighlighted = highlightedCountry === countryId;
    return {
      fill: isHighlighted ? "#ef4444" : "#d4d4d4",
      stroke: isHighlighted ? "#b91c1c" : "#737373",
      strokeWidth: isHighlighted ? 1.2 : 0.4,
    };
  };

  return (
    <svg
      viewBox="0 0 340 540"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      style={{ backgroundColor: "#a5d8ff" }}
    >
      {/* コロンビア */}
      <path
        id="CO"
        d="M70,30 L100,22 L130,28 L155,40 L170,60 L165,85 L145,100 L120,105 L95,98 L75,82 L60,60 L65,42 Z"
        {...getCountryStyle("CO")}
        className="transition-all duration-300"
      />

      {/* ベネズエラ */}
      <path
        id="VE"
        d="M155,40 L185,30 L220,25 L255,35 L275,52 L268,75 L245,88 L215,92 L185,90 L165,85 L170,60 Z"
        {...getCountryStyle("VE")}
        className="transition-all duration-300"
      />

      {/* ガイアナ */}
      <path
        id="GY"
        d="M275,52 L298,45 L315,60 L318,85 L302,102 L278,98 L268,75 Z"
        {...getCountryStyle("GY")}
        className="transition-all duration-300"
      />

      {/* スリナム */}
      <path
        id="SR"
        d="M315,60 L335,58 L345,75 L340,98 L322,108 L302,102 L318,85 Z"
        {...getCountryStyle("SR")}
        className="transition-all duration-300"
      />

      {/* エクアドル */}
      <path
        id="EC"
        d="M45,82 L75,82 L95,98 L90,130 L65,145 L40,132 L35,105 Z"
        {...getCountryStyle("EC")}
        className="transition-all duration-300"
      />

      {/* ペルー */}
      <path
        id="PE"
        d="M40,132 L65,145 L90,130 L120,135 L140,160 L135,205 L118,250 L88,270 L55,260 L35,228 L25,185 L30,155 Z"
        {...getCountryStyle("PE")}
        className="transition-all duration-300"
      />

      {/* ブラジル */}
      <path
        id="BR"
        d="M120,105 L145,100 L165,85 L185,90 L215,92 L245,88 L268,75 L278,98 L302,102 L322,108 L340,98
           L345,130 L340,175 L320,220 L290,265 L255,305 L220,340 L185,365 L155,375 L130,365 L115,335 L108,295
           L118,250 L135,205 L140,160 L120,135 L90,130 L95,98 Z"
        {...getCountryStyle("BR")}
        className="transition-all duration-300"
      />

      {/* ボリビア */}
      <path
        id="BO"
        d="M88,270 L118,250 L108,295 L115,335 L110,365 L85,378 L58,368 L50,335 L55,300 Z"
        {...getCountryStyle("BO")}
        className="transition-all duration-300"
      />

      {/* パラグアイ */}
      <path
        id="PY"
        d="M115,335 L130,365 L138,400 L122,425 L95,420 L85,392 L85,378 L110,365 Z"
        {...getCountryStyle("PY")}
        className="transition-all duration-300"
      />

      {/* チリ */}
      <path
        id="CL"
        d="M55,260 L88,270 L55,300 L50,335 L58,368 L52,405 L42,445 L32,485 L20,520 L10,515 L8,480 L15,435 L22,390 L30,345 L38,300 Z"
        {...getCountryStyle("CL")}
        className="transition-all duration-300"
      />

      {/* アルゼンチン */}
      <path
        id="AR"
        d="M50,335 L58,368 L85,378 L85,392 L95,420 L90,455 L78,490 L58,515 L42,522 L32,512 L32,485 L42,445 L52,405 L58,368 Z
           M42,522 L58,530 L52,540 L38,535 Z"
        {...getCountryStyle("AR")}
        className="transition-all duration-300"
      />

      {/* ウルグアイ */}
      <path
        id="UY"
        d="M122,425 L138,400 L158,412 L162,438 L145,455 L125,448 Z"
        {...getCountryStyle("UY")}
        className="transition-all duration-300"
      />
    </svg>
  );
}

function EuropeMap({ highlightedCountry }: { highlightedCountry: string | null }) {
  const getCountryStyle = (countryId: string) => {
    const isHighlighted = highlightedCountry === countryId;
    return {
      fill: isHighlighted ? "#ef4444" : "#d4d4d4",
      stroke: isHighlighted ? "#b91c1c" : "#737373",
      strokeWidth: isHighlighted ? 1.2 : 0.4,
    };
  };

  return (
    <svg
      viewBox="0 0 580 520"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      style={{ backgroundColor: "#a5d8ff" }}
    >
      {/* アイスランド */}
      <path
        id="IS"
        d="M25,35 L55,28 L80,35 L85,52 L65,62 L35,58 L20,48 Z"
        {...getCountryStyle("IS")}
        className="transition-all duration-300"
      />

      {/* ノルウェー */}
      <path
        id="NO"
        d="M255,15 L275,12 L290,25 L295,55 L288,95 L275,130 L260,155 L250,145 L255,110 L262,70 L258,40 Z"
        {...getCountryStyle("NO")}
        className="transition-all duration-300"
      />

      {/* スウェーデン */}
      <path
        id="SE"
        d="M290,25 L310,30 L320,55 L315,95 L305,135 L290,165 L275,175 L265,160 L275,130 L288,95 L295,55 Z"
        {...getCountryStyle("SE")}
        className="transition-all duration-300"
      />

      {/* フィンランド */}
      <path
        id="FI"
        d="M320,55 L355,45 L380,60 L390,95 L380,135 L355,160 L325,165 L305,135 L315,95 Z"
        {...getCountryStyle("FI")}
        className="transition-all duration-300"
      />

      {/* アイルランド */}
      <path
        id="IE"
        d="M100,165 L125,158 L140,175 L135,198 L115,208 L95,195 L92,175 Z"
        {...getCountryStyle("IE")}
        className="transition-all duration-300"
      />

      {/* イギリス */}
      <path
        id="GB"
        d="M145,145 L165,138 L180,155 L178,185 L165,210 L150,220 L140,205 L145,175 Z
           M155,225 L170,218 L175,235 L165,245 L152,238 Z"
        {...getCountryStyle("GB")}
        className="transition-all duration-300"
      />

      {/* デンマーク */}
      <path
        id="DK"
        d="M245,175 L265,168 L275,185 L268,205 L250,210 L240,195 Z"
        {...getCountryStyle("DK")}
        className="transition-all duration-300"
      />

      {/* オランダ */}
      <path
        id="NL"
        d="M210,215 L230,210 L240,228 L232,245 L215,248 L205,235 Z"
        {...getCountryStyle("NL")}
        className="transition-all duration-300"
      />

      {/* ベルギー */}
      <path
        id="BE"
        d="M195,248 L215,248 L225,265 L212,280 L195,275 L190,260 Z"
        {...getCountryStyle("BE")}
        className="transition-all duration-300"
      />

      {/* フランス */}
      <path
        id="FR"
        d="M155,265 L195,248 L195,275 L212,280 L225,305 L215,345 L185,375 L145,380 L125,355 L130,315 L145,285 Z"
        {...getCountryStyle("FR")}
        className="transition-all duration-300"
      />

      {/* スペイン */}
      <path
        id="ES"
        d="M95,365 L145,380 L185,375 L190,405 L175,445 L125,460 L85,445 L70,405 L75,375 Z"
        {...getCountryStyle("ES")}
        className="transition-all duration-300"
      />

      {/* ポルトガル */}
      <path
        id="PT"
        d="M55,385 L75,375 L70,405 L85,445 L70,465 L50,455 L45,415 Z"
        {...getCountryStyle("PT")}
        className="transition-all duration-300"
      />

      {/* ドイツ */}
      <path
        id="DE"
        d="M230,210 L265,205 L285,225 L290,265 L275,300 L245,310 L225,295 L225,265 L232,245 L240,228 Z"
        {...getCountryStyle("DE")}
        className="transition-all duration-300"
      />

      {/* スイス */}
      <path
        id="CH"
        d="M215,315 L245,310 L255,330 L240,350 L215,345 L210,328 Z"
        {...getCountryStyle("CH")}
        className="transition-all duration-300"
      />

      {/* オーストリア */}
      <path
        id="AT"
        d="M255,310 L290,300 L315,315 L310,340 L275,350 L255,340 L255,330 Z"
        {...getCountryStyle("AT")}
        className="transition-all duration-300"
      />

      {/* イタリア */}
      <path
        id="IT"
        d="M240,350 L275,350 L285,375 L295,420 L280,455 L255,465 L245,445 L255,410 L250,380 L235,365 Z"
        {...getCountryStyle("IT")}
        className="transition-all duration-300"
      />

      {/* ポーランド */}
      <path
        id="PL"
        d="M295,205 L345,195 L375,215 L380,255 L360,280 L320,285 L295,265 L290,235 Z"
        {...getCountryStyle("PL")}
        className="transition-all duration-300"
      />

      {/* チェコ */}
      <path
        id="CZ"
        d="M275,280 L320,285 L330,305 L310,325 L275,320 L265,300 Z"
        {...getCountryStyle("CZ")}
        className="transition-all duration-300"
      />

      {/* スロバキア */}
      <path
        id="SK"
        d="M320,285 L360,280 L380,300 L365,325 L330,330 L310,325 L330,305 Z"
        {...getCountryStyle("SK")}
        className="transition-all duration-300"
      />

      {/* ハンガリー */}
      <path
        id="HU"
        d="M310,325 L365,325 L385,350 L375,380 L335,385 L305,365 L300,340 Z"
        {...getCountryStyle("HU")}
        className="transition-all duration-300"
      />

      {/* スロベニア */}
      <path
        id="SI"
        d="M290,340 L310,340 L305,365 L285,370 L275,355 Z"
        {...getCountryStyle("SI")}
        className="transition-all duration-300"
      />

      {/* クロアチア */}
      <path
        id="HR"
        d="M305,365 L335,385 L340,415 L320,435 L295,420 L285,390 L285,370 Z"
        {...getCountryStyle("HR")}
        className="transition-all duration-300"
      />

      {/* ボスニア・ヘルツェゴビナ */}
      <path
        id="BA"
        d="M320,385 L340,385 L355,415 L340,440 L315,435 L320,415 Z"
        {...getCountryStyle("BA")}
        className="transition-all duration-300"
      />

      {/* セルビア */}
      <path
        id="RS"
        d="M355,385 L385,375 L405,400 L395,435 L365,445 L355,420 Z"
        {...getCountryStyle("RS")}
        className="transition-all duration-300"
      />

      {/* モンテネグロ */}
      <path
        id="ME"
        d="M340,440 L355,435 L365,455 L350,470 L335,460 Z"
        {...getCountryStyle("ME")}
        className="transition-all duration-300"
      />

      {/* アルバニア */}
      <path
        id="AL"
        d="M365,455 L380,448 L390,480 L375,500 L360,490 L358,470 Z"
        {...getCountryStyle("AL")}
        className="transition-all duration-300"
      />

      {/* ギリシャ */}
      <path
        id="GR"
        d="M380,448 L410,440 L435,465 L425,500 L390,510 L375,500 L390,480 Z"
        {...getCountryStyle("GR")}
        className="transition-all duration-300"
      />

      {/* ブルガリア */}
      <path
        id="BG"
        d="M395,400 L435,390 L465,415 L455,450 L420,455 L395,435 Z"
        {...getCountryStyle("BG")}
        className="transition-all duration-300"
      />

      {/* ルーマニア */}
      <path
        id="RO"
        d="M375,340 L420,330 L460,355 L465,395 L435,410 L395,400 L385,375 Z"
        {...getCountryStyle("RO")}
        className="transition-all duration-300"
      />

      {/* モルドバ */}
      <path
        id="MD"
        d="M420,300 L445,295 L455,325 L445,350 L425,345 L420,320 Z"
        {...getCountryStyle("MD")}
        className="transition-all duration-300"
      />

      {/* ウクライナ */}
      <path
        id="UA"
        d="M380,255 L440,235 L510,250 L540,290 L520,340 L465,355 L420,330 L395,300 L380,300 L375,270 Z"
        {...getCountryStyle("UA")}
        className="transition-all duration-300"
      />

      {/* ベラルーシ */}
      <path
        id="BY"
        d="M375,195 L420,185 L455,205 L460,245 L440,265 L400,270 L375,255 L375,225 Z"
        {...getCountryStyle("BY")}
        className="transition-all duration-300"
      />

      {/* リトアニア */}
      <path
        id="LT"
        d="M345,175 L380,168 L395,190 L385,215 L355,220 L340,200 Z"
        {...getCountryStyle("LT")}
        className="transition-all duration-300"
      />

      {/* ラトビア */}
      <path
        id="LV"
        d="M345,145 L385,138 L400,160 L390,185 L355,190 L340,170 Z"
        {...getCountryStyle("LV")}
        className="transition-all duration-300"
      />

      {/* エストニア */}
      <path
        id="EE"
        d="M355,115 L390,108 L405,130 L395,155 L360,160 L348,140 Z"
        {...getCountryStyle("EE")}
        className="transition-all duration-300"
      />
    </svg>
  );
}
