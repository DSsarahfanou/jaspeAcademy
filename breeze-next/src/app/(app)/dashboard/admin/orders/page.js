'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from '/src/lib/axios'
import { toast, ToastContainer } from 'react-toastify';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('non_livrees')
  const [selectedClient, setSelectedClient] = useState(null)
  const [selectedEquipments, setSelectedEquipments] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/orders')
        const data = await res.json()
        console.log(data)
        setOrders(data.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const renderStatus = (status) => {
    return status === 1
      ? <span className="text-green-600 font-semibold">Confirmée</span>
      : <span className="text-orange-600 font-semibold">En attente</span>
  }

  const filteredOrders = orders.filter(order =>
    activeTab === 'livrees' ? order.order_status === 1 : order.order_status !== 1
  )


  const handleValidate = async (orderId) => {
    try {
      console.log(orderId)
      const order_status = true;
      await axios.patch(`http://localhost:8000/api/orders/${orderId}`, {order_status});
      toast.success('commande déjà livrée.');
    } catch (error) {
      toast.error(error.message);
    }
  };


  if (loading) return (
    <div className="p-6 text-center">
      <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mx-auto" />
      Chargement des commandes...
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Gestion des commandes</h1>

      {/* Onglets */}
      <div className="flex mb-6 space-x-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'non_livrees' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('non_livrees')}
        >
          Commandes non livrées
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'livrees' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('livrees')}
        >
          Commandes livrées
        </button>
      </div>

      {/* Liste des commandes */}
      <div className="space-y-6">
        <AnimatePresence>
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="border p-4 rounded shadow bg-white"
            >
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div className="flex-1">
                  <h2 className="font-bold text-lg">{order.order_number}</h2>
                  <p className="text-gray-600">Montant : <span className="font-bold">{order.sum.toLocaleString()} FCFA</span></p>
                  <p className="text-gray-600">Date : {new Date(order.created_at).toLocaleString()}</p>
                  <p className="text-gray-600">Statut : {renderStatus(order.order_status)}</p>
                </div>

                <div className="flex flex-col gap-2 items-end text-sm">
                  <button
                    onClick={() => setSelectedClient(order.student)}
                    className="text-blue-600 hover:underline"
                  >
                    Détails client
                  </button>

                  <button
                    onClick={() => setSelectedEquipments(order.equipment_orders)}
                    className="text-indigo-600 hover:underline"
                  >
                    Détails commande
                  </button>

                  <a
                    href={`http://localhost:8000/storage/${order.path_facture}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline"
                  >
                    Voir facture (PDF)
                  </a>

                  {order.order_status !== 1 && (
                    <button
                      onClick={() => handleValidate(order.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Marquer comme livrée
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Popup client */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setSelectedClient(null)}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-2">Informations du client</h3>
              <p><strong>Nom :</strong> {selectedClient.name}</p>
              <p><strong>Prénom :</strong> {selectedClient.surname}</p>
              <p><strong>Email :</strong> {selectedClient.email}</p>
              <p><strong>Téléphone :</strong> {selectedClient.phone}</p>
              <p><strong>Sexe :</strong> {selectedClient.gender}</p>
              <p><strong>Adresse :</strong> {selectedClient.address}</p>
              <button
                onClick={() => setSelectedClient(null)}
                className="mt-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup équipements */}
      <AnimatePresence>
        {selectedEquipments && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setSelectedEquipments(null)}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-4">Détails des équipements</h3>
              <div className="space-y-3">
                {selectedEquipments.map((eq, i) => (
                  <div key={i} className="flex items-center gap-4 border-b pb-2">
                    <img
                      src={`http://localhost:8000/storage/${eq.equipment.picture}`}
                      alt={eq.equipment.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{eq.equipment.name}</p>
                      <p>Quantité : {eq.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setSelectedEquipments(null)}
                className="mt-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
