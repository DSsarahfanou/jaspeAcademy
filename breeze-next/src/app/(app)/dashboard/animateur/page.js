"use client";

import { FaChalkboardTeacher, FaUsers, FaCalendarAlt, FaClock } from "react-icons/fa";

export default function DashboardAnimateur() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-purple-800 mb-8">Tableau de bord Animateur</h1>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
          <div className="p-4 bg-purple-100 text-purple-700 rounded-full">
            <FaCalendarAlt className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Réunions prévues</p>
            <p className="text-2xl font-bold text-purple-900">8</p>
            <p className="text-green-600 text-sm mt-1">+12% ce mois-ci</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
          <div className="p-4 bg-purple-100 text-purple-700 rounded-full">
            <FaChalkboardTeacher className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Formations animées</p>
            <p className="text-2xl font-bold text-purple-900">4</p>
            <p className="text-green-600 text-sm mt-1">Stable depuis 3 mois</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
          <div className="p-4 bg-purple-100 text-purple-700 rounded-full">
            <FaUsers className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Apprenants suivis</p>
            <p className="text-2xl font-bold text-purple-900">42</p>
            <p className="text-green-600 text-sm mt-1">+7% depuis la semaine dernière</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
          <div className="p-4 bg-purple-100 text-purple-700 rounded-full">
            <FaClock className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Heures de formation</p>
            <p className="text-2xl font-bold text-purple-900">120 h</p>
            <p className="text-green-600 text-sm mt-1">+15% ce trimestre</p>
          </div>
        </div>
      </div>

      {/* Graphiques et détails */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Graphique simple barre (simulé avec divs) */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Répartition des formations</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Formation A</p>
              <div className="w-full bg-purple-100 rounded h-4">
                <div className="bg-purple-700 h-4 rounded" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Formation B</p>
              <div className="w-full bg-purple-100 rounded h-4">
                <div className="bg-purple-700 h-4 rounded" style={{ width: "50%" }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Formation C</p>
              <div className="w-full bg-purple-100 rounded h-4">
                <div className="bg-purple-700 h-4 rounded" style={{ width: "30%" }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Liste des prochaines réunions */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Prochaines réunions</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-900">Réunion pédagogique</p>
                <p className="text-sm text-gray-500">15 juin 2025 - 10h00</p>
              </div>
              <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition">Voir</button>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-900">Réunion équipe</p>
                <p className="text-sm text-gray-500">18 juin 2025 - 14h00</p>
              </div>
              <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition">Voir</button>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-900">Réunion feedback</p>
                <p className="text-sm text-gray-500">21 juin 2025 - 09h30</p>
              </div>
              <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition">Voir</button>
            </li>
          </ul>
        </section>

        {/* Dernières notifications */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Notifications récentes</h2>
          <ul className="space-y-3">
            <li className="p-3 border border-gray-200 rounded hover:bg-purple-50 cursor-pointer transition">
              <p className="text-gray-700">Nouvelle formation disponible : "Gestion de projets"</p>
              <p className="text-xs text-gray-500 mt-1">Il y a 2 jours</p>
            </li>
            <li className="p-3 border border-gray-200 rounded hover:bg-purple-50 cursor-pointer transition">
              <p className="text-gray-700">Mise à jour du planning des réunions</p>
              <p className="text-xs text-gray-500 mt-1">Il y a 4 jours</p>
            </li>
            <li className="p-3 border border-gray-200 rounded hover:bg-purple-50 cursor-pointer transition">
              <p className="text-gray-700">Nouvelle demande de stage à valider</p>
              <p className="text-xs text-gray-500 mt-1">Il y a 6 jours</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
