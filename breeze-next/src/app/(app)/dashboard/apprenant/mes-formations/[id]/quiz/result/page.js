'use client';

import { useSearchParams } from 'next/navigation';

export default function QuizResultPage() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');
  const attestationPath = searchParams.get('attestation');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Résultat du Quiz</h1>
      <p className="text-lg">Votre note : {score}%</p>
      {attestationPath && (
        <div className="mt-4">
          <p>Félicitations ! Votre attestation est disponible :</p>
          <a
            href={attestationPath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Télécharger l'attestation
          </a>
        </div>
      )}
    </div>
  );
}