"use client"

import { useEffect, useState } from 'react'
import { useAuth } from '/src/hooks/auth'
import axios from '/src/lib/axios'
import { FiUser, FiCamera, FiSave, FiMail, FiPhone, FiKey, FiLock, FiEye, FiEyeOff, FiSun, FiMoon } from 'react-icons/fi'
import { MdShield, MdSchool } from 'react-icons/md'
import { FaChalkboardTeacher } from 'react-icons/fa'

export default function ProfilPage() {
  const { user, mutate } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
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

  const isAdmin = user?.role === 'admin'

  

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        surname: user.surname || '',
        email: user.email || '',
        phone: user.phone || '',
        picture: null,
      })
    }
  }, [user])


  const handleChange = (e, stateSetter) => {
    const { name, value, files } = e.target
    const file = files ? files[0] : null
    if (file && name === 'picture') {
      setPreviewUrl(URL.createObjectURL(file))
    }
    stateSetter(prev => ({
      ...prev,
      [name]: file || value,
    }))
  }

  const handleUpdateProfile = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    setFeedback({ type: '', message: '' })

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value)
    })

    try {
      await axios.post('/profile/update', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      await mutate()
      setFeedback({ type: 'success', message: 'Profil mis à jour avec succès !' })
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
      setFeedback({ type: 'success', message: 'Mot de passe mis à jour !' })
    } catch {
      setFeedback({ type: 'error', message: 'Erreur lors du changement.' })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setFeedback({ type: '', message: '' }), 3000)
    }
  }

  const profilePic = previewUrl || user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}+${user?.surname}&background=0D8ABC&color=fff`

  const RoleBadge = () => {
    const baseClass = "px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full inline-flex items-center dark:bg-blue-900 dark:text-blue-200"
    if (user?.role === 'admin') return <span className={baseClass}><MdShield size={14} className="mr-1" /> Admin</span>
    if (user?.role === 'teacher') return <span className={baseClass}><FaChalkboardTeacher size={14} className="mr-1" /> Formateur</span>
    return <span className={baseClass}><MdSchool size={14} className="mr-1" /> Apprenant</span>
  }

  return (
    <div className="max-w-3xl px-6 py-10 mx-auto shadow-lg backdrop-blur-sm bg-white/80 rounded-xl">


      {feedback.message && (
        <div className={`mb-4 p-3 text-sm font-medium border-l-4 rounded-lg animate-fadeIn transition-opacity duration-500 ${
          feedback.type === 'success' ? 'bg-green-100 text-green-800 border-green-500 dark:bg-green-900 dark:text-green-300' :
          feedback.type === 'error' ? 'bg-red-100 text-red-800 border-red-500 dark:bg-red-900 dark:text-red-300' :
          'bg-blue-100 text-blue-800 border-blue-500 dark:bg-blue-900 dark:text-blue-300'
        }`}>
          {feedback.message}
        </div>
      )}

      <div className="flex items-center mb-8 space-x-5">
        <div className="relative">
          <img src={profilePic} alt="avatar" className="object-cover w-24 h-24 border-4 border-white rounded-full shadow-md" />
          <label className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600">
            <FiCamera size={16} className="text-white" />
            <input type="file" name="picture" onChange={e => handleChange(e, setFormData)} className="hidden" />
          </label>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user?.name} {user?.surname}</h2>
          <div className="mt-1 text-sm">
            <RoleBadge />
          </div>
        </div>
      </div>

      <form onSubmit={handleUpdateProfile} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <input name="name" placeholder="Prénom" disabled={!isAdmin} value={formData.name} onChange={e => handleChange(e, setFormData)} className="input-style" />
          <input name="surname" placeholder="Nom" disabled={!isAdmin} value={formData.surname} onChange={e => handleChange(e, setFormData)} className="input-style" />
          <input name="email" placeholder="Email" disabled={!isAdmin} value={formData.email} onChange={e => handleChange(e, setFormData)} className="input-style" />
          <input name="phone" placeholder="Téléphone" disabled={!isAdmin} value={formData.phone} onChange={e => handleChange(e, setFormData)} className="input-style" />
        </div>
        <button disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? 'Enregistrement...' : <><FiSave className="mr-2" /> Enregistrer</>}
        </button>
      </form>

      <div className="flex justify-center my-10 text-2xl text-blue-700 animate-pulse ">• •  •  •  •  • •</div>

      <form onSubmit={handleChangePassword} className="space-y-6">
        <h3 className="flex items-center text-xl font-semibold">
          <FiLock className="mr-2 text-blue-500" /> Modifier le mot de passe
        </h3>
        {['current_password', 'new_password', 'new_password_confirmation'].map(field => (
          <div key={field} className="relative">
            <input
              type={showPasswords ? 'text' : 'password'}
              name={field}
              value={passwordData[field]}
              placeholder={field === 'current_password' ? 'Mot de passe actuel' : field === 'new_password' ? 'Nouveau mot de passe' : 'Confirmation'}
              onChange={e => handleChange(e, setPasswordData)}
              className="pr-10 input-style"
            />
            <button type="button" className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2" onClick={() => setShowPasswords(prev => !prev)}>
              {showPasswords ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        ))}
        <button disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? 'Modification...' : <><FiLock className="mr-2" /> Modifier</>}
        </button>
      </form>

      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
          background: white;
          transition: all 0.2s ease-in-out;
          outline: none;
        }
        .dark .input-style {
          background: #1f2937;
          color: white;
          border-color: #374151;
        }
        .input-style:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          background-color: #3b82f6;
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: background-color 0.3s;
        }
        .btn-primary:hover {
          background-color: #2563eb;
        }
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}
