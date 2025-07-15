'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import axios from '/src/lib/axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'

export default function TeacherDetails() {
  const { id } = useParams()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

  const { data, error, isLoading, mutate } = useSWR(
    `/api/teachers/${id}`, 
    () => axios.get(`${apiUrl}/api/teachers/${id}`)
      .then(res => res.data.data)
      .catch(err => {
        toast.error('Erreur de chargement des données')
        throw err
      })
  )

  const handleUnassign = async (formationId) => {
    if (!confirm('Êtes-vous sûr de vouloir retirer cette formation ?')) return
    
    try {
      await toast.promise(
        axios.delete(`/api/teachers/unassign/${formationId}`),
        {
          loading: 'Désassignation en cours...',
          success: () => {
            mutate()
            return 'Formation désassignée avec succès ✅'
          },
          error: 'Échec de la désassignation ❌'
        }
      )
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  if (error) return (
    <div className="p-6 text-red-500">
      Erreur de chargement des données
      <Link href="/dashboard/admin/teachers" className="block mt-4 text-blue-600 hover:underline">
        ← Retour à la liste
      </Link>
    </div>
  )

  if (isLoading) return (
    <div className="p-6 flex justify-center">
      <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
      <p>Chargement...</p> 
    </div>
  )

  if (!data || !data.teacher) return (
    <div className="p-6 text-gray-500">
      Données indisponibles
      <Link href="/dashboard/admin/teachers" className="block mt-4 text-blue-600 hover:underline">
        ← Retour à la liste
      </Link>
    </div>
  )

  const { teacher, formations } = data
  const {teacher_formations} = teacher
console.log(teacher_formations)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Toaster position="top-right" />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {teacher.name} {teacher.surname}
        </h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <p><span className="font-medium">Email:</span> {teacher.email}</p>
          <p><span className="font-medium">Téléphone:</span> {teacher.phone || 'Non renseigné'}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Formations assignées</h2>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {teacher_formations.length} formation{teacher_formations.length !== 1 ? 's' : ''}
          </span>
        </div>

        {teacher_formations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Aucune formation assignée à cet enseignant</p>
            <Link 
              href="/dashboard/admin/teachers/assign" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Assigner une formation
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {teacher_formations.map(formation => (
              <div key={formation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-lg mb-1">{formation.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{formation.formation_details || 'Pas de description'}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {formation.modules_count || 0} modules
                  </span>
                  <button
                    onClick={() => handleUnassign(formation.id)}
                    className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200 transition-colors"
                  >
                    Retirer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <Link
          href="/dashboard/admin/teachers"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à la liste des enseignants
        </Link>
      </div>
    </div>
  )
}