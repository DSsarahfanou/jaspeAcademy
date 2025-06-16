"use client"
import { useState, useEffect } from 'react';
import axios from '/src/lib/axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateFormation() {
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [existingEquipments, setExistingEquipments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Données de la formation
    const [formation, setFormation] = useState({
        name: '',
        prerequisites: '',
        price: '',
        formation_details: '',
        picture: null,
        categorie: '',
        modules: [],
        equipments: []
    });

    // Module par défaut
    const defaultModule = {
        title: '',
        description: '',
        lessons: [{
            title: '',
            content_file: null,
            video_file: null
        }]
    };

    // Équipement par défaut
    const defaultEquipment = {
        id: null,
        name: '',
        quantity: '',
        price: '',
        status: true,
        description: '',
        details: '',
        picture: null,
        isNew: true
    };

    // Charger les équipements existants
    useEffect(() => {
        const fetchEquipments = async () => {
            try {
                const response = await axios.get('/api/equipments');
                setExistingEquipments(response.data.data || []);
            } catch (error) {
                console.error('Error fetching equipments:', error);
                toast.error('Erreur lors du chargement des équipements');
            }
        };
        fetchEquipments();
    }, []);

   
    // Gestion des changements de la formation
    const handleFormationChange = (e) => {
        const { name, value } = e.target;
        setFormation(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Gestion de l'upload de l'image de la formation
    const handleFormationImageUpload = (e) => {
        setFormation(prev => ({
            ...prev,
            picture: e.target.files[0]
        }));
    };

    // Gestion des changements des modules
    const handleModuleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedModules = [...formation.modules];
        updatedModules[index][name] = value;
        setFormation(prev => ({
            ...prev,
            modules: updatedModules
        }));
    };

    // Gestion des changements des leçons
    const handleLessonChange = (moduleIndex, lessonIndex, e) => {
        const { name, value } = e.target;
        const updatedModules = [...formation.modules];
        updatedModules[moduleIndex].lessons[lessonIndex][name] = value;
        setFormation(prev => ({
            ...prev,
            modules: updatedModules
        }));
    };

    // Gestion de l'upload de fichier PDF pour une leçon
    const handleLessonPdfUpload = (moduleIndex, lessonIndex, e) => {
        const updatedModules = [...formation.modules];
        updatedModules[moduleIndex].lessons[lessonIndex].content_file = e.target.files[0];
        updatedModules[moduleIndex].lessons[lessonIndex].video_file = null;
        setFormation(prev => ({
            ...prev,
            modules: updatedModules
        }));
    };

    // Gestion de l'upload de fichier vidéo pour une leçon
    const handleLessonVideoUpload = (moduleIndex, lessonIndex, e) => {
        const updatedModules = [...formation.modules];
        updatedModules[moduleIndex].lessons[lessonIndex].video_file = e.target.files[0];
        updatedModules[moduleIndex].lessons[lessonIndex].content_file = null;
        setFormation(prev => ({
            ...prev,
            modules: updatedModules
        }));
    };

    // Gestion des changements des équipements
    const handleEquipmentChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const updatedEquipments = [...formation.equipments];
        updatedEquipments[index][name] = type === 'checkbox' ? checked : value;
        setFormation(prev => ({
            ...prev,
            equipments: updatedEquipments
        }));
    };

    // Gestion de l'upload de l'image d'un équipement
    const handleEquipmentImageUpload = (index, e) => {
        const updatedEquipments = [...formation.equipments];
        updatedEquipments[index].picture = e.target.files[0];
        setFormation(prev => ({
            ...prev,
            equipments: updatedEquipments
        }));
    };

    // Ajouter un module
    const addModule = () => {
        setFormation(prev => ({
            ...prev,
            modules: [...prev.modules, { ...defaultModule }]
        }));
    };

    // Supprimer un module
    const removeModule = (index) => {
        const updatedModules = formation.modules.filter((_, i) => i !== index);
        setFormation(prev => ({
            ...prev,
            modules: updatedModules
        }));
    };

    // Ajouter une leçon
    const addLesson = (moduleIndex) => {
        const updatedModules = [...formation.modules];
        updatedModules[moduleIndex].lessons.push({
            title: '',
            content_file: null,
            video_file: null
        });
        setFormation(prev => ({
            ...prev,
            modules: updatedModules
        }));
    };

    // Supprimer une leçon
    const removeLesson = (moduleIndex, lessonIndex) => {
        const updatedModules = [...formation.modules];
        updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons.filter((_, i) => i !== lessonIndex);
        setFormation(prev => ({
            ...prev,
            modules: updatedModules
        }));
    };

    // Ajouter un équipement
    const addEquipment = () => {
        setFormation(prev => ({
            ...prev,
            equipments: [...prev.equipments, { ...defaultEquipment }]
        }));
    };

    // Sélectionner un équipement existant
    const selectExistingEquipment = (equipment) => {
        setFormation(prev => ({
            ...prev,
            equipments: [...prev.equipments, {
                id: equipment.id,
                name: equipment.name,
                quantity: 1,
                price: equipment.price,
                status: equipment.status,
                description: equipment.description,
                details: equipment.details,
                picture: equipment.picture,
                isNew: false
            }]
        }));
        setSearchTerm('');
    };

    // Supprimer un équipement
    const removeEquipment = (index) => {
        const updatedEquipments = formation.equipments.filter((_, i) => i !== index);
        setFormation(prev => ({
            ...prev,
            equipments: updatedEquipments
        }));
    };

    // Filtrer les équipements existants
    const filteredEquipments = existingEquipments.filter(equipment =>
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !formation.equipments.some(eq => eq.id === equipment.id)
    );

    // Soumission du formulaire


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            // Récupérer le token CSRF
            await axios.get('http://localhost:8000/sanctum/csrf-cookie');

            // Préparer FormData
            const formData = new FormData();

            // Ajouter les champs simples
            formData.append('name', formation.name);
            formData.append('prerequisites', formation.prerequisites);
            formData.append('price', formation.price);
            formData.append('formation_details', formation.formation_details);
            formData.append('categorie', formation.categorie || '');

            // Ajouter l'image si elle existe
            if (formation.picture) {
                formData.append('picture', formation.picture);
            }

            // Ajouter les modules et leçons
            formation.modules.forEach((module, moduleIndex) => {
                formData.append(`modules[${moduleIndex}][title]`, module.title);
                formData.append(`modules[${moduleIndex}][description]`, module.description);

                module.lessons.forEach((lesson, lessonIndex) => {
                    formData.append(`modules[${moduleIndex}][lessons][${lessonIndex}][title]`, lesson.title);
                    
                    if (lesson.content_file) {
                        formData.append(`modules[${moduleIndex}][lessons][${lessonIndex}][content_file]`, lesson.content_file);
                    }
                    
                    if (lesson.video_file) {
                        formData.append(`modules[${moduleIndex}][lessons][${lessonIndex}][video_file]`, lesson.video_file);
                    }
                });
            });

            // Ajouter les équipements
            formation.equipments.forEach((equipment, index) => {
                if (equipment.id) {
                    // Équipement existant
                    formData.append(`equipments[${index}][id]`, equipment.id);
                    formData.append(`equipments[${index}][quantity]`, equipment.quantity);
                } else {
                    // Nouvel équipement
                    formData.append(`equipments[${index}][name]`, equipment.name);
                    formData.append(`equipments[${index}][quantity]`, equipment.quantity);
                    formData.append(`equipments[${index}][price]`, equipment.price);
                    formData.append(`equipments[${index}][status]`, equipment.status ? '1' : '0');
                    formData.append(`equipments[${index}][description]`, equipment.description || '');
                    formData.append(`equipments[${index}][details]`, equipment.details || '');
                    
                    if (equipment.picture) {
                        formData.append(`equipments[${index}][picture]`, equipment.picture);
                    }
                }
            });

            // Envoyer les données
            const response = await axios.post('/api/formations', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            });

            toast.success('Formation créée avec succès!');
            setTimeout(() => {
                router.push('/formations');
            }, 2000);

        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.log('Validation errors:', error.response.data.errors);
                setErrors(error.response.data.errors || {});
                toast.error('Veuillez corriger les erreurs dans le formulaire');
            } else {
                console.error('Full error:', error);
                toast.error('Une erreur est survenue: ' + (error.response?.data?.message || error.message));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Créer une nouvelle formation</h1>
              <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section Formation */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Informations de la formation</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nom</label>
                            <input
                                type="text"
                                name="name"
                                value={formation.name}
                                onChange={handleFormationChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Prix</label>
                            <input
                                type="number"
                                name="price"
                                value={formation.price}
                                onChange={handleFormationChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price[0]}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Image de la formation</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFormationImageUpload}
                                className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100"
                            />
                            {errors.picture && <p className="mt-1 text-sm text-red-600">{errors.picture[0]}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Prérequis</label>
                            <textarea
                                name="prerequisites"
                                value={formation.prerequisites}
                                onChange={handleFormationChange}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.prerequisites && <p className="mt-1 text-sm text-red-600">{errors.prerequisites[0]}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Détails de la formation</label>
                            <textarea
                                name="formation_details"
                                value={formation.formation_details}
                                onChange={handleFormationChange}
                                rows={5}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.formation_details && <p className="mt-1 text-sm text-red-600">{errors.formation_details[0]}</p>}
                        </div>
                    </div>
                </div>

                {/* Section Modules */}
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Modules</h2>
                        <button
                            type="button"
                            onClick={addModule}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Ajouter un module
                        </button>
                    </div>

                    {formation.modules.length === 0 ? (
                        <p className="text-gray-500">Aucun module ajouté</p>
                    ) : (
                        formation.modules.map((module, moduleIndex) => (
                            <div key={moduleIndex} className="mb-6 p-4 border border-gray-200 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-medium">Module {moduleIndex + 1}</h3>
                                    <button
                                        type="button"
                                        onClick={() => removeModule(moduleIndex)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Supprimer
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Titre</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={module.title}
                                            onChange={(e) => handleModuleChange(moduleIndex, e)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors[`modules.${moduleIndex}.title`] && (
                                            <p className="mt-1 text-sm text-red-600">{errors[`modules.${moduleIndex}.title`][0]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            name="description"
                                            value={module.description}
                                            onChange={(e) => handleModuleChange(moduleIndex, e)}
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors[`modules.${moduleIndex}.description`] && (
                                            <p className="mt-1 text-sm text-red-600">{errors[`modules.${moduleIndex}.description`][0]}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Leçons du module */}
                                <div className="ml-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-md font-medium">Leçons</h4>
                                        <button
                                            type="button"
                                            onClick={() => addLesson(moduleIndex)}
                                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Ajouter une leçon
                                        </button>
                                    </div>

                                    {module.lessons.map((lesson, lessonIndex) => (
                                        <div key={lessonIndex} className="mb-4 p-3 border border-gray-100 rounded-lg bg-gray-50">
                                            <div className="flex justify-between items-center mb-2">
                                                <h5 className="text-sm font-medium">Leçon {lessonIndex + 1}</h5>
                                                <button
                                                    type="button"
                                                    onClick={() => removeLesson(moduleIndex, lessonIndex)}
                                                    className="text-red-600 hover:text-red-800 text-xs"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Titre</label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        value={lesson.title}
                                                        onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, e)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    />
                                                    {errors[`modules.${moduleIndex}.lessons.${lessonIndex}.title`] && (
                                                        <p className="mt-1 text-sm text-red-600">{errors[`modules.${moduleIndex}.lessons.${lessonIndex}.title`][0]}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Fichier PDF</label>
                                                    <input
                                                        type="file"
                                                        accept=".pdf"
                                                        onChange={(e) => handleLessonPdfUpload(moduleIndex, lessonIndex, e)}
                                                        className="mt-1 block w-full text-sm text-gray-500
                                                        file:mr-4 file:py-2 file:px-4
                                                        file:rounded-md file:border-0
                                                        file:text-sm file:font-semibold
                                                        file:bg-indigo-50 file:text-indigo-700
                                                        hover:file:bg-indigo-100"
                                                    />
                                                    {lesson.content_file && (
                                                        <p className="mt-1 text-sm text-green-600">
                                                            Fichier sélectionné: {lesson.content_file.name}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Fichier Vidéo</label>
                                                    <input
                                                        type="file"
                                                        accept="video/*"
                                                        onChange={(e) => handleLessonVideoUpload(moduleIndex, lessonIndex, e)}
                                                        className="mt-1 block w-full text-sm text-gray-500
                                                        file:mr-4 file:py-2 file:px-4
                                                        file:rounded-md file:border-0
                                                        file:text-sm file:font-semibold
                                                        file:bg-indigo-50 file:text-indigo-700
                                                        hover:file:bg-indigo-100"
                                                    />
                                                    {lesson.video_file && (
                                                        <p className="mt-1 text-sm text-green-600">
                                                            Fichier sélectionné: {lesson.video_file.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Section Équipements */}
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Équipements nécessaires</h2>
                        <button
                            type="button"
                            onClick={addEquipment}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Ajouter un nouvel équipement
                        </button>
                    </div>

                    {/* Recherche d'équipements existants */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Rechercher un équipement existant</label>
                        <div className="mt-1 relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Nom de l'équipement"
                            />
                            {searchTerm && filteredEquipments.length > 0 && (
                                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1">
                                    {filteredEquipments.map(equipment => (
                                        <div
                                            key={equipment.id}
                                            className="px-4 py-2 hover:bg-indigo-50 cursor-pointer"
                                            onClick={() => selectExistingEquipment(equipment)}
                                        >
                                            {equipment.name} - {equipment.price}€
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {formation.equipments.length === 0 ? (
                        <p className="text-gray-500">Aucun équipement ajouté</p>
                    ) : (
                        formation.equipments.map((equipment, index) => (
                            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-medium">
                                        {equipment.isNew ? 'Nouvel équipement' : `Équipement existant: ${equipment.name}`}
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => removeEquipment(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Supprimer
                                    </button>
                                </div>

                                {equipment.isNew ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Nom</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={equipment.name}
                                                onChange={(e) => handleEquipmentChange(index, e)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors[`equipments.${index}.name`] && (
                                                <p className="mt-1 text-sm text-red-600">{errors[`equipments.${index}.name`][0]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Quantité</label>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={equipment.quantity}
                                                onChange={(e) => handleEquipmentChange(index, e)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors[`equipments.${index}.quantity`] && (
                                                <p className="mt-1 text-sm text-red-600">{errors[`equipments.${index}.quantity`][0]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Prix</label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={equipment.price}
                                                onChange={(e) => handleEquipmentChange(index, e)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors[`equipments.${index}.price`] && (
                                                <p className="mt-1 text-sm text-red-600">{errors[`equipments.${index}.price`][0]}</p>
                                            )}
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="status"
                                                checked={equipment.status}
                                                onChange={(e) => handleEquipmentChange(index, e)}
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label className="ml-2 block text-sm text-gray-700">Disponible</label>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Image de l'équipement</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleEquipmentImageUpload(index, e)}
                                                className="mt-1 block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-md file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-indigo-50 file:text-indigo-700
                                                hover:file:bg-indigo-100"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Description</label>
                                            <textarea
                                                name="description"
                                                value={equipment.description}
                                                onChange={(e) => handleEquipmentChange(index, e)}
                                                rows={2}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Nom</p>
                                            <p className="mt-1 text-sm text-gray-900">{equipment.name}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Quantité</label>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={equipment.quantity}
                                                onChange={(e) => handleEquipmentChange(index, e)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors[`equipments.${index}.quantity`] && (
                                                <p className="mt-1 text-sm text-red-600">{errors[`equipments.${index}.quantity`][0]}</p>
                                            )}
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Prix</p>
                                            <p className="mt-1 text-sm text-gray-900">{equipment.price}€</p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Statut</p>
                                            <p className="mt-1 text-sm text-gray-900">{equipment.status ? 'Disponible' : 'Indisponible'}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Bouton de soumission */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {isLoading ? 'Enregistrement...' : 'Créer la formation'}
                    </button>
                </div>
            </form>
        </div>
    );
}