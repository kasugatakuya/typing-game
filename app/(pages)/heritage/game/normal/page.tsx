"use client";
import React from "react";
import { TypingGame } from "@/app/components/TypingGame";
import heritage from "@/app/heritage.json";

export default function HeritageGameNormal() {
  return (
    <TypingGame
      allItems={heritage}
      itemCount={20}
      gameName="ふつうモード"
      gameDescription="ランダムに選ばれた20個の世界遺産で練習できます。"
      mode="main"
      gameType="heritage"
    />
  );
}
