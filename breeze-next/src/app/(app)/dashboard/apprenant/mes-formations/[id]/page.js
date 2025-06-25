// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FaCheckCircle } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Appelle cette fonction au début de ton app (ex. dans _app.js)
// import { ToastContainer } from "react-toastify";

// const formationExemple = {
//   id: "1",
//   image: "/images/reseaux.jpg",
//   titre: "Introduction aux Réseaux",
//   animateur: "M. Diallo",
//   numero: "+221778889900",
//   outils: ["PC", "Connexion Internet", "Bloc-notes"],
//   description: "Cette formation vous initie aux concepts fondamentaux des réseaux.",
//   modules: [
//     {
//       titre: "Module 1 : Qu'est-ce qu'un réseau ?",
//       lecons: [
//         { titre: "Leçon 1", video: "/videos/chandelier.mp4", pdf: "/pdfs/doc.pdf" },
//         { titre: "Leçon 2", video: "/videos/chandelier.mp4", pdf: "/pdfs/doc.pdf" },
//       ],
//     },
//     {
//       titre: "Module 2 : Topologies de réseau",
//       lecons: [
//         { titre: "Leçon 1", video: "/videos/lecon3.mp4", pdf: "/pdfs/lecon3.pdf" },
//         { titre: "Leçon 2", video: "/videos/lecon4.mp4", pdf: "/pdfs/lecon4.pdf" },
//       ],
//     },
//     {
//       titre: "Module 3 : Protocoles Réseaux",
//       lecons: [
//         { titre: "Leçon 1", video: "/videos/lecon5.mp4", pdf: "/pdfs/lecon5.pdf" },
//       ],
//     },
//   ],
// };

// export default function FormationDetail() {
//   const [moduleIndex, setModuleIndex] = useState(0);
//   const [leconIndex, setLeconIndex] = useState(0);
//   const [modulesTerminés, setModulesTerminés] = useState([]);
//   const router = useRouter();

//   const moduleActuel = formationExemple.modules[moduleIndex];
//   const leconActuelle = moduleActuel.lecons[leconIndex];

//   const allerLeconSuivante = () => {
//     if (leconIndex < moduleActuel.lecons.length - 1) {
//       setLeconIndex(leconIndex + 1);
//     } else {
//       const prochainModule = moduleIndex + 1;
//       if (!modulesTerminés.includes(moduleIndex)) {
//         setModulesTerminés([...modulesTerminés, moduleIndex]);
//         toast.success(`${moduleActuel.titre} terminé ! 🎉`);
//       }
//       if (prochainModule < formationExemple.modules.length) {
//         setModuleIndex(prochainModule);
//         setLeconIndex(0);
//       }
//     }
//   };

//   const allerLeconPrecedente = () => {
//     if (leconIndex > 0) {
//       setLeconIndex(leconIndex - 1);
//     } else if (moduleIndex > 0) {
//       const modulePrecedent = moduleIndex - 1;
//       setModuleIndex(modulePrecedent);
//       setLeconIndex(formationExemple.modules[modulePrecedent].lecons.length - 1);
//     }
//   };

//   const allerAuQuiz = () => {
//     toast.success("Tous les modules sont terminés ! 🚀");
//     router.push(`/dashboard/apprenant/mes-formations/${formationExemple.id}/quiz`);
//   };

//   return (

//     <div className="flex">
//       <ToastContainer position="top-right" />
      
//   {/* Barre fixe à gauche */}
//  <aside className="w-64 max-h-[calc(100vh-100px)] sticky top-0 overflow-y-auto space-y-4 p-4 bg-white rounded shadow">
//     <h2 className="mb-2 text-xl font-semibold text-blue-700">Modules</h2>
//     {formationExemple.modules.map((mod, index) => (
//       <motion.div
//         key={index}
//         whileHover={{ scale: 1.02 }}
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.3 }}
//         className={`border p-4 rounded-lg shadow-sm cursor-pointer ${
//           moduleIndex === index ? "bg-blue-100 border-blue-600" : "bg-white"
//         }`}
//         onClick={() => {
//           setModuleIndex(index);
//           setLeconIndex(0);
//         }}
//       >
//         <div className="flex items-center justify-between">
//           <span className="text-sm font-medium">{mod.titre}</span>
//           {modulesTerminés.includes(index) && (
//             <FaCheckCircle className="text-green-600" />
//           )}
//         </div>
//       </motion.div>
//     ))}
//   </aside>

//   {/* Contenu décalé à droite */}
//   <main className="w-full p-6 ml-64 space-y-6">
//         <h1 className="text-3xl font-bold text-blue-800">{formationExemple.titre}</h1>

//         <img src={formationExemple.image} alt="Image formation" className="object-cover w-full h-64 shadow-md rounded-xl" />

//         <div className="space-y-2 text-gray-800">
//           <p><strong>Animateur :</strong> {formationExemple.animateur}</p>
//           <p><strong>Numéro :</strong> {formationExemple.numero}</p>
//           <p><strong>Outils nécessaires :</strong> {formationExemple.outils.join(", ")}</p>
//           <p><strong>Description :</strong> {formationExemple.description}</p>
//         </div>

//         <div className="pt-6 space-y-4 border-t">
//           <h2 className="text-2xl font-semibold text-blue-700">{moduleActuel.titre}</h2>
//           <h3 className="text-lg font-medium text-gray-700">{leconActuelle.titre}</h3>

//           <video controls controlsList="nodownload" className="w-full rounded-lg max-h-64">
//             <source src={leconActuelle.video} type="video/mp4" />
//             Votre navigateur ne supporte pas la lecture vidéo.
//           </video>

//           <iframe src={leconActuelle.pdf} className="w-full h-64 border rounded-lg" title="PDF"></iframe>

//           <div className="flex justify-between mt-6">
//             <button
//               onClick={allerLeconPrecedente}
//               className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
//               disabled={moduleIndex === 0 && leconIndex === 0}
//             >
//               Précédent
//             </button>

//             {moduleIndex === formationExemple.modules.length - 1 &&
//             leconIndex === moduleActuel.lecons.length - 1 ? (
//               <button
//                 onClick={allerAuQuiz}
//                 className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
//               >
//                 Passer le test
//               </button>
//             ) : (
//               <button
//                 onClick={allerLeconSuivante}
//                 className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
//               >
//                 Suivant
//               </button>
//             )}
//           </div>
//         </div>
//   </main>
// </div>


//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function FormationDetail() {
  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [leconIndex, setLeconIndex] = useState(0);
  const [modulesTerminés, setModulesTerminés] = useState([]);
  
  const router = useRouter();
  const params = useParams();
  const formationId = params.id;

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/formations/${formationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch formation');
        }
        const data = await response.json();
        setFormation(data.data);
        
        // Reset indexes when formation changes
        setModuleIndex(0);
        setLeconIndex(0);
      } catch (err) {
        setError(err.message);
        toast.error("Erreur lors du chargement de la formation");
      } finally {
        setLoading(false);
      }
    };

    fetchFormation();
  }, [formationId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!formation || !formation.modules || formation.modules.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-xl">
          {!formation ? "Formation non trouvée" : "Aucun module disponible pour cette formation"}
        </div>
      </div>
    );
  }

  // Safely get current module and lesson
  const moduleActuel = formation.modules[moduleIndex];
  const leconActuelle = moduleActuel?.lessons?.[leconIndex];

  if (!moduleActuel || !leconActuelle) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-xl">Leçon non disponible</div>
      </div>
    );
  }

  const allerLeconSuivante = () => {
    if (leconIndex < moduleActuel.lessons.length - 1) {
      setLeconIndex(leconIndex + 1);
    } else {
      const prochainModule = moduleIndex + 1;
      if (!modulesTerminés.includes(moduleIndex)) {
        setModulesTerminés([...modulesTerminés, moduleIndex]);
        toast.success(`${moduleActuel.title} terminé ! 🎉`);
      }
      if (prochainModule < formation.modules.length) {
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
      setLeconIndex(formation.modules[modulePrecedent].lessons.length - 1);
    }
  };

  const allerAuQuiz = () => {
    toast.success("Tous les modules sont terminés ! 🚀");
    router.push(`/dashboard/apprenant/mes-formations/${formation.id}/quiz`);
  };

  return (
    <div className="flex">
      <ToastContainer position="top-right" />
      
      {/* Barre fixe à gauche */}
      <aside className="w-64 max-h-[calc(100vh-100px)] sticky top-0 overflow-y-auto space-y-4 p-4 bg-white rounded shadow">
        <h2 className="mb-2 text-xl font-semibold text-blue-700">Modules</h2>
        {formation.modules.map((mod, index) => (
          <motion.div
            key={mod.id}
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
              <span className="text-sm font-medium">{mod.title}</span>
              {modulesTerminés.includes(index) && (
                <FaCheckCircle className="text-green-600" />
              )}
            </div>
          </motion.div>
        ))}
      </aside>

      {/* Contenu décalé à droite */}
      <main className="w-full p-6 ml-64 space-y-6">
        <h1 className="text-3xl font-bold text-blue-800">{formation.name}</h1>

        <img 
          src={`http://127.0.0.1:8000/${formation.picture}`} 
          alt="Image formation" 
          className="object-cover w-full h-64 shadow-md rounded-xl" 
        />

        <div className="space-y-2 text-gray-800">
          <p><strong>Prérequis :</strong> {formation.prerequisites}</p>
          <p><strong>Prix :</strong> {formation.price} FCFA</p>
          <p><strong>Description :</strong> {formation.formation_details}</p>
        </div>

        <div className="pt-6 space-y-4 border-t">
          <h2 className="text-2xl font-semibold text-blue-700">{moduleActuel.title}</h2>
          <h3 className="text-lg font-medium text-gray-700">{leconActuelle.title}</h3>

          <div className="p-4 bg-gray-100 rounded-lg">
            <h4 className="font-medium mb-2">Contenu de la leçon :</h4>
            <p>{leconActuelle.contents}</p>
          </div>

          <video controls controlsList="nodownload" className="w-full rounded-lg max-h-64">
            <source src={`http://127.0.0.1:8000/${leconActuelle.video}`} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>

          <div className="flex justify-between mt-6">
            <button
              onClick={allerLeconPrecedente}
              className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
              disabled={moduleIndex === 0 && leconIndex === 0}
            >
              Précédent
            </button>

            {moduleIndex === formation.modules.length - 1 &&
            leconIndex === moduleActuel.lessons.length - 1 ? (
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