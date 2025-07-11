"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "/src/lib/axios";

export default function FormationDetail() {
  const { id } = useParams();
  const [formation, setFormation] = useState(null);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`/api/teacher/formations/${id}`);
        setFormation(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement de la formation :", error);
      }
    };

    if (id) fetchFormation();
  }, [id]);

  if (!formation) {
    return (
      <div className="p-8 text-center text-gray-600">Chargement...</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800">
          {formation.name}
        </h1>
        <Link
          href={`/dashboard/animateur/formation/${id}/reunions/create`}
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Programmer un meet
        </Link>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Modules & Leçons</h2>
        <div className="space-y-4">
          {formation.modules.map((module) => (
            <div
              key={module.id}
              className="p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-200"
            >
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                {module.title}
              </h3>
              <ul className="list-disc ml-6 text-gray-600">
                {module.lessons.map((lesson) => (
                  <li key={lesson.id}>{lesson.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Équipements</h2>
        <ul className="list-disc ml-6 text-gray-600">
          {formation.equipments.map((equipment) => (
            <li key={equipment.id}>{equipment.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Apprenants</h2>
        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Nom</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Progression (%)
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Leçons complétées
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {formation.students.map((student) => (
                <tr
                  key={student.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-800">{student.name}</td>
                  <td className="px-6 py-4 text-gray-800">
                    {student.progression ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {student.completed_lessons?.join(", ") ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {student.score ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
