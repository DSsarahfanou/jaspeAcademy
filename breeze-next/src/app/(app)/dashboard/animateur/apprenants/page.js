"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaUser, FaMailBulk, FaPhoneAlt, FaGraduationCap, FaArrowRight } from "react-icons/fa";

export default function ListeApprenants() {
  const [apprenants, setApprenants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/teacher/apprenants", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setApprenants(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-purple-700 mb-8 text-center">
        📚 Mes Apprenants
      </h2>

      {apprenants.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 text-center"
        >
          Aucun apprenant trouvé pour le moment.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apprenants.map((apprenant, index) => (
            <motion.div
              key={apprenant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <FaUser className="text-purple-500 w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-800">
                  {apprenant.name} {apprenant.surname}
                </h3>
              </div>

              <div className="flex items-center gap-3 text-gray-600 mb-2">
                <FaMailBulk className="w-5 h-5 text-purple-400" />
                <span>{apprenant.email}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600 mb-2">
                <FaPhoneAlt className="w-5 h-5 text-purple-400" />
                <span>{apprenant.phone || "Non renseigné"}</span>
              </div>

              <div className="mb-4">
                <h4 className="text-purple-600 font-semibold mb-1">Formations :</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 max-h-40 overflow-y-auto">
                  {apprenant.formations.map((formation) => (
                    <li key={formation.id}>
                      {formation.name} - Progression : {formation.progression}%
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div whileHover={{ x: 4 }}>
                <Link
                  href={`/dashboard/animateur/apprenants/${apprenant.id}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-800 transition"
                >
                  Voir le détail
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
