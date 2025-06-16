"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const formations = [
  {
    id: "1",
    titre: "Réseaux Informatiques",
    description:
      "Apprenez les bases des réseaux informatiques, protocoles, topologies, et sécurité.",
    modules: [
      { id: "m1", titre: "Introduction aux réseaux" },
      { id: "m2", titre: "Modèles OSI et TCP/IP" },
      { id: "m3", titre: "Configuration de routeurs" },
    ],
  },
  {
    id: "2",
    titre: "Sécurité des systèmes",
    description:
      "Comprendre les principes fondamentaux de la sécurité informatique et des systèmes.",
    modules: [
      { id: "m1", titre: "Introduction à la sécurité" },
      { id: "m2", titre: "Cryptographie" },
      { id: "m3", titre: "Sécurité des réseaux" },
    ],
  },
  {
    id: "3",
    titre: "Programmation Web",
    description:
      "Apprenez à développer des applications web modernes avec React et Node.js.",
    modules: [
      { id: "m1", titre: "HTML, CSS et JavaScript" },
      { id: "m2", titre: "React.js" },
      { id: "m3", titre: "Node.js & API" },
    ],
  },
];

export default function DetailFormation() {
  const params = useParams();
  const formation = formations.find((f) => f.id === params.id);

  if (!formation) {
    return (
      <div className="text-center mt-10 text-red-500">
        Formation non trouvée.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-4 text-purple-700">
        {formation.titre}
      </h2>
      <p className="mb-6 text-gray-700">{formation.description}</p>

      <h3 className="text-2xl font-semibold mb-3">Modules</h3>
      <ul className="space-y-3 mb-6">
        {formation.modules.map((module) => (
          <li
            key={module.id}
            className="flex items-center justify-between bg-gray-50 p-3 rounded border"
          >
            <span className="text-gray-800 font-medium">{module.titre}</span>
            <Link
              href={`/dashboard/animateur/formation/${formation.id}/module/${module.id}`}
              className="text-sm text-purple-700 hover:underline"
            >
              Détails →
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/dashboard/animateur/formation"
        className="inline-block mt-4 text-purple-700 font-medium hover:underline"
      >
        ← Retour à Mes Formations
      </Link>
    </div>
  );
}
