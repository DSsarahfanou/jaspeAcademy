"use client";

import { useEffect, useState } from "react";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function DashboardAnimateur() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("http://localhost:8000/api/teacher/dashboard", {
          credentials: "include", // pour cookie/sanctum
        });
        if (!res.ok) throw new Error("Erreur réseau");
        const json = await res.json();
        if (json.status !== "success") throw new Error("Erreur API");
        setDashboard(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading)
    return <p className="p-8 text-center text-gray-600">Chargement...</p>;
  if (error)
    return (
      <p className="p-8 text-center text-red-600 font-semibold">
        Erreur : {error}
      </p>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-blue-800 mb-8">
        Tableau de bord Animateur
      </h1>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Réunions */}
        <Card
          icon={<FaCalendarAlt className="w-8 h-8" />}
          iconBg="bg-blue-100 text-blue-700"
          title="Réunions prévues"
          count={dashboard.meetingsCount}
          trend={dashboard.meetingsTrend}
        />

        {/* Formations */}
        <Card
          icon={<FaChalkboardTeacher className="w-8 h-8" />}
          iconBg="bg-blue-100 text-blue-700"
          title="Formations animées"
          count={dashboard.formationsCount}
          trend={dashboard.formationsTrend}
        />

        {/* Apprenants */}
        <Card
          icon={<FaUsers className="w-8 h-8" />}
          iconBg="bg-blue-100 text-blue-700"
          title="Apprenants suivis"
          count={dashboard.studentsCount}
          trend={dashboard.studentsTrend}
        />
      </div>

      {/* Liste des prochaines réunions */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          Prochaines réunions
        </h2>
        {dashboard.meetings.length === 0 ? (
          <p className="text-gray-500">Aucune réunion programmée.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {dashboard.meetings.map((meeting) => (
              <li
                key={meeting.id}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {meeting.title || "Réunion"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(meeting.datetime).toLocaleString("fr-FR", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })}
                    {meeting.formation?.name
                      ? ` - Formation: ${meeting.formation.name}`
                      : ""}
                  </p>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                  Voir
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Notifications à faire plus tard */}
    </div>
  );
}

function Card({ icon, iconBg, title, count, trend }) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 flex items-center space-x-4`}>
      <div className={`${iconBg} p-4 rounded-full`}>{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-blue-900">{count}</p>
        <p className="text-green-600 text-sm mt-1">{trend}</p>
      </div>
    </div>
  );
}
