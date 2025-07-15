"use client";

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { FaEye, FaPlus } from 'react-icons/fa';
import axios from '/src/lib/axios';

export default function StudentInternshipRequests() {
  const [requests, setRequests] = useState([]);
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialiser le cookie CSRF
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`, {
          withCredentials: true,
        });

        // Récupérer les demandes de stage
        const requestsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/internship-requests`, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
          },
        });
        setRequests(requestsResponse.data.data);

        // Récupérer les informations de l'utilisateur
        const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
          },
        });
        const userData = userResponse.data;

        // Récupérer les formations de l'étudiant
        const formationsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/formation_student/${userData.id}/formations`, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
          },
        });
        // Filtrer les formations terminées sans demande de stage
        const eligibleFormations = formationsResponse.data.formations.filter(f => 
          f.pivot.progression === 100 && !f.pivot.request_internership
        );
        setFormations(eligibleFormations);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Erreur lors de la récupération des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
        <p>Chargement...</p> 
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mes demandes de stage</h1>
        
        {/* Liste des demandes existantes */}
        <h2 className="text-xl font-semibold mb-4">Demandes soumises</h2>
        {requests.length === 0 ? (
          <p className="text-gray-600">Aucune demande de stage soumise.</p>
        ) : (
          <table className="w-full border-collapse mb-8">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2 text-left">Formation</th>
                <th className="p-2 text-left">Statut</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(request => (
                <tr key={request.id} className="border-b">
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
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Formations éligibles pour une nouvelle demande */}
        <h2 className="text-xl font-semibold mb-4">Soumettre une nouvelle demande</h2>
        {formations.length === 0 ? (
          <p className="text-gray-600">Aucune formation terminée sans demande de stage.</p>
        ) : (
          <div className="space-y-4">
            {formations.map(formation => (
              <div key={formation.id} className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span>{formation.name}</span>
                <Link
                  href={`/demande-stage?formation_id=${formation.id}`}
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  <FaPlus className="mr-2" />
                  Demander un stage
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link href="/student" className="inline-flex items-center px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Retour
          </Link>
        </div>
      </div>
    </div>
  );
}