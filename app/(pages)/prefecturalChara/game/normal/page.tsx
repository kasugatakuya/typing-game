"use client";
import React from "react";
import { TypingGame } from "@/app/components/TypingGame";
import prefectures from "@/app/prefectures.json";

export default function PrefecturalCharaGameNormal() {
  return (
    <TypingGame
      allItems={prefectures}
      itemCount={20}
      gameName="ふつうモード"
      gameDescription="ランダムに選ばれた20個のゆるキャラで練習できます。"
      mode="chara"
      gameType="prefectures"
    />
  );
}
