"use client";

import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";

export default function ProfilAnimateur() {
  const router = useRouter();

  // Exemple de données (à remplacer par fetch API ou context)
  const animateur = {
    nom: "Dupont",
    prenoms: "Jean Michel",
    email: "jean.dupont@example.com",
    telephone: "+33 6 12 34 56 78",
    specialite: "Réseaux & Télécommunications",
    pays: "France",
    ville: "Paris",
    situation: "Célibataire",
    photo: "", // peut contenir une URL d'image
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md relative">
      {/* Bouton Modifier en haut à droite */}
      <button
        onClick={() => router.push("/dashboard/animateur/profil/edit")}
        className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-purple-700"
      >
        <FaEdit /> Modifier
      </button>

      <h2 className="text-2xl font-bold text-purple-700 mb-6">Mon Profil</h2>

      <div className="flex flex-col sm:flex-row gap-8 items-start">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {animateur.photo ? (
            <img
              src={animateur.photo}
              alt="Profil"
              className="w-40 h-40 rounded-full object-cover"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-4xl font-bold">
              {animateur.prenoms[0]}
              {animateur.nom[0]}
            </div>
          )}
        </div>

        {/* Infos personnelles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 w-full">
          <p><span className="font-semibold">Nom :</span> {animateur.nom}</p>
          <p><span className="font-semibold">Prénoms :</span> {animateur.prenoms}</p>
          <p><span className="font-semibold">Email :</span> {animateur.email}</p>
          <p><span className="font-semibold">Téléphone :</span> {animateur.telephone}</p>
          <p><span className="font-semibold">Spécialité :</span> {animateur.specialite}</p>
          <p><span className="font-semibold">Pays :</span> {animateur.pays}</p>
          <p><span className="font-semibold">Ville :</span> {animateur.ville}</p>
          <p><span className="font-semibold">Situation matrimoniale :</span> {animateur.situation}</p>
        </div>
      </div>
    </div>
  );
}
