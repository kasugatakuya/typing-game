"use client";
import React from "react";
import { TypingGame } from "@/app/components/TypingGame";

const country = [
  {
    id: "1",
    name: "ラオス",
    romaji: "raosu",
    subName: "ビエンチャン",
    subRomaji: "bienchan",
  },
  {
    id: "2",
    name: "ロシア",
    romaji: "roshia",
    subName: "モスクワ",
    subRomaji: "mosukuwa",
  },
  {
    id: "3",
    name: "韓国",
    romaji: "kankoku",
    subName: "ソウル",
    subRomaji: "souru",
  },
  {
    id: "4",
    name: "モナコ",
    romaji: "monako",
    subName: "モナコ",
    subRomaji: "monako",
  },
  {
    id: "5",
    name: "メキシコ",
    romaji: "mekishiko",
    subName: "メキシコシティ",
    subRomaji: "mekishikoshiti",
  },
];

export default function CapitalGameHard() {
  return (
    <TypingGame
      allItems={country}
      itemCount={5}
      gameName="むずかしいモード"
      gameDescription="ランダムに選ばれた5個の首都で練習できます。"
      mode="sub"
      gameType="country"
    />
  );
}
