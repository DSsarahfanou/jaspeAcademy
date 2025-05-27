'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaCheckCircle, FaCreditCard, FaLock, FaUser, FaEnvelope, FaPhone, FaArrowLeft, FaInfoCircle } from 'react-icons/fa'
import Image from 'next/image'
import { useAuth } from '../../../hooks/auth'
import AuthSessionStatus from '/src/app/(auth)/AuthSessionStatus'
import Input from '../../../components/Input'
import InputError from '../../../components/InputError'



export default function FormationDetails({ params }) {
  const router = useRouter()
  const { user, login, register } = useAuth({
    middleware: 'guest',
    // redirectIfAuthenticated: '',
  })

  // États pour l'authentification
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [shouldRemember, setShouldRemember] = useState(false)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // États pour la formation et les étapes
  const [formation, setFormation] = useState(null)
  const [step, setStep] = useState(1) // 1: Détails, 2: Auth, 3: Paiement, 4: Confirmation
  const [authMode, setAuthMode] = useState('login') // 'login' ou 'register'

  // Vérifier le statut d'authentification et ajuster l'étape
  useEffect(() => {
    if (user) {
      // Si l'utilisateur est déjà connecté, passer directement à l'étape de paiement
      if (step === 2) {
        setStep(3)
      }
    }
  }, [user, step])

  // Gérer le statut depuis l'URL
  useEffect(() => {
    if (router.reset?.length > 0 && Object.keys(errors).length === 0) {
      setStatus(atob(router.reset))
    } else {
      setStatus(null)
    }
  }, [router.reset, errors])

  // Simuler le chargement de la formation depuis l'API
  useEffect(() => {
    const fakeFormation = {
      id: params.id,
      titre: "Administration Réseaux",
      description: "Maîtrisez la configuration et la gestion des infrastructures réseaux modernes.",
      prix: 90000,
      duree: "6 semaines",
      image: "/images/reseaux.jpeg",
      categorie: "Réseaux",
      prerequis: "Bases en informatique",
      equipements: ["PC Linux", "Switch", "Câbles RJ45", "Internet stable"]
    }
    setFormation(fakeFormation)
  }, [params.id])

  // Gérer la soumission du formulaire d'authentification
  const handleAuthSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    
    try {
      if (authMode === 'login') {
        await login({
          email,
          password,
          remember: shouldRemember,
          setErrors,
          setStatus,
        })
      } else {
        await register({
          name,
          email,
          password,
          password_confirmation: password,
          setErrors,
          setStatus,
        })
      }
      
      // Si l'authentification réussit, passer à l'étape de paiement
      setStep(3)
    } catch (error) {
      console.error('Erreur d\'authentification:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Gérer la soumission du paiement
  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Ici vous intégreriez l'API de paiement
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setStep(4) // Étape de confirmation
    } catch (error) {
      console.error('Erreur de paiement:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Gérer le clic sur "S'inscrire à cette formation"
  const handleEnrollClick = () => {
    if (user) {
      // Si l'utilisateur est connecté, aller directement au paiement
      setStep(3)
    } else {
      // Sinon, aller à l'authentification
      setStep(2)
    }
  }

  // Réinitialiser les erreurs quand on change de mode d'authentification
  useEffect(() => {
    setErrors({})
    setStatus(null)
  }, [authMode])

  if (!formation) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Barre de navigation */}
        <button 
          onClick={() => router.back()}
          className="flex items-center mb-6 text-blue-600 transition-colors hover:text-blue-700"
        >
          <FaArrowLeft className="mr-2" /> Retour aux formations
        </button>

        {/* Indicateur de progression */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
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
            <span>Détails</span>
            <span>Connexion</span>
            <span>Paiement</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Étape 1: Détails de la formation */}
        {step === 1 && (
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="md:flex">
              <div className="relative h-64 md:w-1/2 md:h-auto">
                <Image
                  src={formation.image}
                  alt={formation.titre}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6 md:w-1/2">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-white bg-blue-600 rounded-full">
                  {formation.categorie}
                </span>
                
                <h1 className="mb-2 text-2xl font-bold text-gray-800">{formation.titre}</h1>
                <p className="mb-4 text-gray-600">{formation.description}</p>
                
                <div className="flex items-center mb-4">
                  <span className="text-lg font-bold text-blue-600">{formation.prix.toLocaleString()} FCFA</span>
                  <span className="ml-4 text-sm text-gray-500">{formation.duree}</span>
                </div>
                
                <div className="mb-6">
                  <h3 className="mb-2 font-medium text-gray-800">Prérequis :</h3>
                  <p className="text-gray-600">{formation.prerequis}</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="mb-2 font-medium text-gray-800">Équipements nécessaires :</h3>
                  <ul className="space-y-1 text-gray-600 list-disc list-inside">
                    {formation.equipements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={handleEnrollClick}
                  className="w-full py-3 font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  S'inscrire à cette formation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Étape 2: Authentification */}
        {step === 2 && !user && (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-2 text-xl font-bold text-gray-800">Accédez à la formation</h2>
            <p className="mb-6 text-gray-600">Connectez-vous ou créez un compte pour vous inscrire</p>
            
            {/* Affichage du statut */}
            <AuthSessionStatus className="mb-4" status={status} />
            
            <div className="flex mb-6 border-b">
              <button
                className={`py-2 px-4 font-medium transition-colors ${
                  authMode === 'login' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setAuthMode('login')}
              >
                Connexion
              </button>
              <button
                className={`py-2 px-4 font-medium transition-colors ${
                  authMode === 'register' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setAuthMode('register')}
              >
                Créer un compte
              </button>
            </div>
            
            <form onSubmit={handleAuthSubmit}>
              {authMode === 'register' && (
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Nom complet
                  </label>
                  <div className="relative">
                    <FaUser className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <InputError messages={errors.name} className="mt-2" />
                </div>
              )}
              
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <InputError messages={errors.email} className="mt-2" />
              </div>
              
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Mot de passe</label>
                <div className="relative">
                  <FaLock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <InputError messages={errors.password} className="mt-2" />
              </div>

              {authMode === 'login' && (
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={shouldRemember}
                    onChange={(e) => setShouldRemember(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Se souvenir de moi
                  </label>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Chargement...
                  </div>
                ) : (
                  authMode === 'login' ? 'Se connecter' : 'Créer un compte'
                )}
              </button>
            </form>
          </div>
        )}

        {/* Si l'utilisateur est connecté et à l'étape 2, rediriger vers l'étape 3 */}
        {step === 2 && user && (
          <div className="p-6 text-center bg-white rounded-lg shadow">
            <p className="mb-4 text-gray-600">Vous êtes déjà connecté. Redirection vers le paiement...</p>
            <div className="w-8 h-8 mx-auto border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        {/* Étape 3: Paiement */}
        {step === 3 && (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-2 text-xl font-bold text-gray-800">Paiement sécurisé</h2>
            <p className="mb-6 text-gray-600">
              Formation : <span className="font-semibold">{formation.titre}</span>
              {user && <span className="ml-4 text-sm text-blue-600">Connecté en tant que {user.email}</span>}
            </p>
            
            <div className="p-4 mb-6 rounded-md bg-blue-50">
              <div className="flex items-start">
                <FaInfoCircle className="flex-shrink-0 mt-1 mr-2 text-blue-500" />
                <p className="text-blue-800">Vous allez être redirigé vers notre plateforme de paiement sécurisé après validation.</p>
              </div>
            </div>
            
            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-6">
                <label className="block mb-1 text-sm font-medium text-gray-700">Numéro de carte</label>
                <div className="relative">
                  <FaCreditCard className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-4 mb-6 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Date d'expiration</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center mb-6 text-sm text-gray-500">
                <FaLock className="mr-2" />
                <span>Paiement sécurisé SSL - Vos données sont protégées</span>
              </div>
              
              <div className="pt-6 mb-6 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total à payer :</span>
                  <span className="text-xl font-bold text-blue-600">{formation.prix.toLocaleString()} FCFA</span>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center w-full py-3 font-medium text-white transition-colors bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Traitement en cours...
                  </div>
                ) : (
                  <>
                    Payer maintenant <FaCreditCard className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Étape 4: Confirmation */}
        {step === 4 && (
          <div className="p-6 text-center bg-white rounded-lg shadow">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
              <FaCheckCircle className="w-6 h-6 text-green-600" />
            </div>
            
            <h2 className="mb-2 text-2xl font-bold text-gray-800">Paiement confirmé !</h2>
            <p className="mb-6 text-gray-600">
              Merci pour votre inscription à la formation <span className="font-semibold">{formation.titre}</span>
            </p>
            
            <div className="p-4 mb-6 text-left rounded-md bg-blue-50">
              <h3 className="mb-2 font-medium text-blue-800">Prochaines étapes :</h3>
              <ul className="space-y-1 text-blue-700 list-disc list-inside">
                <li>Vous recevrez un email de confirmation avec les détails</li>
                <li>Accès à la plateforme de formation dans les 24h</li>
                <li>Support technique disponible pour toute question</li>
              </ul>
            </div>
            
            <button
              onClick={() => router.push('/mon-compte/mes-formations')}
              className="px-6 py-2 font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Accéder à mes formations
            </button>
          </div>
        )}
      </div>
    </div>
  )
}