'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaPlay, FaCheckCircle, FaChalkboardTeacher, FaBook, FaClipboardCheck } from 'react-icons/fa'

export default function FormationEnCours() {
  const router = useRouter()
  const [activeModule, setActiveModule] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Données de la formation (à remplacer par vos données réelles)
  const formation = {
    id: 1,
    titre: "Administration Réseaux Avancée",
    description: "Maîtrisez les concepts avancés d'administration réseau avec des cas pratiques réels.",
    formateur: {
      nom: "Dr. Jean Koffi",
      bio: "Expert réseau avec 15 ans d'expérience, certifié CCIE et AWS Solutions Architect",
      photo: "/images/formateur.jpg"
    },
    conseils: [
      "Prenez des notes pendant les vidéos",
      "Reproduisez les exercices dans votre environnement",
      "Participez aux discussions du forum",
      "Consacrez au moins 5h par semaine"
    ],
    programme: [
      "Semaine 1: Architecture réseau avancée",
      "Semaine 2: Sécurisation des infrastructures",
      "Semaine 3: Virtualisation et cloud networking",
      "Semaine 4: Optimisation des performances"
    ],
    modules: [
      {
        id: 1,
        titre: "Introduction aux réseaux avancés",
        termine: true,
        contenu: [
          {
            type: "video",
            titre: "Vidéo introductive",
            duree: "15 min",
            url: "#"
          },
          {
            type: "pdf",
            titre: "Support de cours",
            pages: 12,
            url: "#"
          }
        ],
        quiz: {
          termine: true,
          score: 18,
          total: 20
        }
      },
      {
        id: 2,
        titre: "Protocoles avancés",
        termine: false,
        contenu: [
          {
            type: "video",
            titre: "Les protocoles de routage",
            duree: "22 min",
            url: "#"
          },
          {
            type: "lab",
            titre: "TP: Configuration OSPF",
            duree: "45 min",
            url: "#"
          }
        ],
        quiz: {
          termine: false,
          score: null,
          total: 15
        }
      },
      // ... autres modules
    ]
  }

  const handleStartFormation = () => {
    //router.push(`/mes-formations/${formation.id}/modules`)
    router.push(`src/formations/modules`)

  }

  const itemsPerPage = 3
  const totalPages = Math.ceil(formation.modules.length / itemsPerPage)
  const paginatedModules = formation.modules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{formation.titre}</h1>
          <p className="mt-2 text-lg text-gray-600">Votre progression: <span className="font-semibold">25%</span></p>
        </div>

        {/* Grid principale */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Colonne de gauche - Description */}
          <div className="space-y-8 lg:col-span-2">
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="flex items-center mb-4 text-xl font-bold text-gray-800">
                <FaBook className="mr-2 text-blue-600" /> Description du cours
              </h2>
              <p className="text-gray-700">{formation.description}</p>
              
              <div className="mt-6">
                <h3 className="mb-2 font-semibold text-gray-800">Programme détaillé :</h3>
                <ul className="space-y-1 text-gray-700 list-disc list-inside">
                  {formation.programme.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleStartFormation}
                className="flex items-center justify-center w-full px-6 py-3 mt-8 font-medium text-white bg-blue-600 rounded-lg sm:w-auto hover:bg-blue-700"
              >
                Commencer la formation <FaPlay className="ml-2" />
              </button>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="flex items-center mb-4 text-xl font-bold text-gray-800">
                <FaClipboardCheck className="mr-2 text-green-600" /> Conseils pour réussir
              </h2>
              <ul className="space-y-3">
                {formation.conseils.map((conseil, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="flex-shrink-0 mt-1 mr-2 text-green-500" />
                    <span className="text-gray-700">{conseil}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Colonne de droite - Formateur */}
          <div className="lg:col-span-1">
            <div className="sticky p-6 bg-white rounded-lg shadow top-8">
              <h2 className="flex items-center mb-4 text-xl font-bold text-gray-800">
                <FaChalkboardTeacher className="mr-2 text-purple-600" /> Votre formateur
              </h2>
              
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 mr-4 overflow-hidden bg-gray-200 rounded-full">
                  <img 
                    src={formation.formateur.photo} 
                    alt={formation.formateur.nom}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{formation.formateur.nom}</h3>
                  <p className="text-sm text-gray-600">Formateur principal</p>
                </div>
              </div>

              <p className="mb-4 text-gray-700">{formation.formateur.bio}</p>
              
              <button className="w-full px-4 py-2 font-medium text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200">
                Contacter le formateur
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}