"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const formationExemple = {
  id: "1",
  image: "/images/reseaux.jpg", // place l’image dans public/images/
  titre: "Introduction aux Réseaux",
  animateur: "M. Diallo",
  numero: "+221778889900",
  outils: ["PC", "Connexion Internet", "Bloc-notes"],
  description:
    "Cette formation vous initie aux concepts fondamentaux des réseaux.",
  modules: [
    {
      titre: "Module 1 : Qu'est-ce qu'un réseau ?",
      lecons: [
        {
          titre: "Leçon 1",
          video: "/videos/chandelier.mp4",
          pdf: "/pdfs/doc.pdf",
        },
        {
          titre: "Leçon 2",
          video: "/videos/chandelier.mp4",
          pdf: "/pdfs/doc.pdf",
        },
      ],
    },
    {
      titre: "Module 2 : Topologies de réseau",
      lecons: [
        {
          titre: "Leçon 1",
          video: "/videos/lecon3.mp4",
          pdf: "/pdfs/lecon3.pdf",
        },
        {
          titre: "Leçon 2",
          video: "/videos/lecon4.mp4",
          pdf: "/pdfs/lecon4.pdf",
        },
      ],
    },
    {
      titre: "Module 3 : Protocoles Réseaux",
      lecons: [
        {
          titre: "Leçon 1",
          video: "/videos/lecon5.mp4",
          pdf: "/pdfs/lecon5.pdf",
        },
      ],
    },
  ],
};

export default function FormationDetail() {
  const [moduleIndex, setModuleIndex] = useState(0);
  const moduleActuel = formationExemple.modules[moduleIndex];
  const router = useRouter();

  const allerSuivant = () => {
    if (moduleIndex < formationExemple.modules.length - 1) {
      setModuleIndex(moduleIndex + 1);
    }
  };

  const allerPrecedent = () => {
    if (moduleIndex > 0) {
      setModuleIndex(moduleIndex - 1);
    }
  };

  const allerAuQuiz = () => {
    router.push(`/dashboard/apprenant/mes-formations/${formationExemple.id}/quiz`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">{formationExemple.titre}</h1>

      <img src={formationExemple.image} alt="Image formation" className="w-full h-64 object-cover rounded-xl shadow-md" />

      <div className="text-gray-800 space-y-2">
        <p><strong>Animateur :</strong> {formationExemple.animateur}</p>
        <p><strong>Numéro :</strong> {formationExemple.numero}</p>
        <p><strong>Outils nécessaires :</strong> {formationExemple.outils.join(", ")}</p>
        <p><strong>Description :</strong> {formationExemple.description}</p>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-2xl font-semibold text-blue-700">{moduleActuel.titre}</h2>
        {moduleActuel.lecons.map((lecon, index) => (
          <div key={index} className="mt-4 space-y-4">
            <h3 className="text-lg font-medium text-gray-700">{lecon.titre}</h3>

            <video
              controls
              controlsList="nodownload"
              className="w-full max-h-64 rounded-lg"
            >
              <source src={lecon.video} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>

            <iframe
              src={lecon.pdf}
              className="w-full h-64 rounded-lg border"
              title="PDF"
            ></iframe>
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            onClick={allerPrecedent}
            disabled={moduleIndex === 0}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded disabled:opacity-50"
          >
            Précédent
          </button>

          {moduleIndex === formationExemple.modules.length - 1 ? (
            <button
              onClick={allerAuQuiz}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Passer le test
            </button>
          ) : (
            <button
              onClick={allerSuivant}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Suivant
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
