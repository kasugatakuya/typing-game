"use client";
import React from "react";
import { TypingGame } from "@/app/components/TypingGame";
import heritage from "@/app/heritage.json";

export default function HeritageGameHard() {
  return (
    <TypingGame
      allItems={heritage}
      itemCount={40}
      gameName="むずかしいモード"
      gameDescription="ランダムに選ばれた40個の世界遺産で練習できます。"
      mode="main"
      gameType="heritage"
    />
  );
}
