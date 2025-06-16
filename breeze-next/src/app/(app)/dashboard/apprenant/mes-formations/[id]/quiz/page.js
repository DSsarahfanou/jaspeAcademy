"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const quizQuestions = [
  {
    question: "Quel est le rôle d’un routeur ?",
    options: ["Connecter des périphériques", "Gérer le trafic réseau", "Stocker des fichiers", "Afficher une page web"],
    answer: "Gérer le trafic réseau",
  },
  {
    question: "Quelle est la couche 3 du modèle OSI ?",
    options: ["Transport", "Réseau", "Session", "Application"],
    answer: "Réseau",
  },
  {
    question: "Que signifie HTTP ?",
    options: ["HyperText Transfer Protocol", "High Transfer Protocol", "HyperText Transmission Program", "Host Transfer Terminal Protocol"],
    answer: "HyperText Transfer Protocol",
  },
  {
    question: "Quel est le port standard pour HTTPS ?",
    options: ["80", "20", "443", "21"],
    answer: "443",
  },
  {
    question: "Quel outil est utilisé pour diagnostiquer une connectivité réseau ?",
    options: ["ping", "cd", "mkdir", "ipconfig"],
    answer: "ping",
  },
];

export default function QuizPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const handleOptionChange = (index, selectedOption) => {
    setAnswers({ ...answers, [index]: selectedOption });
  };

  const handleSubmit = () => {
    let correct = 0;
    quizQuestions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });

    const calculatedScore = Math.round((correct / quizQuestions.length) * 100);
    setScore(calculatedScore);
    setSubmitted(true);

    // Redirection vers attestation si score >= 80%
    if (calculatedScore >= 80) {
      setTimeout(() => {
        router.push("attestation");
      }, 3000); // délai pour afficher le score avant de rediriger
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Quiz de fin de formation</h1>

      {!submitted ? (
        <>
          {quizQuestions.map((q, index) => (
            <div key={index} className="mb-6">
              <p className="font-medium">{index + 1}. {q.question}</p>
              {q.options.map((opt, i) => (
                <label key={i} className="block mt-1">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={opt}
                    onChange={() => handleOptionChange(index, opt)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Soumettre mes réponses
          </button>
        </>
      ) : (
        <div className="text-center">
          <p className="text-2xl font-semibold">
            Votre score est : <span className={score >= 80 ? "text-green-600" : "text-red-600"}>{score}%</span>
          </p>
          {score >= 80 ? (
            <p className="mt-2 text-green-700">Félicitations ! Vous allez recevoir votre attestation...</p>
          ) : (
            <p className="mt-2 text-red-700">Désolé, vous devez obtenir au moins 80% pour valider la formation.</p>
          )}
        </div>
      )}
    </div>
  );
}
