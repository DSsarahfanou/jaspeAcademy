// src/app/(app)/dashboard/admin/formations/[id]/page.js
'use client'

export default function FormationDetails({ params }) {
  const { id } = params

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Détails de la formation #{id}</h1>
      {/* Tu peux fetch ici les données de la formation avec useEffect + axios/swr */}
    </div>
  )
}
