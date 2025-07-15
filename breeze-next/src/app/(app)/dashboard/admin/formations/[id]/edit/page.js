'use client'

import { useEffect, useState } from 'react'
import axios from '/src/lib/axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '/src/components/ui/Button'
import { FaArrowLeft, FaPlus, FaTrashAlt  } from 'react-icons/fa'

export default function EditFormationPage({ params }) {
  const { id } = params
  const router = useRouter()
  const [formation, setFormation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const [existingEquipments, setExistingEquipments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // Structure par défaut
  const defaultModule = {
    title: '',
    description: '',
    lessons: [{ title: '', content_file: null, video_file: null }]
  }

  const defaultEquipment = {
    id: null,
    name: '',
    quantity: 1,
    price: '',
    status: true,
    description: '',
    details: '',
    picture: null,
    isNew: true
  }

  // Charger la formation et les équipements existants
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [formationRes, equipmentsRes] = await Promise.all([
          axios.get(`/api/formations/${id}`),
          axios.get('/api/equipments')
        ])
        
        setFormation({
          ...formationRes.data.data,
          // Convertir les équipements pour le formulaire
          equipments: formationRes.data.data.equipments?.map(eq => ({
            ...eq,
            id: eq.id,
            quantity: eq.pivot?.quantity || 1,
            isNew: false
          })) || []
        })
        
        setExistingEquipments(equipmentsRes.data.data || [])
      } catch (error) {
        console.error('Erreur de chargement', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  // Gestion des changements
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormation(prev => ({ ...prev, [name]: value }))
  }

  const handleModuleChange = (index, e) => {
    const { name, value } = e.target
    const updatedModules = [...formation.modules]
    updatedModules[index][name] = value
    setFormation(prev => ({ ...prev, modules: updatedModules }))
  }

  const handleLessonChange = (moduleIndex, lessonIndex, e) => {
    const { name, value } = e.target
    const updatedModules = [...formation.modules]
    updatedModules[moduleIndex].lessons[lessonIndex][name] = value
    setFormation(prev => ({ ...prev, modules: updatedModules }))
  }

  // Gestion des fichiers
  const handleFileUpload = (e, field) => {
    setFormation(prev => ({ ...prev, [field]: e.target.files[0] }))
  }

  const handleLessonFileUpload = (moduleIndex, lessonIndex, field, e) => {
    const updatedModules = [...formation.modules]
    updatedModules[moduleIndex].lessons[lessonIndex][field] = e.target.files[0]
    updatedModules[moduleIndex].lessons[lessonIndex][field === 'content_file' ? 'video_file' : 'content_file'] = null
    setFormation(prev => ({ ...prev, modules: updatedModules }))
  }

  // Gestion des équipements
  const handleEquipmentChange = (index, e) => {
    const { name, value, type, checked } = e.target
    const updatedEquipments = [...formation.equipments]
    updatedEquipments[index][name] = type === 'checkbox' ? checked : value
    setFormation(prev => ({ ...prev, equipments: updatedEquipments }))
  }

  // Ajout/suppression d'éléments
  const addModule = () => {
    setFormation(prev => ({
      ...prev,
      modules: [...prev.modules, { ...defaultModule }]
    }))
  }

  const removeModule = (index) => {
    const updatedModules = formation.modules.filter((_, i) => i !== index)
    setFormation(prev => ({ ...prev, modules: updatedModules }))
  }

  const addLesson = (moduleIndex) => {
    const updatedModules = [...formation.modules]
    updatedModules[moduleIndex].lessons.push({ ...defaultModule.lessons[0] })
    setFormation(prev => ({ ...prev, modules: updatedModules }))
  }

  const removeLesson = (moduleIndex, lessonIndex) => {
    const updatedModules = [...formation.modules]
    updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons.filter((_, i) => i !== lessonIndex)
    setFormation(prev => ({ ...prev, modules: updatedModules }))
  }

  const addEquipment = () => {
    setFormation(prev => ({
      ...prev,
      equipments: [...prev.equipments, { ...defaultEquipment }]
    }))
  }

  const selectExistingEquipment = (equipment) => {
    setFormation(prev => ({
      ...prev,
      equipments: [...prev.equipments, {
        ...equipment,
        quantity: 1,
        isNew: false
      }]
    }))
    setSearchTerm('')
  }

  const removeEquipment = (index) => {
    const updatedEquipments = formation.equipments.filter((_, i) => i !== index)
    setFormation(prev => ({ ...prev, equipments: updatedEquipments }))
  }

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      const formData = new FormData()
      
      // Ajouter les champs de base
      formData.append('_method', 'PUT') // Pour la méthode PUT
      formData.append('name', formation.name)
      formData.append('prerequisites', formation.prerequisites)
      formData.append('price', formation.price)
      formData.append('formation_details', formation.formation_details)
      formData.append('categorie', formation.categorie || '')

      // Image de la formation
      if (formation.picture instanceof File) {
        formData.append('picture', formation.picture)
      }

      // Modules et leçons
      formation.modules.forEach((module, moduleIndex) => {
        formData.append(`modules[${moduleIndex}][title]`, module.title)
        formData.append(`modules[${moduleIndex}][description]`, module.description)

        module.lessons.forEach((lesson, lessonIndex) => {
          formData.append(`modules[${moduleIndex}][lessons][${lessonIndex}][title]`, lesson.title)
          
          if (lesson.content_file instanceof File) {
            formData.append(`modules[${moduleIndex}][lessons][${lessonIndex}][content_file]`, lesson.content_file)
          } else if (lesson.content) {
            formData.append(`modules[${moduleIndex}][lessons][${lessonIndex}][content]`, lesson.content)
          }
          
          if (lesson.video_file instanceof File) {
            formData.append(`modules[${moduleIndex}][lessons][${lessonIndex}][video_file]`, lesson.video_file)
          } else if (lesson.video) {
            formData.append(`modules[${moduleIndex}][lessons][${lessonIndex}][video]`, lesson.video)
          }
        })
      })

      // Équipements
      formation.equipments.forEach((equipment, index) => {
        if (equipment.id) {
          formData.append(`equipments[${index}][id]`, equipment.id)
          formData.append(`equipments[${index}][quantity]`, equipment.quantity)
        } else {
          formData.append(`equipments[${index}][name]`, equipment.name)
          formData.append(`equipments[${index}][quantity]`, equipment.quantity)
          formData.append(`equipments[${index}][price]`, equipment.price)
          formData.append(`equipments[${index}][status]`, equipment.status)
          formData.append(`equipments[${index}][description]`, equipment.description || '')
          formData.append(`equipments[${index}][details]`, equipment.details || '')
          
          if (equipment.picture instanceof File) {
            formData.append(`equipments[${index}][picture]`, equipment.picture)
          }
        }
      })

      await axios.post(`/api/formations/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      router.push(`/dashboard/admin/formations/${id}`)
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {})
      } else {
        console.error('Erreur lors de la mise à jour', error)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading && !formation) {
    return (
      <div className="p-6">
        <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
        <p>Chargement en cours...</p>
      </div>
    )
  }

  if (!formation) {
    return (
      <div className="p-6">
        <p>Formation introuvable</p>
        <Button onClick={() => router.back()} className="mt-4">
          Retour
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <FaArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Modifier la formation</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section Informations de base */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Informations de base</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom*</label>
              <input
                type="text"
                name="name"
                value={formation.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Prix*</label>
              <input
                type="number"
                name="price"
                value={formation.price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price[0]}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'picture')}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {formation.picture && !(formation.picture instanceof File) && (
                <p className="mt-2 text-sm text-gray-600">
                  Image actuelle: {formation.picture.split('/').pop()}
                </p>
              )}
              {errors.picture && <p className="mt-1 text-sm text-red-600">{errors.picture[0]}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Prérequis*</label>
              <textarea
                name="prerequisites"
                value={formation.prerequisites}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.prerequisites && <p className="mt-1 text-sm text-red-600">{errors.prerequisites[0]}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description*</label>
              <textarea
                name="formation_details"
                value={formation.formation_details}
                onChange={handleChange}
                rows={5}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.formation_details && <p className="mt-1 text-sm text-red-600">{errors.formation_details[0]}</p>}
            </div>
          </div>
        </div>

        {/* Section Modules */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Modules*</h2>
            <Button type="button" onClick={addModule}>
              <FaPlus className="h-4 w-4 mr-2" />
              Ajouter un module
            </Button>
          </div>

          {formation.modules.length === 0 ? (
            <p className="text-gray-500">Aucun module ajouté</p>
          ) : (
            formation.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Module {moduleIndex + 1}</h3>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeModule(moduleIndex)}
                  >
                    <FaTrashAlt  className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Titre*</label>
                    <input
                      type="text"
                      name="title"
                      value={module.title}
                      onChange={(e) => handleModuleChange(moduleIndex, e)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors[`modules.${moduleIndex}.title`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`modules.${moduleIndex}.title`][0]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description*</label>
                    <textarea
                      name="description"
                      value={module.description}
                      onChange={(e) => handleModuleChange(moduleIndex, e)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors[`modules.${moduleIndex}.description`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`modules.${moduleIndex}.description`][0]}</p>
                    )}
                  </div>
                </div>

                {/* Leçons */}
                <div className="ml-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-md font-medium">Leçons</h4>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => addLesson(moduleIndex)}
                    >
                      <FaPlus className="h-4 w-4 mr-2" />
                      Ajouter une leçon
                    </Button>
                  </div>

                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="mb-4 p-3 border border-gray-100 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-sm font-medium">Leçon {lessonIndex + 1}</h5>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeLesson(moduleIndex, lessonIndex)}
                        >
                          <FaTrashAlt  className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Titre*</label>
                          <input
                            type="text"
                            name="title"
                            value={lesson.title}
                            onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, e)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                          {errors[`modules.${moduleIndex}.lessons.${lessonIndex}.title`] && (
                            <p className="mt-1 text-sm text-red-600">{errors[`modules.${moduleIndex}.lessons.${lessonIndex}.title`][0]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Fichier PDF</label>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleLessonFileUpload(moduleIndex, lessonIndex, 'content_file', e)}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                          />
                          {lesson.content && !(lesson.content_file instanceof File) && (
                            <p className="mt-2 text-sm text-gray-600">
                              Fichier actuel: {lesson.content.split('/').pop()}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Fichier Vidéo</label>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleLessonFileUpload(moduleIndex, lessonIndex, 'video_file', e)}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                          />
                          {lesson.video && !(lesson.video_file instanceof File) && (
                            <p className="mt-2 text-sm text-gray-600">
                              Fichier actuel: {lesson.video.split('/').pop()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Section Équipements */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Équipements nécessaires</h2>
            <Button type="button" onClick={addEquipment}>
              <FaPlus className="h-4 w-4 mr-2" />
              Ajouter un équipement
            </Button>
          </div>

          {/* Recherche d'équipements existants */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Rechercher un équipement existant</label>
            <div className="mt-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Nom de l'équipement"
              />
              {searchTerm && existingEquipments.filter(eq => 
                eq.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !formation.equipments.some(fEq => fEq.id === eq.id)
              ).length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto">
                  {existingEquipments.filter(eq => 
                    eq.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    !formation.equipments.some(fEq => fEq.id === eq.id)
                  ).map(equipment => (
                    <div
                      key={equipment.id}
                      className="px-4 py-2 hover:bg-indigo-50 cursor-pointer"
                      onClick={() => selectExistingEquipment(equipment)}
                    >
                      {equipment.name} - {equipment.price}€
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {formation.equipments.length === 0 ? (
            <p className="text-gray-500">Aucun équipement ajouté</p>
          ) : (
            formation.equipments.map((equipment, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">
                    {equipment.isNew ? 'Nouvel équipement' : `Équipement: ${equipment.name}`}
                  </h3>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeEquipment(index)}
                  >
                    <FaTrashAlt  className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {equipment.isNew ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nom*</label>
                        <input
                          type="text"
                          name="name"
                          value={equipment.name}
                          onChange={(e) => handleEquipmentChange(index, e)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Quantité*</label>
                        <input
                          type="number"
                          name="quantity"
                          value={equipment.quantity}
                          onChange={(e) => handleEquipmentChange(index, e)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Prix*</label>
                        <input
                          type="number"
                          name="price"
                          value={equipment.price}
                          onChange={(e) => handleEquipmentChange(index, e)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="status"
                          checked={equipment.status}
                          onChange={(e) => handleEquipmentChange(index, e)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-700">Disponible</label>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const updatedEquipments = [...formation.equipments]
                            updatedEquipments[index].picture = e.target.files[0]
                            setFormation(prev => ({ ...prev, equipments: updatedEquipments }))
                          }}
                          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                        {equipment.picture && !(equipment.picture instanceof File) && (
                          <p className="mt-2 text-sm text-gray-600">
                            Image actuelle: {equipment.picture.split('/').pop()}
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Nom</p>
                        <p>{equipment.name}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Quantité*</label>
                        <input
                          type="number"
                          name="quantity"
                          value={equipment.quantity}
                          onChange={(e) => handleEquipmentChange(index, e)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700">Prix</p>
                        <p>{equipment.price}€</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700">Statut</p>
                        <p>{equipment.status ? 'Disponible' : 'Indisponible'}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Annuler
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </Button>
        </div>
      </form>
    </div>
  )
}