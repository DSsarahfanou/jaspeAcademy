"use client";

import { useRouter } from "next/navigation";
import { FaChalkboardTeacher, FaTools } from "react-icons/fa";

export default function PageIntroFormation({ formation }) {
  const router = useRouter();

  const handleCommencer = () => {
    router.push(`/dashboard/apprenant/mes-formations/${formation.id}/modules`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">
        {formation.titre}
      </h1>

      <div className="flex items-center text-gray-700 mb-4">
        <FaChalkboardTeacher className="mr-2 text-blue-700" />
        <span className="font-medium">Animateur :</span>
        <span className="ml-2">{formation.animateur}</span>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Description de la formation :
        </h2>
        <p className="text-gray-600">{formation.description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
          <FaTools className="mr-2 text-blue-700" />
          Outils nécessaires :
        </h2>
        <ul className="list-disc list-inside text-gray-600">
          {formation.outils.map((outil, index) => (
            <li key={index}>{outil}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleCommencer}
        className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-900 transition"
      >
        Commencer la formation
      </button>
    </div>
  );
}
