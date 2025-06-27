'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function QuizPage({ params }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token'); // Récupérer le token d'authentification
        const response = await fetch(`http://localhost:8000/api/formations/${params.formationId}/quiz`, {
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
  }, [params.formationId]);

  const handleAnswerChange = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/formations/${params.formationId}/quiz/submit`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quiz_id: quiz.id,
          answers,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        router.push(`/formations/${params.formationId}/quiz/result?score=${data.score}&attestation=${data.attestation_path}`);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Erreur lors de la soumission du quiz');
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