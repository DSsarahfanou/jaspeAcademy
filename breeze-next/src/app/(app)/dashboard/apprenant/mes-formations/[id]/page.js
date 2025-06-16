"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Appelle cette fonction au début de ton app (ex. dans _app.js)
import { ToastContainer } from "react-toastify";

const formationExemple = {
  id: "1",
  image: "/images/reseaux.jpg",
  titre: "Introduction aux Réseaux",
  animateur: "M. Diallo",
  numero: "+221778889900",
  outils: ["PC", "Connexion Internet", "Bloc-notes"],
  description: "Cette formation vous initie aux concepts fondamentaux des réseaux.",
  modules: [
    {
      titre: "Module 1 : Qu'est-ce qu'un réseau ?",
      lecons: [
        { titre: "Leçon 1", video: "/videos/chandelier.mp4", pdf: "/pdfs/doc.pdf" },
        { titre: "Leçon 2", video: "/videos/chandelier.mp4", pdf: "/pdfs/doc.pdf" },
      ],
    },
    {
      titre: "Module 2 : Topologies de réseau",
      lecons: [
        { titre: "Leçon 1", video: "/videos/lecon3.mp4", pdf: "/pdfs/lecon3.pdf" },
        { titre: "Leçon 2", video: "/videos/lecon4.mp4", pdf: "/pdfs/lecon4.pdf" },
      ],
    },
    {
      titre: "Module 3 : Protocoles Réseaux",
      lecons: [
        { titre: "Leçon 1", video: "/videos/lecon5.mp4", pdf: "/pdfs/lecon5.pdf" },
      ],
    },
  ],
};

export default function FormationDetail() {
  const [moduleIndex, setModuleIndex] = useState(0);
  const [leconIndex, setLeconIndex] = useState(0);
  const [modulesTerminés, setModulesTerminés] = useState([]);
  const router = useRouter();

  const moduleActuel = formationExemple.modules[moduleIndex];
  const leconActuelle = moduleActuel.lecons[leconIndex];

  const allerLeconSuivante = () => {
    if (leconIndex < moduleActuel.lecons.length - 1) {
      setLeconIndex(leconIndex + 1);
    } else {
      const prochainModule = moduleIndex + 1;
      if (!modulesTerminés.includes(moduleIndex)) {
        setModulesTerminés([...modulesTerminés, moduleIndex]);
        toast.success(`${moduleActuel.titre} terminé ! 🎉`);
      }
      if (prochainModule < formationExemple.modules.length) {
        setModuleIndex(prochainModule);
        setLeconIndex(0);
      }
    }
  };

  const allerLeconPrecedente = () => {
    if (leconIndex > 0) {
      setLeconIndex(leconIndex - 1);
    } else if (moduleIndex > 0) {
      const modulePrecedent = moduleIndex - 1;
      setModuleIndex(modulePrecedent);
      setLeconIndex(formationExemple.modules[modulePrecedent].lecons.length - 1);
    }
  };

  const allerAuQuiz = () => {
    toast.success("Tous les modules sont terminés ! 🚀");
    router.push(`/dashboard/apprenant/mes-formations/${formationExemple.id}/quiz`);
  };

  return (

    <div className="flex">
      <ToastContainer position="top-right" />
      
  {/* Barre fixe à gauche */}
 <aside className="w-64 max-h-[calc(100vh-100px)] sticky top-0 overflow-y-auto space-y-4 p-4 bg-white rounded shadow">
    <h2 className="mb-2 text-xl font-semibold text-blue-700">Modules</h2>
    {formationExemple.modules.map((mod, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`border p-4 rounded-lg shadow-sm cursor-pointer ${
          moduleIndex === index ? "bg-blue-100 border-blue-600" : "bg-white"
        }`}
        onClick={() => {
          setModuleIndex(index);
          setLeconIndex(0);
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{mod.titre}</span>
          {modulesTerminés.includes(index) && (
            <FaCheckCircle className="text-green-600" />
          )}
        </div>
      </motion.div>
    ))}
  </aside>

  {/* Contenu décalé à droite */}
  <main className="w-full p-6 ml-64 space-y-6">
        <h1 className="text-3xl font-bold text-blue-800">{formationExemple.titre}</h1>

        <img src={formationExemple.image} alt="Image formation" className="object-cover w-full h-64 shadow-md rounded-xl" />

        <div className="space-y-2 text-gray-800">
          <p><strong>Animateur :</strong> {formationExemple.animateur}</p>
          <p><strong>Numéro :</strong> {formationExemple.numero}</p>
          <p><strong>Outils nécessaires :</strong> {formationExemple.outils.join(", ")}</p>
          <p><strong>Description :</strong> {formationExemple.description}</p>
        </div>

        <div className="pt-6 space-y-4 border-t">
          <h2 className="text-2xl font-semibold text-blue-700">{moduleActuel.titre}</h2>
          <h3 className="text-lg font-medium text-gray-700">{leconActuelle.titre}</h3>

          <video controls controlsList="nodownload" className="w-full rounded-lg max-h-64">
            <source src={leconActuelle.video} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>

          <iframe src={leconActuelle.pdf} className="w-full h-64 border rounded-lg" title="PDF"></iframe>

          <div className="flex justify-between mt-6">
            <button
              onClick={allerLeconPrecedente}
              className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
              disabled={moduleIndex === 0 && leconIndex === 0}
            >
              Précédent
            </button>

            {moduleIndex === formationExemple.modules.length - 1 &&
            leconIndex === moduleActuel.lecons.length - 1 ? (
              <button
                onClick={allerAuQuiz}
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                Passer le test
              </button>
            ) : (
              <button
                onClick={allerLeconSuivante}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Suivant
              </button>
            )}
          </div>
        </div>
  </main>
</div>


  );
}
