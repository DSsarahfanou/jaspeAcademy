"use client";

import Link from "next/link";

const formations = [
  {
    id: 1,
    name: "Introduction aux Réseaux",
    animateur: "M. Diallo",
    formation_details: "Les bases essentielles des réseaux informatiques.",
  },
  {
    id: 2,
    name: "Sécurité des Systèmes",
    animateur: "Mme Traoré",
    formation_details: "Protection des infrastructures réseau et bonnes pratiques.",
  },
];

export default function MesFormationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mes Formations</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {formations.map((formation) => (
          <Link
            key={formation.id}
            href={`/dashboard/apprenant/mes-formations/${formation.id}`}
            className="block p-4 bg-white rounded shadow hover:bg-blue-50 transition"
          >
            <h2 className="text-xl font-semibold">{formation.name}</h2>
            <p className="text-gray-600 text-sm mt-1">{formation.formation_details}</p>
            <p className="text-sm mt-2 text-blue-800 font-medium">Animateur : {formation.animateur}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
