"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBriefcase, FaHome } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import axios from '/src/lib/axios';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function DemandeStage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formationId = params.id;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    isInCountry: true,
    hasRelatives: false,
    canProvideAccommodation: false,
    durationMonths: 1,
  });
  const [hasAlreadySubmitted, setHasAlreadySubmitted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  // Récupérer les informations de l'utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      try {
          await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`, {
            withCredentials: true,
          });

          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
            { withCredentials: true }
          );

        console.log(response);
        const data = response.data;
        setUserData(data); // c'est ici qu'on met les  données

        setFormData(prev => ({
          ...prev,
          name: data.name,
          surname: data.surname,
          email: data.email,
          phone: data.phone,
          address: data.address,
          birth_date: data.birth_date,
          gender: data.gender,
        }));



        // ➜ Vérifier la demande existante
        const check = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/formation_student/${formationId}/internship-requests`,
          { withCredentials: true }
        );

        if (check.data.data.length > 0 && check.data.data[0].request_internership) {
          setHasAlreadySubmitted(true);
        }


      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    




    if (!formationId) {
      toast.error('ID de formation manquant');
      setLoading(false);
    } else {
      fetchUserData();
    }
  }, [formationId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/formation_student/${formationId}/internship-request`, formData,);
      console.log(formData);
      toast.success('Demande de stage soumise avec succès !');
      setIsSubmitted(true);
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
        <p>Chargement...</p> 
      </div>
    );
  }

  if (!formationId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">Erreur : ID de formation manquant</div>
      </div>
    );
  }


 if (hasAlreadySubmitted || isSubmitted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">
            {hasAlreadySubmitted
              ? "Vous avez déjà soumis une demande de stage."
              : "Votre demande a été soumise avec succès !"}
          </h2>
          <button
            onClick={() => router.push('/dashboard/apprenant/demande-stage')}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Suivre ma demande
          </button>
        </motion.div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Demande de stage</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              readOnly
              className="w-full p-2 border rounded bg-blue-300 text-white "
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Prénom</label>
            <input
              type="text"
              name="surname"
              value={formData.surname || ''}
              readOnly
              className="w-full p-2 border rounded bg-blue-300 text-white "
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              readOnly
              className="w-full p-2 border rounded bg-blue-300 text-white "
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Téléphone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ''}
              readOnly
              className="w-full p-2 border rounded bg-blue-300 text-white "
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Adresse</label>
            <input
              type="text"
              name="address"
              value={formData.address || ''}
              readOnly
              className="w-full p-2 border rounded bg-blue-300 text-white "
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date de naissance</label>
            <input
              type="text"
              name="birth_date"
              value={formData.birth_date || ''}
              readOnly
              className="w-full p-2 border rounded bg-blue-300 text-white "
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Genre</label>
            <input
              type="text"
              name="gender"
              value={formData.gender || ''}
              readOnly
              className="w-full p-2 border rounded bg-blue-300 text-white "
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Êtes-vous dans le pays ?</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isInCountry"
                checked={formData.isInCountry}
                onChange={handleInputChange}
                className="mr-2"
              />
              Oui
            </div>
          </div>
          {!formData.isInCountry && (
            <>
              <div>
                <label className="block text-sm font-medium">Avez-vous des proches chez qui séjourner ?</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasRelatives"
                    checked={formData.hasRelatives}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Oui
                </div>
              </div>
              {!formData.hasRelatives && (
                <div>
                  <label className="block text-sm font-medium">Pouvez-vous assurer votre propre hébergement ?</label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="canProvideAccommodation"
                      checked={formData.canProvideAccommodation}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Oui
                  </div>
                </div>
              )}
            </>
          )}
          <div>
            <label className="block text-sm font-medium">Durée du stage (en mois)</label>
            <input
              type="number"
              name="durationMonths"
              value={formData.durationMonths}
              onChange={handleInputChange}
              min="1"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-between mt-6">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              <FaHome className="mr-2" />
              Retour
            </Link>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              <FaBriefcase className="mr-2" />
              Soumettre la demande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}