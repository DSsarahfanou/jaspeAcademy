'use client'
import React from 'react'
import { useRouter } from 'next/router'

export default function FormationModules({params}) {
  const { id } = params

  return (
    <div>
      <h1 className="text-xl font-bold">Modules et leçons pour la formation {id}</h1>
    </div>
  )
}
