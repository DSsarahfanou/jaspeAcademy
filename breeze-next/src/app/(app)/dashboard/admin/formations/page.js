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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Formations</h1>
        <Button onClick={() => router.push('/dashboard/admin/formations/create')} className="flex items-center gap-2">
          <FaPlus /> Ajouter une formation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formations?.map((formation) => (
          <Card key={formation.id}>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{formation.title}</h2>
              <p className="text-sm text-gray-500">{formation.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button onClick={() => router.push(`/dashboard/admin/formations/${formation.id}/edit`)}>
                  <FaEdit className="mr-1" /> Modifier
                </Button>
                <Button onClick={() => handleDelete(formation.id)} variant="destructive">
                  <FaTrash className="mr-1" /> Supprimer
                </Button>
                <Button onClick={() => router.push(`/dashboard/admin/formations/${formation.id}/equipments`)}>
                  <FaTools className="mr-1" /> Équipements
                </Button>
                <Button onClick={() => router.push(`/dashboard/admin/formations/${formation.id}/modules`)}>
                  <FaVideo className="mr-1" /> Modules / Leçons
                </Button>
                <Button onClick={() => router.push(`/dashboard/admin/formations/${formation.id}/quiz`)}>
                  <FaFileAlt className="mr-1" /> Quiz
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
