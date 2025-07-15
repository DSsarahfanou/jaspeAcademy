// /dashboard/animateur/reunions/[id]/page.js
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const reunions = [
  {
    id: "r1",
    sujet: "Suivi des progrès en Réseaux",
    date: "2025-06-15",
    heure: "14:00",
    lien: "https://meet.jaspeacademy.com/reunion1",
    participants: ["Alice", "Bob", "Claire"],
    modules: ["Introduction aux réseaux", "Modèles OSI"],
  },
  {
    id: "r2",
    sujet: "Présentation finale en Sécurité",
    date: "2025-06-20",
    heure: "10:00",
    lien: "https://meet.jaspeacademy.com/reunion2",
    participants: ["David", "Eva"],
    modules: ["Cryptographie", "Sécurité des réseaux"],
  },
];

export default function ReunionDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const reunion = reunions.find((r) => r.id === id);

  if (!reunion) {
    return <p className="text-center text-red-500 mt-10">Réunion non trouvée.</p>;
  }

  const handleDelete = () => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette réunion ?");
    if (confirmation) {
      // À remplacer par une vraie suppression via l’API
      setMessage("✅ Réunion supprimée avec succès.");
      setTimeout(() => {
        router.push("/dashboard/animateur/reunions");
      }, 1500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">{reunion.sujet}</h2>
      <p className="text-gray-600 mb-2">📅 {reunion.date} à 🕒 {reunion.heure}</p>
      <p className="text-blue-600 mb-4">
        🔗 <a href={reunion.lien} target="_blank" rel="noopener noreferrer">{reunion.lien}</a>
      </p>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">📚 Modules concernés :</h3>
        <ul className="list-disc list-inside text-gray-800">
          {reunion.modules.map((module, index) => (
            <li key={index}>{module}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">👥 Participants :</h3>
        <ul className="list-disc list-inside text-gray-800">
          {reunion.participants.map((participant, index) => (
            <li key={index}>{participant}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={() => router.push("/dashboard/animateur/reunions")}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          ← Retour
        </button>

        <button
          onClick={() => router.push(`/dashboard/animateur/reunions/${id}/edit`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          ✏️ Modifier
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🗑️ Supprimer
        </button>
      </div>

      {message && (
        <p className="mt-4 text-green-600 font-semibold text-center">{message}</p>
      )}
    </div>
  );
}
