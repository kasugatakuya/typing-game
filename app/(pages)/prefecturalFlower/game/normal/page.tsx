"use client";
import React from "react";
import { TypingGame } from "@/app/components/TypingGame";
import prefectures from "@/app/prefectures.json";

export default function PrefecturalFlowerGameNormal() {
  return (
    <TypingGame
      allItems={prefectures}
      itemCount={20}
      gameName="ふつうモード"
      gameDescription="ランダムに選ばれた20個の県花で練習できます。"
      mode="flower"
      gameType="prefectures"
    />
  );
}
