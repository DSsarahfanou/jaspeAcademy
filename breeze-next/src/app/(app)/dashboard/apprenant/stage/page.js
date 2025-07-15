'use client'

import { useState, useEffect } from 'react'
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa'

export default function DemandeStagePage() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fichier, setFichier] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/demande-stage/status', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await res.json()
        setStatus(data.status)
      } catch (error) {
        console.error('Erreur lors de la récupération du statut de stage', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('attestation', fichier)

    try {
      const res = await fetch('http://localhost:8000/api/demande-stage', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('en_attente')
        setMessage('Demande envoyée avec succès !')
      } else {
        setMessage(data.message || 'Erreur lors de l’envoi.')
      }
    } catch (error) {
      console.error('Erreur', error)
      setMessage('Une erreur est survenue.')
    }
  }

  const renderStatut = () => {
    switch (status) {
      case 'en_attente':
        return (
          <div className="text-yellow-500 flex items-center gap-2">
            <FaHourglassHalf /> Votre demande est en attente de traitement.
          </div>
        )
      case 'accepte':
        return (
          <div className="text-green-600 flex items-center gap-2">
            <FaCheckCircle /> Félicitations ! Votre demande a été acceptée.
          </div>
        )
      case 'refuse':
        return (
          <div className="text-red-600 flex items-center gap-2">
            <FaTimesCircle /> Votre demande a été refusée.
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📩 Demande de stage</h1>

      {loading ? (
        <div>
          <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
          <p>Chargement...</p> 
        </div>
      ) : status ? (
        <div className="bg-white p-5 rounded-xl shadow-md border">{renderStatut()}</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border space-y-4">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Déposez votre attestation de formation (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFichier(e.target.files[0])}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Envoyer la demande
          </button>

          {message && <p className="text-sm text-green-600">{message}</p>}
        </form>
      )}
    </div>
  )
}
