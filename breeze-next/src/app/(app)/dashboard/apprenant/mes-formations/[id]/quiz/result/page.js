'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FaTrophy, FaDownload, FaHome } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export default function QuizResultPage({ params }) {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');
  const attestationPath = searchParams.get('attestation');
  const numericScore = score ? parseInt(score) : 0;
  console.log(params.id);

  useEffect(() => {
    if (numericScore >= 80) {
      toast.success('Excellent travail ! 🎉', {
        position: "top-center",
        autoClose: 5000,
      });
    } else if (numericScore >= 50) {
      toast.info('Pas mal ! Vous pouvez encore vous améliorer.', {
        position: "top-center",
      });
    }
  }, [numericScore]);

  const getScoreColor = () => {
    if (numericScore >= 80) return 'text-green-600';
    if (numericScore >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreEmoji = () => {
    if (numericScore >= 80) return '🏆';
    if (numericScore >= 50) return '👍';
    return '😕';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8 mt-0">
      <ToastContainer />
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full bg-blue-100 ${getScoreColor()}`}>
              <FaTrophy size={48} />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Résultat du Quiz</h1>
          <div className={`text-4xl font-bold mb-4 ${getScoreColor()}`}>
            {score}% {getScoreEmoji()}
          </div>

          {numericScore >= 50 && (
            <div className="my-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">
                {numericScore >= 80 
                  ? "Félicitations pour votre excellent score !" 
                  : "Bien joué ! Vous avez réussi le quiz."}
              </p>
            </div>
          )}

          {attestationPath && (
            <div className="mt-6 p-4 border border-green-200 rounded-lg bg-green-50">
              <p className="text-green-700 mb-3">Votre attestation de réussite est prête :</p>
              <a
                href={attestationPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <FaDownload className="mr-2" />
                Télécharger l'attestation
              </a>
            </div>
          )}

          {numericScore >= 50 && (
            <div className="mt-4">
              <Link 
                href={`/dashboard/apprenant/mes-formations/${params.id}/demande-stage`} 
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Faire une demande de stage
              </Link>
            </div>
          )}


          <div className="mt-8">
            <Link 
              href="/" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaHome className="mr-2" />
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}