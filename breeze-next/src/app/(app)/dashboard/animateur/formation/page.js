"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "/src/lib/axios"; // Assure-toi qu'Axios gère bien les cookies Sanctum

export default function TeacherFormations() {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get("/api/teacher/formations");
        setFormations(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des formations :", error);
      }
    };

    fetchFormations();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">
        Mes Formations Animées
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {formations.map((formation) => (
          <div
            key={formation.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-200"
          >
            {formation.picture && (
              <div className="relative h-40 w-full">
                <Image
                  src={`http://localhost:8000/storage/${formation.picture}`}
                  alt={formation.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div>
            )}

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {formation.name}
              </h2>
              <p className="text-gray-600 mb-4">
                Nombre d'apprenants :{" "}
                <span className="font-medium">{formation.students_count}</span>
              </p>
              <Link
                href={`/dashboard/animateur/formation/${formation.id}`}
                className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
              >
                Voir détails →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
