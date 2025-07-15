"use client";

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { FaDownload } from 'react-icons/fa';
import axios from '/src/lib/axios';
import PdfPreview from '/src/components/PdfPreview';

export default function StudentAttestations() {
  const [attestations, setAttestations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttestations = async () => {
      try {
        await axios.get('/sanctum/csrf-cookie');

        const response = await axios.get('/api/student/attestations');
        setAttestations(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Erreur lors de la récupération des attestations');
      } finally {
        setLoading(false);
      }
    };

    fetchAttestations();
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
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mes attestations</h1>
        {attestations.length === 0 ? (
          <p className="text-gray-600">Aucune attestation disponible.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {attestations.map(attestation => (
              <a
                key={attestation.id}
                href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${attestation.attestation}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border rounded-lg shadow hover:shadow-md transition duration-200 overflow-hidden"
              >
                <PdfPreview url={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/attestations/${attestation.id}/download`} />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{attestation.formation_name}</h3>
                  <p className="text-gray-600 text-sm mb-2">Émis le {new Date(attestation.created_at).toLocaleDateString()}</p>
                  <button
                    onClick={() => handleDownload(attestation.id, attestation.formation_name)}
                    className="flex items-center text-green-600 hover:text-green-800 text-sm"
                  >
                    <FaDownload className="mr-2" /> Télécharger
                  </button>
                </div>
              </a>          
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
