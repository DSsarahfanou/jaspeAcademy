// /dashboard/animateur/reunions/page.js
"use client";

import Link from "next/link";

const reunions = [
  {
    id: "r1",
    sujet: "Suivi des progrès en Réseaux",
    date: "2025-06-15",
    heure: "14:00",
    lien: "https://meet.jaspeacademy.com/reunion1",
  },
  {
    id: "r2",
    sujet: "Présentation finale en Sécurité",
    date: "2025-06-20",
    heure: "10:00",
    lien: "https://meet.jaspeacademy.com/reunion2",
  },
];

export default function ReunionsAnimateur() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-purple-700">Mes Réunions</h2>

        <div className="text-right">
          <Link
            href="/dashboard/animateur/reunions/create"
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            + Créer une Réunion
          </Link>
        </div>
      </div>

      {reunions.map((reunion) => (
        <div
          key={reunion.id}
          className="mb-6 p-4 border rounded-lg bg-gray-50"
        >
          <h3 className="text-xl font-semibold text-gray-800">{reunion.sujet}</h3>
          <p className="text-gray-600">
            📅 {reunion.date} à 🕒 {reunion.heure}
          </p>
          <p className="text-blue-600">
            🔗{" "}
            <a
              href={reunion.lien}
              target="_blank"
              rel="noopener noreferrer"
            >
              {reunion.lien}
            </a>
          </p>

          <div className="mt-4">
            <Link
              href={`/dashboard/animateur/reunions/${reunion.id}`}
              className="text-sm text-purple-600 hover:underline"
            >
              Voir détails →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
