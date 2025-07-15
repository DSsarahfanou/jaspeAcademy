'use client'
import { useState, useEffect } from 'react'
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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [userInfoCache, setUserInfoCache] = useState({})

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/orders')
        const data = await res.json()
        setOrders(data.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const getUserInfo = async (userId) => {
    if (userInfoCache[userId]) return userInfoCache[userId]
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

  const renderStatus = (status) => {
    return status === 1
      ? <span className="text-green-600 font-semibold">Confirmée</span>
      : <span className="text-orange-600 font-semibold">En attente</span>
  }

  if (loading) return 
    <div className="p-6 text-center">
      <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
      Chargement des commandes...
    </div>

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Commandes des clients</h1>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border p-4 rounded shadow hover:shadow-md bg-white"
          >
            <div className="flex justify-between items-start">
              <div>
                <UserName userId={order.user_id} getUserInfo={getUserInfo} />
                <p className="text-sm text-gray-600">ID utilisateur : {order.user_id}</p>
                <p className="text-sm text-gray-600">Date : {new Date(order.created_at).toLocaleString()}</p>
                <p className="text-sm text-gray-600">Montant : <span className="font-bold">{order.sum.toLocaleString()} FCFA</span></p>
                <p className="text-sm mt-1">Statut : {renderStatus(order.order_status)}</p>
              </div>
              <a
                href={`http://localhost:8000/storage/${order.path_facture}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                Voir la facture (PDF)
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
