'use client';

import React, { useEffect, useState } from 'react';
import axios from '/src/lib/axios';
import { FaCheckCircle, FaTimesCircle, FaFilePdf, FaEye, FaDownload } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [selectedFacture, setSelectedFacture] = useState(null);

  useEffect(() => {
    axios.get('/api/orders_student')
      .then(response => {

        setOrders(response.data.data);
      })
      .catch(error => {
        console.error('Erreur récupération commandes :', error);
      });
  }, []);

  return (
    <div className="grid gap-6 p-6 max-w-4xl mx-auto">
      {orders.map(order => (
        <div key={order.id} className="border p-4 rounded shadow bg-white">
          <h2 className="text-lg text-blue-600 font-bold mb-2">N° Commande : {order.order_number}</h2>
          <p className="text-sm text-gray-500">Date : {new Date(order.created_at).toLocaleString()}</p>

          {order.equipment_orders.map((eqOrder) => (
            <div key={eqOrder.id} className="flex items-center gap-4 mt-3">
              <img
                src={`http://localhost:8000/storage/${eqOrder.equipment.picture}`}
                alt={eqOrder.equipment.name}
                className="w-20 h-20 object-cover rounded border"
              />
              <div>
                <p className="font-semibold text-gray-800">{eqOrder.equipment.name}</p>
                <p>Quantité : {eqOrder.quantity}</p>
                <p>Prix unitaire : {eqOrder.equipment.price.toLocaleString()} FCFA</p>
              </div>
            </div>
          ))}

          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              {order.order_status === 1 ? (
                <span className="text-green-600 flex items-center gap-1"><FaCheckCircle /> Livré</span>
              ) : (
                <span className="text-yellow-600 flex items-center gap-1"><FaTimesCircle /> En attente</span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedFacture(`http://localhost:8000/storage/${order.path_facture}`)}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <FaEye /> Aperçu
              </button>

              <a
                href={`http://localhost:8000/storage/${order.path_facture}`}
                download
                className="text-red-600 hover:underline flex items-center gap-1"
              >
                <FaDownload /> Télécharger
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Modal d’aperçu de la facture */}
      <AnimatePresence>
        {selectedFacture && (
          <Dialog as="div" className="relative z-50" open={true} onClose={() => setSelectedFacture(null)}>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="bg-white max-w-3xl w-full rounded shadow p-4 relative"
              >
                <button
                  onClick={() => setSelectedFacture(null)}
                  className="absolute top-2 right-4 text-gray-500 hover:text-red-600 text-xl"
                >
                  &times;
                </button>
                <h3 className="text-lg font-semibold mb-4">Aperçu de la facture</h3>
                <iframe
                  src={selectedFacture}
                  className="w-full h-[500px] border rounded"
                  title="Aperçu PDF"
                ></iframe>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
