'use client'

import { useState } from 'react'
import { FaPlus, FaTrash, FaEdit, FaTools, FaVideo, FaFileAlt, FaTimes } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useFormations } from '/src/hooks/useFormations'
import { Card, CardContent } from '/src/components/ui/Card'
import { Button } from '/src/components/ui/Button'
import Link from "next/link"
import { motion, AnimatePresence } from 'framer-motion'

export default function FormationsManagementPage() {
  const router = useRouter()
  const { formations } = useFormations()
  const [selectedFormation, setSelectedFormation] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (formation) => {
    setSelectedFormation(formation)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedFormation(null)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Catalogue de Formations</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {formations?.map((formation) => (
          <motion.div 
            key={formation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-4 space-y-2">
                {formation.picture ? (
                  <motion.img
                    src={`http://localhost:8000/storage/${formation.picture}`}
                    alt={formation.name}
                    className="object-cover w-full h-40 mb-4 rounded"
                    whileHover={{ scale: 1.02 }}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-40 mb-4 text-gray-500 bg-gray-200 rounded">
                    Pas d'image
                  </div>
                )}
                <h2 className="text-xl font-semibold">{formation.name}</h2>
                 <p className="text-sm text-gray-600 line-clamp-2">{formation.formation_details || 'Aucune description'}</p>
                <p className="text-sm">Prix : {formation.price} FCFA</p>
                <div className="flex flex-col gap-4 mt-6 sm:flex-row">
                  <Button className="bg-black" onClick={() => router.push(`/dashboard/apprenant/catalogue/${formation.id}/formation_inscription`)}>
                    Suivre la formation
                  </Button>
                  
                  {/* <Link
                    href={`/dashboard/apprenant/formation_inscription`}
                    className="inline-block w-full px-5 py-2 text-sm font-semibold text-center text-white transition bg-green-600 rounded sm:w-auto hover:bg-green-700"
                  >
                    
                  </Link> */}

                  <motion.button
                    onClick={() => openModal(formation)}
                    className="inline-block w-full px-5 py-2 text-sm font-semibold text-center text-white transition bg-blue-600 rounded sm:w-auto hover:bg-blue-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Voir détails
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal pour afficher les détails avec Framer Motion */}
      <AnimatePresence>
        {isModalOpen && selectedFormation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="w-full max-w-4xl p-6 mx-4 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedFormation.name}</h2>
                <motion.button 
                  onClick={closeModal} 
                  className="text-gray-500 hover:text-gray-700"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaTimes size={20} />
                </motion.button>
              </div>

              <div className="space-y-6">
                {selectedFormation.picture && (
                  <motion.img
                    src={`http://localhost:8000/storage/${selectedFormation.picture}`}
                    alt={selectedFormation.name}
                    className="object-cover w-full h-64 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  />
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-lg bg-gray-50"
                  >
                    <h3 className="mb-2 text-lg font-semibold">Description</h3>
                    <p className="text-gray-700">{selectedFormation.formation_details}</p>
                  </motion.div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-lg bg-gray-50"
                  >
                    <h3 className="mb-2 text-lg font-semibold">Prérequis</h3>
                    <p className="text-gray-700">{selectedFormation.prerequisites || 'Aucun prérequis spécifié'}</p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-4 rounded-lg bg-blue-50"
                >
                  <h3 className="mb-2 text-lg font-semibold">Prix</h3>
                  <p className="text-xl font-bold text-blue-600">{selectedFormation.price} FCFA</p>
                </motion.div>

                {selectedFormation.equipments && selectedFormation.equipments.length > 0 && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="p-4 rounded-lg bg-gray-50"
                  >
                    <h3 className="mb-4 text-lg font-semibold">Équipements nécessaires</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {selectedFormation.equipments.map((equipment) => (
                        <motion.div 
                          key={equipment.id} 
                          className="flex items-start p-3 space-x-3 border rounded-lg hover:bg-white"
                          whileHover={{ y: -2 }}
                        >
                          {equipment.picture && (
                            <img
                              src={`http://localhost:8000/storage/${equipment.image}`}
                              alt={equipment.name}
                              className="object-cover w-12 h-12 rounded"
                            />
                          )}
                          <div>
                            <p className="font-medium">{equipment.name}</p>
                            {equipment.description && (
                              <p className="text-sm text-gray-600">{equipment.description}</p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div 
                  className="flex justify-end pt-4 space-x-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Fermer
                  </motion.button>
                  <Link
                    href="/shop"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Acheter maintenant
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}