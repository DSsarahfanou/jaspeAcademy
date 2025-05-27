'use client'
import { useState, useRef } from 'react'
import { FaArrowRight, FaArrowLeft, FaUser, FaEnvelope, FaVenusMars, FaMapMarkerAlt, FaLock, FaGlobeAfrica, FaCity, FaHome, FaCamera } from 'react-icons/fa'
import { useAuth } from '/src/hooks/auth'
import InputError from '/src/components/InputError'
import Label from '/src/components/Label'
import Input from '/src/components/Input'
import Button from '/src/components/Button'
import Modal from '/src/components/Modal'
import { useRouter } from 'next/navigation'

const africanCountries = [
    "Algérie", "Angola", "Bénin", "Botswana", "Burkina Faso", "Burundi",
    "Cameroun", "Cap-Vert", "Comores", "Congo", "Côte d'Ivoire", "Djibouti",
    "Égypte", "Érythrée", "Eswatini", "Éthiopie", "Gabon", "Gambie", "Ghana",
    "Guinée", "Guinée-Bissau", "Guinée équatoriale", "Kenya", "Lesotho", "Liberia",
    "Libye", "Madagascar", "Malawi", "Mali", "Maroc", "Maurice", "Mauritanie",
    "Mozambique", "Namibie", "Niger", "Nigeria", "Ouganda", "Rwanda", "Sao Tomé-et-Principe",
    "Sénégal", "Seychelles", "Sierra Leone", "Somalie", "Soudan", "Soudan du Sud",
    "Tanzanie", "Tchad", "Togo", "Tunisie", "Zambie", "Zimbabwe"
]

export default function Register() {
    const router = useRouter()
    const { register } = useAuth({
        middleware: 'guest',
    })
       
    
 

    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        gender: 'male',
        picture: null,
        birth_date: '', 
        country: '',
        region: '',
        city: '',
        neighborhood: '',
        address_line: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'student',
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const fileInputRef = useRef(null)

    const isStepValid = () => {
        const stepValidations = {
            1: () => formData.name && formData.surname && formData.email && formData.gender && formData.phone && formData.birth_date,
            2: () => formData.country && formData.city && formData.address_line,
            3: () => formData.role && formData.password && formData.password_confirmation && formData.password === formData.password_confirmation
        }
        return stepValidations[step]()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file && file.type.startsWith('image/')) {
            setFormData(prev => ({ ...prev, picture: file }))
        }
    }

    const triggerFileInput = () => fileInputRef.current.click()

    const nextStep = () => {
        if (isStepValid()) {
            setStep(prev => prev + 1)
        } else {
            const requiredFields = {
                1: ['name', 'surname', 'email', 'gender', 'phone', 'birth_date'],
                2: ['country', 'city', 'address_line'],
                3: ['role','password', 'password_confirmation']
            }
            
            const newErrors = {}
            requiredFields[step].forEach(field => {
                if (!formData[field]) newErrors[field] = ['Ce champ est obligatoire']
            })

            if (step === 3 && formData.password !== formData.password_confirmation) {
                newErrors.password_confirmation = ['Les mots de passe ne correspondent pas']
            }

            setErrors(newErrors)
        }
    }

    const prevStep = () => setStep(prev => prev - 1)

    const handleSubmit = async () => {
        setShowConfirmation(false)
        setIsSubmitting(true)
        
        const formDataToSend = new FormData()
        const fullAddress = [
            formData.address_line,
            formData.neighborhood,
            formData.city,
            formData.region,
            formData.country
        ].filter(Boolean).join('- ')

        Object.entries({
            ...formData,
            address: fullAddress,
            picture: formData.picture
        }).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formDataToSend.append(key, value)
            }
        })

        try {
            await register({ 
                data: formDataToSend,
                setErrors: (errs) => setErrors(errs)
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const progressPercentage = (step / 3) * 100

    return (
        <main className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-purple-50">
            <Modal isOpen={showConfirmation} onClose={() => setShowConfirmation(false)}>
                <div className="p-6 bg-white rounded-lg">
                    <h3 className="mb-4 text-xl font-bold">Confirmez votre inscription</h3>
                    <div className="mb-6 space-y-3">
                        <p><strong>Nom complet:</strong> {formData.surname} {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Téléphone:</strong> {formData.phone}</p>
                        <p><strong>Adresse:</strong> {[
                            formData.address_line,
                            formData.neighborhood,
                            formData.city,
                            formData.country
                        ].filter(Boolean).join('- ')}</p>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <Button onClick={() => setShowConfirmation(false)} className="text-gray-800 bg-gray-200 hover:bg-gray-300">
                            Modifier
                        </Button>
                        <Button onClick={handleSubmit} className="text-white bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                            {isSubmitting ? 'Enregistrement...' : 'Confirmer'}
                        </Button>
                    </div>
                </div>
            </Modal>

            <div className="flex w-full max-w-5xl overflow-hidden bg-white shadow-xl rounded-2xl">
                <div className="items-center justify-center hidden w-1/2 p-8 md:flex bg-gradient-to-b from-blue-500 to-purple-600">
                    <img
                        src="/image/register_girl_cartoon.png"
                        alt="Inscription"
                        className="object-contain w-full h-full"
                    />
                </div>

                <div className="w-full p-8 md:w-1/2 md:p-10">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>

                    <h2 className="mb-2 text-3xl font-bold text-gray-800">
                        {step === 1 ? "Créez votre compte" : step === 2 ? "Votre localisation" : "Sécurité du compte"}
                    </h2>

                    <form className="space-y-6">
                        {step === 1 && (
                            <div className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="surname">Prénom *</Label>
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
                                        <Label htmlFor="name">Nom *</Label>
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
                                </div>

                                <div>
                                    <Label htmlFor="gender">Genre *</Label>
                                    <div className="relative">
                                        <FaVenusMars className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full py-2 pl-10 pr-3 border rounded-lg"
                                        >
                                            <option value="male">Homme</option>
                                            <option value="female">Femme</option>
                                            <option value="other">Autre</option>
                                        </select>
                                    </div>
                                    <InputError messages={errors.gender} className="mt-1" />
                                </div>

                                <div>
                                    <Label htmlFor="email">Email *</Label>
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
                                    <Label htmlFor="phone">Téléphone *</Label>
                                    <div className="relative">
                                        <FaUser className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                        <Input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="pl-10"
                                        />
                                    </div>
                                    <InputError messages={errors.phone} className="mt-1" />
                                </div>

                                <div>
                                    <Label htmlFor="birth_date">Date de naissance *</Label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="birth_date"
                                            value={formData.birth_date}
                                            onChange={handleChange}
                                            className="w-full py-2 pl-3 pr-3 border rounded-lg"
                                        />
                                    </div>
                                    <InputError messages={errors.birth_date} className="mt-1" />
                                </div>


                                <div>
                                    <Label>Photo de profil</Label>
                                    <div className="flex items-center mt-2">
                                        <div onClick={triggerFileInput} className="flex items-center justify-center w-16 h-16 overflow-hidden bg-gray-200 rounded-full cursor-pointer">
                                            {formData.picture ? (
                                                <img src={URL.createObjectURL(formData.picture)} alt="Preview" className="object-cover w-full h-full" />
                                            ) : (
                                                <FaCamera className="text-xl text-gray-400" />
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <button type="button" onClick={triggerFileInput} className="ml-4 text-sm text-blue-600 hover:text-blue-800">
                                            {formData.picture ? 'Changer' : 'Ajouter une photo'}
                                        </button>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Continuer
                                </Button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-5">
                                <div>
                                    <Label htmlFor="country">Pays *</Label>
                                    <div className="relative">
                                        <FaGlobeAfrica className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            className="w-full py-2 pl-10 pr-3 border rounded-lg"
                                        >
                                            <option value="">Sélectionnez votre pays</option>
                                            {africanCountries.map(country => (
                                                <option key={country} value={country}>{country}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <InputError messages={errors.country} className="mt-1" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="region">Région</Label>
                                        <div className="relative">
                                            <FaMapMarkerAlt className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                            <Input
                                                name="region"
                                                value={formData.region}
                                                onChange={handleChange}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="city">Ville *</Label>
                                        <div className="relative">
                                            <FaCity className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                            <Input
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="pl-10"
                                                birth_date                                      />
                                        </div>
                                        <InputError messages={errors.city} className="mt-1" />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="neighborhood">Quartier</Label>
                                    <div className="relative">
                                        <FaHome className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                        <Input
                                            name="neighborhood"
                                            value={formData.neighborhood}
                                            onChange={handleChange}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="address_line">Adresse *</Label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                        <Input
                                            name="address_line"
                                            value={formData.address_line}
                                            onChange={handleChange}
                                            className="pl-10"
                                        />
                                    </div>
                                    <InputError messages={errors.address_line} className="mt-1" />
                                </div>

                                <div className="flex pt-2 space-x-4">
                                    <Button
                                        type="button"
                                        onClick={prevStep}
                                        className="flex-1 py-3 text-gray-800 bg-gray-200 hover:bg-gray-300"
                                    >
                                        <FaArrowLeft className="inline mr-2" /> Retour
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex-1 py-3 text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        Suivant <FaArrowRight className="inline ml-2" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-5">
                                <div>
                                    <Label htmlFor="role">Rôle *</Label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        
                                    >
                                        <option value="student">Apprenant</option>
                                        
                                    </select>
                                    <InputError messages={errors.role} className="mt-1" />
                                </div>

                                <div>
                                    <Label htmlFor="password">Mot de passe *</Label>
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
                                    <Label htmlFor="password_confirmation">Confirmation *</Label>
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

                                <div className="pt-2">
                                    <Button
                                        type="button"
                                        onClick={() => setShowConfirmation(true)}
                                        disabled={!isStepValid()}
                                        className={`w-full py-3 ${!isStepValid() ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                                    >
                                        Vérifier et finaliser
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </main>
    )
}