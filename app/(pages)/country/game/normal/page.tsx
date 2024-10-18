'use client'
import React from 'react'
import { TypingGame } from '@/app/components/TypingGame'
import country from '@/app/country.json'

export default function CountryGameNormal() {
  return (
    <TypingGame
      allItems={country}
      itemCount={20}
      gameName='ふつうモード'
      gameDescription='ランダムに選ばれた20個の国で練習できます。'
      mode='main'
      gameType='country'
    />
  )
}
