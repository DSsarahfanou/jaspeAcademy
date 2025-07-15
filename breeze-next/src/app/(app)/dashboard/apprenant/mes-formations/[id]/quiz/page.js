'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from '/src/lib/axios';

import { FaDownload, FaArrowLeft } from 'react-icons/fa';
  

export default function QuizPage({ params }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progression, setProgression] = useState(0);
  const [score, setScore] = useState(null);
  const [attestation, setAttestation] = useState(null);
  const router = useRouter();


  useEffect(() => {
    const fetchQuizAndProgress = async () => {
      try {
        await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

        const quizResponse = await axios.get(
          `/api/formations/${params.id}/quiz`,
          { withCredentials: true }
        );
        setQuiz(quizResponse.data.quiz);

        const progressResponse = await axios.get(
          `/api/formation_student/${params.id}/progression`,
          { withCredentials: true }
        );
        setProgression(progressResponse.data.data.progression || 0);
        console.log(progressResponse.data.data.progression);

        const resultResponse = await axios.get(
          `/api/formation_student/${params.id}/score`,
          { withCredentials: true }
        );
        setScore(resultResponse.data.data.score || null);
        console.log(resultResponse.data.data.score);

        const attestationResponse = await axios.get(
          `/api/formation_student/${params.id}/attestation`,
          { withCredentials: true }
        );
        setAttestation(attestationResponse.data.data.attestation || null);
        console.log(attestationResponse.data.data.attestaion);

      } catch (err) {
        console.error(err);
        setError('Erreur lors de la récupération des données');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizAndProgress();
  }, [params.id]);


  const handleAnswerChange = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  // //Soumettre les réponses
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setError(null); // pour réinitialiser une éventuelle erreur précédente
  //     console.log("avant try");

  //     try {
  //       // 1. Obtenir le cookie CSRF
  //       await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`, {
  //         withCredentials: true
  //       });

  //       console.log("avant token");
  //       const token = localStorage.getItem('token');
  //       console.log(token);

  //       // 2. Soumettre les réponses du quiz
  //       const response = await axios.post(
  //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/formations/${params.id}/quiz/submit`,
  //         {
  //           quiz_id: quiz.id,
  //           answers,
  //         },
  //         {
  //           withCredentials: true,
  //         }
  //       );

  //       console.log("après response");
  //       console.log(response);

  //       const data = response.data;

  //       router.push(`/dashboard/apprenant/mes-formations/${params.id}/quiz/result?score=${data.score}&attestation=${encodeURIComponent(data.attestation_path)}`);

  //     } catch (err) {
  //       console.error(err);   
  //       if (err.response && err.response.data && err.response.data.error) {
  //         setError(err.response.data.error);
  //       } else {
  //         setError('Erreur lors de la soumission du quiz');
  //       }
  //     }
  //   };


    const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // 1. Obtenir le cookie CSRF
      await axios.get('/sanctum/csrf-cookie');

      // 2. Soumettre les réponses
      const response = await axios.post(
        `/api/formations/${params.id}/quiz/submit`,
        {
          quiz_id: quiz.id,
          answers,
        }
      );

      const data = response.data;

      router.push(
        `/dashboard/apprenant/mes-formations/${params.id}/quiz/result?score=${data.score}&attestation=${encodeURIComponent(data.attestation_path)}`
      );

    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Erreur lors de la soumission du quiz');
      }
    }
  };



  if (loading) return <div>      
    <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
      <p>Chargement...</p> 
    </div>;
  if (error) return <div>Erreur : {error}</div>;

  if (progression === 100 && score !== null) {
    return (
 <div className="container mx-auto max-w-2xl p-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-2 text-green-700">🎉 Résultat du Quiz</h1>
      <p className="text-lg mb-1 text-gray-800">
        Vous avez déjà passé votre examen pour cette formation.
      </p>
      <p className="text-lg mb-6 text-gray-800">
        <strong>Score :</strong> {score} %
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <a
          href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${attestation}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-green-600 text-white px-4 py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          <FaDownload className="mr-2" />
          Télécharger l’attestation
        </a>

        <a
          href={`/dashboard/apprenant/mes-formations/${params.id}/demande-stage`}
          className="flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          🎓 Faire une demande de stage
        </a>
      </div>

      <button
        onClick={() => router.push('/dashboard')}
        className="w-full flex items-center justify-center bg-gray-700 text-white px-4 py-3 rounded-lg shadow hover:bg-gray-800 transition"
      >
        <FaArrowLeft className="mr-2" />
        Retour au Dashboard
      </button>
    </div>
    );
  }

  if (!quiz) return <div>Aucun quiz trouvé</div>;

  // Sinon : quiz actif
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question) => (
          <div key={question.id} className="mb-6">
            <h2 className="text-xl font-semibold">{question.title}</h2>
            {question.options.map((option) => (
              <div key={option.id} className="mt-2">
                <label>
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={option.id}
                    checked={answers[question.id] == option.id}
                    onChange={() => handleAnswerChange(question.id, option.id)}
                    className="mr-2"
                  />
                  {option.title}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Soumettre le quiz
        </button>
      </form>
    </div>
  );

}