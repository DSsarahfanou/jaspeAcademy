'use client'

import { useEffect, useState } from 'react'
import axios from '/src/lib/axios'

export default function EditFormationPage({ params }) {
  const { id } = params
  const [formation, setFormation] = useState(null)

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const response = await axios.get(`/api/formations/${id}`)
        setFormation(response.data.data)
      } catch (error) {
        console.error('Erreur de chargement', error)
      }
    }

    if (id) {
      fetchFormation()
    }
  }, [id])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Modifier la formation #{id}</h1>
      {formation ? (
        <form className="space-y-4">
          <input
            type="text"
            className="border p-2 w-full"
            defaultValue={formation.title}
          />
          {/* Tu peux rajouter d’autres champs ici */}
        </form>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  )
}
