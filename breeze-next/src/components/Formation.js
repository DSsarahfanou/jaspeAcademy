"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const colors = {
  blue: { bg: "from-blue-500 to-blue-600", text: "text-blue-600" },
  green: { bg: "from-green-500 to-green-600", text: "text-green-600" },
  purple: { bg: "from-purple-500 to-purple-600", text: "text-purple-600" },
  orange: { bg: "from-orange-500 to-orange-600", text: "text-orange-600" },
  red: { bg: "from-red-500 to-red-600", text: "text-red-600" },
  indigo: { bg: "from-indigo-500 to-indigo-600", text: "text-indigo-600" }
};

export default function FormationsReseaux({ formationsData = [] }) {
  const [activeFormation, setActiveFormation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formations, setFormations] = useState([]); // Initialisé avec un tableau vide
  const formationsParPage = 8;

  useEffect(() => {
    // Vérification que formationsData existe et est un tableau
    if (Array.isArray(formationsData)) {
      const formattedFormations = formationsData.map(formation => ({
        id: formation.id,
        titre: formation.name,
        description: formation.formation_details,
        prix: `${formation.price} FCFA`,
        prerequis: formation.prerequisites,
        equipements: formation.equipments?.map(eq => eq.name) || [],
        image: formation.picture 
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${formation.picture}`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/default-formation.jpg`,
        categorie: formation.categorie,
        duree: formation.duration || "4 semaines" // Valeur par défaut si non spécifiée
      }));
      setFormations(formattedFormations);
    }
  }, [formationsData]);

  // Pagination - seulement si formations est un tableau non vide
  const indexOfLastFormation = currentPage * formationsParPage;
  const indexOfFirstFormation = indexOfLastFormation - formationsParPage;
  const formationsActuelles = Array.isArray(formations) 
    ? formations.slice(indexOfFirstFormation, indexOfLastFormation)
    : [];
  const totalPages = Math.ceil(formations.length / formationsParPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getColorForCategory = (category) => {
    const colorMap = {
      "Réseaux": "blue",
      "Sécurité": "green",
      "Cloud": "purple",
      "Télécoms": "orange",
      "Développement": "indigo",
      "Autre": "red"
    };
    return colorMap[category] || "blue";
  };

  // ... (le reste du code reste inchangé)

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Expertises Réseaux & Télécoms
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Formations certifiantes pour devenir expert en infrastructures réseaux et télécommunications
          </p>
        </div>

        {formations.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-xl text-gray-500">Aucune formation disponible pour le moment</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {formationsActuelles.map((formation) => {
                const colorKey = getColorForCategory(formation.categorie);
                return (
                  <div
                    key={formation.id}
                    className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl hover:-translate-y-2"
                  >
                    <div className="relative h-48">
                      <Image
                        src={formation.image}
                        alt={formation.titre}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t ${colors[colorKey].bg} to-transparent`} />
                      <span className="absolute px-3 py-1 text-xs font-bold text-white uppercase bg-gray-900 rounded-full top-3 right-3">
                        {formation.categorie}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="text-lg font-bold text-gray-800">{formation.titre}</h2>
                        <span className={`px-2 py-1 text-xs font-bold ${colors[colorKey].text}`}>
                          {formation.duree}
                        </span>
                      </div>

                      <p className="mb-4 text-sm text-gray-600 line-clamp-3">{formation.description}</p>

                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">{formation.prix}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setActiveFormation(formation)}
                            className="p-2 text-gray-600 transition rounded-full hover:bg-gray-100"
                            aria-label="Voir les détails"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                          <Link
                            href={`/formations/${formation.id}`}
                            className="p-2 text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
                            aria-label="S'inscrire à la formation"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {formations.length > formationsParPage && (
              <div className="flex justify-center mt-10 space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Précédent
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 text-sm font-medium rounded ${
                      currentPage === index + 1
                        ? 'bg-blue-800 text-white'
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {activeFormation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl">
            <button
              onClick={() => setActiveFormation(null)}
              className="absolute p-2 text-gray-500 rounded-full top-4 right-4 hover:bg-gray-100"
              aria-label="Fermer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-full">
                <Image
                  src={activeFormation.image}
                  alt={activeFormation.titre}
                  fill
                  className="object-cover"
                />
                <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${colors[getColorForCategory(activeFormation.categorie)].bg} to-transparent`} />
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <span className={`inline-block px-3 py-1 mb-2 text-xs font-bold text-white rounded-full ${colors[getColorForCategory(activeFormation.categorie)].bg}`}>
                    {activeFormation.categorie}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">{activeFormation.titre}</h3>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {activeFormation.duree}
                    </span>
                    <span className="text-lg font-bold text-gray-900">{activeFormation.prix}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-900">Description</h4>
                    <p className="text-gray-600">{activeFormation.description}</p>
                  </div>

                  {activeFormation.prerequis && (
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-900">Prérequis</h4>
                      <p className="text-gray-600">{activeFormation.prerequis}</p>
                    </div>
                  )}

                  {activeFormation.equipements && activeFormation.equipements.length > 0 && (
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-900">Équipements nécessaires</h4>
                      <ul className="space-y-2">
                        {activeFormation.equipements.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="flex-shrink-0 w-5 h-5 mt-0.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="ml-2 text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 mt-6 sm:flex-row">
                    <Link
                      href={`/formations/${activeFormation.id}/suivre`}
                      className="inline-block w-full px-5 py-2 text-sm font-semibold text-center text-white transition bg-green-600 rounded sm:w-auto hover:bg-green-700"
                    >
                      Suivre la formation
                    </Link>

                    <Link
                      href="/shop"
                      className="inline-block w-full px-5 py-2 text-sm font-semibold text-center text-white transition bg-blue-600 rounded sm:w-auto hover:bg-blue-700"
                    >
                      Commander les équipements
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}