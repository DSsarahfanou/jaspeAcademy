"use client";

import { useState } from "react";

export default function AttestationPage() {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    // Simuler une génération de PDF (à remplacer par un vrai appel backend)
    setTimeout(() => {
      setLoading(false);
      alert("L'attestation a été téléchargée !");
      // Dans un vrai projet : window.open("/api/attestation.pdf");
    }, 2000);
  };

  const handleStageRequest = () => {
    window.location.href = "demande-stage";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center space-y-6">
      <h1 className="text-3xl font-bold text-green-700">🎉 Félicitations !</h1>
      <p className="text-gray-700">
        Vous avez terminé la formation avec succès en obtenant au moins 80% au quiz.
        Vous pouvez maintenant télécharger votre attestation de fin de formation.
      </p>

      <button
        onClick={handleDownload}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Génération..." : "📄 Télécharger mon attestation"}
      </button>

      <div className="border-t pt-6 mt-6">
        <p className="text-gray-700 mb-2">Prêt(e) à passer à l’action ?</p>
        <button
          onClick={handleStageRequest}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          🚀 Faire une demande de stage
        </button>
      </div>
    </div>
  );
}
