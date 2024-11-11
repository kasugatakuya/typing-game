"use client";
import React from "react";
import { TypingGame } from "@/app/components/TypingGame";
import prefectures from "@/app/prefectures.json";

export default function PrefecturalBirdGameTimeTrial() {
  return (
    <TypingGame
      allItems={prefectures}
      itemCount={prefectures.length}
      gameName="タイムトライアルモード"
      gameDescription="全47問の県鳥の合計タイムを競います。"
      mode="bird"
      gameType="prefectures"
    />
  );
}
