"use client";

import { useState } from "react";

export default function ProfilAnimateur() {
  const [animateur, setAnimateur] = useState({
    nom: "Dupont",
    prenoms: "Jean Michel",
    email: "jean.dupont@example.com",
    telephone: "+33 6 12 34 56 78",
    specialite: "Réseaux & Télécommunications",
    pays: "France",
    ville: "Paris",
    situation: "Célibataire",
    photo: "", // base64 ou URL
  });

  const [photoPreview, setPhotoPreview] = useState("");
  const [message, setMessage] = useState("");

  const getInitiales = (nom, prenoms) => {
    const prenom = prenoms.split(" ")[0];
    return (prenom[0] + nom[0]).toUpperCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimateur((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAnimateur((prev) => ({ ...prev, photo: reader.result }));
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, tu peux envoyer les données à une API
    console.log("Données sauvegardées :", animateur);
    setMessage("Modifications enregistrées avec succès !");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg max-w-5xl w-full p-10 flex flex-col md:flex-row gap-10 items-center md:items-start"
      >
        {/* Avatar */}
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-[6px] border-gray-200 shadow-md bg-purple-100 flex items-center justify-center text-purple-700 text-4xl font-bold">
          {animateur.photo || photoPreview ? (
            <img
              src={animateur.photo || photoPreview}
              alt="Photo de profil"
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{getInitiales(animateur.nom, animateur.prenoms)}</span>
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
              <label className="font-semibold block mb-1">Situation matrimoniale :</label>
              <select
                name="situation"
                value={animateur.situation}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              >
                <option value="Célibataire">Célibataire</option>
                <option value="Marié(e)">Marié(e)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1">Spécialité :</label>
              <input
                type="text"
                name="specialite"
                value={animateur.specialite}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Pays :</label>
              <input
                type="text"
                name="pays"
                value={animateur.pays}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Ville :</label>
              <input
                type="text"
                name="ville"
                value={animateur.ville}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded"
              />
            </div>

            <div className="col-span-2">
              <label className="font-semibold block mb-1">Changer la photo :</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full text-sm"
              />
            </div>
          </div>

          {/* Bouton Enregistrer */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition duration-200"
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
