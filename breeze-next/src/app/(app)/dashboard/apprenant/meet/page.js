"use client";

import { useEffect, useState } from "react";
import axios from "/src/lib/axios";
import JoinRoom from "/src/components/JoinRoom";
import { FaCalendarAlt, FaLevelUpAlt, FaChalkboardTeacher } from "react-icons/fa";

// export default function StudentMeetings() {
//   const [meetings, setMeetings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedRoom, setSelectedRoom] = useState(null);

//   //Fonction propre pour marquer l'inscription avant d'entrer
//   const handleJoin = async (meetingId, roomLink) => {
//     try {
//       await axios.post(`/api/meetings/${meetingId}/attendance`);
//       // Après succès ➜ lancer JoinRoom
//       setSelectedRoom(roomLink);
//     } catch (error) {
//       console.error("Erreur lors de l'enregistrement :", error);
//       alert("Impossible de rejoindre la réunion.");
//     }
//   };

//   useEffect(() => {
//     axios.get("/api/student/meetings")
//       .then(res => setMeetings(res.data))
//       .catch(err => console.error(err))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center text-gray-600">
//         <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
//         <p>Chargement des Réunions...</p> 
//       </div>
//     );
//   }

//   if (selectedRoom) {
//     return <JoinRoom roomName={selectedRoom} />;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Mes Réunions</h1>

//       {meetings.length === 0 && (
//         <p className="text-gray-600">Aucune réunion disponible pour votre progression.</p>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {meetings.map(meeting => (
//           <div
//             key={meeting.id}
//             className="border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between bg-white hover:shadow-md transition-shadow"
//           >
//             <div className="mb-4 space-y-2">
//               <h2 className="text-lg font-semibold">{meeting.formation.name}</h2>
//               <p className="text-sm text-gray-700 flex items-center gap-2">
//                 <FaLevelUpAlt className="text-blue-600" />
//                 <strong>Niveau requis:</strong> {meeting.progression_level}%
//               </p>
//               <p className="text-sm text-gray-700 flex items-center gap-2">
//                 <FaCalendarAlt className="text-green-600" />
//                 <strong>Date:</strong> {new Date(meeting.scheduled_at).toLocaleString()}
//               </p>
//               <p className="text-sm text-gray-700 flex items-center gap-2">
//                 <FaChalkboardTeacher className="text-purple-600" />
//                 <strong>Animateur:</strong> {meeting.teacher.name} {meeting.teacher.surname}
//               </p>
//             </div>

//             <button
//               onClick={() => handleJoin(meeting.id, meeting.room_link)}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
//             >
//               Rejoindre
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

export default function StudentMeetings() {
  const [meetings, setMeetings] = useState({ available: [], completed: [] });
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeTab, setActiveTab] = useState('available'); // 'available' ou 'completed'

  const handleJoin = async (meetingId, roomLink) => {
    try {
      await axios.post(`/api/meetings/${meetingId}/attendance`);
      setSelectedRoom(roomLink);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      alert("Impossible de rejoindre la réunion.");
    }
  };

  useEffect(() => {
    axios.get("/api/student/meetings")
      .then(res => setMeetings(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
        <p>Chargement des Réunions...</p> 
      </div>
    );
  }

  if (selectedRoom) {
    return <JoinRoom roomName={selectedRoom} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mes Réunions</h1>

      {/* Onglets */}
      <div className="flex border-b  mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'available' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('available')}
        >
          Réunions à venir
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'completed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('completed')}
        >
          Historique
        </button>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'available' && (
        <>
          {meetings.available.length === 0 ? (
            <p className="text-gray-600">Aucune réunion disponible pour votre progression.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {meetings.available.map(meeting => (
                <MeetingCard 
                  key={meeting.id} 
                  meeting={meeting} 
                  onJoin={handleJoin}
                  isCompleted={false}
                />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'completed' && (
        <>
          {meetings.completed.length === 0 ? (
            <p className="text-gray-600">Vous n'avez pas encore participé à des réunions.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {meetings.completed.map(meeting => (
                <MeetingCard 
                  key={meeting.id} 
                  meeting={meeting} 
                  onJoin={handleJoin}
                  isCompleted={true}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Composant MeetingCard séparé pour plus de clarté
function MeetingCard({ meeting, onJoin, isCompleted }) {
  return (
    <div className="border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between bg-white hover:shadow-md transition-shadow">
      <div className="mb-4 space-y-2">
        <h2 className="text-lg font-semibold">{meeting.formation.name}</h2>
        <p className="text-sm text-gray-700 flex items-center gap-2">
          <FaLevelUpAlt className="text-blue-600" />
          <strong>Niveau requis:</strong> {meeting.progression_level}%
        </p>
        <p className="text-sm text-gray-700 flex items-center gap-2">
          <FaCalendarAlt className="text-green-600" />
          <strong>Date:</strong> {new Date(meeting.scheduled_at).toLocaleString()}
        </p>
        <p className="text-sm text-gray-700 flex items-center gap-2">
          <FaChalkboardTeacher className="text-purple-600" />
          <strong>Animateur:</strong> {meeting.teacher.name} {meeting.teacher.surname}
        </p>
      </div>

      {isCompleted ? (
        <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium text-center">
          Complétée
        </span>
      ) : (
        <button
          onClick={() => onJoin(meeting.id, meeting.room_link)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Rejoindre
        </button>
      )}
    </div>
  );
}
