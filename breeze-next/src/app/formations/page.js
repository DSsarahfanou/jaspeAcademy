'use client'

import { useState } from 'react'
import { FaPlus, FaTrash, FaEdit, FaTools, FaVideo, FaFileAlt, FaTimes, FaInfoCircle } from 'react-icons/fa'
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
    <div className="p-4 mt-28 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Catalogue de Formations</h1>
      </div>

      {formations?.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-100 rounded-lg">
          <FaInfoCircle className="text-4xl text-gray-400 mb-4" />
          <p className="text-lg text-gray-600">Aucune formation disponible pour le moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {formations?.map((formation) => (
            <motion.div 
              key={formation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-4 space-y-3 flex flex-col h-full">
                  {formation.picture ? (
                    <motion.img
                      src={`http://localhost:8000/storage/${formation.picture}`}
                      alt={formation.name}
                      className="object-cover w-full h-48 mb-4 rounded-lg"
                      whileHover={{ scale: 1.03 }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-48 mb-4 text-gray-500 bg-gray-200 rounded-lg">
                      <span className="text-sm">Pas d'image disponible</span>
                    </div>
                  )}
                  
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800">{formation.name}</h2>
                    <p className="text-sm text-gray-600 line-clamp-3 my-2">
                      {formation.formation_details || 'Aucune description disponible'}
                    </p>
                    <p className="text-lg font-bold text-blue-600 mt-2">
                      {new Intl.NumberFormat('fr-FR').format(formation.price)} FCFA
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => router.push(`/dashboard/apprenant/catalogue/${formation.id}/formation_inscription`)}
                    >
                      <FaVideo className="mr-2" /> Suivre la formation
                    </Button>
                    
                    <motion.button
                      onClick={() => openModal(formation)}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-900 flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaInfoCircle className="mr-2" /> Détails
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal amélioré */}
      <AnimatePresence>
        {isModalOpen && selectedFormation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-4xl bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b">
                <h2 className="text-2xl font-bold text-gray-800">{selectedFormation.name}</h2>
                <motion.button 
                  onClick={closeModal} 
                  className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes size={20} />
                </motion.button>
              </div>

              <div className="p-6 space-y-6">
                {selectedFormation.picture && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="overflow-hidden rounded-lg"
                  >
                    <img
                      src={`http://localhost:8000/storage/${selectedFormation.picture}`}
                      alt={selectedFormation.name}
                      className="object-cover w-full h-64"
                    />
                  </motion.div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-5 bg-gray-50 rounded-lg"
                  >
                    <h3 className="mb-3 text-lg font-semibold flex items-center">
                      <FaFileAlt className="mr-2 text-blue-500" /> Description
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {selectedFormation.formation_details || 'Aucune description disponible'}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-5 bg-gray-50 rounded-lg"
                  >
                    <h3 className="mb-3 text-lg font-semibold flex items-center">
                      <FaTools className="mr-2 text-blue-500" /> Prérequis
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {selectedFormation.prerequisites || 'Aucun prérequis spécifié'}
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-5 bg-blue-50 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Prix de la formation</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        {new Intl.NumberFormat('fr-FR').format(selectedFormation.price)} FCFA
                      </p>
                    </div>
                    <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                      Disponible
                    </span>
                  </div>
                </motion.div>

                {selectedFormation.equipments && selectedFormation.equipments.length > 0 && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="p-5 bg-gray-50 rounded-lg"
                  >
                    <h3 className="mb-4 text-lg font-semibold">Équipements nécessaires</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {selectedFormation.equipments.map((equipment) => (
                        <motion.div 
                          key={equipment.id} 
                          className="flex items-start p-3 space-x-3 bg-white border rounded-lg hover:shadow"
                          whileHover={{ y: -3 }}
                        >
                          {equipment.picture && (
                            <img
                              src={`http://localhost:8000/storage/${equipment.picture}`}
                              alt={equipment.name}
                              className="object-cover w-12 h-12 rounded"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-800">{equipment.name}</p>
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
                  className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    onClick={closeModal}
                    className="px-6 py-2 font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FaTimes className="mr-2" /> Fermer
                  </motion.button>
                  <Link
                    href="/shop"
                    className="px-6 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  >
                    <FaPlus className="mr-2" />Acheter equipments
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