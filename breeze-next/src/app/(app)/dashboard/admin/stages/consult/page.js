'use client'
import { useState, useEffect } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { motion } from 'framer-motion'

function UserName({ userId, getUserInfo }) {
  const [name, setName] = useState('Chargement...')

  useEffect(() => {
    let isMounted = true
    getUserInfo(userId).then(info => {
      if (isMounted) setName(info)
    })
    return () => { isMounted = false }
  }, [userId])

  return <h2 className="text-lg font-semibold">{name}</h2>
}

export default function ManageStageRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [userInfoCache, setUserInfoCache] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqRes = await fetch('http://localhost:8000/api/requests')
        const reqData = await reqRes.json()

        setRequests(Array.isArray(reqData.data) ? reqData.data : [])
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDecision = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:8000/api/requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (!res.ok) throw new Error('Erreur lors de la mise à jour')
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    } catch (err) {
      console.error(err)
      alert("Erreur lors de l'action")
    }
  }

  const renderStatus = (status) => {
    switch (status) {
      case 'approved': return <span className="font-semibold text-green-600">Accepté</span>
      case 'rejected': return <span className="font-semibold text-red-600">Rejeté</span>
      default: return <span className="italic text-gray-500">En attente</span>
    }
  }

  const getUserInfo = async (userId) => {
    if (userInfoCache[userId]) {
      return userInfoCache[userId]
    }

    try {
      const res = await fetch(`http://localhost:8000/api/users/${userId}`)
      const data = await res.json()
      const info = `${data.name} ${data.surname} (${data.email})`
      setUserInfoCache(prev => ({ ...prev, [userId]: info }))
      return info
    } catch (err) {
      console.error(err)
      return `Utilisateur #${userId}`
    }
  }

  if (loading) return 
    <div className="p-6 text-center">
      <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
      <p>Chargement...</p> 
    </div>

  return (
    <div className="max-w-5xl p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Gérer les demandes de stage</h1>
      <div className="space-y-6">
        {requests.map((req, index) => (
          <motion.div 
            key={req.id} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-white border rounded shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <UserName userId={req.user_id} getUserInfo={getUserInfo} />
                <p className="text-sm text-gray-600">ID utilisateur : {req.user_id}</p>
                <p className="text-sm text-gray-600">Envoyée le : {new Date(req.created_at).toLocaleString()}</p>
                <p className="mt-1 text-sm">{renderStatus(req.status)}</p>
              </div>
              <a 
                href={`http://localhost:8000/storage/${req.path_pdf}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-blue-600 underline"
              >
                Voir la demande (PDF)
              </a>
            </div>
            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => handleDecision(req.id, 'approved')} 
                className="flex items-center gap-2 px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
              >
                <FaCheck /> Accepter
              </button>
              <button 
                onClick={() => handleDecision(req.id, 'rejected')} 
                className="flex items-center gap-2 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              >
                <FaTimes /> Rejeter
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
