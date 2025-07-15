// src/app/(app)/dashboard/admin/formations/[id]/page.js
'use client'

import { useEffect, useState } from 'react'
import axios from '/src/lib/axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '/src/components/ui/Button'
import { FaArrowLeft } from 'react-icons/fa';

export default function FormationDetails({ params }) {
  const { id } = params
  const router = useRouter()
  const [formation, setFormation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`/api/formations/${id}`)
        setFormation(response.data.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchFormation()
  }, [id])

  if (loading) {
    return (
      <div className="p-6">
        <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
        <p>Chargement en cours...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => router.back()} className="mt-4">
          Retour
        </Button>
      </div>
    )
  }

  if (!formation) {
    return (
      <div className="p-6">
        <p>Formation introuvable</p>
        <Button onClick={() => router.back()} className="mt-4">
          Retour
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <FaArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{formation.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section Informations de base */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Informations de base</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Catégorie</p>
              <p>{formation.categorie || 'Non spécifiée'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Prix</p>
              <p>{formation.price} FCFA</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Prérequis</p>
              <p className="whitespace-pre-line">{formation.prerequisites}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="whitespace-pre-line">{formation.formation_details}</p>
            </div>
          </div>
        </div>

        {/* Section Image */}
        {formation.picture && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Image</h2>
            <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
              <img 
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${formation.picture}`} 
                alt={formation.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Section Modules */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Modules</h2>
        <div className="space-y-6">
          {formation.modules?.map((module, moduleIndex) => (
            <div key={moduleIndex} className="border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">
                Module {moduleIndex + 1}: {module.title}
              </h3>
              <p className="text-gray-600 mb-4">{module.description}</p>

              <h4 className="font-medium mb-2">Leçons</h4>
              <div className="space-y-4">
                {module.lessons?.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="pl-4 border-l-2 border-gray-200">
                    <h5 className="font-medium">{lesson.title}</h5>
                    {lesson.content && (
                      <div className="mt-2">
                        <a 
                          href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${lesson.content}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Télécharger le PDF
                        </a>
                      </div>
                    )}
                    {lesson.video && (
                      <div className="mt-2">
                        <video 
                          controls 
                          className="w-full max-w-lg rounded-md"
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${lesson.video}`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Équipements */}
      {formation.equipments?.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Équipements nécessaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formation.equipments.map((equipment, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-medium">{equipment.name}</h3>
                <p className="text-sm text-gray-600">Quantité: {equipment.pivot?.quantity || 1}</p>
                <p className="text-sm text-gray-600">Prix: {equipment.price} €</p>
                {equipment.picture && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${equipment.image}`}
                    alt={equipment.name}
                    className="mt-2 w-full h-32 object-contain"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          Retour
        </Button>
        <Button asChild>
          <Link href={`/dashboard/admin/formations/${id}/edit`}>
            Modifier la formation
          </Link>
        </Button>
      </div>
    </div>
  )
}