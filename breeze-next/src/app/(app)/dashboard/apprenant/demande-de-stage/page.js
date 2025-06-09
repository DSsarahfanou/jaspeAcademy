'use client';

import { useEffect, useState } from 'react';

export default function ListeDemandesStagePage() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/mes-demandes-stage'); // à ajuster selon ton backend
        const data = await res.json();
        setDemandes(data);
      } catch (error) {
        console.error('Erreur chargement des demandes :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📄 Mes demandes de stage</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : demandes.length === 0 ? (
        <p>Vous n'avez encore envoyé aucune demande de stage.</p>
      ) : (
        <table className="w-full border shadow text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Formation</th>
              <th className="p-3">Période</th>
              <th className="p-3">Date</th>
              <th className="p-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{demande.formation_nom}</td>
                <td className="p-3">{demande.periode}</td>
                <td className="p-3">{new Date(demande.created_at).toLocaleDateString()}</td>
                <td className="p-3">
                  {demande.statut === 'en_attente' && (
                    <span className="text-yellow-600">⏳ En attente</span>
                  )}
                  {demande.statut === 'acceptée' && (
                    <span className="text-green-600">✅ Acceptée</span>
                  )}
                  {demande.statut === 'refusée' && (
                    <span className="text-red-600">❌ Refusée</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
