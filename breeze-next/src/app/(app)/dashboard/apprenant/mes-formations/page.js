"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "/src/lib/axios";
import { useAuth } from "/src/hooks/auth"; // assure-toi que le chemin est correct

export default function MesFormationsPage() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth({ middleware: 'auth' }); // protège la page

  useEffect(() => {
    const fetchFormations = async () => {
      if (!user) return;

      try {
        const res = await axios.get(`/api/student/${user.id}/formations`);
        setFormations(res.data.formations);
      } catch (error) {
        console.error("Erreur lors de la récupération des formations :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, [user]);

  if (loading || !user) {
    return <div className="p-6 text-center">
      <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
      <p>Chargement...</p> 
    </div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mes Formations</h1>

      {formations.length === 0 ? (
        <p className="text-gray-600">Aucune formation suivie.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {formations.map((formation) => (
            <Link
              key={formation.id}
              href={`/dashboard/apprenant/mes-formations/${formation.id}`}
              className="block bg-white rounded shadow hover:bg-blue-50 transition overflow-hidden"
            >
              <img
                src={`http://localhost:8000/storage/${formation.picture}`}
                alt={formation.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{formation.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{formation.formation_details}</p>

                {formation.teachers && (
                  <div className="mt-3 flex items-center gap-2">
                    <img
                      src={`http://localhost:8000/storage/${formation.teachers.picture}`}
                      alt={`${formation.teachers.name} ${formation.teachers.surname}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="text-sm text-blue-800 font-medium">
                      Animateur : {formation.teachers.name} {formation.teachers.surname}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
