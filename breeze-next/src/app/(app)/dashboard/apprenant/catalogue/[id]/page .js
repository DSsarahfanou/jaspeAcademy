'use client'

import { useState } from 'react'
import { FaCheckCircle, FaArrowRight, FaArrowLeft, FaBookOpen } from 'react-icons/fa'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Script from 'next/script'

export default function FormationInscriptionPage() {
  // Données de la formation (à remplacer par vos données réelles)
  const formation = {
    id: 1,
    title: "Formation Complète en Développement Web",
    description: "Maîtrisez les technologies modernes du web avec cette formation intensive. Apprenez React, Node.js, Express et MongoDB pour devenir un développeur full-stack.",
    price: 50000,
    duration: "3 mois",
    prerequisites: "Bases en HTML/CSS et JavaScript recommandées",
    image: "/formation-web.jpg"
  }

  // États pour gérer les étapes
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Fonction pour passer à l'étape suivante
  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => prev - 1)

  // Fonction pour simuler le paiement avec KkiaPay
  const handlePayment = () => {
    setIsLoading(true)
    
    // Configuration KkiaPay
    window.kkiapay.show({
      amount: formation.price,
      key: "YOUR_KKIAPAY_API_KEY", // Remplacez par votre clé API
      callback: (response) => {
        if (response.status === "SUCCESS") {
          setPaymentSuccess(true)
          nextStep()
        }
        setIsLoading(false)
      },
      data: {
        formationId: formation.id,
        userId: "123" // À remplacer par l'ID de l'utilisateur connecté
      },
      theme: {
        primary: "#4f46e5",
        secondary: "#ffffff"
      }
    })
  }

  // Animation entre les étapes
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  }

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <Script 
        src="https://cdn.kkiapay.me/k.js" 
        strategy="beforeInteractive"
        onReady={() => console.log("KkiaPay script loaded")}
      />
      
      <div className="max-w-3xl mx-auto">
        {/* Étapes du processus */}
        <div className="flex justify-between mb-12">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {step}
              </div>
              <span className={`mt-2 text-sm ${currentStep >= step ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                {step === 1 && 'Détails'}
                {step === 2 && 'Paiement'}
                {step === 3 && 'Confirmation'}
              </span>
            </div>
          ))}
        </div>

        {/* Contenu des étapes */}
        <div className="overflow-hidden bg-white rounded-lg shadow-md">
          <AnimatePresence mode="wait">
            {/* Étape 1: Détails de la formation */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                className="p-6 sm:p-8"
              >
                <h2 className="mb-2 text-2xl font-bold text-gray-900">{formation.title}</h2>
                <div className="flex items-center mb-6 text-gray-500">
                  <span>Durée: {formation.duration}</span>
                  <span className="mx-2">•</span>
                  <span>Prix: {formation.price.toLocaleString()} FCFA</span>
                </div>

                <img 
                  src={formation.image} 
                  alt={formation.title} 
                  className="object-cover w-full h-64 mb-6 rounded-lg"
                />

                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Description</h3>
                    <p className="text-gray-600">{formation.description}</p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Prérequis</h3>
                    <p className="text-gray-600">{formation.prerequisites}</p>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={nextStep}
                    className="flex items-center px-6 py-3 text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    Continuer vers le paiement
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Étape 2: Paiement */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                className="p-6 sm:p-8"
              >
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Paiement de la formation</h2>
                
                <div className="p-6 mb-8 border border-indigo-100 rounded-lg bg-indigo-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">{formation.title}</h3>
                    <span className="text-lg font-bold">{formation.price.toLocaleString()} FCFA</span>
                  </div>
                  <p className="text-gray-600">Durée: {formation.duration}</p>
                </div>

                <div className="mb-8">
                  <h3 className="mb-4 text-lg font-semibold">Méthode de paiement</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={handlePayment}
                      disabled={isLoading}
                      className={`flex flex-col items-center justify-center p-4 border rounded-lg hover:border-indigo-500 transition
                        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <img 
                        src="https://kkiapay.me/assets/img/kkiapay.png" 
                        alt="KkiaPay" 
                        className="h-10 mb-2"
                      />
                      <span>Payer avec KkiaPay</span>
                    </button>
                    
                    <button className="flex flex-col items-center justify-center p-4 transition border rounded-lg hover:border-indigo-500">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Mobile-money-Logo-01-CMYK.svg/1200px-Mobile-money-Logo-01-CMYK.svg.png" 
                        alt="Mobile Money" 
                        className="h-10 mb-2"
                      />
                      <span>Mobile Money</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    className="flex items-center px-4 py-2 text-gray-600 transition hover:text-gray-800"
                  >
                    <FaArrowLeft className="mr-2" />
                    Retour
                  </button>
                </div>
              </motion.div>
            )}

            {/* Étape 3: Confirmation */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                className="p-6 text-center sm:p-8"
              >
                {paymentSuccess ? (
                  <>
                    <div className="flex justify-center mb-6">
                      <FaCheckCircle className="text-6xl text-green-500" />
                    </div>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Paiement réussi !</h2>
                    <p className="mb-8 text-gray-600">
                      Félicitations ! Vous êtes maintenant inscrit à la formation "{formation.title}".
                      Vous pouvez commencer immédiatement ou y accéder plus tard depuis votre espace personnel.
                    </p>
                    
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                      <Link
                        href="/mes-formations"
                        className="flex items-center justify-center px-6 py-3 text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                      >
                        <FaBookOpen className="mr-2" />
                        Accéder à mes formations
                      </Link>
                      
                      <Link
                        href={`/formations/${formation.id}`}
                        className="flex items-center justify-center px-6 py-3 text-indigo-600 transition border border-indigo-600 rounded-lg hover:bg-indigo-50"
                      >
                        Commencer maintenant
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Paiement en attente</h2>
                    <p className="mb-8 text-gray-600">
                      Votre paiement est en cours de traitement. Vous recevrez une notification dès qu'il sera confirmé.
                    </p>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    >
                      Retour au paiement
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}