"use client";
import React from "react";
import { TypingGame } from "@/app/components/TypingGame";
import prefectures from "@/app/prefectures.json";

export default function PrefecturesGameTimeTrial() {
  return (
    <TypingGame
      allItems={prefectures}
      itemCount={prefectures.length}
      gameName="タイムトライアルモード"
      gameDescription="全47問の合計タイムを競います。"
      mode="main"
      gameType="prefectures"
    />
  );
}
