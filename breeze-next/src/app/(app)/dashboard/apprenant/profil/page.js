'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '/src/hooks/auth'
import axios from '/src/lib/axios'
import { FiCamera, FiEye, FiEyeOff, FiPhone, FiLock } from 'react-icons/fi'
import { MdShield, MdSchool } from 'react-icons/md'
import { FaChalkboardTeacher } from 'react-icons/fa'

export default function ProfilPage() {
  const { user, mutate } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    picture: null,
  })
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })
  const [showPasswords, setShowPasswords] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        surname: user.surname || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        gender: user.gender || '',
        picture: null,
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    const file = files ? files[0] : null
    if (file && name === 'picture') {
      setPreviewUrl(URL.createObjectURL(file))
    }
    setFormData(prev => ({
      ...prev,
      [name]: file || value,
    }))
  }

  const handleUpdateProfile = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    setFeedback({ type: '', message: '' })

    const data = new FormData()
    data.append('phone', formData.phone)
    if (formData.picture) data.append('picture', formData.picture)

    try {
      await axios.post('/profile/update', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      await mutate()
      setFeedback({ type: 'success', message: 'Téléphone ou photo mis à jour avec succès !' })
    } catch {
      setFeedback({ type: 'error', message: 'Erreur lors de la mise à jour.' })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setFeedback({ type: '', message: '' }), 3000)
    }
  }

  const handleChangePassword = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    setFeedback({ type: '', message: '' })

    try {
      await axios.post('/profile/password', passwordData)
      setPasswordData({ current_password: '', new_password: '', new_password_confirmation: '' })
      setFeedback({ type: 'success', message: 'Mot de passe modifié avec succès !' })
    } catch {
      setFeedback({ type: 'error', message: 'Erreur lors du changement de mot de passe.' })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setFeedback({ type: '', message: '' }), 3000)
    }
  }

  const getInitials = () => {
    const nom = formData.surname.trim()
    const prenoms = formData.name.trim()
    return `${prenoms.charAt(0)}${nom.charAt(0)}`.toUpperCase()
  }

  const profilePic = previewUrl || user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}+${user?.surname}&background=0D8ABC&color=fff`

  const RoleBadge = () => {
    const base = "px-3 py-1 rounded-full text-sm font-medium inline-flex items-center"
    if (user?.role === 'admin') return <span className={`${base} bg-blue-100 text-blue-800`}><MdShield className="mr-1" /> Admin</span>
    if (user?.role === 'teacher') return <span className={`${base} bg-green-100 text-green-800`}><FaChalkboardTeacher className="mr-1" /> Formateur</span>
    return <span className={`${base} bg-yellow-100 text-yellow-800`}><MdSchool className="mr-1" /> Apprenant</span>
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">Mon Profil</h2>

      {feedback.message && (
        <div className={`mb-6 p-4 text-sm font-medium border-l-4 rounded-lg animate-fade-in transition-opacity duration-500 ${
          feedback.type === 'success' ? 'bg-green-50 text-green-800 border-green-500' : 
          'bg-red-50 text-red-800 border-red-500'
        }`}>
          {feedback.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10">
        {/* Avatar cercle */}
        <div className="relative w-40 h-40">
          <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-4xl font-bold overflow-hidden shadow-md border-2 border-blue-200">
            {profilePic.includes('ui-avatars') ? (
              <span>{getInitials()}</span>
            ) : (
              <img
                src={profilePic}
                alt="Photo de profil"
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </div>
          <label className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
            <FiCamera size={18} />
            <input
              type="file"
              accept="image/*"
              name="picture"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Infos de l'utilisateur */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 w-full text-[15px]">
          <p><span className="font-semibold">Nom :</span> {formData.surname}</p>
          <p><span className="font-semibold">Prénoms :</span> {formData.name}</p>
          <p><span className="font-semibold">Email :</span> {formData.email}</p>
          <p><span className="font-semibold">Genre :</span> {formData.gender || 'Non spécifié'}</p>
          <p><span className="font-semibold">Adresse :</span> {formData.address || 'Non spécifiée'}</p>
          <p><span className="font-semibold">Rôle :</span> <RoleBadge /></p>
        </div>
      </div>

      {/* Formulaire téléphone */}
      <form onSubmit={handleUpdateProfile} className="space-y-4 mb-10">
        <h3 className="text-lg font-semibold flex items-center text-gray-700">
          <FiPhone className="mr-2 text-blue-500" /> Modifier le téléphone
        </h3>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Votre numéro de téléphone"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-50 dark:text-blue-800 dark:border-gray-600 transition"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center"
        >
          {isSubmitting ? 'Mise à jour...' : <><FiPhone className="mr-2" /> Enregistrer le numéro</>}
        </button>
      </form>

      <div className="flex justify-center my-8 text-2xl text-blue-700 animate-pulse">• • • • •</div>

      {/* Formulaire mot de passe */}
      <form onSubmit={handleChangePassword} className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center text-gray-700">
          <FiLock className="mr-2 text-blue-500" /> Changer le mot de passe
        </h3>
        {['current_password', 'new_password', 'new_password_confirmation'].map(field => (
          <div key={field} className="relative">
            <label className="font-semibold text-gray-700">
              {field === 'current_password' ? 'Mot de passe actuel' : field === 'new_password' ? 'Nouveau mot de passe' : 'Confirmation'}
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              name={field}
              value={passwordData[field]}
              onChange={e => setPasswordData(prev => ({ ...prev, [field]: e.target.value }))}
              placeholder={
                field === 'current_password' ? 'Mot de passe actuel' :
                field === 'new_password' ? 'Nouveau mot de passe' :
                'Confirmation du nouveau mot de passe'
              }
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-50 dark:text-blue-800 dark:border-gray-600 pr-10 transition"
            />
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="absolute right-3 top-1/2 transform -translate-y-1/4 text-gray-500 hover:text-gray-700 mt-2"
            >
              {showPasswords ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        ))}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center"
        >
          {isSubmitting ? 'Modification...' : <><FiLock className="mr-2" /> Modifier le mot de passe</>}
        </button>
      </form>
    </div>
  )
}