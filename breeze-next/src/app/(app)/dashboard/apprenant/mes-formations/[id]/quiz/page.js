'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
  

export default function QuizPage({ params }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token envoyé:', token, params); // Pour débogage
        const response = await fetch(`http://localhost:8000/api/formations/${params.id}/quiz`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
          setQuiz(data.quiz);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Erreur lors de la récupération du quiz');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [params.id]);

  const handleAnswerChange = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null); // pour réinitialiser une éventuelle erreur précédente
      console.log("avant try");

      try {
        // 1. Obtenir le cookie CSRF
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`, {
          withCredentials: true
        });

        console.log("avant token");
        const token = localStorage.getItem('token');
        console.log(token);

        // 2. Soumettre les réponses du quiz
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/formations/${params.id}/quiz/submit`,
          {
            quiz_id: quiz.id,
            answers,
          },
          {
            withCredentials: true,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        console.log("après response");
        console.log(response);

        const data = response.data;

        router.push(`/dashboard/apprenant/mes-formations/${params.id}/quiz/result?score=${data.score}&attestation=${encodeURIComponent(data.attestation_path)}`);

      } catch (err) {
        console.error(err);   
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError('Erreur lors de la soumission du quiz');
        }
      }
    };


  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!quiz) return <div>Aucun quiz trouvé</div>;

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