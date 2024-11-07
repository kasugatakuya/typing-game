"use client";
import React from "react";
import { TypingGame } from "@/app/components/TypingGame";
import country from "@/app/country.json";

export default function CapitalsGameEasy() {
  return (
    <TypingGame
      allItems={country}
      itemCount={5}
      gameName="かんたんモード"
      gameDescription="ランダムに選ばれた5個の首都で練習できます。"
      mode="sub"
      gameType="country"
    />
  );
}
