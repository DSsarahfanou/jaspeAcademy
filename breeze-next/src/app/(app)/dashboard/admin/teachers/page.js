// 'use client'

// import { useState } from 'react'
// import useSWR from 'swr'
// import axios from '/src/lib/axios'
// import Link from 'next/link'
// import { FaUserCheck, FaUserTimes, FaUsers, FaBook } from 'react-icons/fa'
// import { MdAssignmentInd } from 'react-icons/md'

// export default function TeacherList() {
//   const [filter, setFilter] = useState('all') // all | assigned | unassigned

//   const { data: allTeachers, error, isLoading } = useSWR('/api/teachers', () =>
//     axios.get('http://127.0.0.1:8000/api/teachers').then(res => res.data.data)
//   )

//   const { data: unassignedTeachers } = useSWR('/api/teachers/unassigned', () =>
//     axios.get('http://127.0.0.1:8000/api/teachers/unassigned').then(res => res.data.data)
//   )

//   const { data: teacherFormations } = useSWR('/api/teachers/{id}/count-formations', () =>
//     axios.get('http://127.0.0.1:8000/api/teachers/{id}/count-formations').then(res => res.data.data)
//   )

//   const isUnassigned = (teacherId) => {
//     return unassignedTeachers?.some(t => t.id === teacherId)
//   }

//   const getFormationCount = (teacherId) => {
//     const found = teacherFormations?.find(f => f.teacher_id === teacherId)
//     return found ? found.count : 0
//   }

//   if (error) return <div>Erreur de chargement</div>
//   if (isLoading) return <div>Chargement...</div>

//   const filteredTeachers = allTeachers.filter(teacher => {
//     if (filter === 'assigned') return !isUnassigned(teacher.id)
//     if (filter === 'unassigned') return isUnassigned(teacher.id)
//     return true
//   })

//   return (
//     <div className="p-6">
//       <h1 className="mb-6 text-3xl font-bold text-gray-800">Liste des Enseignants</h1>

//       {/* Filtres */}
//       <div className="mb-6 flex gap-3 flex-wrap">
//         <button
//           onClick={() => setFilter('all')}
//           className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
//             filter === 'all' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
//           } hover:shadow`}
//         >
//           <FaUsers /> Tous
//         </button>

//         <button
//           onClick={() => setFilter('assigned')}
//           className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
//             filter === 'assigned' ? 'bg-green-600 text-white' : 'bg-white text-green-700'
//           } hover:shadow`}
//         >
//           <FaUserCheck /> Assignés
//         </button>

//         <button
//           onClick={() => setFilter('unassigned')}
//           className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
//             filter === 'unassigned' ? 'bg-yellow-400 text-white' : 'bg-white text-yellow-700'
//           } hover:shadow`}
//         >
//           <FaUserTimes /> Non assignés
//         </button>
//       </div>

//       {/* Liste des enseignants */}
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredTeachers.map(teacher => {
//           const initials = teacher.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
//           const formationCount = getFormationCount(teacher.id)

//           return (
//             <div key={teacher.id} className="p-4 border rounded-xl shadow hover:shadow-lg transition bg-white">
//               <div className="flex items-center gap-4 mb-4">
//                 {teacher.picture ? (
//                   <img src={teacher.picture} alt={teacher.name} className="w-12 h-12 rounded-full object-cover" />
//                 ) : (
//                   <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
//                     {initials}
//                   </div>
//                 )}
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-800">
//                     {teacher.name} {teacher.surname}
//                   </h2>
//                   <p className="text-gray-500 text-sm">{teacher.email}</p>
//                 </div>
//               </div>

//               {isUnassigned(teacher.id) ? (
//                 <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full mb-2">
//                   Non assigné
//                 </span>
//               ) : (
//                 <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mb-2">
//                   Assigné
//                 </span>
//               )}

//               <div className="text-sm text-gray-700 flex items-center gap-2 mb-2">
//                 <FaBook className="text-gray-500" />
//                 <span>{formationCount} formation{formationCount > 1 ? 's' : ''} assignée{formationCount > 1 ? 's' : ''}</span>
//               </div>

//               <div className="mt-2 flex flex-col gap-2">
//                 <Link 
//                   href={`/dashboard/admin/teachers/${teacher.id}`}
//                   className="text-blue-600 text-sm hover:underline flex items-center gap-1"
//                 >
//                   <MdAssignmentInd /> Voir formations
//                 </Link>

//                 <Link 
//                   href="/dashboard/admin/teachers/assign"
//                   className="text-sm inline-block px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   <faPlus></faPlus>
//                   ➕ Assigner une formation
//                 </Link>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }





'use client'

import { useState } from 'react'
import useSWR from 'swr'
import axios from '/src/lib/axios'
import Link from 'next/link'
import { FaUserCheck, FaUserTimes, FaUsers, FaBook, FaPlus } from 'react-icons/fa'
import { MdAssignmentInd } from 'react-icons/md'

export default function TeacherList() {
  const [filter, setFilter] = useState('all') // all | assigned | unassigned

  // Fetch teachers with formations count
  const { data: teachersResponse, error, isLoading } = useSWR('/api/teachers/count-formations', () =>
    axios.get('http://127.0.0.1:8000/api/teachers/count-formations').then(res => 
      res.data.data?.data || res.data.data || res.data
    )
  )

  // Fetch unassigned teachers
  const { data: unassignedData } = useSWR('/api/teachers/unassigned', () =>
    axios.get('http://127.0.0.1:8000/api/teachers/unassigned').then(res => 
      res.data.data?.data || res.data.data || res.data
    )
  )

  // Extract the actual array of teachers from the response
  const allTeachers = Array.isArray(teachersResponse) ? teachersResponse : []
  const unassignedTeachers = Array.isArray(unassignedData) ? unassignedData : []

  const isUnassigned = (teacherId) => {
    return unassignedTeachers.some(t => t.id === teacherId)
  }

  if (error) return <div className="p-6 text-red-500">Erreur de chargement des données</div>
  if (isLoading) return <div className="p-6">      
      <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
      <p>Chargement...</p> 
    </div>
  if (!allTeachers.length) return <div className="p-6">Aucun enseignant trouvé</div>

  const filteredTeachers = allTeachers.filter(teacher => {
    if (filter === 'assigned') return !isUnassigned(teacher.id || teacher.teacher_id)
    if (filter === 'unassigned') return isUnassigned(teacher.id || teacher.teacher_id)
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
          const teacherId = teacher.id || teacher.teacher_id
          const formationsCount = teacher.formations_count || 0

          return (
            <div key={teacherId} className="p-4 border rounded-xl shadow hover:shadow-lg transition bg-white">
              <div className="flex items-center gap-4 mb-4">
                {teacher.picture ? (
                  <img 
                    src={`http://localhost:8000/storage/${teacher.picture}`}
                    alt={`${teacher.name} ${teacher.surname}`} 
                    className="w-12 h-12 rounded-full object-cover" 
                  />
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

              {isUnassigned(teacherId) ? (
                <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full mb-2">
                  Non assigné
                </span>
              ) : (
                <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mb-2">
                  Assigné
                </span>
              )}

              <div className="text-sm text-gray-700 flex items-center gap-2 mb-2">
                <FaBook className="text-gray-500" />
                <span>{formationsCount} formation{formationsCount !== 1 ? 's' : ''}</span>
              </div>

              <div className="mt-2 flex flex-col gap-2">
                <Link 
                  href={`/dashboard/admin/teachers/${teacherId}`}
                  className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                >
                  <MdAssignmentInd /> Voir formations
                </Link>

                <Link 
                  href="/dashboard/admin/teachers/assign"
                  className="text-sm inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <FaPlus size={12} />
                  Assigner une formation
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}