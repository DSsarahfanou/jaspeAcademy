'use client'

export default function FormationEquipments({ params }) {
  const { id } = params

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Équipements de la formation #{id}</h1>
      {/* Tu peux ajouter ici l’affichage ou la gestion des équipements liés */}
    </div>
  )
}
