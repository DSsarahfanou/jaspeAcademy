'use client'

import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import axios from '/src/lib/axios'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'

export default function AssignTeacherToFormation() {
  const [selectedFormation, setSelectedFormation] = useState(null)
  const [teacherId, setTeacherId] = useState('')

  const { data: teachers } = useSWR('/api/teachers', () =>
    axios.get('/api/teachers').then(res => res.data.data)
  )

  const { data: formations } = useSWR('/api/teachers/unassigned-formations', () =>
    axios.get('/api/teachers/unassigned-formations').then(res => res.data.data)
  )

  const handleAssign = async () => {
    if (!selectedFormation || !teacherId) {
      toast.error('Veuillez sélectionner une formation et un enseignant.')
      return
    }

    try {
      await axios.post(`/api/teachers/assign/${selectedFormation}`, {
        teacher_id: teacherId,
      })

      toast.success('Formation assignée avec succès ✅')
      setSelectedFormation(null)
      setTeacherId('')
      mutate('/api/teachers/unassigned-formations')
    } catch (err) {
      toast.error("Erreur lors de l'assignation ❌")
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
       <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <h1 className="text-2xl font-bold mb-4">Assigner une formation</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Formation</label>
        <select
          value={selectedFormation || ''}
          onChange={e => setSelectedFormation(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Choisir une formation --</option>
          {formations?.map(f => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Enseignant</label>
        <select
          value={teacherId}
          onChange={e => setTeacherId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Choisir un enseignant --</option>
          {teachers?.map(t => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAssign}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Assigner
      </button>
    </div>
  )
}
