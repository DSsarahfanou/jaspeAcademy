'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaEdit, FaTrash, FaTimes, FaCheck } from 'react-icons/fa';

export default function EquipmentDetailsClient({ params }) {

    const [equipment, setEquipment] = useState(null);  
    useEffect(() => {
      axios.get(`http://localhost:8000/api/equipments/${params.id}`)
        .then((res) => {
          setEquipment(res.data);
        })
        .catch(() => {
          setError(true);
        });
    }, [params.id]);
  const [modal, setModal] = useState(null); // 'edit', 'delete', or null
  const [formData, setFormData] = useState({
    name: equipment?.name || '',
    status: equipment?.status ?? true,
    description: equipment?.description || '',
    details: equipment?.details || '',
    quantity: equipment?.quantity || 1,
    price: equipment?.price || 0,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();

  // If equipment is null or invalid, don't render the component
  if (!equipment || !equipment.id) {
    return "c'est null"; // Server-side error handling in EquipmentPage will take over
  }

  const openEditModal = () => {
    setModal('edit');
    setError(null);
    setSuccessMessage(null);
  };

  const openDeleteModal = () => {
    setModal('delete');
    setError(null);
    setSuccessMessage(null);
  };

  const closeModal = () => {
    setModal(null);
    setError(null);
    setSuccessMessage(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      const updatedEquipment = await axios.put(`${baseUrl}/api/equipments/${equipment.id}`, formData);
      setSuccessMessage('Équipement mis à jour avec succès');
      setTimeout(() => {
        closeModal();
        router.refresh(); // Refresh to update server-rendered data
      }, 1500);
    } catch (err) {
      setError(`Erreur lors de la mise à jour : ${err.response?.status || err.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      await axios.delete(`${baseUrl}/api/equipments/${equipment.id}`);
      setSuccessMessage('Équipement supprimé avec succès');
      setTimeout(() => {
        router.push('/dashboard/admin/equipments');
      }, 1500);
    } catch (err) {
      setError(`Erreur lors de la suppression : ${err.response?.status || err.message}`);
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{equipment.name}</h2>
          <div className="flex space-x-2">
            <button
              onClick={openEditModal}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
              aria-label={`Modifier ${equipment.name}`}
            >
              <FaEdit />
            </button>
            <button
              onClick={openDeleteModal}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
              aria-label={`Supprimer ${equipment.name}`}
            >
              <FaTrash />
            </button>
          </div>
        </div>
        <p className="text-gray-600">{equipment.status ? 'Disponible' : 'Indisponible'}</p>
        <p className="mt-2 text-gray-700">{equipment.description || 'Aucune description'}</p>
        <p className="mt-1 text-sm text-gray-500">{equipment.details || 'Aucun détail'}</p>
        <p className="mt-2 font-semibold">Quantité: {equipment.quantity}</p>
        <p className="mt-1 font-semibold">Prix: {equipment.price} FCFA</p>
        
      </div>

      {/* Edit Modal */}
      {modal === 'edit' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Modifier l’équipement</h2>
              <button onClick={closeModal} className="p-2 text-gray-500 hover:text-gray-700" aria-label="Fermer">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Statut</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      checked={formData.status}
                      onChange={() => setFormData({ ...formData, status: true })}
                      className="mr-2"
                    />
                    Disponible
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      checked={!formData.status}
                      onChange={() => setFormData({ ...formData, status: false })}
                      className="mr-2"
                    />
                    Indisponible
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                  Détails
                </label>
                <input
                  type="text"
                  id="details"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantité
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Prix (FCFA)
                </label>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              {error && <p className="text-red-600 mb-4">{error}</p>}
              {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {modal === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Confirmer la suppression</h2>
              <button onClick={closeModal} className="p-2 text-gray-500 hover:text-gray-700" aria-label="Fermer">
                <FaTimes />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Êtes-vous sûr de vouloir supprimer cet équipement ?
            </p>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}