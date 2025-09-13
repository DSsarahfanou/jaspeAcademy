// 'use client';

// import React, { useState, useEffect } from 'react';
// import axios from '/src/lib/axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaPlus, FaTrash } from 'react-icons/fa';

// const steps = ['Détails de la Formation', 'Modules et Leçons', 'Équipements', 'Quizzes'];

// const FormationCreatePage = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [teachers, setTeachers] = useState([]);
//     const [equipments, setEquipments] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     prerequisites: '',
//     price: 0,
//     formation_details: '',
//     picture: null,
//     teacher_id: '',
//     modules: [{ title: '', description: '', lessons: [{ title: '', contents: null }] }],
//     equipments: [],
//     quizzes: [{ title: '', questions: [{ title: '', point: 1, options: [{ title: '', answer: false }] }] }],
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const res = await fetch('http://localhost:8000/api/teachers')
//         const data = await res.json()
//         console.log(data)
//         console.log(data.data.data)
//         setTeachers(data.data.data);
//       } catch (error) {
//         toast.error('Erreur lors du chargement des formateurs');
//         console.log(teachers);
//       }
//     };
//     fetchTeachers();

//       const fetchEquipments = async () => {
//       try {
//         const res = await fetch('http://localhost:8000/api/equipments')
//         const data = await res.json()
//         console.log(data)
//         console.log(data.data)
//         setEquipments(data.data);
//       } catch (error) {
//         toast.error('Erreur lors du chargement des formateurs');
//         console.log(equipments);
//       }
//     };
//     fetchEquipments();
//   }, []);

//   const handleInputChange = (e, path = []) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prev) => {
//       if (path.length === 0) {
//         return { ...prev, [name]: type === 'file' ? files[0] : value };
//       }
//       const updated = { ...prev };
//       let current = updated;
//       for (let i = 0; i < path.length - 1; i++) {
//         current = current[path[i]];
//       }
//       current[path[path.length - 1]] = type === 'file' ? files[0] : value;
//       return updated;
//     });
//   };

//   const handleArrayAdd = (path, defaultItem) => {
//     setFormData((prev) => {
//       const updated = { ...prev };
//       let current = updated;
//       for (let i = 0; i < path.length - 1; i++) {
//         current = current[path[i]];
//       }
//       current[path[path.length - 1]] = [...current[path[path.length - 1]], defaultItem];
//       return updated;
//     });
//   };

//   const handleArrayRemove = (path, index) => {
//     setFormData((prev) => {
//       const updated = { ...prev };
//       let current = updated;
//       for (let i = 0; i < path.length - 1; i++) {
//         current = current[path[i]];
//       }
//       current[path[path.length - 1]] = current[path[path.length - 1]].filter((_, i) => i !== index);
//       return updated;
//     });
//   };

//   const validateStep = () => {
//     const newErrors = {};
//     if (activeStep === 0) {
//       if (!formData.name) newErrors.name = 'Requis';
//       if (!formData.prerequisites) newErrors.prerequisites = 'Requis';
//       if (!formData.price || formData.price < 0) newErrors.price = 'Requis et >= 0';
//       if (!formData.formation_details) newErrors.formation_details = 'Requis';
//       if (!formData.teacher_id) newErrors.teacher_id = 'Requis';
//     } else if (activeStep === 1) {
//       formData.modules.forEach((module, mIndex) => {
//         if (!module.title) newErrors[`modules.${mIndex}.title`] = 'Requis';
//         if (!module.description) newErrors[`modules.${mIndex}.description`] = 'Requis';
//         module.lessons.forEach((lesson, lIndex) => {
//           if (!lesson.title) newErrors[`modules.${mIndex}.lessons.${lIndex}.title`] = 'Requis';
//         });
//       });
//     } else if (activeStep === 3) {
//       formData.quizzes.forEach((quiz, qIndex) => {
//         if (!quiz.title) newErrors[`quizzes.${qIndex}.title`] = 'Requis';
//         quiz.questions.forEach((question, quIndex) => {
//           if (!question.title) newErrors[`quizzes.${qIndex}.questions.${quIndex}.title`] = 'Requis';
//           question.options.forEach((option, oIndex) => {
//             if (!option.title) newErrors[`quizzes.${qIndex}.questions.${quIndex}.options.${oIndex}.title`] = 'Requis';
//           });
//         });
//       });
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateStep()) {
//       setActiveStep((prev) => prev + 1);
//     } else {
//       toast.error('Veuillez remplir tous les champs requis');
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prev) => prev - 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateStep()) {
//       toast.error('Veuillez remplir tous les champs requis');
//       return;
//     }

//     const formDataToSend = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key === 'picture' && value) {
//         formDataToSend.append(key, value);
//       } else if (Array.isArray(value)) {
//         value.forEach((item, index) => {
//           Object.entries(item).forEach(([subKey, subValue]) => {
//             if (subKey === 'lessons' && Array.isArray(subValue)) {
//               subValue.forEach((lesson, lIndex) => {
//                 Object.entries(lesson).forEach(([lessonKey, lessonValue]) => {
//                   if ((lessonKey === 'contents') && lessonValue) {
//                     formDataToSend.append(`modules[${index}].lessons[${lIndex}].${lessonKey}`, lessonValue);
//                   } else {
//                     formDataToSend.append(`modules[${index}].lessons[${lIndex}].${lessonKey}`, lessonValue || '');
//                   }
//                 });
//               });
//             } else if (subKey === 'questions' && Array.isArray(subValue)) {
//               subValue.forEach((question, qIndex) => {
//                 Object.entries(question).forEach(([qKey, qValue]) => {
//                   if (qKey === 'options' && Array.isArray(qValue)) {
//                     qValue.forEach((option, oIndex) => {
//                       Object.entries(option).forEach(([oKey, oValue]) => {
//                         formDataToSend.append(`quizzes[${index}].questions[${qIndex}].options[${oIndex}].${oKey}`, oValue);
//                       });
//                     });
//                   } else {
//                     formDataToSend.append(`quizzes[${index}].questions[${qIndex}].${qKey}`, qValue || '');
//                   }
//                 });
//               });
//             } else if (subKey === 'picture' && subValue) {
//               formDataToSend.append(`equipments[${index}].picture`, subValue);
//             } else {
//               formDataToSend.append(`equipments[${index}].${subKey}`, subValue || '');
//             }
//           });
//         });
//       } else {
//         formDataToSend.append(key, value || '');
//       }
//     });

//     try {
//       const response = await axios.post('/api/formations', formDataToSend, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       console.log(response);
//       toast.success('Formation créée avec succès');
//       setFormData({
//         name: '',
//         prerequisites: '',
//         price: 0,
//         formation_details: '',
//         picture: null,
//         teacher_id: '',
//         modules: [{ title: '', description: '', lessons: [{ title: '', contents: null}] }],
//         equipments: [],
//         quizzes: [{ title: '', questions: [{ title: '', point: 1, options: [{ title: '', answer: false }] }] }],
//       });
//       setActiveStep(0);
//     } catch (error) {
//       toast.error('Erreur lors de la création de la formation');
//     }
//   };

//   const renderStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <div className="grid grid-cols-1 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Nom</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
//               />
//               {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Prérequis</label>
//               <textarea
//                 name="prerequisites"
//                 value={formData.prerequisites}
//                 onChange={handleInputChange}
//                 className={`mt-1 block w-full border ${errors.prerequisites ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
//               />
//               {errors.prerequisites && <p className="text-red-500 text-sm">{errors.prerequisites}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Prix</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleInputChange}
//                 className={`mt-1 block w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
//                 min="0"
//               />
//               {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Détails</label>
//               <textarea
//                 name="formation_details"
//                 value={formData.formation_details}
//                 onChange={handleInputChange}
//                 className={`mt-1 block w-full border ${errors.formation_details ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
//               />
//               {errors.formation_details && <p className="text-red-500 text-sm">{errors.formation_details}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Image</label>
//               <input
//                 type="file"
//                 name="picture"
//                 accept="image/*"
//                 onChange={handleInputChange}
//                 className="mt-1 block w-full"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Formateur</label>
//               <select
//                 name="teacher_id"
//                 value={formData.teacher_id}
//                 onChange={handleInputChange}
//                 className={`mt-1 block w-full border ${errors.teacher_id ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
//               >
//                 <option value="">Sélectionner un formateur</option>
//                 {teachers.map((teacher) => (
//                   <option key={teacher.id} value={teacher.id}>
//                     {teacher.name} {teacher.surname}
//                   </option>
//                 ))}
//               </select>
//               {errors.teacher_id && <p className="text-red-500 text-sm">{errors.teacher_id}</p>}
//             </div>
//           </div>
//         );
//       case 1:
//         return (
//           <div>
//             {formData.modules.map((module, mIndex) => (
//               <motion.div
//                 key={mIndex}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="mb-6 p-4 border rounded-md"
//               >
//                 <h3 className="text-lg font-semibold">Module {mIndex + 1}</h3>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Titre</label>
//                   <input
//                     type="text"
//                     value={module.title}
//                     onChange={(e) => handleInputChange(e, ['modules', mIndex, 'title'])}
//                     className={`mt-1 block w-full border ${errors[`modules.${mIndex}.title`] ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
//                   />
//                   {errors[`modules.${mIndex}.title`] && <p className="text-red-500 text-sm">{errors[`modules.${mIndex}.title`]}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Description</label>
//                   <textarea
//                     value={module.description}
//                     onChange={(e) => handleInputChange(e, ['modules', mIndex, 'description'])}
//                     className={`mt-1 block w-full border ${errors[`modules.${mIndex}.description`] ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
//                   />
//                   {errors[`modules.${mIndex}.description`] && <p className="text-red-500 text-sm">{errors[`modules.${mIndex}.description`]}</p>}
//                 </div>
//                 <div className="ml-4">
//                   <h4 className="text-md font-medium">Leçons</h4>
//                   {module.lessons.map((lesson, lIndex) => (
//                     <div key={lIndex} className="p-2 border-l-2 ml-2">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">Titre Leçon</label>
//                         <input
//                           type="text"
//                           value={lesson.title}
//                           onChange={(e) => handleInputChange(e, ['modules', mIndex, 'lessons', lIndex, 'title'])}
//                           className={`mt-1 block w-full border ${errors[`modules.${mIndex}.lessons.${lIndex}.title`] ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
//                         />
//                         {errors[`modules.${mIndex}.lessons.${lIndex}.title`] && <p className="text-red-500 text-sm">{errors[`modules.${mIndex}.lessons.${lIndex}.title`]}</p>}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">Contenu</label>
//                         <input
//                           type="file"
//                           onChange={(e) => handleInputChange(e, ['modules', mIndex, 'lessons', lIndex, 'contents'])}
//                           className="mt-1 block w-full"
//                         />
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => handleArrayRemove(['modules', mIndex, 'lessons'], lIndex)}
//                         className="text-red-500 mt-2"
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => handleArrayAdd(['modules', mIndex, 'lessons'], { title: '', contents: null})}
//                     className="mt-2 text-blue-500 flex items-center"
//                   >
//                     <FaPlus className="mr-1" /> Ajouter Leçon
//                   </button>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => handleArrayRemove(['modules'], mIndex)}
//                   className="text-red-500 mt-2"
//                 >
//                   <FaTrash /> Supprimer Module
//                 </button>
//               </motion.div>
//             ))}
//             <button
//               type="button"
//               onClick={() => handleArrayAdd(['modules'], { title: '', description: '', lessons: [{ title: '', contents: null }] })}
//               className="text-blue-500 flex items-center"
//             >
//               <FaPlus className="mr-1" /> Ajouter Module
//             </button>
//           </div>
//         );
//       case 2:
//         return (
//           <div>
//             {formData.equipments.map((equipment, eIndex) => (
//               <motion.div
//                 key={eIndex}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="mb-6 p-4 border rounded-md"
//               >
//                 <h3 className="text-lg font-semibold">Équipement {eIndex + 1}</h3>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Nom</label>
//                   <input
//                     type="text"
//                     value={equipment.name}
//                     onChange={(e) => handleInputChange(e, ['equipments', eIndex, 'name'])}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Prix</label>
//                   <input
//                     type="number"
//                     value={equipment.price}
//                     onChange={(e) => handleInputChange(e, ['equipments', eIndex, 'price'])}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                     min="0"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Statut</label>
//                   <input
//                     type="checkbox"
//                     checked={equipment.status}
//                     onChange={(e) => handleInputChange({ target: { name: 'status', value: e.target.checked } }, ['equipments', eIndex, 'status'])}
//                     className="mt-1"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Description</label>
//                   <textarea
//                     value={equipment.description}
//                     onChange={(e) => handleInputChange(e, ['equipments', eIndex, 'description'])}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Détails</label>
//                   <textarea
//                     value={equipment.details}
//                     onChange={(e) => handleInputChange(e, ['equipments', eIndex, 'details'])}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Image</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleInputChange(e, ['equipments', eIndex, 'picture'])}
//                     className="mt-1 block w-full"
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => handleArrayRemove(['equipments'], eIndex)}
//                   className="text-red-500 mt-2"
//                 >
//                   <FaTrash /> Supprimer Équipement
//                 </button>
//               </motion.div>
//             ))}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Equipement existant</label>
//               <select
//                 name="equipment_id"
                
//                 onChange={handleInputChange}
//                 className={`mt-1 block w-full border ${errors.equipment_id ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
//               >
//                 <option value="">Sélectionner un équipment existant </option>
//                 {equipments.map((equipment) => (
//                   <option key={equipment.id} value={equipment.id}>
//                     {equipment.name}
//                   </option>
//                 ))}
//               </select>
//               {errors.equipment_id && <p className="text-red-500 text-sm">{errors.equipment_id}</p>}
//             </div>
//             <button
//               type="button"
//               onClick={() => handleArrayAdd(['equipments'], { id: null, name: '', price: 0, status: false, description: '', details: '', picture: null })}
//               className="text-blue-500 flex items-center"
//             >
//               <FaPlus className="mr-1" /> Ajouter un nouveau Équipement
//             </button>
//           </div>
//         );
//       case 3:
//         return (
//           <div>
//             {formData.quizzes.map((quiz, qIndex) => (
//               <motion.div
//                 key={qIndex}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="mb-6 p-4 border rounded-md"
//               >
//                 <h3 className="text-lg font-semibold">Quiz {qIndex + 1}</h3>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Titre</label>
//                   <input
//                     type="text"
//                     value={quiz.title}
//                     onChange={(e) => handleInputChange(e, ['quizzes', qIndex, 'title'])}
//                     className={`mt-1 block w-full border ${errors[`quizzes.${qIndex}.title`] ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
//                   />
//                   {errors[`quizzes.${qIndex}.title`] && <p className="text-red-500 text-sm">{errors[`quizzes.${qIndex}.title`]}</p>}
//                 </div>
//                 <div className="ml-4">
//                   <h4 className="text-md font-medium">Questions</h4>
//                   {quiz.questions.map((question, quIndex) => (
//                     <div key={quIndex} className="p-2 border-l-2 ml-2">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">Titre Question</label>
//                         <input
//                           type="text"
//                           value={question.title}
//                           onChange={(e) => handleInputChange(e, ['quizzes', qIndex, 'questions', quIndex, 'title'])}
//                           className={`mt-1 block w-full border ${errors[`quizzes.${qIndex}.questions.${quIndex}.title`] ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
//                         />
//                         {errors[`quizzes.${qIndex}.questions.${quIndex}.title`] && <p className="text-red-500 text-sm">{errors[`quizzes.${qIndex}.questions.${quIndex}.title`]}</p>}
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">Points</label>
//                         <input
//                           type="number"
//                           value={question.point}
//                           onChange={(e) => handleInputChange(e, ['quizzes', qIndex, 'questions', quIndex, 'point'])}
//                           className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                           min="1"
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <h5 className="text-sm font-medium">Options</h5>
//                         {question.options.map((option, oIndex) => (
//                           <div key={oIndex} className="p-2 border-l-2 ml-2">
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700">Titre Option</label>
//                               <input
//                                 type="text"
//                                 value={option.title}
//                                 onChange={(e) => handleInputChange(e, ['quizzes', qIndex, 'questions', quIndex, 'options', oIndex, 'title'])}
//                                 className={`mt-1 block w-full border ${errors[`quizzes.${qIndex}.questions.${quIndex}.options.${oIndex}.title`] ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
//                               />
//                               {errors[`quizzes.${qIndex}.questions.${quIndex}.options.${oIndex}.title`] && <p className="text-red-500 text-sm">{errors[`quizzes.${qIndex}.questions.${quIndex}.options.${oIndex}.title`]}</p>}
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700">Réponse Correcte</label>
//                               <input
//                                 type="checkbox"
//                                 checked={option.answer}
//                                 onChange={(e) => handleInputChange({ target: { name: 'answer', value: e.target.checked } }, ['quizzes', qIndex, 'questions', quIndex, 'options', oIndex, 'answer'])}
//                                 className="mt-1"
//                               />
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => handleArrayRemove(['quizzes', qIndex, 'questions', quIndex, 'options'], oIndex)}
//                               className="text-red-500 mt-2"
//                             >
//                               <FaTrash />
//                             </button>
//                           </div>
//                         ))}
//                         <button
//                           type="button"
//                           onClick={() => handleArrayAdd(['quizzes', qIndex, 'questions', quIndex, 'options'], { title: '', answer: false })}
//                           className="text-blue-500 flex items-center mt-2"
//                         >
//                           <FaPlus className="mr-1" /> Ajouter Option
//                         </button>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => handleArrayRemove(['quizzes', qIndex, 'questions'], quIndex)}
//                         className="text-red-500 mt-2"
//                       >
//                         <FaTrash /> Supprimer Question
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => handleArrayAdd(['quizzes', qIndex, 'questions'], { title: '', point: 1, options: [{ title: '', answer: false }] })}
//                     className="text-blue-500 flex items-center mt-2"
//                   >
//                     <FaPlus className="mr-1" /> Ajouter Question
//                   </button>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => handleArrayRemove(['quizzes'], qIndex)}
//                   className="text-red-500 mt-2"
//                 >
//                   <FaTrash /> Supprimer Quiz
//                 </button>
//               </motion.div>
//             ))}
//             <button
//               type="button"
//               onClick={() => handleArrayAdd(['quizzes'], { title: '', questions: [{ title: '', point: 1, options: [{ title: '', answer: false }] }] })}
//               className="text-blue-500 flex items-center"
//             >
//               <FaPlus className="mr-1" /> Ajouter Quiz
//             </button>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="max-w-4xl mx-auto p-4"
//     >
//       <ToastContainer />
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           {steps.map((label, index) => (
//             <div key={label} className="flex-1 text-center">
//               <div
//                 className={`inline-block px-4 py-2 rounded-full ${index <= activeStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//               >
//                 {index + 1}
//               </div>
//               <p className="mt-2 text-sm font-medium">{label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <AnimatePresence>
//           <motion.div
//             key={activeStep}
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -50 }}
//             transition={{ duration: 0.3 }}
//           >
//             {renderStepContent(activeStep)}
//           </motion.div>
//         </AnimatePresence>
//         <div className="flex justify-between mt-6">
//           <button
//             type="button"
//             onClick={handleBack}
//             disabled={activeStep === 0}
//             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
//           >
//             Retour
//           </button>
//           {activeStep === steps.length - 1 ? (
//             <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
//               Créer Formation
//             </button>
//           ) : (
//             <button
//               type="button"
//               onClick={handleNext}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md"
//             >
//               Suivant
//             </button>
//           )}
//         </div>
//       </form>
//     </motion.div>
//   );
// };

// export default FormationCreatePage;














































"use client";

import React, { useState, useEffect } from "react";
import axios from "/src/lib/axios"; // ton axios configuré
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus, FaTrash } from "react-icons/fa";

const steps = ["Détails de la Formation", "Modules et Leçons", "Équipements", "Quizzes"];

const FormationCreatePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    prerequisites: "",
    price: 0,
    formation_details: "",
    picture: null,
    teacher_id: "",
    modules: [{ title: "", description: "", lessons: [{ title: "", contents: null }] }],
    equipment_ids: [], // pour associer des équipements existants
    equipments: [], // pour en créer de nouveaux
    quizzes: [
      {
        title: "",
        questions: [{ title: "", point: 1, options: [{ title: "", answer: false }] }],
      },
    ],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("/api/teachers");
        console.log(res.data.data.data);
        setTeachers(res.data.data.data); // Laravel retourne {data: [...]}
      } catch {
        toast.error("Erreur lors du chargement des formateurs");
      }
    };
    const fetchEquipments = async () => {
      try {
        const res = await axios.get("/api/equipments");
        setEquipments(res.data.data);
      } catch {
        toast.error("Erreur lors du chargement des équipements");
      }
    };
    fetchTeachers();
    fetchEquipments();
  }, []);

  const handleInputChange = (e, path = []) => {
    const { name, value, type, files, checked } = e.target;
    setFormData((prev) => {
      if (path.length === 0) {
        return { ...prev, [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value };
      }
      const updated = structuredClone(prev);
      let current = updated;
      for (let i = 0; i < path.length - 1; i++) current = current[path[i]];
      current[path[path.length - 1]] =
        type === "file" ? files[0] : type === "checkbox" ? checked : value;
      return updated;
    });
  };

  const handleArrayAdd = (path, defaultItem) => {
    setFormData((prev) => {
      const updated = structuredClone(prev);
      let current = updated;
      for (let i = 0; i < path.length - 1; i++) current = current[path[i]];
      current[path[path.length - 1]].push(defaultItem);
      return updated;
    });
  };

  const handleArrayRemove = (path, index) => {
    setFormData((prev) => {
      const updated = structuredClone(prev);
      let current = updated;
      for (let i = 0; i < path.length - 1; i++) current = current[path[i]];
      current[path[path.length - 1]].splice(index, 1);
      return updated;
    });
  };

  const validateStep = () => {
    const newErrors = {};
    if (activeStep === 0) {
      if (!formData.name) newErrors.name = "Requis";
      if (!formData.prerequisites) newErrors.prerequisites = "Requis";
      if (!formData.price || formData.price < 0) newErrors.price = "Requis et >= 0";
      if (!formData.formation_details) newErrors.formation_details = "Requis";
      if (!formData.teacher_id) newErrors.teacher_id = "Requis";
    } else if (activeStep === 1) {
      formData.modules.forEach((module, mIndex) => {
        if (!module.title) newErrors[`modules.${mIndex}.title`] = "Requis";
        if (!module.description) newErrors[`modules.${mIndex}.description`] = "Requis";
        module.lessons.forEach((lesson, lIndex) => {
          if (!lesson.title) newErrors[`modules.${mIndex}.lessons.${lIndex}.title`] = "Requis";
        });
      });
    } else if (activeStep === 3) {
      formData.quizzes.forEach((quiz, qIndex) => {
        if (!quiz.title) newErrors[`quizzes.${qIndex}.title`] = "Requis";
        quiz.questions.forEach((q, quIndex) => {
          if (!q.title) newErrors[`quizzes.${qIndex}.questions.${quIndex}.title`] = "Requis";
          q.options.forEach((opt, oIndex) => {
            if (!opt.title)
              newErrors[`quizzes.${qIndex}.questions.${quIndex}.options.${oIndex}.title`] = "Requis";
          });
        });
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setActiveStep((prev) => prev + 1);
    else toast.error("Veuillez remplir tous les champs requis");
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("➡️ Submit déclenché");
    if (!validateStep()) {
      toast.error("Veuillez remplir tous les champs requis");
      return;
    }
    console.log("➡️ Submit déclenché");
    const formDataToSend = new FormData();
    console.log("➡️ Submit déclenché");
    console.log(formDataToSend);
    // Champs simples
    formDataToSend.append("name", formData.name);
    formDataToSend.append("prerequisites", formData.prerequisites);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("formation_details", formData.formation_details);
    formDataToSend.append("teacher_id", formData.teacher_id);
    console.log(formDataToSend);
    if (formData.picture) formDataToSend.append("picture", formData.picture);
    console.log(formDataToSend);

    // Equipements existants
    formData.equipment_ids.forEach((id, i) =>
      formDataToSend.append(`equipment_ids[${i}]`, id)
    );
    console.log(formDataToSend);

    // Nouveaux équipements
    formData.equipments.forEach((eq, i) => {
      formDataToSend.append(`equipments[${i}][name]`, eq.name);
      formDataToSend.append(`equipments[${i}][price]`, eq.price);
      formDataToSend.append(`equipments[${i}][status]`, eq.status ? 1 : 0);
      formDataToSend.append(`equipments[${i}][description]`, eq.description || "");
      formDataToSend.append(`equipments[${i}][details]`, eq.details || "");
      if (eq.picture) formDataToSend.append(`equipments[${i}][picture]`, eq.picture);
    });
    console.log(formDataToSend);

    // Modules & leçons
    formData.modules.forEach((mod, mi) => {
      formDataToSend.append(`modules[${mi}][title]`, mod.title);
      formDataToSend.append(`modules[${mi}][description]`, mod.description);
      mod.lessons.forEach((les, li) => {
        formDataToSend.append(`modules[${mi}][lessons][${li}][title]`, les.title);
        if (les.contents)
          formDataToSend.append(`modules[${mi}][lessons][${li}][contents]`, les.contents);
      });
    });
    console.log(formDataToSend);

    // Quizzes
    formData.quizzes.forEach((quiz, qi) => {
      formDataToSend.append(`quizzes[${qi}][title]`, quiz.title);
      quiz.questions.forEach((q, qj) => {
        formDataToSend.append(`quizzes[${qi}][questions][${qj}][title]`, q.title);
        formDataToSend.append(`quizzes[${qi}][questions][${qj}][point]`, q.point);
        q.options.forEach((opt, ok) => {
          formDataToSend.append(`quizzes[${qi}][questions][${qj}][options][${ok}][title]`, opt.title);
          formDataToSend.append(
            `quizzes[${qi}][questions][${qj}][options][${ok}][answer]`,
            opt.answer ? 1 : 0
          );
        });
      });
    });
    console.log(formDataToSend);
    console.log(formData);

    try {
      await axios.post("/api/formations", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Formation créée avec succès");

      // Reset state
      setFormData({
        name: "",
        prerequisites: "",
        price: 0,
        formation_details: "",
        picture: null,
        teacher_id: "",
        modules: [{ title: "", description: "", lessons: [{ title: "", contents: null }] }],
        equipment_ids: [],
        equipments: [],
        quizzes: [
          {
            title: "",
            questions: [{ title: "", point: 1, options: [{ title: "", answer: false }] }],
          },
        ],
      });
      setActiveStep(0);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Erreur de validation");
      } else {
        toast.error("Erreur lors de la création de la formation");
      }
    }
  };

  // --- renderStepContent reste inchangé sauf équipements existants (checkbox multiple au lieu de select unique) ---
  const renderStepContent = (step) => {
    switch (step) {
      // === Étape 1 : Détails de la formation ===
      case 0:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Détails de la Formation</h2>
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}

            <input
              type="text"
              name="prerequisites"
              placeholder="Prérequis"
              value={formData.prerequisites}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            {errors.prerequisites && <p className="text-red-500">{errors.prerequisites}</p>}

            <input
              type="number"
              name="price"
              placeholder="Prix"
              value={formData.price}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}

            <textarea
              name="formation_details"
              placeholder="Détails"
              value={formData.formation_details}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />
            {errors.formation_details && <p className="text-red-500">{errors.formation_details}</p>}

            <input
              type="file"
              name="picture"
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            />

            <select
              name="teacher_id"
              value={formData.teacher_id}
              onChange={handleInputChange}
              className="border p-2 w-full mb-2"
            >
              <option value="">Sélectionner un formateur</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            {errors.teacher_id && <p className="text-red-500">{errors.teacher_id}</p>}
          </div>
        );

      // === Étape 2 : Modules & Leçons ===
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Modules & Leçons</h2>
            {formData.modules.map((mod, mi) => (
              <div key={mi} className="border p-4 mb-4">
                <input
                  type="text"
                  placeholder="Titre du module"
                  value={mod.title}
                  onChange={(e) => handleInputChange(e, ["modules", mi, "title"])}
                  className="border p-2 w-full mb-2"
                />
                {errors[`modules.${mi}.title`] && (
                  <p className="text-red-500">{errors[`modules.${mi}.title`]}</p>
                )}

                <textarea
                  placeholder="Description du module"
                  value={mod.description}
                  onChange={(e) => handleInputChange(e, ["modules", mi, "description"])}
                  className="border p-2 w-full mb-2"
                />
                {errors[`modules.${mi}.description`] && (
                  <p className="text-red-500">{errors[`modules.${mi}.description`]}</p>
                )}

                <h3 className="font-semibold">Leçons</h3>
                {mod.lessons.map((lesson, li) => (
                  <div key={li} className="pl-4 border-l mb-2">
                    <input
                      type="text"
                      placeholder="Titre de la leçon"
                      value={lesson.title}
                      onChange={(e) => handleInputChange(e, ["modules", mi, "lessons", li, "title"])}
                      className="border p-2 w-full mb-2"
                    />
                    {errors[`modules.${mi}.lessons.${li}.title`] && (
                      <p className="text-red-500">{errors[`modules.${mi}.lessons.${li}.title`]}</p>
                    )}

                    <input
                      type="file"
                      onChange={(e) =>
                        handleInputChange(e, ["modules", mi, "lessons", li, "contents"])
                      }
                      className="border p-2 w-full mb-2"
                    />

                    <button
                      type="button"
                      onClick={() => handleArrayRemove(["modules", mi, "lessons"], li)}
                      className="text-red-500"
                    >
                      <FaTrash /> Supprimer leçon
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    handleArrayAdd(["modules", mi, "lessons"], { title: "", contents: null })
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  <FaPlus /> Ajouter leçon
                </button>

                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => handleArrayRemove(["modules"], mi)}
                    className="text-red-500"
                  >
                    <FaTrash /> Supprimer module
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                handleArrayAdd(["modules"], { title: "", description: "", lessons: [] })
              }
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              <FaPlus /> Ajouter module
            </button>
          </div>
        );

      // === Étape 3 : Équipements ===
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Équipements</h2>

            <h3 className="font-semibold">Associer des équipements existants</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {equipments.map((eq) => (
                <label key={eq.id} className="flex items-center space-x-2 border p-2 rounded">
                  <input
                    type="checkbox"
                    value={eq.id}
                    checked={formData.equipment_ids.includes(eq.id)}
                    onChange={(e) => {
                      setFormData((prev) => {
                        let updatedIds = [...prev.equipment_ids];
                        if (e.target.checked) updatedIds.push(eq.id);
                        else updatedIds = updatedIds.filter((id) => id !== eq.id);
                        return { ...prev, equipment_ids: updatedIds };
                      });
                    }}
                  />
                  <span>{eq.name}</span>
                </label>
              ))}
            </div>

            <h3 className="font-semibold">Créer de nouveaux équipements</h3>
            {formData.equipments.map((eq, ei) => (
              <div key={ei} className="border p-3 mb-3 rounded">
                <input
                  type="text"
                  placeholder="Nom"
                  value={eq.name}
                  onChange={(e) => handleInputChange(e, ["equipments", ei, "name"])}
                  className="border p-2 w-full mb-2"
                />
                <input
                  type="number"
                  placeholder="Prix"
                  value={eq.price}
                  onChange={(e) => handleInputChange(e, ["equipments", ei, "price"])}
                  className="border p-2 w-full mb-2"
                />
                <textarea
                  placeholder="Description"
                  value={eq.description}
                  onChange={(e) => handleInputChange(e, ["equipments", ei, "description"])}
                  className="border p-2 w-full mb-2"
                />
                <textarea
                  placeholder="Détails"
                  value={eq.details}
                  onChange={(e) => handleInputChange(e, ["equipments", ei, "details"])}
                  className="border p-2 w-full mb-2"
                />

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={eq.status}
                    onChange={(e) =>
                      handleInputChange(e, ["equipments", ei, "status"])
                    }
                  />
                  <span>Disponible</span>
                </label>

                <input
                  type="file"
                  onChange={(e) => handleInputChange(e, ["equipments", ei, "picture"])}
                  className="border p-2 w-full mb-2"
                />

                <button
                  type="button"
                  onClick={() => handleArrayRemove(["equipments"], ei)}
                  className="text-red-500"
                >
                  <FaTrash /> Supprimer équipement
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                handleArrayAdd(["equipments"], {
                  name: "",
                  price: 0,
                  description: "",
                  details: "",
                  status: false,
                  picture: null,
                })
              }
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              <FaPlus /> Ajouter équipement
            </button>
          </div>
        );

      // === Étape 4 : Quizzes ===
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Quizzes</h2>
            {formData.quizzes.map((quiz, qi) => (
              <div key={qi} className="border p-4 mb-4 rounded">
                <input
                  type="text"
                  placeholder="Titre du quiz"
                  value={quiz.title}
                  onChange={(e) => handleInputChange(e, ["quizzes", qi, "title"])}
                  className="border p-2 w-full mb-2"
                />
                {errors[`quizzes.${qi}.title`] && (
                  <p className="text-red-500">{errors[`quizzes.${qi}.title`]}</p>
                )}

                {quiz.questions.map((q, qj) => (
                  <div key={qj} className="pl-4 border-l mb-2">
                    <input
                      type="text"
                      placeholder="Question"
                      value={q.title}
                      onChange={(e) => handleInputChange(e, ["quizzes", qi, "questions", qj, "title"])}
                      className="border p-2 w-full mb-2"
                    />
                    <input
                      type="number"
                      placeholder="Points"
                      value={q.point}
                      onChange={(e) => handleInputChange(e, ["quizzes", qi, "questions", qj, "point"])}
                      className="border p-2 w-full mb-2"
                    />

                    <h4 className="font-semibold">Options</h4>
                    {q.options.map((opt, oi) => (
                      <div key={oi} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          placeholder="Option"
                          value={opt.title}
                          onChange={(e) =>
                            handleInputChange(e, [
                              "quizzes",
                              qi,
                              "questions",
                              qj,
                              "options",
                              oi,
                              "title",
                            ])
                          }
                          className="border p-2 w-full"
                        />
                        <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            checked={opt.answer}
                            onChange={(e) =>
                              handleInputChange(e, [
                                "quizzes",
                                qi,
                                "questions",
                                qj,
                                "options",
                                oi,
                                "answer",
                              ])
                            }
                          />
                          <span>Bonne réponse</span>
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            handleArrayRemove(["quizzes", qi, "questions", qj, "options"], oi)
                          }
                          className="text-red-500"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        handleArrayAdd(["quizzes", qi, "questions", qj, "options"], {
                          title: "",
                          answer: false,
                        })
                      }
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      <FaPlus /> Ajouter option
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    handleArrayAdd(["quizzes", qi, "questions"], {
                      title: "",
                      point: 1,
                      options: [{ title: "", answer: false }],
                    })
                  }
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  <FaPlus /> Ajouter question
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                handleArrayAdd(["quizzes"], {
                  title: "",
                  questions: [{ title: "", point: 1, options: [{ title: "", answer: false }] }],
                })
              }
              className="bg-purple-500 text-white px-3 py-1 rounded"
            >
              <FaPlus /> Ajouter quiz
            </button>
          </div>
        );

      default:
        return null;
    }
  };


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto p-4">
      <ToastContainer />
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((label, index) => (
            <div key={label} className="flex-1 text-center">
              <button
                type="button"
                disabled={index > activeStep} // ❌ empêche d’aller à une étape non atteinte
                onClick={() => setActiveStep(index)}
                className={`inline-block px-4 py-2 rounded-full transition ${
                  index === activeStep
                    ? "bg-blue-600 text-white"
                    : index < activeStep
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-200 text-gray-700 cursor-not-allowed"
                }`}
              >
                {index + 1}
              </button>
              <p className="mt-2 text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- steps UI --- */}
      <form onSubmit={(e) => handleSubmit(e)}>
         <AnimatePresence>
           <motion.div
             key={activeStep}
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -50 }}
             transition={{ duration: 0.3 }}
           >
             {renderStepContent(activeStep)}
           </motion.div>
         </AnimatePresence>
         <div className="flex justify-between mt-6">
           <button
             type="button"
             onClick={handleBack}
             disabled={activeStep === 0}
             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
           >
             Retour
           </button>
           {activeStep === steps.length - 1 ? (
             <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
               Créer Formation
             </button>
           ) : (
             <button
               type="button"
               onClick={handleNext}
               className="px-4 py-2 bg-blue-500 text-white rounded-md"
             >
               Suivant
             </button>
           )}
         </div>
      </form>
    </motion.div>
  );
};

export default FormationCreatePage;
