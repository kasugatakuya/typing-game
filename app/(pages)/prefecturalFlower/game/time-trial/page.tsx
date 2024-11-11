"use client";
import React from "react";
import { TypingGame } from "@/app/components/TypingGame";
import prefectures from "@/app/prefectures.json";

export default function PrefecturalFlowerGameTimeTrial() {
  return (
    <TypingGame
      allItems={prefectures}
      itemCount={prefectures.length}
      gameName="タイムトライアルモード"
      gameDescription="全47問の県花合計タイムを競います。"
      mode="flower"
      gameType="prefectures"
    />
  );
}
