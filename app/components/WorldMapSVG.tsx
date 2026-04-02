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
