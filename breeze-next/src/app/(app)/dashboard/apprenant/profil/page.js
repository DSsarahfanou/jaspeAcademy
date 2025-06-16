'use client'

import { useState } from 'react'
import {
  FaUser, FaPhone, FaEnvelope, FaTransgender, FaBirthdayCake,
  FaCity, FaGlobeAfrica, FaCamera
} from 'react-icons/fa'

export default function ProfilPage() {
  const [profileImage, setProfileImage] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setProfileImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
        <FaUser className="mr-2" />
        Mon Profil Apprenant
      </h1>

      <div className="flex flex-col sm:flex-row items-center mb-8">
        <div className="relative w-32 h-32 rounded-full overflow-hidden shadow border border-gray-300">
          <img
            src={profileImage || '/default-avatar.png'}
            alt="Photo de profil"
            className="w-full h-full object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer">
            <FaCamera />
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>
      </div>

      <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-gray-600 font-medium flex items-center mb-1">
            <FaUser className="mr-2" /> Nom Complet
          </label>
          <input
            type="text"
            defaultValue="Jean Apprenant"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="text-gray-600 font-medium flex items-center mb-1">
            <FaEnvelope className="mr-2" /> Email
          </label>
          <input
            type="email"
            defaultValue="jean.apprenant@jaspeacademy.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="text-gray-600 font-medium flex items-center mb-1">
            <FaPhone className="mr-2" /> Téléphone
          </label>
          <input
            type="text"
            defaultValue="+225 07 00 00 00"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="text-gray-600 font-medium flex items-center mb-1">
            <FaTransgender className="mr-2" /> Genre
          </label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200">
            <option>Masculin</option>
            <option>Féminin</option>
            
          </select>
        </div>

        <div>
          <label className="text-gray-600 font-medium flex items-center mb-1">
            <FaBirthdayCake className="mr-2" /> Date de naissance
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="text-gray-600 font-medium flex items-center mb-1">
            <FaCity className="mr-2" /> Ville
          </label>
          <input
            type="text"
            defaultValue="Abidjan"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="text-gray-600 font-medium flex items-center mb-1">
            <FaGlobeAfrica className="mr-2" /> Pays
          </label>
          <input
            type="text"
            defaultValue="Côte d'Ivoire"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
      </form>

      <div className="mt-6 text-right">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Enregistrer
        </button>
      </div>
    </div>
  )
}
