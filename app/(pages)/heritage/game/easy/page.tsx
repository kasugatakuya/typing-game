"use client";
import React from "react";
import { TypingGame } from "@/app/components/TypingGame";
import heritage from "@/app/heritage.json";

export default function HeritageGameEasy() {
  return (
    <TypingGame
      allItems={heritage}
      itemCount={5}
      gameName="かんたんモード"
      gameDescription="ランダムに選ばれた5個の世界遺産で練習できます。"
      mode="main"
      gameType="heritage"
    />
  );
}
