// /dashboard/animateur/apprenants/[id]/page.js
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const apprenants = [
  {
    id: "a1",
    nom: "Fatou Diop",
    email: "fatou.diop@jaspeacademy.com",
    telephone: "+221 77 123 45 67",
    formation: "Administration Réseaux",
    modules: [
      { id: "m1", titre: "Introduction aux réseaux", termine: true },
      { id: "m2", titre: "Configuration des routeurs", termine: false },
      { id: "m3", titre: "Sécurité réseau", termine: false },
    ],
    quizResultat: 75, // en %
  },
  {
    id: "a2",
    nom: "Moussa Traoré",
    email: "moussa.traore@jaspeacademy.com",
    telephone: "+223 76 456 78 90",
    formation: "Sécurité Informatique",
    modules: [
      { id: "m1", titre: "Cryptographie", termine: true },
      { id: "m2", titre: "Sécurité des réseaux", termine: true },
      { id: "m3", titre: "Analyse des vulnérabilités", termine: true },
    ],
    quizResultat: 90,
  },
];

export default function DetailApprenant() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [message, setMessage] = useState("");

  const apprenant = apprenants.find((a) => a.id === id);

  if (!apprenant) {
    return (
      <p className="text-center text-red-500 mt-10">
        Apprenant non trouvé.
      </p>
    );
  }

  const modulesTermines = apprenant.modules.filter((m) => m.termine).length;
  const totalModules = apprenant.modules.length;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold text-purple-700 mb-4">{apprenant.nom}</h2>

      <p>
        <span className="font-semibold">Email :</span> {apprenant.email}
      </p>
      <p>
        <span className="font-semibold">Téléphone :</span> {apprenant.telephone}
      </p>
      <p>
        <span className="font-semibold">Formation :</span> {apprenant.formation}
      </p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Modules suivis :</h3>
        <ul className="list-disc list-inside text-gray-800">
          {apprenant.modules.map((module) => (
            <li key={module.id}>
              {module.titre} —{" "}
              {module.termine ? (
                <span className="text-green-600 font-semibold">Terminé</span>
              ) : (
                <span className="text-red-600 font-semibold">En cours</span>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-2 font-semibold">
          Progression : {modulesTermines} / {totalModules} modules terminés
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Résultat du quiz :</h3>
        <p
          className={`font-semibold ${
            apprenant.quizResultat >= 80 ? "text-green-600" : "text-red-600"
          }`}
        >
          {apprenant.quizResultat} % {apprenant.quizResultat >= 80 ? "(Réussi)" : "(Échec)"}
        </p>
      </div>

      <button
        onClick={() => router.push("/dashboard/animateur/apprenants")}
        className="mt-6 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
      >
        ← Retour à la liste des apprenants
      </button>
    </div>
  );
}
