'use client'

import { useState } from 'react'
import { FaPlus, FaTrash, FaEdit, FaTools, FaVideo, FaFileAlt } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useFormations } from '/src/hooks/useFormations' // Assurez-vous que ce hook existe
import { Card, CardContent } from '/src/components/ui/Card'
import { Button } from '/src/components/ui/Button'

export default function FormationsManagementPage() {
  const router = useRouter()
  const { formations, deleteFormation, loading } = useFormations()

  const handleDelete = (id) => {
    if (confirm('Supprimer cette formation ?')) {
      deleteFormation(id)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestion des Formations</h1>
        <Button onClick={() => router.push('/dashboard/admin/formations/create')} className="flex items-center gap-2">
          <FaPlus /> Ajouter une formation
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {formations?.map((formation) => (
          <Card key={formation.id}>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{formation.name}</h2>
                {formation.picture ? (
                  <img
                    src={`http://localhost:8000/storage/${formation.picture}`}
                    alt={formation.name}
                    className="object-cover w-full h-40 mb-4 rounded"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-40 mb-4 text-gray-500 bg-gray-200 rounded">
                    Pas d’image
                  </div>
              )}
              <p className="text-sm text-gray-600">{formation.formation_details || 'Aucune description'}</p>
              <p className="text-sm">Prix : {formation.price} FCFA</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button className="bg-red-500" onClick={() => handleDelete(formation.id)} variant="destructive">
                  <FaTrash className="mr-1" /> Supprimer
                </Button>
                <Button onClick={() => router.push(`/dashboard/admin/formations/${formation.id}`)}>
                  Détails
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
