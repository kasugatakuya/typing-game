'use client'
import React from 'react'
import { TypingGame } from '@/app/components/TypingGame'
import country from '@/app/country.json'

export default function CountryGameEasy() {
  return (
    <TypingGame
      allItems={country}
      itemCount={5}
      gameName='かんたんモード'
      gameDescription='ランダムに選ばれた5個の国で練習できます。'
      mode='main'
      gameType='country'
    />
  )
}
