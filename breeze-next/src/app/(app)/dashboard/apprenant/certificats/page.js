'use client'

import { useEffect, useState } from 'react'
import { FaDownload, FaTrophy } from 'react-icons/fa'

export default function MesCertificatsPage() {
  const [certificats, setCertificats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCertificats = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/mes-certificats', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await res.json()
        setCertificats(data)
      } catch (error) {
        console.error('Erreur lors de la récupération des certificats', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificats()
  }, [])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
        <FaTrophy className="text-yellow-500 mr-2" />
        Mes certificats
      </h1>

      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : certificats.length === 0 ? (
        <p className="text-gray-500">Aucun certificat disponible pour l’instant.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificats.map((certif, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow-md border">
              <h2 className="text-lg font-semibold text-blue-700 mb-2">
                🎓 {certif.nom_formation}
              </h2>

              <p className="text-sm text-gray-600">
                <strong>Date :</strong> {certif.date_obtention}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Score :</strong> {certif.score}%
              </p>

              {/* Progression */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${certif.score}%` }}
                ></div>
              </div>

              {/* Bouton de téléchargement */}
              <a
                href={certif.certificat_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                <FaDownload className="mr-2" />
                Télécharger PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
