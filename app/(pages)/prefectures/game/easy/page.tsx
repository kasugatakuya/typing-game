"use client";
import React from "react";
import { TypingGame } from "@/app/components/TypingGame";
import prefectures from "@/app/prefectures.json";

export default function PrefecturesGameEasy() {
  return (
    <TypingGame
      allItems={prefectures}
      itemCount={5}
      gameName="かんたんモード"
      gameDescription="ランダムに選ばれた5個の都道府県で練習できます。"
      mode="main"
      gameType="prefectures"
    />
  );
}
