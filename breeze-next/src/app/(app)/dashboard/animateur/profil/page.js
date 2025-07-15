"use client";
import { useState, useEffect } from 'react'
import { useAuth } from '/src/hooks/auth'
import axios from '/src/lib/axios'
import { FiCamera, FiEye, FiEyeOff, FiPhone, FiLock } from 'react-icons/fi'
import { MdShield, MdSchool } from 'react-icons/md'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";


export default function ProfilAnimateur() {
  const router = useRouter();
  const { user } = useAuth()

  const [animateur, setAnimateur] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    picture: null,
  })

  useEffect(() => {
    if (user) {
      setAnimateur({
        prenoms: user.name || '',
        nom: user.surname || '',
        email: user.email || '',
        telephone: user.phone || '',
        pays: user.address || '',
        gender: user.gender || '',
        photo: null,
      })
    }
  }, [user])


  const getInitials = () => {
    const nom = user.name.trim()
    const prenoms = user.surname.trim()
    return `${prenoms.charAt(0)}${nom.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md relative">
      {/* Bouton Modifier en haut à droite */}
      <button
        onClick={() => router.push("/dashboard/animateur/profil/edit")}
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
      >
        <FaEdit /> Modifier
      </button>

      <h2 className="text-2xl font-bold text-blue-700 mb-6">Mon Profil</h2>

      <div className="flex flex-col sm:flex-row gap-8 items-start">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {animateur.photo ? (
            <img
              src={animateur.photo}
              alt={getInitials()}
              className="w-40 h-40 rounded-full object-cover bg-blue-100 text-blue-700 text-4xl font-bold justify-center"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-4xl font-bold">
                <span>{getInitials()}</span>
            </div>
          )}
        </div>

        {/* Infos personnelles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 w-full">
          <p><span className="font-semibold">Nom :</span> {animateur.nom}</p>
          <p><span className="font-semibold">Prénoms :</span> {animateur.prenoms}</p>
          <p><span className="font-semibold">Email :</span> {animateur.email}</p>
          <p><span className="font-semibold">Téléphone :</span> {animateur.telephone}</p>
          <p><span className="font-semibold">Pays :</span> {animateur.pays}</p>
        </div>
      </div>
    </div>
  );
}
