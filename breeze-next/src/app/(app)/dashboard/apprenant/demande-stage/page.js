'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function DemandeStagePage() {
  const { id } = useParams(); // ID de la formation
  const router = useRouter();

  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    pays: '',
    situation: '',
    periode: '',
  });

  const [files, setFiles] = useState({
    attestation: null,
    lettre: null,
    carteIdentite: null,
    acteNaissance: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [demandeExistante, setDemandeExistante] = useState(null);

  useEffect(() => {
    const checkDemandeExistante = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/demande-stage/${id}`);
        if (res.ok) {
          const data = await res.json();
          setDemandeExistante(data);
        }
      } catch (error) {
        console.error("Erreur de vérification de demande :", error);
      }
    };

    checkDemandeExistante();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const data = new FormData();
    data.append('formation_id', id);
    data.append('nom', formData.nom);
    data.append('telephone', formData.telephone);
    data.append('email', formData.email);
    data.append('pays', formData.pays);
    data.append('situation', formData.situation);
    data.append('periode', formData.periode);
    data.append('attestation', files.attestation);
    data.append('lettre', files.lettre);
    data.append('carteIdentite', files.carteIdentite);
    data.append('acteNaissance', files.acteNaissance);

    try {
      const response = await fetch('http://localhost:8000/api/demande-stage', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) throw new Error('Échec de l\'envoi');

      setSuccess(true);

      setTimeout(() => {
        router.push('/dashboard/apprenant/mes-demandes');
      }, 2000);
    } catch (err) {
      setError('Erreur lors de l\'envoi de la demande.');
    }
  };

  const renderStatut = (statut) => {
    switch (statut) {
      case 'en_attente':
        return (
          <p className="flex items-center text-yellow-500">
            <FaClock className="mr-2" /> En attente de validation
          </p>
        );
      case 'accepte':
        return (
          <p className="flex items-center text-green-600">
            <FaCheckCircle className="mr-2" /> Acceptée
          </p>
        );
      case 'refuse':
        return (
          <p className="flex items-center text-red-600">
            <FaTimesCircle className="mr-2" /> Refusée
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">📄 Demande de stage</h1>

      {demandeExistante ? (
        <div className="p-4 bg-gray-100 rounded space-y-4">
          <p className="mb-2">Votre demande a déjà été soumise pour cette formation.</p>
          {renderStatut(demandeExistante.statut)}

          {demandeExistante.statut === 'accepte' && (
            <div className="mt-4">
              <a
                href={`/dashboard/apprenant/mon-stage/${id}`}
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Voir mon stage
              </a>
            </div>
          )}
        </div>
      ) : (
        <>
          {error && <p className="text-red-600 mb-4">❌ {error}</p>}
          {success && <p className="text-green-600 mb-4">✅ Demande envoyée avec succès !</p>}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input type="text" name="nom" placeholder="Nom complet"
              value={formData.nom} onChange={handleChange}
              className="w-full border px-3 py-2 rounded" required />

            <input type="text" name="telephone" placeholder="Téléphone"
              value={formData.telephone} onChange={handleChange}
              className="w-full border px-3 py-2 rounded" required />

            <input type="email" name="email" placeholder="Email"
              value={formData.email} onChange={handleChange}
              className="w-full border px-3 py-2 rounded" required />

            <input type="text" name="pays" placeholder="Pays"
              value={formData.pays} onChange={handleChange}
              className="w-full border px-3 py-2 rounded" required />

            <select name="situation" value={formData.situation} onChange={handleChange}
              className="w-full border px-3 py-2 rounded" required>
              <option value="">Situation familiale</option>
              <option value="célibataire_sans_enfant">Célibataire sans enfant</option>
              <option value="célibataire_avec_enfant">Célibataire avec enfant</option>
              <option value="marié">Marié(e)</option>
            </select>

            <input type="text" name="periode" placeholder="Période souhaitée (ex: juillet - août)"
              value={formData.periode} onChange={handleChange}
              className="w-full border px-3 py-2 rounded" required />

            <label className="block">
              Attestation en PDF :
              <input type="file" name="attestation" onChange={handleFileChange}
                accept="application/pdf" className="mt-1" required />
            </label>

            <label className="block">
              Lettre de demande de stage :
              <input type="file" name="lettre" onChange={handleFileChange}
                accept="application/pdf" className="mt-1" required />
            </label>

            <label className="block">
              Carte d'identité :
              <input type="file" name="carteIdentite" onChange={handleFileChange}
                accept="application/pdf" className="mt-1" required />
            </label>

            <label className="block">
              Acte de naissance :
              <input type="file" name="acteNaissance" onChange={handleFileChange}
                accept="application/pdf" className="mt-1" required />
            </label>

            <button type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Envoyer la demande
            </button>
          </form>
        </>
      )}
    </div>
  );
}
