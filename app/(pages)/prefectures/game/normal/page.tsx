"use client";
import React from "react";
import { TypingGame } from "@/app/components/TypingGame";
import prefectures from "@/app/prefectures.json";

export default function PrefecturesGameNormal() {
  return (
    <TypingGame
      allItems={prefectures}
      itemCount={20}
      gameName="ふつうモード"
      gameDescription="ランダムに選ばれた20個の都道府県で練習できます。"
      mode="main"
      gameType="prefectures"
    />
  );
}
