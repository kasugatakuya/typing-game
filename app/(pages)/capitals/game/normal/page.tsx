'use client'
import React from 'react'
import { TypingGame } from '@/app/components/TypingGame'
import country from '@/app/country.json'

export default function CapitalGameNormal() {
  return (
    <TypingGame
      allItems={country}
      itemCount={20}
      gameName='ふつうモード'
      gameDescription='ランダムに選ばれた20個の首都で練習できます。'
      mode='sub'
      gameType='country'
    />
  )
}
