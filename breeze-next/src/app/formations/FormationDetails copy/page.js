'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import { 
  FaCheckCircle, FaCreditCard, FaLock, FaUser, 
  FaEnvelope, FaPhone, FaArrowLeft, FaInfoCircle,
  FaSpinner, FaBook, FaVenusMars, FaCalendarAlt,
  FaMapMarkerAlt, FaUserTag
} from 'react-icons/fa'
import Image from 'next/image'

export default function FormationInscription({ params }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [authMode, setAuthMode] = useState('login')
  const [formation, setFormation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // États d'authentification
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    password_confirmation: '',
    gender: '',
    birth_date: '',
    address: '',
    phone: '',
    role: 'student'
  })

  // États de paiement
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  })

  // États d'erreurs
  const [errors, setErrors] = useState({})

  // Chargement de la formation
  useEffect(() => {
    const fetchFormation = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/formations/${params.id}`)
        const data = await response.json()
        setFormation(data)
      } catch (error) {
        toast.error("Erreur lors du chargement de la formation")
        // router.push('/formations')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFormation()
  }, [params.id])

  // Gestion des changements de formulaire
  const handleAuthChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handlePaymentChange = (e) => {
    const { name, value } = e.target
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Validation des formulaires
  const validateAuth = () => {
    const newErrors = {}

    if (authMode === 'register') {
      if (!formData.name.trim()) newErrors.name = 'Le nom est obligatoire'
      if (!formData.surname.trim()) newErrors.surname = 'Le prénom est obligatoire'
      if (!formData.gender) newErrors.gender = 'Le genre est obligatoire'
      if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = 'Les mots de passe ne correspondent pas'
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est obligatoire'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est obligatoire'
    } else if (formData.password.length < 8) {
      newErrors.password = '8 caractères minimum'
    }

    if (!formData.birth_date) {
      newErrors.birth_date = 'La date de naissance est obligatoire'
    } else {
      const birthDate = new Date(formData.birth_date)
      const age = new Date().getFullYear() - birthDate.getFullYear()
      if (age < 13) newErrors.birth_date = 'Vous devez avoir au moins 13 ans'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est obligatoire'
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Soumission de l'authentification
  const handleAuthSubmit = async (e) => {
    e.preventDefault()
    if (!validateAuth()) return

    setIsLoading(true)

    try {
      // 1. Get CSRF cookie
      await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`, {
        withCredentials: true
      })

      if (authMode === 'register') {
        // 2. Submit registration
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, formData, {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        toast.success('Compte créé avec succès!')
      }

      // 3. Login
      const loginResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
        email: formData.email,
        password: formData.password
      }, {
        withCredentials: true
      })

      if (loginResponse.status === 204) {
        setStep(3) // Passer au paiement
        toast.success('Connexion réussie!')
      }
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {})
        toast.error('Veuillez corriger les erreurs')
      } else {
        console.error('Auth error:', error)
        toast.error(error.response?.data?.message || 'Erreur d\'authentification')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Soumission du paiement
  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simuler le paiement
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Enregistrer l'inscription à la formation
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/enrollments`, {
        formation_id: formation.id,
        payment_status: 'completed'
      }, {
        withCredentials: true
      })

      setStep(4) // Confirmation
      toast.success('Paiement et inscription validés!')
    } catch (error) {
      toast.error("Erreur lors de l'inscription")
    } finally {
      setIsLoading(false)
    }
  }

  // Composants d'étape
  const FormationDetailsStep = () => (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <div className="md:flex">
        <div className="relative h-64 md:w-1/2 md:h-auto">
          <Image
            src={formation.image}
            alt={formation.titre}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="p-6 md:w-1/2">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">{formation.titre}</h1>
          <p className="mb-4 text-gray-600">{formation.description}</p>
          
          <div className="flex items-center mb-4">
            <span className="text-lg font-bold text-blue-600">
              {formation.prix.toLocaleString()} FCFA
            </span>
            <span className="ml-4 text-sm text-gray-500">{formation.duree}</span>
          </div>
          
          <button
            onClick={() => setStep(2)}
            className="w-full py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            S'inscrire à cette formation
          </button>
        </div>
      </div>
    </div>
  )

  const AuthStep = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="mb-2 text-xl font-bold text-gray-800">
        {authMode === 'login' ? 'Connexion' : 'Inscription'}
      </h2>
      
      <div className="flex mb-6 border-b">
        <button
          className={`py-2 px-4 font-medium ${authMode === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setAuthMode('login')}
        >
          Connexion
        </button>
        <button
          className={`py-2 px-4 font-medium ${authMode === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setAuthMode('register')}
        >
          Créer un compte
        </button>
      </div>
      
      <form onSubmit={handleAuthSubmit} className="space-y-4">
        {authMode === 'register' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Nom <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleAuthChange}
                    className={`w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleAuthChange}
                    className={`w-full pl-10 pr-3 py-2 border ${errors.surname ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  />
                </div>
                {errors.surname && <p className="mt-1 text-sm text-red-600">{errors.surname}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Genre <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaVenusMars className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleAuthChange}
                    className={`w-full pl-10 pr-3 py-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  >
                    <option value="">Sélectionner...</option>
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Date de naissance <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleAuthChange}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
                    className={`w-full pl-10 pr-3 py-2 border ${errors.birth_date ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  />
                </div>
                {errors.birth_date && <p className="mt-1 text-sm text-red-600">{errors.birth_date}</p>}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaPhone className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleAuthChange}
                  placeholder="+225..."
                  className={`w-full pl-10 pr-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
          </>
        )}
        
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaEnvelope className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleAuthChange}
              className={`w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaLock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleAuthChange}
                className={`w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
          
          {authMode === 'register' && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Confirmation <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleAuthChange}
                  className={`w-full pl-10 pr-3 py-2 border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
              </div>
              {errors.password_confirmation && <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>}
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <FaSpinner className="mr-2 animate-spin" />
              {authMode === 'login' ? 'Connexion...' : 'Inscription...'}
            </div>
          ) : (
            authMode === 'login' ? 'Se connecter' : 'S\'inscrire'
          )}
        </button>
      </form>
    </div>
  )

  const PaymentStep = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="mb-2 text-xl font-bold text-gray-800">Paiement sécurisé</h2>
      <p className="mb-6 text-gray-600">Formation: {formation.titre}</p>
      
      <form onSubmit={handlePaymentSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Nom sur la carte <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={paymentData.name}
            onChange={handlePaymentChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Numéro de carte <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FaCreditCard className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, '').slice(0, 16)
                setPaymentData({
                  ...paymentData,
                  cardNumber: value.replace(/(\d{4})/g, '$1 ').trim()
                })
              }}
              className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Expiration <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                name="expiry"
                value={paymentData.expiry}
                onChange={(e) => {
                  const value = e.target.value
                  if (value.length <= 2 || value.includes('/')) {
                    setPaymentData({...paymentData, expiry: value})
                  } else if (value.length > 2) {
                    setPaymentData({...paymentData, expiry: `${value.slice(0,2)}/${value.slice(2)}`})
                  }
                }}
                className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md"
                placeholder="MM/AA"
                maxLength={5}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              CVV <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaLock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                name="cvv"
                value={paymentData.cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                  setPaymentData({...paymentData, cvv: value})
                }}
                className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md"
                placeholder="123"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <span>Total à payer:</span>
            <span className="text-xl font-bold text-blue-600">
              {formation.prix.toLocaleString()} FCFA
            </span>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <FaSpinner className="mr-2 animate-spin" />
                Traitement...
              </div>
            ) : (
              'Payer maintenant'
            )}
          </button>
        </div>
      </form>
    </div>
  )

  const ConfirmationStep = () => (
    <div className="p-6 text-center bg-white rounded-lg shadow">
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
        <FaCheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <h2 className="mb-2 text-2xl font-bold text-gray-800">Inscription confirmée !</h2>
      <p className="mb-6 text-gray-600">
        Vous êtes maintenant inscrit à <span className="font-semibold">{formation.titre}</span>
      </p>
      
      <div className="p-4 mb-6 text-left rounded-md bg-blue-50">
        <h3 className="mb-2 font-medium text-blue-800">Prochaines étapes :</h3>
        <ul className="space-y-1 text-blue-700 list-disc list-inside">
          <li>Accédez à votre espace de formation</li>
          <li>Consultez les ressources pédagogiques</li>
          <li>Suivez votre progression</li>
        </ul>
      </div>
      
      <button
        onClick={() => router.push('/mon-compte')}
        className="px-6 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Accéder à mon compte
      </button>
    </div>
  )

  // Affichage principal
  if (!formation) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <FaSpinner className="w-8 h-8 mx-auto mb-4 text-blue-600 animate-spin" />
          <p className="text-gray-600">Chargement en cours...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {step > 1 && step < 4 && (
          <button 
            onClick={() => setStep(prev => prev - 1)}
            className="flex items-center mb-6 text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" /> Retour
          </button>
        )}

        {/* Indicateur de progression */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`h-1 w-16 mx-2 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className={step >= 1 ? 'text-blue-600 font-medium' : ''}>Détails</span>
            <span className={step >= 2 ? 'text-blue-600 font-medium' : ''}>Authentification</span>
            <span className={step >= 3 ? 'text-blue-600 font-medium' : ''}>Paiement</span>
            <span className={step >= 4 ? 'text-blue-600 font-medium' : ''}>Confirmation</span>
          </div>
        </div>

        {/* Contenu de l'étape actuelle */}
        {step === 1 && <FormationDetailsStep />}
        {step === 2 && <AuthStep />}
        {step === 3 && <PaymentStep />}
        {step === 4 && <ConfirmationStep />}
      </div>
    </div>
  )
}