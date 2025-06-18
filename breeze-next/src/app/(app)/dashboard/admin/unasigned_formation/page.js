import useSWR from 'swr'
import axios from '@/lib/axios'
import { useState } from 'react'

export default function UnassignedFormations() {
  const { data: formations, error, mutate } = useSWR(
    '/api/formations/unassigned', 
    () => axios.get('/api/formations/unassigned').then(res => res.data.data)
  )
  
  const [assigning, setAssigning] = useState(null)
  const [selectedTeacher, setSelectedTeacher] = useState('')
  const [teachers, setTeachers] = useState([])

  const fetchTeachers = async () => {
    const res = await axios.get('/api/teachers')
    setTeachers(res.data.data)
  }

  const handleAssign = async (formationId) => {
    try {
      await axios.post(`/api/formations/${formationId}/assign`, {
        teacher_id: selectedTeacher
      })
      mutate() // Rafraîchir la liste
      setAssigning(null)
    } catch (err) {
      console.error(err)
    }
  }

  if (error) return <div>Erreur de chargement</div>
  if (!formations) return <div>Chargement...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Formations non assignées</h1>
      
      <div className="space-y-4">
        {formations.map(formation => (
          <div key={formation.id} className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold">{formation.name}</h2>
            <p className="text-gray-600">{formation.formation_details}</p>
            
            {assigning === formation.id ? (
              <div className="mt-3 space-y-2">
                <select 
                  className="border p-2 rounded"
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                >
                  <option value="">Sélectionnez un enseignant</option>
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAssign(formation.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Confirmer
                  </button>
                  <button 
                    onClick={() => setAssigning(null)}
                    className="border px-3 py-1 rounded"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  fetchTeachers()
                  setAssigning(formation.id)
                }}
                className="mt-2 text-blue-600 hover:underline"
              >
                Assigner un enseignant →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}