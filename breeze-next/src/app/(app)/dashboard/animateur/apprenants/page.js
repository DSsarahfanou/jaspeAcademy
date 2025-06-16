// /dashboard/animateur/apprenants/page.js
"use client";

import Link from "next/link";

const apprenants = [
  {
    id: "a1",
    nom: "Fatou Diop",
    email: "fatou.diop@jaspeacademy.com",
    telephone: "+221 77 123 45 67",
    formation: "Administration Réseaux",
  },
  {
    id: "a2",
    nom: "Moussa Traoré",
    email: "moussa.traore@jaspeacademy.com",
    telephone: "+223 76 456 78 90",
    formation: "Sécurité Informatique",
  },
];

export default function ListeApprenants() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">Mes Apprenants</h2>

      {apprenants.map((apprenant) => (
        <div
          key={apprenant.id}
          className="mb-4 p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
        >
          <h3 className="text-xl font-semibold text-gray-800">{apprenant.nom}</h3>
          <p className="text-gray-600">📧 {apprenant.email}</p>
          <p className="text-gray-600">📞 {apprenant.telephone}</p>
          <p className="text-gray-600">🎓 Formation : {apprenant.formation}</p>

          <div className="mt-3">
            <Link
              href={`/dashboard/animateur/apprenants/${apprenant.id}`}
              className="text-sm text-purple-600 hover:underline"
            >
              Voir le détail →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
