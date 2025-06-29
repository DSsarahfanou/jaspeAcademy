'use client'
import { useState, useRef } from 'react'
import { FaArrowRight, FaArrowLeft, FaUser, FaEnvelope, FaVenusMars, FaMapMarkerAlt, FaLock, FaGlobeAfrica, FaCity, FaHome, FaCamera } from 'react-icons/fa'
import { useAuth } from '/src/hooks/auth'
import InputError from '/src/components/InputError'
import Label from '/src/components/Label'
import Input from '/src/components/Input'
import FloatingInput from '/src/components/FloatingInput'
import FloatingSelect from '/src/components/FloatingSelect'
import Button from '/src/components/Button'
import Modal from '/src/components/Modal'
import { useRouter } from 'next/navigation'
import AuthCard from '/src/app/(auth)/AuthCard'
import { FaEye, FaEyeSlash } from 'react-icons/fa';


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
       
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 

    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        gender: 'male',
        picture: null,
        birth_date: '', 
        country: '',
        state: '',
        city: '',
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
            formData.city,
            formData.state,
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
        <main className='mt-10'>
            <Modal isOpen={showConfirmation} onClose={() => setShowConfirmation(false)}>
                <div className="p-6 bg-white rounded-lg">
                    <h3 className="mb-4 text-xl font-bold">Confirmez votre inscription</h3>
                    <div className="mb-6 space-y-3">
                        <p><strong>Nom complet:</strong> {formData.surname} {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Téléphone:</strong> {formData.phone}</p>
                        <p><strong>Adresse:</strong> {[
                            formData.address_line,
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

            <AuthCard image="/image/register_ai.png" >
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>

                    <h2 className="mb-2 text-3xl font-bold text-gray-800">
                        {step === 1 ? "Créez votre compte" : step === 2 ? "Votre localisation" : "Sécurité du compte"}
                    </h2>

                    <form className="space-y-6 ">
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FloatingInput
                                    icon={<FaUser />}
                                    label="Prénom *"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    error={errors.surname}
                                />
                                <FloatingInput
                                    icon={<FaUser />}
                                    label="Nom *"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                </div>

                                <FloatingSelect
                                icon={<FaVenusMars />}
                                label="Genre *"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                options={[
                                    { value: "male", label: "Homme" },
                                    { value: "female", label: "Femme" }
                                ]}
                                error={errors.gender}
                                />

                                <FloatingInput
                                icon={<FaEnvelope />}
                                label="Email *"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                />

                                <FloatingInput
                                icon={<FaUser />}
                                label="Téléphone *"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                error={errors.phone}
                                />

                                <FloatingInput
                                label="Date de naissance *"
                                type="date"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={handleChange}
                                error={errors.birth_date}
                                />

                                <div className="flex flex-col items-start space-y-2">
                                <Label>Photo de profil</Label>
                                <div className="flex items-center space-x-4">
                                    <div
                                    onClick={triggerFileInput}
                                    className="flex items-center justify-center w-16 h-16 overflow-hidden transition bg-gray-100 border border-gray-300 rounded-full shadow-sm cursor-pointer hover:ring-2 hover:ring-blue-400"
                                    >
                                    {formData.picture ? (
                                        <img src={URL.createObjectURL(formData.picture)} alt="Preview" className="object-cover w-full h-full" />
                                    ) : (
                                        <FaCamera className="text-2xl text-gray-500" />
                                    )}
                                    </div>
                                    <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                    />
                                    <button
                                    type="button"
                                    onClick={triggerFileInput}
                                    className="text-sm text-blue-600 hover:underline"
                                    >
                                    {formData.picture ? 'Changer la photo' : 'Ajouter une photo'}
                                    </button>
                                </div>
                                </div>

                                <Button
                                type="button"
                                onClick={nextStep}
                                className="w-full py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                Continuer
                                </Button>
                            </div>

                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-fade-in">
                                {/* Titre de la section */}
                                <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                                    <FaMapMarkerAlt className="text-blue-600" />
                                    Localisation
                                </h2>

                                {/* Pays */}
                                <div>
                                    <FloatingSelect
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        label="Pays *"
                                        id="country"
                                        options={africanCountries.map(country => ({
                                            label: country,
                                            value: country
                                        }))}
                                    />
                                    <InputError messages={errors.country} className="mt-1" />
                                </div>

                                {/* Département */}
                                <div>
                                    <FloatingInput
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        icon={<FaMapMarkerAlt/>}
                                        label="Département *"
                                        id="state"
                                        placeholder="Ex : Littoral"
                                        error={errors.state}
                                    />
                                </div>

                                {/* Ville */}
                                <div>
                                    <FloatingInput
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        icon={<FaMapMarkerAlt/>}
                                        label="Ville *"
                                        id="city"
                                        placeholder="Ex : Cotonou"
                                        error={errors.city} 
                                    />
                                    
                                </div>

                                {/* Adresse */}
                                <div>
                                    <FloatingInput
                                        type="text"
                                        name="address_line"
                                        value={formData.address_line}
                                        onChange={handleChange}
                                        icon={<FaMapMarkerAlt/>}
                                        label="Adresse *"
                                        id="address_line"
                                        placeholder="Adresse complète"
                                        error={errors.address_line}
                                    />
                                </div>

                                {/* Bouton suivant */}
                                <div className="pt-4">
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!isStepValid()}
                                        className={`w-full py-3 text-white font-semibold transition duration-300 ${
                                            !isStepValid()
                                                ? 'bg-blue-400 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                    >
                                        Suivant
                                    </Button>
                                </div>
                            </div>
                        )}


                        {step === 3 && (
                            <div className="space-y-6 animate-fade-in">
                                {/* Titre de la section */}
                                <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                                    <FaLock className="text-blue-600" />
                                    Sécurité du compte
                                </h2>

                                {/* Champ Mot de passe */}
                                <div className="relative">
                                    <FloatingInput
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        icon={<FaLock/>}
                                        label="Mot de passe *"
                                        id="password"
                                        placeholder="Mot de passe"
                                        error={errors.password}
                                    />
                                    <span
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer right-3 top-2/3"
                                    >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>                
                                </div>

                                {/* Champ Confirmation */}
                                <div className="relative">
                                    <FloatingInput
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                        icon={<FaLock/>}
                                        label="Confirmation du mot de passe *"
                                        id="password_confirmation"
                                        placeholder="Confirmation"
                                        error={errors.password_confirmation}
                                        />
                                        <span
                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer right-3 top-2/3"
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>                    
                                </div>

                                {/* Bouton de validation */}
                                <div className="pt-4">
                                    <Button
                                        type="button"
                                        onClick={() => setShowConfirmation(true)}
                                        disabled={!isStepValid()}
                                        className={`w-full py-3 text-white font-semibold transition duration-300 ${
                                            !isStepValid()
                                                ? 'bg-blue-400 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                    >
                                        Vérifier et finaliser
                                    </Button>
                                </div>
                            </div>
                        )}

                        </form>
                   
            </AuthCard>
        </main>
    )
}