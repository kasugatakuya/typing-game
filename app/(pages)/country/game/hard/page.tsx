'use client'
import React from 'react'
import { TypingGame } from '@/app/components/TypingGame'
import country from '@/app/country.json'

export default function CountryGameHard() {
  return (
    <TypingGame
      allItems={country}
      itemCount={40}
      gameName='むずかしいモード'
      gameDescription='ランダムに選ばれた40個の国で練習できます。'
      mode='main'
      gameType='country'
    />
  )
}
