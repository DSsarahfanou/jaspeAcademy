"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const formations = [
  {
    id: "1",
    titre: "Réseaux Informatiques",
    modules: [
      {
        id: "m1",
        titre: "Introduction aux réseaux",
        lecons: [
          {
            type: "video",
            titre: "Vidéo : Qu’est-ce qu’un réseau ?",
            url: "/videos/reseaux1.mp4",
          },
          {
            type: "pdf",
            titre: "PDF : Présentation des réseaux",
            url: "/pdfs/reseaux1.pdf",
          },
        ],
        apprenants: [
          { nom: "Alice Dupont", progression: "100%" },
          { nom: "Jean Kouadio", progression: "75%" },
        ],
      },
      {
        id: "m2",
        titre: "Modèles OSI et TCP/IP",
        lecons: [
          {
            type: "video",
            titre: "Vidéo : Modèle OSI",
            url: "/videos/osi.mp4",
          },
          {
            type: "pdf",
            titre: "PDF : Modèle TCP/IP",
            url: "/pdfs/tcpip.pdf",
          },
        ],
        apprenants: [
          { nom: "Alice Dupont", progression: "50%" },
          { nom: "Jean Kouadio", progression: "25%" },
        ],
      },
    ],
  },
  // Tu peux ajouter d’autres formations ici
];

export default function ModuleDetailPage() {
  const { id, moduleId } = useParams();

  const formation = formations.find((f) => f.id === id);
  const module = formation?.modules.find((m) => m.id === moduleId);

  if (!formation || !module) {
    return (
      <div className="text-center text-red-500 mt-10">
        Module introuvable.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold text-purple-700 mb-2">{module.titre}</h2>
      <p className="text-gray-700 mb-4">Formation : {formation.titre}</p>

      <h3 className="text-xl font-semibold mb-2">Leçons du module</h3>
      <ul className="space-y-3 mb-6">
        {module.lecons.map((lecon, index) => (
          <li key={index} className="border rounded p-4 bg-gray-50">
            <p className="font-medium">{lecon.titre}</p>
            {lecon.type === "video" ? (
              <video
                controls
                controlsList="nodownload"
                className="mt-2 w-full rounded"
              >
                <source src={lecon.url} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            ) : (
              <iframe
                src={lecon.url}
                className="w-full h-64 mt-2"
                title={lecon.titre}
              ></iframe>
            )}
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-2">Apprenants inscrits</h3>
      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Nom</th>
            <th className="p-2 border">Progression</th>
          </tr>
        </thead>
        <tbody>
          {module.apprenants.map((apprenant, idx) => (
            <tr key={idx}>
              <td className="p-2 border">{apprenant.nom}</td>
              <td className="p-2 border">{apprenant.progression}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <Link
          href={`/dashboard/animateur/formation/${id}`}
          className="text-purple-700 hover:underline"
        >
          ← Retour au détail de la formation
        </Link>
      </div>
    </div>
  );
}
