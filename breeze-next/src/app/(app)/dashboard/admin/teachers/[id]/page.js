'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import axios from '/src/lib/axios'
import Link from 'next/link'

export default function TeacherDetails() {
  const { id } = useParams()

  const {
    data,
    error,
    isLoading,
    mutate
  } = useSWR(`/api/teachers/${id}`, () =>
    axios.get(`/api/teachers/${id}`).then(res => res.data.data)
  )

  const handleUnassign = async (formationId) => {
    try {
      await axios.delete(`/api/teachers/unassign/${formationId}`)
      await mutate() // recharge les données après suppression
    } catch (error) {
      console.error('Erreur lors de la désassignation', error)
      alert('Une erreur est survenue lors de la désassignation.')
    }
  }

  if (error) return <div>❌ Erreur de chargement</div>
  if (isLoading) return <div>⏳ Chargement...</div>
  if (!data || !data.teacher) return <div>🚫 Données indisponibles</div>

  const { teacher, formations } = data

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{teacher.name}</h1>
      <p className="text-gray-700 mb-6">{teacher.email}</p>

      <h2 className="text-xl font-semibold mb-2">Formations assignées</h2>

      {formations.length === 0 ? (
        <p className="text-gray-500">Aucune formation assignée.</p>
      ) : (
        <ul className="space-y-3">
          {formations.map(formation => (
            <li key={formation.id} className="p-4 border rounded">
              <div className="font-medium">{formation.name}</div>
              <div className="text-sm text-gray-500">{formation.formation_details}</div>
              <button
                onClick={() => handleUnassign(formation.id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/dashboard/admin/teachers"
        className="inline-block mt-6 text-blue-600 hover:underline"
      >
        ← Retour à la liste
      </Link>
    </div>
  )
}
