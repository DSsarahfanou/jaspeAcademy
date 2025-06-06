'use client'
import React from 'react'
import { useRouter } from 'next/router'

export default function FormationQuiz({params}) {
  const { id } = params
  return (
    <div>
      <h1 className="text-xl font-bold">Préparer un quiz pour la formation {id}</h1>
    </div>
  )
}
