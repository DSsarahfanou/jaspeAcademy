'use client';

import React from 'react';
import { FaBook, FaListAlt, FaCheckCircle, FaCertificate } from 'react-icons/fa';

export default function TableauDeBordPage() {
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <FaBook className="text-blue-600 text-3xl mr-4" />
          <div>
            <p className="text-xl font-semibold">3</p>
            <p className="text-gray-600 text-sm">Formations en cours</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <FaListAlt className="text-purple-600 text-3xl mr-4" />
          <div>
            <p className="text-xl font-semibold">12 / 20</p>
            <p className="text-gray-600 text-sm">Modules complétés</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <FaCheckCircle className="text-green-600 text-3xl mr-4" />
          <div>
            <p className="text-xl font-semibold">4 / 5</p>
            <p className="text-gray-600 text-sm">Quiz réussis</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <FaCertificate className="text-yellow-600 text-3xl mr-4" />
          <div>
            <p className="text-xl font-semibold">2</p>
            <p className="text-gray-600 text-sm">Certificats obtenus</p>
          </div>
        </div>
      </div>
    </div>
  );
}
