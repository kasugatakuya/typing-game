"use client";
import React from "react";
import { TypingGame } from "@/app/components/TypingGame";
import prefectures from "@/app/prefectures.json";

export default function PrefecturalTreeGameEasy() {
  return (
    <TypingGame
      allItems={prefectures}
      itemCount={5}
      gameName="かんたんモード"
      gameDescription="ランダムに選ばれた5個の県木で練習できます。"
      mode="tree"
      gameType="prefectures"
    />
  );
}
