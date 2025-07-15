"use client";

import { useState } from "react";
import useSWR from "swr";
import { useParams } from "next/navigation";
import axios from "/src/lib/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormationMeetings() {
  const { id } = useParams();
  const [progression, setProgression] = useState(25);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const { data: meetings, error, mutate } = useSWR(
    `/api/formations/${id}/meetings`,
    (url) => axios.get(url).then((res) => res.data)
  );

  const handleCreate = async () => {
    if (!date || !time) {
      toast.error("Merci de sélectionner une date ET une heure !");
      return;
    }

    const combined = `${date}T${time}`;

    try {
      await axios.post(`/api/formations/${id}/meetings`, {
        progression_level: progression,
        scheduled_at: combined,
      });
      toast.success("Réunion créée avec succès !");
      setDate("");
      setTime("");
      mutate();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la création");
    }
  };

  if (error) return <div className="p-4 text-red-600">Erreur de chargement</div>;
  if (!meetings) return <div className="p-4 text-gray-600">Chargement...</div>;

  const participantsByProgression = meetings.reduce((acc, m) => {
    acc[m.progression_level] = (acc[m.progression_level] || 0) + m.students.length;
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Gestion des Réunions
      </h1>

      {/* Résumé */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[25, 50, 75].map((level) => (
          <div
            key={level}
            className="p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-sm text-center"
          >
            <p className="text-xl font-bold text-blue-700">{level}%</p>
            <p className="text-gray-600">
              Participants : {participantsByProgression[level] || 0}
            </p>
          </div>
        ))}
      </div>

      {/* Formulaire */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Programmer une nouvelle réunion
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Niveau de progression
            </label>
            <select
              value={progression}
              onChange={(e) => setProgression(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value={25}>25%</option>
              <option value={50}>50%</option>
              <option value={75}>75%</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Heure
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            Créer la réunion
          </button>
        </div>
      </div>

      {/* Liste */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Réunions programmées
        </h2>
        {meetings.length === 0 ? (
          <p className="text-gray-600">
            Aucune réunion programmée pour le moment.
          </p>
        ) : (
          <ul className="space-y-2">
            {meetings.map((m) => (
              <li
                key={m.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
              >
                <p className="font-medium text-gray-800">
                  Niveau {m.progression_level}%
                </p>
                <p className="text-gray-600">
                  Date : {new Date(m.scheduled_at).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  Participants : {m.students.length}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
