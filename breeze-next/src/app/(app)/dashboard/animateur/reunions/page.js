"use client";

import { useEffect, useState } from "react";
import axios from "/src/lib/axios";
import Link from "next/link";

export default function TeacherMeetings() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await axios.get("/api/teacher/meetings");
        setMeetings(res.data);
      } catch (err) {
        console.error("Erreur de chargement meetings", err);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Mes Réunions Programmées
      </h1>

      {meetings.length === 0 && (
        <p className="text-gray-600">Aucune réunion trouvée pour le moment.</p>
      )}

      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Formation :{" "}
              <span className="text-blue-700">
                {meeting.formation?.name || "Non trouvé"}
              </span>
            </h2>

            <p className="text-gray-700">
              Niveau de progression :{" "}
              <span className="font-medium">{meeting.progression_level}%</span>
            </p>

            <p className="text-gray-700">
              Prévue le :{" "}
              <span className="font-medium">
                {new Date(meeting.scheduled_at).toLocaleString()}
              </span>
            </p>

            <Link href={`/dashboard/meetings/${meeting.room_link}`}>
              <button className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
                Rejoindre la réunion →
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
