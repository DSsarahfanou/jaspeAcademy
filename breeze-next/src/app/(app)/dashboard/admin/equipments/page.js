'use client'
import { useEquipment } from '/src/hooks/useEquipments'
import { useState } from 'react'
import { IoAdd, IoPencil, IoTrash, IoClose } from 'react-icons/io5'


async function getEquipments() {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  
    if (!baseUrl) {
      throw new Error('Base URL non définie. Vérifie ton fichier .env.local');
    }
  
    const res = await fetch(`${baseUrl}/api/equipments`, {
      cache: 'no-store',
    });
  
    if (!res.ok) {
      throw new Error(`Erreur lors de la récupération : ${res.status}`);
    }
  
    const data = await res.json();
    return data.data;
  }

export default function AdminEquipmentDashboard() {
    //const equipments = getEquipments();
    const { equipments,  error, loading, errors, status, addEquipment, deleteEquipment, updateEquipment, mutateEquipments } = useEquipment()

    
    const [showModal, setShowModal] = useState(false)
    const [editingEquipment, setEditingEquipment] = useState(null)
    const [form, setForm] = useState({
        name: '',
        quantity: 0,
        price: 0,
        status: true,
        description: '',
        details: '',
        image: null,
    })

    // Reset form
    const resetForm = () => {
        setForm({
            name: '',
            quantity: 0,
            price: 0,
            status: true,
            description: '',
            details: '',
            image: null,
        })
        setEditingEquipment(null)
        const fileInput = document.querySelector('input[type="file"]')
        if (fileInput) fileInput.value = ''
    }

    // Ouvrir modal pour ajouter
    const openAddModal = () => {
        resetForm()
        setShowModal(true)
    }

    // Ouvrir modal pour modifier
    const openEditModal = (equipment) => {
        setForm({
            name: equipment.name || '',
            quantity: equipment.quantity || 0,
            price: equipment.price || 0,
            status: equipment.status || true,
            description: equipment.description || '',
            details: equipment.details || '',
            image: null, // On ne pré-charge pas l'image existante
        })
        setEditingEquipment(equipment)
        setShowModal(true)
    }

    // Fermer modal
    const closeModal = () => {
        setShowModal(false)
        resetForm()
    }

    // Gérer les changements du formulaire
    const handleChange = e => {
        const { name, value, type, checked, files } = e.target
        const val = type === 'file' ? files[0] : type === 'checkbox' ? checked : value
        setForm({ ...form, [name]: val })
    }

    // Soumettre le formulaire
    const handleSubmit = async e => {
        e.preventDefault()
        
        if (!form.name.trim()) {
            alert('Le nom est requis')
            return
        }

        const formData = new FormData()
        for (const key in form) {
            if (form[key] !== null && form[key] !== '') {
                formData.append(key, form[key])
            }
        }

        let success = false
        if (editingEquipment) {
            // Mode modification
            success = await updateEquipment(editingEquipment.id, formData)
        } else {
            // Mode ajout
            success = await addEquipment(formData)
        }

        if (success !== false) {
            closeModal()
        }
    }

    // Supprimer équipement
    const handleDelete = async (equipment) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${equipment.name}" ?`)) {
            await deleteEquipment(equipment.id)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="p-6 mx-auto max-w-7xl">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Gestion des Équipements</h1>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                    <IoAdd className="w-5 h-5" />
                    Ajouter un équipement
                </button>
            </div>

            {/* Messages d'état */}
            {status && (
                <div className="p-4 mb-4 text-green-700 bg-green-100 border border-green-400 rounded-lg">
                    {status}
                </div>
            )}

            {errors && (
                <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">
                    {typeof errors === 'object' ? (
                        <ul className="list-disc list-inside">
                            {Object.entries(errors).map(([field, messages]) => (
                                <li key={field}>
                                    <strong>{field}:</strong> {Array.isArray(messages) ? messages.join(', ') : messages}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>{errors}</p>
                    )}
                </div>
            )}

            {/* Tableau des équipements */}
            <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Équipement
                                </th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Quantité
                                </th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Prix
                                </th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Statut
                                </th>
                                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {(equipments) ? (
                                equipments.map((equipment) => (
                                    <tr key={equipment.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {equipment.image && (
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <img
                                                            className="object-cover w-10 h-10 rounded-full"
                                                            src={`/storage/${equipment.image}`}
                                                            alt={equipment.name}
                                                            onError={(e) => {
                                                                e.target.style.display = 'none'
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                <div className={equipment.image ? "ml-4" : ""}>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {equipment.name}
                                                    </div>
                                                    {equipment.description && (
                                                        <div className="text-sm text-gray-500">
                                                            {equipment.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            {equipment.quantity}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            {equipment.price} €
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                                equipment.status 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {equipment.status ? 'Disponible' : 'Indisponible'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => openEditModal(equipment)}
                                                    className="p-1 text-blue-600 rounded hover:text-blue-900"
                                                    title="Modifier"
                                                >
                                                    <IoPencil className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(equipment)}
                                                    className="p-1 text-red-600 rounded hover:text-red-900"
                                                    title="Supprimer"
                                                >
                                                    <IoTrash className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        Aucun équipement trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal pour ajouter/modifier */}
            {showModal && (
                <div className="fixed inset-0 z-50 w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50">
                    <div className="relative w-11/12 p-5 mx-auto bg-white border rounded-md shadow-lg top-20 md:w-1/2 lg:w-1/3">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">
                                {editingEquipment ? 'Modifier l\'équipement' : 'Ajouter un équipement'}
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <IoClose className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium">Nom *</label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Nom de l'équipement"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Quantité</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={form.quantity}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium">Prix (€)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="status"
                                        checked={form.status}
                                        onChange={handleChange}
                                        className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm font-medium">Disponible</span>
                                </label>
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Description</label>
                                <input
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Description courte"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">Détails</label>
                                <textarea
                                    name="details"
                                    value={form.details}
                                    onChange={handleChange}
                                    placeholder="Détails supplémentaires"
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium">
                                    Image {editingEquipment && "(laisser vide pour garder l'image actuelle)"}
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex justify-end pt-4 space-x-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {loading 
                                        ? (editingEquipment ? 'Modification...' : 'Ajout...') 
                                        : (editingEquipment ? 'Modifier' : 'Ajouter')
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}