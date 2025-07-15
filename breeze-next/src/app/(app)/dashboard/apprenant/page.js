'use client';

import React, { useEffect, useState } from 'react';
import axios from '/src/lib/axios';
import { FaBook, FaListAlt, FaCheckCircle, FaCertificate } from 'react-icons/fa';

export default function TableauDeBordPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('/api/student/dashboard')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

if (!stats) {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-gray-600">
      <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
      <p>Chargement du tableau de bord...</p>
    </div>
  );
}



  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard icon={<FaBook className="text-blue-600 text-3xl mr-4" />} 
          count={stats.formations_en_cours} label="Formations en cours" />

        <DashboardCard icon={<FaListAlt className="text-purple-600 text-3xl mr-4" />} 
          count={stats.formations_terminees} label="Formations terminées" />

        <DashboardCard icon={<FaCheckCircle className="text-green-600 text-3xl mr-4" />} 
          count={stats.meetings_en_cours} label="Meetings en cours" />

        <DashboardCard icon={<FaCheckCircle className="text-green-600 text-3xl mr-4" />} 
          count={stats.meetings_passes} label="Meetings passés" />

        <DashboardCard icon={<FaCheckCircle className="text-green-600 text-3xl mr-4" />} 
          count={stats.demandes_soumises} label="Demandes soumises" />

        <DashboardCard icon={<FaCheckCircle className="text-green-600 text-3xl mr-4" />} 
          count={stats.demandes_approuvees} label="Demandes approuvées" />

        <DashboardCard icon={<FaCertificate className="text-yellow-600 text-3xl mr-4" />} 
          count={stats.attestations} label="Attestations obtenues" />
      </div>
    </div>
  );
}

function DashboardCard({ icon, count, label }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
      {icon}
      <div>
        <p className="text-xl font-semibold">{count}</p>
        <p className="text-gray-600 text-sm">{label}</p>
      </div>
    </div>
  );
}
