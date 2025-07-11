"use client";

import { useState } from "react";
import axios from "/src/lib/axios";

export default function CreateMeeting({ params }) {
  const [progression, setProgression] = useState(25);
  const [scheduledAt, setScheduledAt] = useState("");

  const handleCreate = async () => {
    try {
      await axios.post(`/api/formations/${params.id}/meetings`, {
        progression_level: progression,
        scheduled_at: scheduledAt,
      });
      alert("Réunion créée !");
    } catch (err) {
      console.error(err);
      alert("Erreur");
    }
  };

  return (
    <div className="p-4">
      <h1>Créer une réunion</h1>
      <label>Niveau de progression</label>
      <select value={progression} onChange={(e) => setProgression(Number(e.target.value))}>
        <option value={25}>25%</option>
        <option value={50}>50%</option>
        <option value={75}>75%</option>
      </select>

      <label>Date & Heure</label>
      <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />

      <button onClick={handleCreate} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Créer
      </button>
    </div>
  );
}
