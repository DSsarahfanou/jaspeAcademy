// /dashboard/animateur/reunions/create/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreerReunion() {
  const router = useRouter();

  const [sujet, setSujet] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [lien, setLien] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ⚠️ Ici tu peux envoyer les données à une API Laravel plus tard
    const nouvelleReunion = {
      sujet,
      date,
      heure,
      lien,
    };

    console.log("Nouvelle réunion :", nouvelleReunion);

    // Redirection vers la page des réunions après la "création"
    router.push("/dashboard/animateur/reunions");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Créer une Réunion</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Sujet</label>
          <input
            type="text"
            value={sujet}
            onChange={(e) => setSujet(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ex: Présentation finale du module 1"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Heure</label>
          <input
            type="time"
            value={heure}
            onChange={(e) => setHeure(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Lien de la réunion</label>
          <input
            type="url"
            value={lien}
            onChange={(e) => setLien(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="https://meet.jaspeacademy.com/..."
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Annuler
          </button>

          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
