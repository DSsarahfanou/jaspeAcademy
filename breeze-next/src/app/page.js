import LoginLinks from '/src/app/LoginLinks'
import Image from "next/image";
import Link from "next/link";
import Footer from "/src/components/Footer";
import { FaGraduationCap, FaLightbulb, FaVideo, FaUsers } from "react-icons/fa";

export const metadata = {
    title: 'JaspeAcademy',
}

// import { useEffect, useState } from 'react';
//   const [formations, setFuseState('');
// ormations] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = 

  // async function getFormations() {
  //   const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  //   if (!baseUrl) throw new Error('Base URL non définie dans .env.local');

  //   const res = await fetch(`${baseUrl}/api/formations`, {
  //     cache: 'no-store',
  //   });

  //   if (!res.ok) {
  //     throw new Error(`Erreur lors de la récupération : ${res.status}`);
  //   }

  //   const data = await res.json();
  //   return data.data;
  // }

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setLoading(true);
  //       const data = await getFormations();
  //       console.log('Données reçues :', data);
  //       setFormations(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);






const Home = () => {
    return (
            <>
            <LoginLinks/>
              {/* Hero Section - Refined gradient background with softer colors */}
              <section className="py-24 bg-gradient-to-br from-white via-indigo-50 to-purple-50 md:py-32">
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
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
        
              {/* Features Section - Enhanced with icons and softer color palette */}
              <section className="py-20 bg-white">
                <div className="container max-w-6xl px-6 mx-auto">
                  <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Une plateforme conçue pour faciliter l'apprentissage</h2>
                    <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
                      Des outils intuitifs et des fonctionnalités innovantes pour une expérience d'apprentissage enrichissante
                    </p>
                  </div>
        
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Feature 1 */}
                    <div className="p-8 transition-shadow border border-blue-100 shadow-sm bg-blue-50 rounded-xl hover:shadow-md">
                      <div className="flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
                        <FaLightbulb className="w-8 h-8 text-blue-500" />
                      </div>
                      <h3 className="mb-4 text-xl font-semibold text-gray-800">Parcours personnalisé</h3>
                      <p className="leading-relaxed text-gray-600">
                        Apprentissage adapté à votre niveau et vos objectifs professionnels avec des recommandations sur mesure.
                      </p>
                    </div>
        
                    {/* Feature 2 */}
                    <div className="p-8 transition-shadow border border-indigo-100 shadow-sm bg-indigo-50 rounded-xl hover:shadow-md">
                      <div className="flex items-center justify-center w-16 h-16 mb-6 bg-indigo-100 rounded-full">
                        <FaVideo className="w-8 h-8 text-indigo-500" />
                      </div>
                      <h3 className="mb-4 text-xl font-semibold text-gray-800">Vidéos interactives</h3>
                      <p className="leading-relaxed text-gray-600">
                        Contenu vidéo enrichi avec des quiz intégrés et des points de contrôle pour un apprentissage actif.
                      </p>
                    </div>
        
                    {/* Feature 3 */}
                    <div className="p-8 transition-shadow border border-purple-100 shadow-sm bg-purple-50 rounded-xl hover:shadow-md">
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
        

              {/* Popular Courses Section - Refined with softer colors */}
              <section className="py-20 bg-gradient-to-b from-white to-blue-50">
                <div className="container max-w-6xl px-6 mx-auto">
                  <div className="flex flex-col items-center justify-between mb-12 md:flex-row">
                    <h2 className="text-3xl font-bold text-gray-800">Formations populaires</h2>
                    <Link href="./formations" className="flex items-center mt-4 font-medium text-blue-500 transition-colors md:mt-0 hover:text-blue-600">
                      Voir tous les cours 
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
        
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Course Card 1 */}
                    <div className="overflow-hidden transition-shadow bg-white shadow-lg rounded-xl hover:shadow-xl">
                      <div className="relative w-full h-52">
                        <Image
                          src="/image/ri.jpeg"
                          alt="Course thumbnail"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">Réseaux </span>
                          <span className="text-sm text-gray-600">14 heures</span>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-800">Réseaux Informatiques pour débutants</h3>
                        <p className="mb-4 text-gray-600">Maîtrisez les fondamentaux des Réseaux Informatique</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 font-medium text-white bg-blue-500 rounded-full">JD</div>
                            <span className="ml-2 text-sm text-gray-600">Jean Dupont</span>
                          </div>
                          <span className="font-semibold text-gray-800">79€</span>
                        </div>
                      </div>
                    </div>
        
                    {/* Course Card 2 */}
                    <div className="overflow-hidden transition-shadow bg-white shadow-lg rounded-xl hover:shadow-xl">
                      <div className="relative w-full h-52">
                        <Image
                          src="/image/fibre.jpeg"
                          alt="Course thumbnail"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full">Télécommunications</span>
                          <span className="text-sm text-gray-600">10 heures</span>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-800">Fibre Optique</h3>
                        <p className="mb-4 text-gray-600">Connaitre les propriétés des fibres optiques et leurs utilisations</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 font-medium text-white bg-indigo-500 rounded-full">ML</div>
                            <span className="ml-2 text-sm text-gray-600">Marie Leroux</span>
                          </div>
                          <span className="font-semibold text-gray-800">69€</span>
                        </div>
                      </div>
                    </div>
        
                    {/* Course Card 3 */}
                    <div className="overflow-hidden transition-shadow bg-white shadow-lg rounded-xl hover:shadow-xl">
                      <div className="relative w-full h-52">
                        <Image
                          src="/image/securite.webp"
                          alt="Course thumbnail"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">Sécurité</span>
                          <span className="text-sm text-gray-600">8 heures</span>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-800">Sécurité des Réseaux</h3>
                        <p className="mb-4 text-gray-600">Sécurisation  des données , cryptographie</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 font-medium text-white bg-purple-500 rounded-full">PL</div>
                            <span className="ml-2 text-sm text-gray-600">Paul Lemaire</span>
                          </div>
                          <span className="font-semibold text-gray-800">89€</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
        
              {/* Testimonials Section - Improved with a more cohesive design */}
              <section className="py-20 bg-white">
                <div className="container max-w-6xl px-6 mx-auto">
                  <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Ce que disent nos apprenants</h2>
                    <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
                      Découvrez l'expérience de nos étudiants et les résultats qu'ils ont obtenus
                    </p>
                  </div>
        
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Testimonial 1 */}
                    <div className="p-8 transition-shadow border border-blue-100 shadow-sm bg-blue-50 rounded-xl hover:shadow-md">
                      <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center text-xl font-medium text-blue-600 bg-blue-200 rounded-full h-14 w-14">S</div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-800">Sophie Martin</p>
                          <p className="text-sm text-gray-600">Développeuse Web</p>
                        </div>
                      </div>
                      <p className="leading-relaxed text-gray-700">
                        "Les cours sont très bien structurés et m'ont permis d'acquérir rapidement les compétences dont j'avais besoin pour mon nouveau poste. L'accompagnement est vraiment personnalisé."
                      </p>
                      <div className="flex mt-6 text-yellow-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
        
                    {/* Testimonial 2 */}
                    <div className="p-8 transition-shadow border border-indigo-100 shadow-sm bg-indigo-50 rounded-xl hover:shadow-md">
                      <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center text-xl font-medium text-indigo-600 bg-indigo-200 rounded-full h-14 w-14">T</div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-800">Thomas Legrand</p>
                          <p className="text-sm text-gray-600">Chef de projet</p>
                        </div>
                      </div>
                      <p className="leading-relaxed text-gray-700">
                        "J'ai suivi plusieurs formations sur cette plateforme et elles m'ont toutes apporté des connaissances précieuses. L'interactivité des cours et les exercices pratiques sont un vrai plus."
                      </p>
                      <div className="flex mt-6 text-yellow-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
        
                    {/* Testimonial 3 */}
                    <div className="p-8 transition-shadow border border-purple-100 shadow-sm bg-purple-50 rounded-xl hover:shadow-md">
                      <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center text-xl font-medium text-purple-600 bg-purple-200 rounded-full h-14 w-14">L</div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-800">Lucie Dubois</p>
                          <p className="text-sm text-gray-600">Graphiste freelance</p>
                        </div>
                      </div>
                      <p className="leading-relaxed text-gray-700">
                        "La flexibilité des formations m'a permis de me former tout en continuant mon activité professionnelle. Le contenu est toujours à jour et très pertinent pour le marché actuel."
                      </p>
                      <div className="flex mt-6 text-yellow-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
        
        
        
                    {/* Testimonials Section */}
                    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                      <div className="container max-w-5xl px-6 mx-auto">
                        <div className="mb-16 text-center">
                          <h2 className="text-3xl font-bold text-gray-800">Ce que disent nos apprenants</h2>
                          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
                            Des milliers d’utilisateurs nous font confiance pour transformer leur avenir professionnel.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                          <div className="p-6 bg-white border border-gray-100 shadow-md rounded-xl">
                            <p className="mb-4 italic text-gray-600">“Une plateforme claire et motivante. J’ai pu apprendre à mon rythme, sans pression, et progresser rapidement.”</p>
                            <div className="flex items-center">
                              <div className="flex items-center justify-center w-10 h-10 font-semibold text-white bg-blue-500 rounded-full">AG</div>
                              <div className="ml-3">
                                <p className="font-medium text-gray-800">Alice Girard</p>
                                <p className="text-sm text-gray-500">Étudiante en développement web</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-6 bg-white border border-gray-100 shadow-md rounded-xl">
                            <p className="mb-4 italic text-gray-600">“J’ai adoré les vidéos interactives et le support de la communauté. On ne se sent jamais seul.”</p>
                            <div className="flex items-center">
                              <div className="flex items-center justify-center w-10 h-10 font-semibold text-white bg-indigo-500 rounded-full">TM</div>
                              <div className="ml-3">
                                <p className="font-medium text-gray-800">Thomas Moreau</p>
                                <p className="text-sm text-gray-500">Designer UX</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
        
                    {/* Final Call to Action */}
                    <section className="py-20 bg-white">
                      <div className="container max-w-4xl px-6 mx-auto text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-800">Prêt à commencer votre parcours ?</h2>
                        <p className="mb-8 text-lg text-gray-600">Rejoignez notre communauté d'apprenants et atteignez vos objectifs professionnels dès aujourd’hui.</p>
                        <Link 
                          href="/auth" 
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
