'use client'

import { useState } from 'react'

export default function CreateFormation() {
  const [formation, setFormation] = useState({
    name: '',
    prerequisites: '',
    price: '',
    formation_details: '',
  })

  const [modules, setModules] = useState([])

  const handleAddModule = () => {
    setModules([...modules, {
      title: '',
      description: '',
      lessons: []
    }])
  }

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...modules]
    updatedModules[index][field] = value
    setModules(updatedModules)
  }

  const handleAddLesson = (moduleIndex) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons.push({
      title: '',
      type: 'pdf', // default type
      content: ''
    })
    setModules(updatedModules)
  }

  const handleLessonChange = (moduleIndex, lessonIndex, field, value) => {
    const updatedModules = [...modules]
    updatedModules[moduleIndex].lessons[lessonIndex][field] = value
    setModules(updatedModules)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      ...formation,
      modules
    }

    try {
      const res = await fetch('/api/formations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Erreur lors de la création')

      alert('Formation créée avec succès !')
    } catch (error) {
      console.error(error)
      alert('Erreur lors de la création')
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Créer une formation</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Infos de la formation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Nom" className="input" value={formation.name} onChange={(e) => setFormation({ ...formation, name: e.target.value })} required />
          <input type="text" placeholder="Prérequis" className="input" value={formation.prerequisites} onChange={(e) => setFormation({ ...formation, prerequisites: e.target.value })} />
          <input type="number" placeholder="Prix (FCFA)" className="input" value={formation.price} onChange={(e) => setFormation({ ...formation, price: e.target.value })} />
          <textarea placeholder="Détails de la formation" className="textarea col-span-2" value={formation.formation_details} onChange={(e) => setFormation({ ...formation, formation_details: e.target.value })}></textarea>
        </div>

        {/* Modules */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Modules</h2>
          {modules.map((module, index) => (
            <div key={index} className="p-4 border rounded mb-4">
              <input
                type="text"
                placeholder="Titre du module"
                className="input mb-2"
                value={module.title}
                onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="textarea mb-2"
                value={module.description}
                onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
              />

              {/* Leçons */}
              <div>
                <h3 className="font-medium">Leçons</h3>
                {module.lessons.map((lesson, lIndex) => (
                  <div key={lIndex} className="border p-2 rounded mb-2">
                    <input
                      type="text"
                      placeholder="Titre de la leçon"
                      className="input mb-1"
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(index, lIndex, 'title', e.target.value)}
                    />
                    <select
                      className="input mb-1"
                      value={lesson.type}
                      onChange={(e) => handleLessonChange(index, lIndex, 'type', e.target.value)}
                    >
                      <option value="pdf">PDF</option>
                      <option value="video">Vidéo</option>
                    </select>
                    <input
                      type="text"
                      placeholder={lesson.type === 'pdf' ? 'URL du PDF' : 'Lien de la vidéo'}
                      className="input"
                      value={lesson.content}
                      onChange={(e) => handleLessonChange(index, lIndex, 'content', e.target.value)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddLesson(index)}
                  className="btn btn-secondary mt-1"
                >
                  + Ajouter une leçon
                </button>
              </div>
            </div>
          ))}

          <button type="button" onClick={handleAddModule} className="btn btn-primary">
            + Ajouter un module
          </button>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-success w-full mt-6">Créer la formation</button>
      </form>
    </div>
  )
}
