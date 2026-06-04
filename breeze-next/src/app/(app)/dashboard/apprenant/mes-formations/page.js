// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import axios from "/src/lib/axios";
// import { useAuth } from "/src/hooks/auth";

// export default function MesFormationsPage() {
//   const [completedFormations, setCompletedFormations] = useState([]);
//   const [inProgressFormations, setInProgressFormations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("in_progress"); // 'in_progress' ou 'completed'
//   const { user } = useAuth({ middleware: 'auth' });

//   useEffect(() => {
//     const fetchFormations = async () => {
//       if (!user) return;

//       try {
//         const res = await axios.get(`/api/student/${user.id}/formations`);
//         setCompletedFormations(res.data.completed_formations || []);
//         setInProgressFormations(res.data.in_progress_formations || []);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des formations :", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFormations();
//   }, [user]);

//   if (loading || !user) {
//     return (
//       <div className="p-6 text-center">
//         <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4 mx-auto" />
//         <p>Chargement...</p> 
//       </div>
//     );
//   }

//   const renderFormationCard = (formation) => (
//     <Link
//       key={formation.id}
//       href={`/dashboard/apprenant/mes-formations/${formation.id}`}
//       className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
//     >
//       <img
//         src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${formation.picture}`}
//         alt={formation.name}
//         className="w-full h-48 object-cover"
//       />
//       <div className="p-4">
//         <h2 className="text-xl font-semibold">{formation.name}</h2>
//         <div className="flex justify-between items-center mt-2">
//           <span className={`px-2 py-1 rounded text-xs font-medium ${
//             formation.pivot_data?.progression >= 100 
//               ? 'bg-green-100 text-green-800' 
//               : 'bg-blue-100 text-blue-800'
//           }`}>
//             {formation.pivot_data?.progression}% complété
//           </span>
//         </div>
//         <p className="text-gray-600 text-sm mt-2 line-clamp-2">
//           {formation.formation_details}
//         </p>

//         {formation.teachers && (
//           <div className="mt-3 flex items-center gap-2">
//             <img
//               src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${formation.teachers.picture}`}
//               alt={`${formation.teachers.name} ${formation.teachers.surname}`}
//               className="w-8 h-8 rounded-full object-cover"
//             />
//             <p className="text-sm text-blue-800 font-medium">
//               {formation.teachers.name} {formation.teachers.surname}
//             </p>
//           </div>
//         )}
//       </div>
//     </Link>
//   );

//   return (
//     <div className="p-4 md:p-6">
//       <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//         <h1 className="text-2xl font-bold text-center">Mes Formations</h1>
        
//         {/* Onglets */}
//         <div className="flex border-b mt-4">
//           <button
//             className={`px-4 py-2 font-medium text-sm ${
//               activeTab === 'in_progress' 
//                 ? 'text-indigo-600 border-b-2 border-indigo-600' 
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//             onClick={() => setActiveTab('in_progress')}
//           >
//             En cours ({inProgressFormations.length})
//           </button>
//           <button
//             className={`px-4 py-2 font-medium text-sm ${
//               activeTab === 'completed' 
//                 ? 'text-indigo-600 border-b-2 border-indigo-600' 
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}
//             onClick={() => setActiveTab('completed')}
//           >
//             Terminées ({completedFormations.length})
//           </button>
//         </div>
//       </div>

//       {/* Contenu des onglets */}
//       {inProgressFormations.length === 0 && completedFormations.length === 0 ? (
//         <div className="text-center py-8">
//           <p className="text-gray-500">Aucune formation suivie pour le moment.</p>
//         </div>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {activeTab === 'in_progress' 
//             ? inProgressFormations.map(renderFormationCard)
//             : completedFormations.map(renderFormationCard)
//           }
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "/src/lib/axios";
import { useAuth } from "/src/hooks/auth";

export default function MesFormationsPage() {
  const [completedFormations, setCompletedFormations] = useState([]);
  const [inProgressFormations, setInProgressFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("in_progress"); // 'in_progress' ou 'completed'
  const { user } = useAuth({ middleware: 'auth' });

  useEffect(() => {
    const fetchFormations = async () => {
      if (!user) return;

      try {
        const res = await axios.get(`/api/student/${user.id}/formations`);
        setCompletedFormations(res.data.completed_formations || []);
        setInProgressFormations(res.data.in_progress_formations || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des formations :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-gray-600">
        <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4 mx-auto" />
        <p>Chargement...</p> 
      </div>
    );
  }

  const renderFormationCard = (formation) => (
    <Link
      key={formation.id}
      href={`/dashboard/apprenant/mes-formations/${formation.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    >
      <img
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${formation.picture}`}
        alt={formation.name}
        className="w-full h-40 sm:h-48 object-cover"
      />
      <div className="p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl font-semibold">{formation.name}</h2>
        <div className="flex justify-between items-center mt-1 sm:mt-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            formation.pivot_data?.progression >= 100 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {formation.pivot_data?.progression}% complété
          </span>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-2">
          {formation.formation_details}
        </p>

        {formation.teachers && (
          <div className="mt-2 sm:mt-3 flex items-center gap-2">
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${formation.teachers.picture}`}
              alt={`${formation.teachers.name} ${formation.teachers.surname}`}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
            />
            <p className="text-xs sm:text-sm text-blue-800 font-medium">
              {formation.teachers.name} {formation.teachers.surname}
            </p>
          </div>
        )}
      </div>
    </Link>
  );

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center">Mes Formations</h1>
        
        {/* Onglets */}
        <div className="flex border-b mt-3 sm:mt-4 overflow-x-auto">
          <button
            className={`px-3 py-1 sm:px-4 sm:py-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'in_progress' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('in_progress')}
          >
            En cours ({inProgressFormations.length})
          </button>
          <button
            className={`px-3 py-1 sm:px-4 sm:py-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'completed' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Terminées ({completedFormations.length})
          </button>
        </div>
      </div>

      {/* Contenu des onglets */}
      {inProgressFormations.length === 0 && completedFormations.length === 0 ? (
        <div className="text-center py-6 sm:py-8">
          <p className="text-gray-500 text-sm sm:text-base">Aucune formation suivie pour le moment.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {activeTab === 'in_progress' 
            ? inProgressFormations.map(renderFormationCard)
            : completedFormations.map(renderFormationCard)
          }
        </div>
      )}
    </div>
  );
}
