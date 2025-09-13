"use client";

import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft, FaCheck, FaPlus, FaTrash } from "react-icons/fa";



/* -------------------- STEP COMPONENTS -------------------- */

    // Étape 2 : Module + Leçons
    const ModuleForm = ({ modules, setModules }) => {
    const addModule = () => {
        setModules([
        ...modules,
        { title: "", description: "", lessons: [{ title: "", contents: null, video_file: null }] },
        ]);
    };

    const removeModule = (index) => {
        const updated = [...modules];
        updated.splice(index, 1);
        setModules(updated);
    };

    const handleModuleChange = (index, field, value) => {
        const updated = [...modules];
        updated[index][field] = value;
        setModules(updated);
    };

    const handleLessonChange = (mIndex, lIndex, field, value) => {
        const updated = [...modules];
        updated[mIndex].lessons[lIndex][field] = value;
        setModules(updated);
    };

    const addLesson = (mIndex) => {
        const updated = [...modules];
        updated[mIndex].lessons.push({ title: "", contents: null, video_file: null });
        setModules(updated);
    };

    const removeLesson = (mIndex, lIndex) => {
        const updated = [...modules];
        updated[mIndex].lessons.splice(lIndex, 1);
        setModules(updated);
    };

    return (
        <div className="space-y-6">
        {modules.map((module, mIndex) => (
            <div key={mIndex} className="border p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Module {mIndex + 1}</h3>
                <button
                onClick={() => removeModule(mIndex)}
                className="text-red-500 hover:text-red-700"
                >
                <FaTrash />
                </button>
            </div>
            <input
                type="text"
                placeholder="Titre du module"
                value={module.title}
                onChange={(e) => handleModuleChange(mIndex, "title", e.target.value)}
                className="w-full border p-2 rounded mb-2"
            />
            <textarea
                placeholder="Description"
                value={module.description}
                onChange={(e) => handleModuleChange(mIndex, "description", e.target.value)}
                className="w-full border p-2 rounded mb-4"
            />

            <h4 className="font-medium">Leçons</h4>
            {module.lessons.map((lesson, lIndex) => (
                <div key={lIndex} className="bg-gray-100 p-3 rounded mb-2">
                <input
                    type="text"
                    placeholder="Titre de la leçon"
                    value={lesson.title}
                    onChange={(e) => handleLessonChange(mIndex, lIndex, "title", e.target.value)}
                    className="w-full border p-2 rounded mb-2"
                />
                <input
                    type="file"
                    onChange={(e) => handleLessonChange(mIndex, lIndex, "contents", e.target.files[0])}
                    className="w-full border p-2 rounded mb-2"
                />
                <input
                    type="file"
                    onChange={(e) =>
                    handleLessonChange(mIndex, lIndex, "video_file", e.target.files[0])
                    }
                    className="w-full border p-2 rounded mb-2"
                />
                <button
                    onClick={() => removeLesson(mIndex, lIndex)}
                    className="text-red-500 text-sm flex items-center gap-1"
                >
                    <FaTrash /> Supprimer la leçon
                </button>
                </div>
            ))}
            <button
                onClick={() => addLesson(mIndex)}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded flex items-center gap-1"
            >
                <FaPlus /> Ajouter une leçon
            </button>
            </div>
        ))}

        <button
            onClick={addModule}
            className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2"
        >
            <FaPlus /> Ajouter un module
        </button>
        </div>
    );
    };

    // Étape 4 : Quiz + Questions + Options
    const QuizForm = ({ quizzes, setQuizzes }) => {
    const addQuiz = () => {
        setQuizzes([...quizzes, { title: "", questions: [] }]);
    };

    const removeQuiz = (qIndex) => {
        const updated = [...quizzes];
        updated.splice(qIndex, 1);
        setQuizzes(updated);
    };

    const handleQuizChange = (qIndex, field, value) => {
        const updated = [...quizzes];
        updated[qIndex][field] = value;
        setQuizzes(updated);
    };

    const addQuestion = (qIndex) => {
        const updated = [...quizzes];
        updated[qIndex].questions.push({ title: "", point: 1, options: [] });
        setQuizzes(updated);
    };

    const handleQuestionChange = (qIndex, quIndex, field, value) => {
        const updated = [...quizzes];
        updated[qIndex].questions[quIndex][field] = value;
        setQuizzes(updated);
    };

    const addOption = (qIndex, quIndex) => {
        const updated = [...quizzes];
        updated[qIndex].questions[quIndex].options.push({ title: "", answer: false });
        setQuizzes(updated);
    };

    const handleOptionChange = (qIndex, quIndex, oIndex, field, value) => {
        const updated = [...quizzes];
        updated[qIndex].questions[quIndex].options[oIndex][field] = value;
        setQuizzes(updated);
    };

    return (
        <div className="space-y-6">
        {quizzes.map((quiz, qIndex) => (
            <div key={qIndex} className="border p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Quiz {qIndex + 1}</h3>
                <button
                onClick={() => removeQuiz(qIndex)}
                className="text-red-500 hover:text-red-700"
                >
                <FaTrash />
                </button>
            </div>
            <input
                type="text"
                placeholder="Titre du quiz"
                value={quiz.title}
                onChange={(e) => handleQuizChange(qIndex, "title", e.target.value)}
                className="w-full border p-2 rounded mb-4"
            />

            <h4 className="font-medium">Questions</h4>
            {quiz.questions.map((question, quIndex) => (
                <div key={quIndex} className="bg-gray-100 p-3 rounded mb-2">
                <input
                    type="text"
                    placeholder="Titre de la question"
                    value={question.title}
                    onChange={(e) =>
                    handleQuestionChange(qIndex, quIndex, "title", e.target.value)
                    }
                    className="w-full border p-2 rounded mb-2"
                />
                <input
                    type="number"
                    placeholder="Points"
                    value={question.point}
                    onChange={(e) =>
                    handleQuestionChange(qIndex, quIndex, "point", e.target.value)
                    }
                    className="w-full border p-2 rounded mb-2"
                />

                <h5 className="font-medium">Options</h5>
                {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex gap-2 items-center mb-2">
                    <input
                        type="text"
                        placeholder="Option"
                        value={option.title}
                        onChange={(e) =>
                        handleOptionChange(qIndex, quIndex, oIndex, "title", e.target.value)
                        }
                        className="flex-1 border p-2 rounded"
                    />
                    <label className="flex items-center gap-1">
                        <input
                        type="checkbox"
                        checked={option.answer}
                        onChange={(e) =>
                            handleOptionChange(qIndex, quIndex, oIndex, "answer", e.target.checked)
                        }
                        />
                        Correcte ?
                    </label>
                    </div>
                ))}
                <button
                    onClick={() => addOption(qIndex, quIndex)}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded flex items-center gap-1"
                >
                    <FaPlus /> Ajouter une option
                </button>
                </div>
            ))}
            <button
                onClick={() => addQuestion(qIndex)}
                className="mt-2 px-3 py-1 bg-green-500 text-white rounded flex items-center gap-1"
            >
                <FaPlus /> Ajouter une question
            </button>
            </div>
        ))}

        <button
            onClick={addQuiz}
            className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2"
        >
            <FaPlus /> Ajouter un quiz
        </button>
        </div>
    );
    };





// export default function CreateFormationPage() {
//   const [step, setStep] = useState(1);

//   // === STATES POUR LE FORMULAIRE ===
//   const [formation, setFormation] = useState({
//     name: "",
//     prerequisites: "",
//     price: "",
//     formation_details: "",
//     picture: null,
//     teacher_id: "",
//     modules: [],
//     equipments: [],
//     quizzes: [],
//   });

//   // === GESTION DES CHAMPS ===
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormation({
//       ...formation,
//       [name]: files ? files[0] : value,
//     });
//   };

//   // === NAVIGATION ENTRE LES ÉTAPES ===
//   const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
//   const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

//   // === ENVOI VERS API ===
//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();

//       Object.keys(formation).forEach((key) => {
//         if (formation[key] instanceof File) {
//           formData.append(key, formation[key]);
//         } else {
//           formData.append(key, JSON.stringify(formation[key]));
//         }
//       });

//       await axios.post("http://localhost:8000/api/formations", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       alert("✅ Formation créée avec succès !");
//     } catch (error) {
//       console.error(error);
//       alert("❌ Erreur lors de l'enregistrement");
//     }
//   };

//   // === RENDER STEP ===
//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div className="space-y-4">
//             <h2 className="text-xl font-bold">Informations générales</h2>
//             <input
//               type="text"
//               name="name"
//               placeholder="Nom de la formation"
//               value={formation.name}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//             <textarea
//               name="prerequisites"
//               placeholder="Prérequis"
//               value={formation.prerequisites}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//             <input
//               type="number"
//               name="price"
//               placeholder="Prix"
//               value={formation.price}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//             <textarea
//               name="formation_details"
//               placeholder="Détails de la formation"
//               value={formation.formation_details}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//             <input
//               type="file"
//               name="picture"
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//             <input
//               type="text"
//               name="teacher_id"
//               placeholder="ID de l'enseignant"
//               value={formation.teacher_id}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>
//         );

//       case 2:
//         return (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Modules & Leçons</h2>
//             {/* Exemple simple - tu peux ajouter un bouton pour push un module */}
//             <p className="text-gray-600">
//               Ici tu pourras ajouter dynamiquement les modules et leçons.
//             </p>
//           </div>
//         );

//       case 3:
//         return (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Équipements</h2>
//             <p className="text-gray-600">
//               Ici tu pourras ajouter des équipements existants ou en créer de
//               nouveaux.
//             </p>
//           </div>
//         );

//       case 4:
//         return (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Quiz</h2>
//             <p className="text-gray-600">
//               Ici tu pourras ajouter les quizzes, questions et options.
//             </p>
//           </div>
//         );

//       case 5:
//         return (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Récapitulatif</h2>
//             <pre className="bg-gray-100 p-4 rounded text-sm">
//               {JSON.stringify(formation, null, 2)}
//             </pre>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       {/* HEADER STEPPER */}
//       <div className="flex justify-between items-center mb-6">
//         {[1, 2, 3, 4, 5].map((s) => (
//           <motion.div
//             key={s}
//             className={`w-10 h-10 flex items-center justify-center rounded-full ${
//               step >= s ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
//             }`}
//             whileHover={{ scale: 1.1 }}
//           >
//             {step > s ? <FaCheck /> : s}
//           </motion.div>
//         ))}
//       </div>

//       {/* CONTENU */}
//       <motion.div
//         key={step}
//         initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: -50 }}
//         transition={{ duration: 0.3 }}
//       >
//         {renderStep()}
//       </motion.div>

//       {/* BOUTONS */}
//       <div className="flex justify-between mt-6">
//         {step > 1 && (
//           <button
//             onClick={prevStep}
//             className="px-4 py-2 bg-gray-400 text-white rounded flex items-center gap-2"
//           >
//             <FaArrowLeft /> Précédent
//           </button>
//         )}
//         {step < 5 ? (
//           <button
//             onClick={nextStep}
//             className="ml-auto px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2"
//           >
//             Suivant <FaArrowRight />
//           </button>
//         ) : (
//           <button
//             onClick={handleSubmit}
//             className="ml-auto px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2"
//           >
//             Valider <FaCheck />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


/* -------------------- MAIN PAGE -------------------- */

export default function CreateFormationPage() {
  const [step, setStep] = useState(1);

  const [formation, setFormation] = useState({
    name: "",
    prerequisites: "",
    price: "",
    formation_details: "",
    picture: null,
    teacher_id: "",
    modules: [],
    equipments: [],
    quizzes: [],
  });

  // === Navigation
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // === Envoi API
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.keys(formation).forEach((key) => {
        if (formation[key] instanceof File) {
          formData.append(key, formation[key]);
        } else {
          formData.append(key, JSON.stringify(formation[key]));
        }
      });

      await axios.post("http://localhost:8000/api/formations", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("✅ Formation créée avec succès !");
    } catch (error) {
      console.error(error);
      alert("❌ Erreur lors de l'enregistrement");
    }
  };

  // === Render Steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Informations générales</h2>
            <input
              type="text"
              placeholder="Nom de la formation"
              value={formation.name}
              onChange={(e) => setFormation({ ...formation, name: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <textarea
              placeholder="Prérequis"
              value={formation.prerequisites}
              onChange={(e) => setFormation({ ...formation, prerequisites: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Prix"
              value={formation.price}
              onChange={(e) => setFormation({ ...formation, price: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <textarea
              placeholder="Détails"
              value={formation.formation_details}
              onChange={(e) => setFormation({ ...formation, formation_details: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="file"
              onChange={(e) => setFormation({ ...formation, picture: e.target.files[0] })}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="ID de l'enseignant"
              value={formation.teacher_id}
              onChange={(e) => setFormation({ ...formation, teacher_id: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>
        );

      case 2:
        return <ModuleForm modules={formation.modules} setModules={(m) => setFormation({ ...formation, modules: m })} />;

      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Équipements</h2>
            <p className="text-gray-600">
              Ici tu pourras ajouter des équipements existants ou en créer de nouveaux.
            </p>
          </div>
        );

      case 4:
        return <QuizForm quizzes={formation.quizzes} setQuizzes={(q) => setFormation({ ...formation, quizzes: q })} />;

      case 5:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Récapitulatif</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm">
              {JSON.stringify(formation, null, 2)}
            </pre>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Stepper */}
      <div className="flex justify-between items-center mb-6">
        {[1, 2, 3, 4, 5].map((s) => (
          <motion.div
            key={s}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              step >= s ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
            }`}
            whileHover={{ scale: 1.1 }}
          >
            {step > s ? <FaCheck /> : s}
          </motion.div>
        ))}
      </div>

      {/* Step content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {renderStep()}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-gray-400 text-white rounded flex items-center gap-2"
          >
            <FaArrowLeft /> Précédent
          </button>
        )}
        {step < 5 ? (
          <button
            onClick={nextStep}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2"
          >
            Suivant <FaArrowRight />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2"
          >
            Valider <FaCheck />
          </button>
        )}
      </div>
    </div>
  );
}
