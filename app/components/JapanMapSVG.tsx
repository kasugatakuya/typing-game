"use client";

import React, { memo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

export type JapanRegion =
  | "all"
  | "hokkaido-tohoku"
  | "kanto"
  | "chubu"
  | "kinki"
  | "chugoku-shikoku"
  | "kyushu";

interface JapanMapSVGProps {
  highlightedPrefecture: string | null;
  region: JapanRegion;
}

// Japan prefecture TopoJSON with prefecture codes
const GEO_URL =
  "https://raw.githubusercontent.com/dataofjapan/land/master/japan.topojson";

// Prefecture name to ID mapping (JIS X 0401)
const prefectureNameToId: Record<string, string> = {
  北海道: "1",
  青森県: "2",
  岩手県: "3",
  宮城県: "4",
  秋田県: "5",
  山形県: "6",
  福島県: "7",
  茨城県: "8",
  栃木県: "9",
  群馬県: "10",
  埼玉県: "11",
  千葉県: "12",
  東京都: "13",
  神奈川県: "14",
  新潟県: "15",
  富山県: "16",
  石川県: "17",
  福井県: "18",
  山梨県: "19",
  長野県: "20",
  岐阜県: "21",
  静岡県: "22",
  愛知県: "23",
  三重県: "24",
  滋賀県: "25",
  京都府: "26",
  大阪府: "27",
  兵庫県: "28",
  奈良県: "29",
  和歌山県: "30",
  鳥取県: "31",
  島根県: "32",
  岡山県: "33",
  広島県: "34",
  山口県: "35",
  徳島県: "36",
  香川県: "37",
  愛媛県: "38",
  高知県: "39",
  福岡県: "40",
  佐賀県: "41",
  長崎県: "42",
  熊本県: "43",
  大分県: "44",
  宮崎県: "45",
  鹿児島県: "46",
  沖縄県: "47",
};

// Region configurations
const regionConfig: Record<
  JapanRegion,
  {
    center: [number, number];
    scale: number;
    prefectureIds: string[];
  }
> = {
  all: {
    center: [137, 38],
    scale: 1800,
    prefectureIds: Array.from({ length: 47 }, (_, i) => String(i + 1)),
  },
  "hokkaido-tohoku": {
    center: [141, 41.3],
    scale: 2700,
    prefectureIds: ["1", "2", "3", "4", "5", "6", "7"],
  },
  kanto: {
    center: [139.5, 35.5],
    scale: 8000,
    prefectureIds: ["8", "9", "10", "11", "12", "13", "14"],
  },
  chubu: {
    center: [137.5, 36.5],
    scale: 5000,
    prefectureIds: ["15", "16", "17", "18", "19", "20", "21", "22", "23"],
  },
  kinki: {
    center: [135.5, 34.6],
    scale: 9500,
    prefectureIds: ["24", "25", "26", "27", "28", "29", "30"],
  },
  "chugoku-shikoku": {
    center: [133, 34.5],
    scale: 7000,
    prefectureIds: ["31", "32", "33", "34", "35", "36", "37", "38", "39"],
  },
  kyushu: {
    center: [130.5, 32.5],
    scale: 6000,
    prefectureIds: ["40", "41", "42", "43", "44", "45", "46", "47"],
  },
};

const JapanMap = memo(function JapanMap({
  highlightedPrefecture,
  region,
}: JapanMapSVGProps) {
  const config = regionConfig[region];

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
            .filter((geo) => {
              const prefName = geo.properties.nam_ja || geo.properties.name;
              const prefId = prefectureNameToId[prefName];
              return config.prefectureIds.includes(prefId);
            })
            .map((geo) => {
              const prefName = geo.properties.nam_ja || geo.properties.name;
              const prefId = prefectureNameToId[prefName];
              const isHighlighted = prefId === highlightedPrefecture;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: isHighlighted ? "#ef4444" : "#d4d4d4",
                      stroke: isHighlighted ? "#b91c1c" : "#737373",
                      strokeWidth: isHighlighted ? 1.5 : 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill: isHighlighted ? "#ef4444" : "#d4d4d4",
                      stroke: isHighlighted ? "#b91c1c" : "#737373",
                      strokeWidth: isHighlighted ? 1.5 : 0.5,
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

export function JapanMapSVG({
  highlightedPrefecture,
  region,
}: JapanMapSVGProps) {
  return (
    <JapanMap highlightedPrefecture={highlightedPrefecture} region={region} />
  );
}
