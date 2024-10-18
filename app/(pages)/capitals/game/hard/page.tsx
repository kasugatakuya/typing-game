'use client'
import React from 'react'
import { TypingGame } from '@/app/components/TypingGame'
import country from '@/app/country.json'

export default function CapitalGameHard() {
  return (
    <TypingGame
      allItems={country}
      itemCount={40}
      gameName='むずかしいモード'
      gameDescription='ランダムに選ばれた40個の首都で練習できます。'
      mode='sub'
      gameType='country'
    />
  )
}
