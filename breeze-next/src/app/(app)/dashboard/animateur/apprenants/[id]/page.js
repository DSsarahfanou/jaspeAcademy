"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTransgender,
  FaBirthdayCake,
  FaGraduationCap,
  FaCheckCircle,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

export default function DetailApprenant() {
  const { id } = useParams();
  const [apprenant, setApprenant] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFormationId, setSelectedFormationId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/teacher/apprenants/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setApprenant(data.data);
          if (data.data.formations.length > 0) {
            setSelectedFormationId(data.data.formations[0].id);
          }
        }
      });
  }, [id]);

  // Filtrer les formations selon la recherche
  const filteredFormations = useMemo(() => {
    if (!apprenant) return [];
    return apprenant.formations.filter((f) =>
      f.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [apprenant, searchTerm]);

  // Trouver la formation sélectionnée
  const selectedFormation = useMemo(() => {
    if (!apprenant) return null;
    return apprenant.formations.find((f) => f.id === selectedFormationId) || null;
  }, [apprenant, selectedFormationId]);

  if (!apprenant) {
    return <p className="text-center text-gray-500 mt-10">Chargement...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header Apprenant */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={apprenant.picture || "/default-avatar.png"}
          alt="Photo de profil"
          className="w-24 h-24 rounded-full object-cover shadow-md"
        />
        <div>
          <h1 className="text-2xl font-bold text-purple-700">
            {apprenant.name} {apprenant.surname}
          </h1>
          <p className="text-gray-600 italic text-sm">Détails des formations et progression</p>
        </div>
      </div>

      {/* Infos personnelles */}
      <div className="bg-white rounded-xl shadow p-5 mb-8">
        <h2 className="text-lg font-semibold text-purple-600 mb-4">Informations personnelles</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2">
            <FaEnvelope /> {apprenant.email}
          </li>
          <li className="flex items-center gap-2">
            <FaPhoneAlt /> {apprenant.phone || "Non renseigné"}
          </li>
          <li className="flex items-center gap-2">
            <FaMapMarkerAlt /> {apprenant.address || "Non renseigné"}
          </li>
          <li className="flex items-center gap-2">
            <FaTransgender /> {apprenant.gender || "Non renseigné"}
          </li>
          <li className="flex items-center gap-2">
            <FaBirthdayCake /> {apprenant.birth_date || "Non renseigné"}
          </li>
        </ul>
      </div>

      {/* Sélecteur formations filtrable */}
      <div className="relative mb-6 max-w-md">
        <label htmlFor="searchFormation" className="block mb-1 font-semibold text-gray-700">
          Rechercher une formation
        </label>
        <div className="flex items-center border rounded-md shadow-sm bg-white">
          <input
            id="searchFormation"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setDropdownOpen(true)}
            placeholder="Tapez pour filtrer..."
            className="flex-grow px-3 py-2 outline-none rounded-l-md"
            autoComplete="off"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="px-3 text-gray-400 hover:text-gray-700 transition"
              aria-label="Effacer la recherche"
              type="button"
            >
              <FaTimes />
            </button>
          )}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-3 border-l border-gray-300 text-gray-600 hover:text-gray-900 transition rounded-r-md"
            type="button"
            aria-label="Basculer la liste des formations"
          >
            <FaGraduationCap />
          </button>
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-20 mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg"
          >
            {filteredFormations.length === 0 ? (
              <li className="px-4 py-2 text-gray-500">Aucune formation trouvée</li>
            ) : (
              filteredFormations.map((formation) => (
                <li
                  key={formation.id}
                  className={`cursor-pointer px-4 py-2 hover:bg-purple-100 ${
                    formation.id === selectedFormationId ? "bg-purple-200 font-semibold" : ""
                  }`}
                  onClick={() => {
                    setSelectedFormationId(formation.id);
                    setDropdownOpen(false);
                    setSearchTerm("");
                  }}
                >
                  {formation.title}
                </li>
              ))
            )}
          </motion.ul>
        )}
      </div>

      {/* Affichage formation sélectionnée */}
      {selectedFormation ? (
        <motion.div
          key={selectedFormation.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow p-5"
        >
          <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
            <FaGraduationCap /> {selectedFormation.title}
            <span className="ml-auto text-gray-600 text-sm font-medium">
              Progression : {selectedFormation.progression}%
            </span>
          </h2>

          {/* Barre de progression */}
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${selectedFormation.progression}%` }}
              transition={{ duration: 1 }}
              className="h-4 bg-purple-500"
            />
          </div>

          {/* Modules et leçons */}
          {selectedFormation.modules.length === 0 ? (
            <p className="text-gray-500">Aucun module trouvé.</p>
          ) : (
            selectedFormation.modules.map((module) => (
              <div key={module.id} className="mb-5">
                <h3 className="text-md font-bold text-gray-800 mb-2">{module.title}</h3>
                <ul className="ml-5 space-y-1">
                  {module.lessons.map((lesson) => {
                    const lessonKey = `${module.id}:${lesson.id}`;
                    const completed = selectedFormation.completed_lessons.includes(lessonKey);
                    return (
                      <li key={lesson.id} className="flex items-center gap-2">
                        {completed ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <span className="w-4 h-4 border rounded-full inline-block"></span>
                        )}
                        {lesson.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500">Sélectionnez une formation pour voir les détails</p>
      )}
    </div>
  );
}

