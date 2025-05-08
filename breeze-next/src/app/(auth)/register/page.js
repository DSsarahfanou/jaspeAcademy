'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FaArrowRight, FaArrowLeft, FaUser, FaEnvelope, FaVenusMars, FaMapMarkerAlt, FaLock } from 'react-icons/fa'
import { useAuth } from '/src/hooks/auth'
import InputError from '/src/components/InputError'
import Label from '/src/components/Label'
import Input from '/src/components/Input'
import Button from '/src/components/Button'

const Register = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        gender: '',
        address: '',
        email: '',
        password: '',
        password_confirmation: '',
        role:''
    })
    const [errors, setErrors] = useState([])

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

    const handleSubmit = e => {
        e.preventDefault()
        register({ ...formData, setErrors })
    }

    // Titres selon l'étape
    const stepTitles = {
        1: "Informations personnelles",
        2: "Votre adresse",
        3: "Sécurité du compte"
    }

    return (
        <main className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
            <div className="flex w-full max-w-5xl overflow-hidden bg-white shadow-lg rounded-2xl">
                {/* Image Container - Gauche */}
                <div className="items-center justify-center hidden w-1/2 p-8 md:flex bg-blue-50">
                    <Image
                        src="/image/register_girl_cartoon.png"
                        alt="Étudiante Jaspe"
                        width={500}
                        height={500}
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Form Container - Droite */}
                <div className="w-full p-8 md:w-1/2 md:p-12">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {step === 1 ? "Commençons votre inscription" : 
                             step === 2 ? "Où pouvons-nous vous trouver ?" : 
                             "Protégez votre compte"}
                        </h2>
                        <p className="mt-2 text-gray-600">
                            {stepTitles[step]} • Étape {step}/3
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Étape 1 */}
                        {step === 1 && (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nom</Label>
                                    <div className="relative">
                                        <FaUser className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                        <Input 
                                            name="name" 
                                            value={formData.name} 
                                            onChange={handleChange} 
                                            className="pl-10"
                                        />
                                    </div>
                                    <InputError messages={errors.name} className="mt-1" />
                                </div>

                                <div>
                                    <Label htmlFor="surname">Prénom</Label>
                                    <div className="relative">
                                        <FaUser className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                        <Input 
                                            name="surname" 
                                            value={formData.surname} 
                                            onChange={handleChange} 
                                            className="pl-10"
                                        />
                                    </div>
                                    <InputError messages={errors.surname} className="mt-1" />
                                </div>

                                <div>
                                    <Label htmlFor="gender">Sexe</Label>
                                    <div className="relative">
                                        <FaVenusMars className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                        <Input 
                                            name="gender" 
                                            value={formData.gender} 
                                            onChange={handleChange} 
                                            className="pl-10"
                                        />
                                    </div>
                                    <InputError messages={errors.gender} className="mt-1" />
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                        <Input 
                                            type="email" 
                                            name="email" 
                                            value={formData.email} 
                                            onChange={handleChange} 
                                            className="pl-10"
                                        />
                                    </div>
                                    <InputError messages={errors.email} className="mt-1" />
                                </div>
                                <div>
                                    <Label htmlFor="role">Rôle</Label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">-- Sélectionnez un rôle --</option>
                                        <option value="apprenant">Apprenant</option>
                                        <option value="formateur">Formateur</option>
                                    </select>
                                    <InputError messages={errors.role} className="mt-1" />
                                </div>

                                <Button 
                                    type="button" 
                                    onClick={nextStep}
                                    className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700"
                                >
                                    Continuer <FaArrowRight className="ml-2" />
                                </Button>
                            </div>
                        )}

                        {/* Étape 2 */}
                        {step === 2 && (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="address">Adresse</Label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                        <Input 
                                            name="address" 
                                            value={formData.address} 
                                            onChange={handleChange} 
                                            className="pl-10"
                                        />
                                    </div>
                                    <InputError messages={errors.address} className="mt-1" />
                                </div>

                                <div className="flex pt-4 space-x-4">
                                    <Button 
                                        type="button" 
                                        onClick={prevStep}
                                        className="flex items-center justify-center flex-1 text-gray-800 bg-gray-200 hover:bg-gray-300"
                                    >
                                        <FaArrowLeft className="mr-2" /> Retour
                                    </Button>
                                    <Button 
                                        type="button" 
                                        onClick={nextStep}
                                        className="flex items-center justify-center flex-1 bg-blue-600 hover:bg-blue-700"
                                    >
                                        Suivant <FaArrowRight className="ml-2" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Étape 3 */}
                        {step === 3 && (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <div className="relative">
                                        <FaLock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                        <Input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="pl-10"
                                        />
                                    </div>
                                    <InputError messages={errors.password} className="mt-1" />
                                </div>

                                <div>
                                    <Label htmlFor="password_confirmation">Confirmation</Label>
                                    <div className="relative">
                                        <FaLock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                        <Input
                                            type="password"
                                            name="password_confirmation"
                                            value={formData.password_confirmation}
                                            onChange={handleChange}
                                            className="pl-10"
                                        />
                                    </div>
                                    <InputError messages={errors.password_confirmation} className="mt-1" />
                                </div>

                                <div className="flex pt-4 space-x-4">
                                    <Button 
                                        type="button" 
                                        onClick={prevStep}
                                        className="flex items-center justify-center flex-1 text-gray-800 bg-gray-200 hover:bg-gray-300"
                                    >
                                        <FaArrowLeft className="mr-2" /> Retour
                                    </Button>
                                    <Button 
                                        type="submit"
                                        className="flex items-center justify-center flex-1 bg-blue-600 hover:bg-blue-700"
                                    >
                                        Finaliser l'inscription
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>

                    <div className="pt-6 mt-8 text-center border-t border-gray-200">
                        <p className="text-gray-600">
                            Vous avez déjà un compte ?{' '}
                            <a href="/login" className="font-medium text-blue-600 hover:text-blue-800">
                                Se connecter
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Register