"use client";

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import axios from '/src/lib/axios';



export default function InternshipRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // D'abord obtenir le cookie CSRF
        await axios.get('/sanctum/csrf-cookie');

        const url = statusFilter 
          ? `/api/internship-requests?status=${statusFilter}`
          : '/api/internship-requests';

        const response = await axios.get(url);
        setRequests(response.data.data || response.data); // selon ton backend
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [statusFilter]);

  const handleStatusUpdate = async (id, status, message = '') => {
    try {
      await axios.patch(`/api/internship-requests/${id}`, { status, message });
      toast.success('Demande mise à jour avec succès');
      setRequests(prev =>
        prev.map(req => req.id === id ? { ...req, request_status: status } : req)
      );
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleSendMessage = async (id) => {
    const adminMessage = prompt('Entrez un message pour l\'étudiant (facultatif) :');
    if (adminMessage !== null) {
      await handleStatusUpdate(id, 'approved', adminMessage);
    }
  };





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
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
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
              <tr key={request.id} className="border-b">
                <td className="p-2">{request.student_name}</td>
                <td className="p-2">{request.formation_name}</td>
                <td className="p-2">
                  <span className={
                    request.request_status === 'approved' ? 'text-green-600' :
                    request.request_status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                  }>
                    {request.request_status === 'pending' ? 'En attente' :
                     request.request_status === 'approved' ? 'Approuvé' : 'Rejeté'}
                  </span>
                </td>
                <td className="p-2">{new Date(request.created_at).toLocaleDateString()}</td>
                <td className="p-2 flex space-x-2">
                  <a
                    href={`http://127.0.0.1:8000/api/internship-requests/${request.id}/download`}
                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <FaEye />
                  </a>
                  {request.request_status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleSendMessage(request.id)}
                        className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(request.id, 'rejected')}
                        className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6">
          <Link href="/dashboard/admin" className="inline-flex items-center px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Retour
          </Link>
        </div>
      </div>
    </div>
  );
}