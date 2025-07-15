"use client";

import { useState, useEffect } from 'react'
import { useAuth } from '/src/hooks/auth'

export default function ProfilAnimateur() {

    const { user, mutate } = useAuth()
    const [previewUrl, setPreviewUrl] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [feedback, setFeedback] = useState({ type: '', message: '' })
  
    const [animateur, setAnimateur] = useState({
      name: '',
      surname: '',
      email: '',
      phone: '',
      address: '',
      gender: '',
      picture: null,
    })
  
    useEffect(() => {
      if (user) {
        setAnimateur({
          prenoms: user.name || '',
          nom: user.surname || '',
          email: user.email || '',
          telephone: user.phone || '',
          pays: user.address || '',
          gender: user.gender || '',
          photo: null,
        })
      }
    }, [user])
  
  
    const getInitials = () => {
      const nom = user.name.trim()
      const prenoms = user.surname.trim()
      return `${prenoms.charAt(0)}${nom.charAt(0)}`.toUpperCase()
    }


  const handleChange = (e) => {
    const { name, value, files } = e.target
    const file = files ? files[0] : null
    if (file && name === 'picture') {
      setPreviewUrl(URL.createObjectURL(file))
    }
    setAnimateur(prev => ({
      ...prev,
      [name]: file || value,
    }))
  }




  const handleUpdateProfile = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    setFeedback({ type: '', message: '' })

    const data = new FormData()
    data.append('phone', animateur.telephone)
    if (animateur.picture) data.append('picture', animateur.picture)

    try {
      await axios.post('/profile/update', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      await mutate()
      setFeedback({ type: 'success', message: 'Téléphone ou photo mis à jour avec succès !' })
      console.log("Données sauvegardées :", animateur);
      setMessage("Modifications enregistrées avec succès !");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setFeedback({ type: 'error', message: 'Erreur lors de la mise à jour.' })
      console.log();
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setFeedback({ type: '', message: '' }), 3000)
    }
  }



    

  const [photoPreview, setPhotoPreview] = useState("");
  const [message, setMessage] = useState("");







  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, tu peux envoyer les données à une API
    console.log("Données sauvegardées :", animateur);
    setMessage("Modifications enregistrées avec succès !");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {feedback.message && (
        <div className={`mb-6 p-4 text-sm font-medium border-l-4 rounded-lg animate-fade-in transition-opacity duration-500 ${
          feedback.type === 'success' ? 'bg-green-50 text-green-800 border-green-500' : 
          'bg-red-50 text-red-800 border-red-500'
        }`}>
          {feedback.message}
        </div>
      )}
      <form
        onSubmit={handleUpdateProfile}
        className="bg-white rounded-lg shadow-lg max-w-5xl w-full p-10 flex flex-col md:flex-row gap-10 items-center md:items-start"
      >
        {/* Avatar */}
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-[6px] border-gray-200 shadow-md bg-blue-100 flex items-center justify-center text-blue-700 text-4xl font-bold">
          {animateur.photo || photoPreview ? (
            <img
              src={animateur.photo || photoPreview}
              alt="Photo de profil"
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{getInitials(animateur.nom, animateur.prenoms)}</span>
          )}
        </div>

        {/* Infos personnelles */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Bienvenue, {animateur.prenoms}
          </h2>
          <p className="text-gray-500 italic mb-6">
            Vous pouvez mettre à jour vos informations personnelles ci-dessous.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <p><span className="font-semibold">Nom :</span> {animateur.nom}</p>
            <p><span className="font-semibold">Prénoms :</span> {animateur.prenoms}</p>
            <p><span className="font-semibold">Email :</span> {animateur.email}</p>



            <div className="grid  gap-4 text-sm" >
              <div>
                <label className="font-semibold block mb-1">Téléphone :</label>
                <input
                  type="text"
                  name="telephone"
                  value={animateur.telephone}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>



              <div>
                <label className="font-semibold block mb-1">Adresse :</label>
                <input
                  type="text"
                  name="pays"
                  value={animateur.pays}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
            </div>






            <div className="col-span-2">
              <label className="font-semibold block mb-1">Changer la photo :</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-sm"
              />
            </div>
          </div>

          {/* Bouton Enregistrer */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Enregistrer
            </button>
            {message && (
              <p className="text-green-600 mt-2 font-semibold">{message}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
