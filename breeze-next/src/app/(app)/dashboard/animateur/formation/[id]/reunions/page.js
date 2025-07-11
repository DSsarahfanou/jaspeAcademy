"use client";

import useSWR from "swr";
import axios from "/src/lib/axios";

export default function ReunionList({ params }) {
  const { data: meetings, error } = useSWR(`/api/formations/${params.id}/meetings`, (url) =>
    axios.get(url).then((res) => res.data)
  );

  if (error) return <div>Erreur de chargement</div>;
  if (!meetings) return <div>Chargement...</div>;

  return (
    <div className="p-4">
      <h1>Réunions programmées</h1>
      <ul>
        {meetings.map((m) => (
          <li key={m.id}>
            Niveau {m.progression_level}% — {m.scheduled_at} — Participants: {m.students.length}
          </li>
        ))}
      </ul>
    </div>
  );
}
