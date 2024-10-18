"use client";
import React from "react";
import { TypingGame } from "@/app/components/TypingGame";
import prefectures from "@/app/prefectures.json";

export default function PrefecturalCapitalsGameEasy() {
  return (
    <TypingGame
      allItems={prefectures}
      itemCount={5}
      gameName="かんたんモード"
      gameDescription="ランダムに選ばれた5個の県庁所在地で練習できます。"
      mode="sub"
      gameType="prefectures"
    />
  );
}
