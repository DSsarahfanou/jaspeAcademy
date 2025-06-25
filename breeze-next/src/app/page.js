"use client"
import LoginLinks from '/src/app/LoginLinks'
import Image from "next/image";
import Link from "next/link";
import Footer from "/src/components/Footer";
import { FaLightbulb, FaVideo, FaUsers, FaChevronLeft, FaChevronRight, FaGraduationCap } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useFormations } from '/src/hooks/useFormations'
import { motion } from 'framer-motion'
import { Card, CardContent } from '/src/components/ui/Card'
import { Button } from '/src/components/ui/Button'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const router = useRouter()
    const { formations } = useFormations()
    const [currentSlide, setCurrentSlide] = useState(0)
    const [teachers, setTeachers] = useState({})

    // Group formations by 3
    const groupedFormations = []
    for (let i = 0; i < formations?.length; i += 3) {
        groupedFormations.push(formations.slice(i, i + 3))
    }

    // Fetch teacher data
    const fetchTeacher = async (id) => {
        if (!id || teachers[id]) return
        
        try {
            const res = await axios.get(`http://localhost:8000/api/users/${id}`)
            setTeachers(prev => ({...prev, [id]: res.data}))
        } catch (error) {
            console.error('Error fetching teacher:', error)
        }
    }

    // Prefetch teachers for visible formations
    useEffect(() => {
        const currentFormations = groupedFormations[currentSlide] || []
        currentFormations.forEach(f => {
            if (f.user_id && !teachers[f.user_id]) {
                fetchTeacher(f.user_id)
            }
        })
    }, [currentSlide, formations])

    // Auto-rotate slides
    useEffect(() => {
        if (groupedFormations.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % groupedFormations.length)
            }, 8000)
            return () => clearInterval(interval)
        }
    }, [groupedFormations.length])

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % groupedFormations.length)
    }

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + groupedFormations.length) % groupedFormations.length)
    }

    return (
        <>
            <LoginLinks/>
            
            {/* Hero Section */}
            <section className="py-24 bg-gradient-to-br from-white via-indigo-50 to-purple-50 md:py-32 pt-24">
                <div className="container max-w-6xl px-6 mx-auto">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <div className="mb-10 md:w-1/2 md:mb-0">
                            <h1 className="text-4xl font-bold leading-tight text-gray-800 md:text-5xl">
                                Votre <span className="text-blue-500">apprentissage</span> personnalisé commence ici
                            </h1>
                            <p className="mt-6 text-lg leading-relaxed text-gray-600 md:pr-10">
                                Des formations en ligne adaptées à votre rythme pour développer vos compétences professionnelles dans un environnement d'apprentissage bienveillant.
                            </p>
                            <div className="flex flex-col gap-4 mt-10 sm:flex-row">
                                <Link
                                    href="./register"
                                    className="flex items-center justify-center px-8 py-4 font-medium text-white transition-colors bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
                                >
                                    Commencer maintenant
                                </Link>
                                <Link
                                    href="./formations"
                                    className="flex items-center justify-center px-8 py-4 font-medium text-blue-500 transition-colors bg-white border border-blue-100 rounded-lg shadow-md hover:bg-blue-50"
                                >
                                    Explorer les cours
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative w-full h-72 md:h-96">
                                <Image
                                    src="/image/home.webp"
                                    alt="Étudiants apprenant en ligne"
                                    fill
                                    className="object-cover shadow-xl rounded-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container max-w-6xl px-6 mx-auto">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Une plateforme conçue pour faciliter l'apprentissage</h2>
                        <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
                            Des outils intuitifs et des fonctionnalités innovantes pour une expérience d'apprentissage enrichissante
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="p-8 transition-all border border-blue-100 shadow-sm bg-blue-50 rounded-xl hover:shadow-md hover:border-blue-200">
                            <div className="flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
                                <FaLightbulb className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="mb-4 text-xl font-semibold text-gray-800">Parcours personnalisé</h3>
                            <p className="leading-relaxed text-gray-600">
                                Apprentissage adapté à votre niveau et vos objectifs professionnels avec des recommandations sur mesure.
                            </p>
                        </div>

                        <div className="p-8 transition-all border border-indigo-100 shadow-sm bg-indigo-50 rounded-xl hover:shadow-md hover:border-indigo-200">
                            <div className="flex items-center justify-center w-16 h-16 mb-6 bg-indigo-100 rounded-full">
                                <FaVideo className="w-8 h-8 text-indigo-500" />
                            </div>
                            <h3 className="mb-4 text-xl font-semibold text-gray-800">Vidéos interactives</h3>
                            <p className="leading-relaxed text-gray-600">
                                Contenu vidéo enrichi avec des quiz intégrés et des points de contrôle pour un apprentissage actif.
                            </p>
                        </div>

                        <div className="p-8 transition-all border border-purple-100 shadow-sm bg-purple-50 rounded-xl hover:shadow-md hover:border-purple-200">
                            <div className="flex items-center justify-center w-16 h-16 mb-6 bg-purple-100 rounded-full">
                                <FaUsers className="w-8 h-8 text-purple-500" />
                            </div>
                            <h3 className="mb-4 text-xl font-semibold text-gray-800">Communauté active</h3>
                            <p className="leading-relaxed text-gray-600">
                                Échangez avec d'autres apprenants et des experts du domaine pour enrichir votre apprentissage.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Formations Carousel */}
            <section className="py-20 bg-gradient-to-b from-white to-blue-50">
                <div className="container max-w-6xl px-6 mx-auto">
                    <div className="flex flex-col items-center justify-between mb-12 md:flex-row">
                        <h2 className="text-3xl font-bold text-gray-800">Nos formations</h2>
                        <Link href="./formations" className="flex items-center mt-4 font-medium text-blue-500 transition-colors md:mt-0 hover:text-blue-600">
                            Voir toutes les formations
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>

                    {/* Carousel */}
                    <div className="relative">
                        {/* Navigation Arrows */}
                        {groupedFormations.length > 1 && (
                            <>
                                <button 
                                    onClick={prevSlide}
                                    className="absolute left-0 top-1/2 z-10 p-3 -translate-y-1/2 bg-white rounded-full shadow-lg hover:bg-gray-100 -left-4"
                                    aria-label="Précédent"
                                >
                                    <FaChevronLeft className="text-gray-700" />
                                </button>
                                <button 
                                    onClick={nextSlide}
                                    className="absolute right-0 top-1/2 z-10 p-3 -translate-y-1/2 bg-white rounded-full shadow-lg hover:bg-gray-100 -right-4"
                                    aria-label="Suivant"
                                >
                                    <FaChevronRight className="text-gray-700" />
                                </button>
                            </>
                        )}

                        {/* Slides */}
                        <div className="overflow-hidden">
                            <motion.div
                                className="flex"
                                animate={{ 
                                    x: `-${currentSlide * 100}%`,
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            >
                                {groupedFormations.map((group, groupIndex) => (
                                    <div key={groupIndex} className="flex-shrink-0 w-full">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                            {group.map(formation => (
                                                <motion.div
                                                    key={formation.id}
                                                    whileHover={{ y: -5 }}
                                                    className="h-full"
                                                >
                                                    <Card className="h-full transition-shadow hover:shadow-lg">
                                                        <CardContent className="h-full p-4 flex flex-col">
                                                            {formation.picture ? (
                                                                <div className="relative h-40 mb-4 overflow-hidden rounded-lg">
                                                                    <Image
                                                                        src={`http://localhost:8000/storage/${formation.picture}`}
                                                                        alt={formation.name}
                                                                        fill
                                                                        className="object-cover"
                                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center justify-center h-40 mb-4 bg-gray-200 rounded-lg">
                                                                    <FaGraduationCap className="text-gray-500 text-4xl" />
                                                                </div>
                                                            )}
                                                            
                                                            <h3 className="mb-2 text-xl font-semibold">{formation.name}</h3>
                                                            <p className="flex-grow mb-4 text-sm text-gray-600 line-clamp-3">
                                                                {formation.formation_details || 'Aucune description disponible'}
                                                            </p>
                                                            
                                                            <div className="flex items-center justify-between mt-auto">
                                                                <div className="flex items-center">
                                                                    <div className="flex items-center justify-center w-8 h-8 text-white bg-purple-500 rounded-full">
                                                                        {teachers[formation.user_id]?.name?.charAt(0) || '?'}
                                                                    </div>
                                                                    <span className="ml-2 text-sm">
                                                                        {teachers[formation.user_id]?.name || 'Chargement...'}
                                                                    </span>
                                                                </div>
                                                                <span className="font-semibold">{formation.price} FCFA</span>
                                                            </div>
                                                            
                                                            <Button 
                                                                className="w-full mt-4 bg-black hover:bg-gray-800"
                                                                onClick={() => router.push(`/dashboard/apprenant/catalogue/${formation.id}/formation_inscription`)}
                                                            >
                                                                Voir la formation
                                                            </Button>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Indicators */}
                        {groupedFormations.length > 1 && (
                            <div className="flex justify-center mt-8 space-x-2">
                                {groupedFormations.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-blue-600 w-6' : 'bg-gray-300'}`}
                                        aria-label={`Aller à la diapositive ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-white">
                <div className="container max-w-4xl px-6 mx-auto text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-800">Prêt à commencer votre parcours ?</h2>
                    <p className="mb-8 text-lg text-gray-600">Rejoignez notre communauté d'apprenants et atteignez vos objectifs professionnels dès aujourd'hui.</p>
                    <Link
                        href="/register"
                        className="inline-block px-10 py-4 font-medium text-white transition-colors bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
                    >
                        Rejoindre maintenant
                    </Link>
                </div>
            </section>

            <Footer/>
        </>
    )
}

export default Home