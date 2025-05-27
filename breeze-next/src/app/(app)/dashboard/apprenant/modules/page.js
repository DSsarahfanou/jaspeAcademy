'use client'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { FaCheckCircle, FaLock, FaUnlock, FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function ModulesPage() {
  const router = useRouter()
  const params = useParams()
  const [activeModule, setActiveModule] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  // Données des modules (à remplacer par vos données réelles)
  const modules = [
    {
      id: 1,
      titre: "Introduction aux réseaux avancés",
      termine: true,
      contenu: [
        { type: "video", titre: "Vidéo introductive", duree: "15 min" },
        { type: "pdf", titre: "Support de cours", pages: 12 },
        { type: "quiz", titre: "Quiz d'évaluation", questions: 10 }
      ]
    },
    {
      id: 2,
      titre: "Protocoles avancés",
      termine: false,
      contenu: [
        { type: "video", titre: "Les protocoles de routage", duree: "22 min" },
        { type: "lab", titre: "TP: Configuration OSPF", duree: "45 min" }
      ]
    },
    // ... autres modules
  ]

  const activeModuleData = modules.find(m => m.id === activeModule) || modules[0]
  const itemsPerPage = 5
  const totalPages = Math.ceil(activeModuleData.contenu.length / itemsPerPage)
  const paginatedContent = activeModuleData.contenu.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <button 
          onClick={() => router.back()}
          className="flex items-center mb-6 text-blue-600"
        >
          <FaArrowLeft className="mr-2" /> Retour à la formation
        </button>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Liste des modules */}
          <div className="space-y-2 lg:col-span-1">
            <h2 className="mb-4 text-lg font-bold text-gray-800">Modules de formation</h2>
            
            {modules.map(module => (
              <div
                key={module.id}
                onClick={() => {
                  setActiveModule(module.id)
                  setCurrentPage(1)
                }}
                className={`p-4 rounded-lg cursor-pointer transition ${
                  activeModule === module.id 
                    ? 'bg-blue-100 border-l-4 border-blue-600' 
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{module.titre}</h3>
                  {module.termine ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaLock className="text-gray-400" />
                  )}
                </div>
                {module.termine && (
                  <div className="mt-2 text-xs text-gray-500">
                    Terminé • Quiz: 18/20
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contenu du module */}
          <div className="p-6 bg-white rounded-lg shadow lg:col-span-3">
            <h2 className="mb-6 text-xl font-bold text-gray-800">
              {activeModuleData.titre}
              {activeModuleData.termine && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Terminé
                </span>
              )}
            </h2>

            <div className="space-y-4">
              {paginatedContent.map((item, index) => (
                <div key={index} className="p-4 transition border rounded-lg hover:shadow-md">
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                      item.type === 'video' ? 'bg-blue-100 text-blue-600' :
                      item.type === 'quiz' ? 'bg-purple-100 text-purple-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {item.type === 'video' && '▶️'}
                      {item.type === 'pdf' && '📄'}
                      {item.type === 'quiz' && '❓'}
                      {item.type === 'lab' && '🔬'}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">{item.titre}</h3>
                      <p className="text-sm text-gray-500">
                        {item.type === 'video' && `${item.duree} • Vidéo`}
                        {item.type === 'pdf' && `${item.pages} pages • Document PDF`}
                        {item.type === 'quiz' && `${item.questions} questions • Quiz`}
                        {item.type === 'lab' && `${item.duree} • Travaux pratiques`}
                      </p>
                    </div>
                  </div>
                  <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800">
                    {item.type === 'quiz' ? 'Passer le quiz' : 'Commencer'}
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {activeModuleData.contenu.length > itemsPerPage && (
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-1 text-gray-700 bg-gray-100 rounded-md disabled:opacity-50"
                >
                  <FaChevronLeft className="mr-1" /> Précédent
                </button>
                
                <span className="text-sm text-gray-700">
                  Page {currentPage} sur {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-3 py-1 text-gray-700 bg-gray-100 rounded-md disabled:opacity-50"
                >
                  Suivant <FaChevronRight className="ml-1" />
                </button>
              </div>
            )}

            {/* Validation du module */}
            {!activeModuleData.termine && (
              <div className="pt-6 mt-8 border-t">
                <button className="w-full px-4 py-3 font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                  Valider ce module
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}