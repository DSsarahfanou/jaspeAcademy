'use client'

import { useState } from 'react'
import useSWR from 'swr'
import axios from '/src/lib/axios'
import Link from 'next/link'
import { FaUserCheck, FaUserTimes, FaUsers } from 'react-icons/fa'
import { MdAssignmentInd } from 'react-icons/md'

export default function TeacherList() {
  const [filter, setFilter] = useState('all') // 'all' | 'assigned' | 'unassigned'

  const { data: allTeachers, error, isLoading } = useSWR('/api/teachers', () => 
    axios.get('/api/teachers').then(res => res.data.data)
  )

  const { data: unassignedTeachers } = useSWR('/api/teachers/unassigned', () => 
    axios.get('/api/teachers/unassigned').then(res => res.data.data)
  )

  const isUnassigned = (teacherId) => {
    return unassignedTeachers?.some(t => t.id === teacherId)
  }

  if (error) return <div>Erreur de chargement</div>
  if (isLoading || !unassignedTeachers || !allTeachers) return <div>Chargement...</div>

  const filteredTeachers = allTeachers.filter(teacher => {
    if (filter === 'assigned') return !isUnassigned(teacher.id)
    if (filter === 'unassigned') return isUnassigned(teacher.id)
    return true
  })

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Liste des Enseignants</h1>

      {/* Filtres */}
      <div className="mb-6 flex gap-3 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
            filter === 'all' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          } hover:shadow`}
        >
          <FaUsers /> Tous
        </button>

        <button
          onClick={() => setFilter('assigned')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
            filter === 'assigned' ? 'bg-green-600 text-white' : 'bg-white text-green-700'
          } hover:shadow`}
        >
          <FaUserCheck /> Assignés
        </button>

        <button
          onClick={() => setFilter('unassigned')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
            filter === 'unassigned' ? 'bg-yellow-400 text-white' : 'bg-white text-yellow-700'
          } hover:shadow`}
        >
          <FaUserTimes /> Non assignés
        </button>
      </div>

      {/* Liste des enseignants */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map(teacher => {
          const initials = teacher.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

          return (
            <div key={teacher.id} className="p-4 border rounded-xl shadow hover:shadow-lg transition bg-white">
              <div className="flex items-center gap-4 mb-4">
                {teacher.picture ? (
                  <img src={teacher.picture} alt={teacher.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
                    {initials}
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {teacher.name} {teacher.surname}
                  </h2>
                  <p className="text-gray-500 text-sm">{teacher.email}</p>
                </div>
              </div>

              {isUnassigned(teacher.id) ? (
                <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full mb-2">
                  Non assigné
                </span>
              ) : (
                <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mb-2">
                  Assigné
                </span>
              )}

              <div className="mt-2 flex flex-col gap-2">
                <Link 
                  href={`/dashboard/admin/teachers/${teacher.id}`}
                  className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                >
                  <MdAssignmentInd /> Voir formations
                </Link>

                <Link 
                  href="/dashboard/admin/teachers/assign"
                  className="text-sm inline-block px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  ➕ Assigner une formation
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
