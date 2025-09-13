"use client";

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '/src/lib/axios';

export default function InternshipRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [pdfModal, setPdfModal] = useState({ open: false, url: '' });
  const [actionModal, setActionModal] = useState({ open: false, id: null, message: '' });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        await axios.get('/sanctum/csrf-cookie');
        const url = statusFilter 
          ? `/api/internship-requests?status=${statusFilter}`
          : '/api/internship-requests';
        const { data } = await axios.get(url);
        setRequests(data.data || data);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [statusFilter]);

  const handleStatusUpdate = async (id, status, message) => {
    try {
      await axios.patch(`/api/internship-requests/${id}`, { status, message });
      toast.success('Demande mise à jour, email envoyé.');
      setRequests(prev =>
        prev.map(req => req.id === id ? { ...req, request_status: status } : req)
      );
      setActionModal({ open: false, id: null, message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const openPdfPreview = (url) => {
    if (!url) {
      toast.error("Cette demande n'existe plus.");
      return;
    }
    setPdfModal({ open: true, url });
  };

  const closePdf = () => setPdfModal({ open: false, url: '' });
  const openActionModal = (id) => setActionModal({ open: true, id, message: '' });
  const closeActionModal = () => setActionModal({ open: false, id: null, message: '' });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestion des demandes de stage</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Filtrer par statut</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Tous</option>
            <option value="pending">En attente</option>
            <option value="approved">Approuvé</option>
            <option value="rejected">Rejeté</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2 text-left">Étudiant</th>
                <th className="p-2 text-left">Formation</th>
                <th className="p-2 text-left">Statut</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(request => (
                <tr key={request.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{request.student_name}</td>
                  <td className="p-2">{request.formation_name}</td>
                  <td className="p-2">
                    <span className={
                      request.request_status === 'approved' ? 'text-green-600 font-semibold' :
                      request.request_status === 'rejected' ? 'text-red-600 font-semibold' : 'text-yellow-600 font-semibold'
                    }>
                      {request.request_status === 'pending' ? 'En attente' :
                      request.request_status === 'approved' ? 'Approuvé' : 'Rejeté'}
                    </span>
                  </td>
                  <td className="p-2">{new Date(request.created_at).toLocaleDateString()}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => openPdfPreview(`http://localhost:8000/storage/${request.request_internership}`)}
                      className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      title="Voir la demande"
                    >
                      <FaEye />
                    </button>

                    {request.request_status === 'pending' && (
                      <button
                        onClick={() => openActionModal(request.id)}
                        className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                        title="Valider / Rejeter"
                      >
                        Valider
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <Link href="/dashboard/admin" className="inline-flex items-center px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Retour
          </Link>
        </div>
      </div>

      {/* Modal PDF */}
      <AnimatePresence>
        {pdfModal.open && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePdf}
          >
            <motion.div
              className="bg-white p-4 rounded-lg shadow-lg w-[90%] h-[85vh] max-w-5xl"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Aperçu de la demande de stage</h3>
                <button onClick={closePdf} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Fermer</button>
              </div>
              <iframe
                src={pdfModal.url}
                className="w-full h-full rounded"
                title="PDF Preview"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Action */}
      <AnimatePresence>
        {actionModal.open && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeActionModal}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Message pour l'étudiant</h3>
              <textarea
                value={actionModal.message}
                onChange={(e) => setActionModal(prev => ({ ...prev, message: e.target.value }))}
                className="w-full border p-2 rounded mb-4"
                placeholder="Entrez un message facultatif..."
                rows={4}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleStatusUpdate(actionModal.id, 'approved', actionModal.message)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approuver
                </button>
                <button
                  onClick={() => handleStatusUpdate(actionModal.id, 'rejected', actionModal.message)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Rejeter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
