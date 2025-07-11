// /dashboard/animateur/reunions/create/page.js
'use client';

import { useAuth } from '/src/hooks/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import axios from '/src/lib/axios';
import MeetingScheduler from '/src/components/dashboard/animateur/MeetingScheduler';

const fetchFormation = (url) => axios.get(url).then((res) => res.data);

export default function MeetingsCreate() {
  const { user, logout } = useAuth({ middleware: 'auth' });
  const searchParams = useSearchParams();
  // const formationId = searchParams.get('formationId');
  const formationId =2;
  const router = useRouter();

  const { data: formation, error } = useSWR(
    user && formationId ? `/api/formations/teacher/${user.id}?minProgression=0` : null,
    fetchFormation
  );

  if (!user) {
    return <div>Chargement...</div>;
  }

  if (user.role !== 'teacher') {
    logout();
    return null;
  }

  if (!formationId) {
    return <div>ID de la formation manquant</div>;
  }

  if (!formation) return <div>Chargement de la formation...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  const selectedFormation = formation.formations.find((f) => f.id === parseInt(formationId));

  if (!selectedFormation) {
    return <div>Formation non trouvée</div>;
  }

  const progressLevels = [25, 50, 75];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Gérer les réunions pour {selectedFormation.name}</h1>
      {progressLevels.map((level) => (
        <div key={level} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Niveau de progression : {level}%</h2>
          <MeetingScheduler
            formationId={formationId}
            progressLevel={level}
            students={selectedFormation.students.filter(
              (student) =>
                student.pivot.progression >= level &&
                !student.meetings.some((meeting) => meeting.progress_level === level)
            )}
          />
        </div>
      ))}
      <button
        onClick={() => router.push(`/dashboard/animateur/formation/${formationId}`)}
        className="mt-6 inline-block bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
      >
        Retour à la formation
      </button>
    </div>
  );
}