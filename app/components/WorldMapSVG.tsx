"use client";

import React, { memo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

interface WorldMapSVGProps {
  highlightedCountry: string | null;
  region:
    | "north-america"
    | "south-america"
    | "western-europe"
    | "eastern-europe"
    | "east-asia"
    | "west-asia"
    | "oceania"
    | "north-africa"
    | "sub-saharan-africa";
}

// Natural Earth TopoJSON - 世界地図データ（ISO数値コードを使用）
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO数値コードへの変換マップ（Alpha-2 → 数値）
const alpha2ToNumeric: Record<string, string> = {
  // 北アメリカ
  CA: "124",
  US: "840",
  MX: "484",
  GT: "320",
  BZ: "084",
  HN: "340",
  SV: "222",
  NI: "558",
  CR: "188",
  PA: "591",
  CU: "192",
  JM: "388",
  HT: "332",
  DO: "214",
  BS: "044",
  KN: "659",
  AG: "028",
  DM: "212",
  LC: "662",
  VC: "670",
  GD: "308",
  BB: "052",
  TT: "780",
  // 南アメリカ
  CO: "170",
  VE: "862",
  GY: "328",
  SR: "740",
  EC: "218",
  PE: "604",
  BR: "076",
  BO: "068",
  PY: "600",
  CL: "152",
  AR: "032",
  UY: "858",
  // 西ヨーロッパ
  GB: "826",
  FR: "250",
  DE: "276",
  IT: "380",
  ES: "724",
  PT: "620",
  NL: "528",
  BE: "056",
  CH: "756",
  AT: "040",
  IE: "372",
  NO: "578",
  SE: "752",
  FI: "246",
  DK: "208",
  IS: "352",
  GR: "300",
  // 東ヨーロッパ
  PL: "616",
  CZ: "203",
  HU: "348",
  RO: "642",
  BG: "100",
  UA: "804",
  BY: "112",
  RS: "688",
  HR: "191",
  SI: "705",
  SK: "703",
  BA: "070",
  ME: "499",
  AL: "008",
  MD: "498",
  EE: "233",
  LV: "428",
  LT: "440",
  // 東アジア・東南アジア・南アジア
  JP: "392",
  CN: "156",
  KR: "410",
  IN: "356",
  ID: "360",
  PH: "608",
  VN: "704",
  TH: "764",
  MY: "458",
  MM: "104",
  KH: "116",
  LA: "418",
  BD: "050",
  PK: "586",
  LK: "144",
  MN: "496",
  TW: "158",
  KP: "408",
  // 西アジア
  TR: "792",
  SA: "682",
  AE: "784",
  IR: "364",
  IQ: "368",
  IL: "376",
  SY: "760",
  JO: "400",
  LB: "422",
  KW: "414",
  OM: "512",
  QA: "634",
  BH: "048",
  YE: "887",
  AF: "004",
  // オセアニア
  AU: "036",
  NZ: "554",
  PG: "598",
  FJ: "242",
  SB: "090",
  VU: "548",
  WS: "882",
  TO: "776",
  PW: "585",
  FM: "583",
  MH: "584",
  KI: "296",
  NR: "520",
  TV: "798",
  // 北アフリカ
  EG: "818",
  MA: "504",
  DZ: "012",
  TN: "788",
  LY: "434",
  SD: "729",
  // サブサハラアフリカ
  ZA: "710",
  KE: "404",
  NG: "566",
  ET: "231",
  GH: "288",
  TZ: "834",
  UG: "800",
  SN: "686",
  CM: "120",
  CI: "384",
  CD: "180",
  AO: "024",
  MZ: "508",
  MG: "450",
  ZW: "716",
  TD: "148",
  TG: "768",
  GA: "266",
  NA: "516",
  BW: "072",
  RW: "646",
  CF: "140",
};

// 地域ごとの設定（ISO数値コード）
const regionConfig: Record<
  string,
  {
    center: [number, number];
    scale: number;
    countries: string[];
  }
> = {
  "north-america": {
    center: [-100, 40],
    scale: 400,
    countries: [
      "124",
      "840",
      "484",
      "320",
      "084",
      "340",
      "222",
      "558",
      "188",
      "591",
      "192",
      "388",
      "332",
      "214",
      "044",
      "659",
      "028",
      "212",
      "662",
      "670",
      "308",
      "052",
      "780",
    ],
  },
  "south-america": {
    center: [-60, -26],
    scale: 400,
    countries: [
      "170",
      "862",
      "328",
      "740",
      "218",
      "604",
      "076",
      "068",
      "600",
      "152",
      "032",
      "858",
    ],
  },
  "western-europe": {
    center: [5, 57],
    scale: 450,
    countries: [
      "826",
      "250",
      "276",
      "380",
      "724",
      "620",
      "528",
      "056",
      "756",
      "040",
      "372",
      "578",
      "752",
      "246",
      "208",
      "352",
      "300",
    ],
  },
  "eastern-europe": {
    center: [25, 51],
    scale: 950,
    countries: [
      "616",
      "203",
      "348",
      "642",
      "100",
      "804",
      "112",
      "688",
      "191",
      "705",
      "703",
      "070",
      "499",
      "008",
      "498",
      "233",
      "428",
      "440",
    ],
  },
  "east-asia": {
    center: [105, 25],
    scale: 400,
    countries: [
      "392",
      "156",
      "410",
      "356",
      "360",
      "608",
      "704",
      "764",
      "458",
      "104",
      "116",
      "418",
      "050",
      "586",
      "144",
      "496",
      "158",
      "408",
    ],
  },
  "west-asia": {
    center: [50, 28],
    scale: 680,
    countries: [
      "792",
      "682",
      "784",
      "364",
      "368",
      "376",
      "760",
      "400",
      "422",
      "414",
      "512",
      "634",
      "048",
      "887",
      "004",
    ],
  },
  oceania: {
    center: [150, -27],
    scale: 600,
    countries: [
      "036",
      "554",
      "598",
      "242",
      "090",
      "548",
      "882",
      "776",
      "585",
      "583",
      "584",
      "296",
      "520",
      "798",
    ],
  },
  "north-africa": {
    center: [15, 25],
    scale: 600,
    countries: ["818", "504", "012", "788", "434", "729"],
  },
  "sub-saharan-africa": {
    center: [20, -7],
    scale: 450,
    countries: [
      "710",
      "404",
      "566",
      "231",
      "288",
      "834",
      "800",
      "686",
      "120",
      "384",
      "180",
      "024",
      "508",
      "450",
      "716",
      "148",
      "768",
      "266",
      "516",
      "072",
      "646",
      "140",
    ],
  },
};

const RegionMap = memo(function RegionMap({
  highlightedCountry,
  region,
}: WorldMapSVGProps) {
  const config = regionConfig[region];

  if (!config) return null;

  // Alpha-2 を数値コードに変換
  const highlightedNumeric = highlightedCountry
    ? alpha2ToNumeric[highlightedCountry]
    : null;

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        center: config.center,
        scale: config.scale,
      }}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#a5d8ff",
      }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies
            .filter((geo) => config.countries.includes(geo.id))
            .map((geo) => {
              const isHighlighted = geo.id === highlightedNumeric;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: isHighlighted ? "#ef4444" : "#d4d4d4",
                      stroke: isHighlighted ? "#b91c1c" : "#737373",
                      strokeWidth: isHighlighted ? 1.2 : 0.3,
                      outline: "none",
                    },
                    hover: {
                      fill: isHighlighted ? "#ef4444" : "#d4d4d4",
                      stroke: isHighlighted ? "#b91c1c" : "#737373",
                      strokeWidth: isHighlighted ? 1.2 : 0.3,
                      outline: "none",
                    },
                    pressed: {
                      fill: isHighlighted ? "#ef4444" : "#d4d4d4",
                      outline: "none",
                    },
                  }}
                />
              );
            })
        }
      </Geographies>
    </ComposableMap>
  );
});

export function WorldMapSVG({ highlightedCountry, region }: WorldMapSVGProps) {
  return <RegionMap highlightedCountry={highlightedCountry} region={region} />;
}
