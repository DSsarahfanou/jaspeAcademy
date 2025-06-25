'use client'

import { useState } from 'react'
import useSWR from 'swr'
import axios from '/src/lib/axios'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'

export default function AssignTeacherToFormation() {
  const [selectedFormation, setSelectedFormation] = useState('')
  const [teacherId, setTeacherId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch teachers with error handling
  const { data: teachers = [], error: teachersError } = useSWR('/api/teachers', () =>
    axios.get('http://127.0.0.1:8000/api/teachers')
      .then(res => res.data.data?.data || res.data.data || res.data || [])
      .catch(err => {
        toast.error('Erreur de chargement des enseignants')
        return []
      })
  )

  // Fetch unassigned formations with error handling
  const { data: formations = [], error: formationsError } = useSWR(
    '/api/teachers/unassigned-formations', 
    () => axios.get('http://127.0.0.1:8000/api/teachers/unassigned-formations')
      .then(res => res.data.data?.data || res.data.data || res.data || [])
      .catch(err => {
        toast.error('Erreur de chargement des formations')
        return []
      })
  )

  const handleAssign = async () => {
    if (!selectedFormation) {
      toast.error('Veuillez sélectionner une formation')
      return
    }
    if (!teacherId) {
      toast.error('Veuillez sélectionner un enseignant')
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await axios.post(`/api/teachers/assign/${selectedFormation}`, {
        teacher_id: teacherId,
      })

      toast.success('Formation assignée avec succès ✅')
      
      // Reset form
      setSelectedFormation('')
      setTeacherId('')
      
      // Revalidate data
      mutate('/api/teachers/unassigned-formations')
      mutate('/api/teachers/count-formations')
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Erreur lors de l'assignation"
      toast.error(errorMessage + ' ❌')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <h1 className="text-2xl font-bold mb-6">Assigner une formation</h1>

      <div className="space-y-4">
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-2">
            Formation non assignée
          </label>
          <select
            value={selectedFormation}
            onChange={(e) => setSelectedFormation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isSubmitting || formationsError}
          >
            <option value="">-- Sélectionner une formation --</option>
            {formations.map(f => (
              <option key={f.id} value={f.id}>
                {f.name} - {f.description || 'Sans description'}
              </option>
            ))}
          </select>
          {formationsError && (
            <p className="mt-1 text-sm text-red-600">Chargement des formations échoué</p>
          )}
          {formations.length === 0 && !formationsError && (
            <p className="mt-1 text-sm text-gray-500">Aucune formation disponible</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">
            Enseignant
          </label>
          <select
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isSubmitting || teachersError}
          >
            <option value="">-- Sélectionner un enseignant --</option>
            {teachers
              .filter(t => t.role === 'teacher')
              .map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} {t.surname} ({t.email})
                </option>
              ))}
          </select>
          {teachersError && (
            <p className="mt-1 text-sm text-red-600">Chargement des enseignants échoué</p>
          )}
        </div>

        <button
          onClick={handleAssign}
          disabled={isSubmitting || !selectedFormation || !teacherId}
          className={`px-6 py-3 rounded-lg font-medium w-full ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? 'Assignation en cours...' : 'Assigner la formation'}
        </button>
      </div>
    </div>
  )
}