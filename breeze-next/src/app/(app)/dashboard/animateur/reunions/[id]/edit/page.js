// /dashboard/animateur/reunions/[id]/edit/page.js
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

export default function EditReunion() {
  const router = useRouter();
  const { id } = useParams();

  const reunion = reunions.find((r) => r.id === id);

  const [formData, setFormData] = useState({
    sujet: reunion?.sujet || "",
    date: reunion?.date || "",
    heure: reunion?.heure || "",
    lien: reunion?.lien || "",
    participants: reunion?.participants.join(", ") || "",
    modules: reunion?.modules.join(", ") || "",
  });

  if (!reunion) {
    return <p className="text-center text-red-500 mt-10">Réunion introuvable.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ➤ En vrai, ici tu enverrais les données à l'API Laravel.
    console.log("✅ Réunion modifiée :", {
      ...formData,
      participants: formData.participants.split(",").map((p) => p.trim()),
      modules: formData.modules.split(",").map((m) => m.trim()),
    });

    alert("✅ Modifications enregistrées !");
    router.push(`/dashboard/animateur/reunions/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Modifier la Réunion</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Sujet</label>
          <input
            type="text"
            name="sujet"
            value={formData.sujet}
            onChange={handleChange}
            required
            className="w-full mt-1 border px-3 py-2 rounded"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full mt-1 border px-3 py-2 rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700">Heure</label>
            <input
              type="time"
              name="heure"
              value={formData.heure}
              onChange={handleChange}
              required
              className="w-full mt-1 border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Lien de la réunion</label>
          <input
            type="url"
            name="lien"
            value={formData.lien}
            onChange={handleChange}
            required
            className="w-full mt-1 border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Modules (séparés par des virgules)</label>
          <input
            type="text"
            name="modules"
            value={formData.modules}
            onChange={handleChange}
            className="w-full mt-1 border px-3 py-2 rounded"
            placeholder="Ex: Module 1, Module 2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Participants (séparés par des virgules)</label>
          <input
            type="text"
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            className="w-full mt-1 border px-3 py-2 rounded"
            placeholder="Ex: Alice, Bob, Claire"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => router.push(`/dashboard/animateur/reunions/${id}`)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Annuler
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            💾 Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
