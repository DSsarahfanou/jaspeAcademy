'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes, FaCheck } from 'react-icons/fa';

async function getEquipments() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!baseUrl) {
    throw new Error('Base URL non définie. Vérifie ton fichier .env.local');
  }
  const res = await fetch(`${baseUrl}/api/equipments`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Erreur lors de la récupération : ${res.status}`);
  }
  const data = await res.json();
  return data.data;
}

async function createEquipment(equipment) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${baseUrl}/api/equipments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(equipment),
  });
  if (!res.ok) {
    throw new Error(`Erreur lors de la création : ${res.status}`);
  }
  return await res.json();
}

async function updateEquipment(id, equipment) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${baseUrl}/api/equipments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(equipment),
  });
  if (!res.ok) {
    throw new Error(`Erreur lors de la mise à jour : ${res.status}`);
  }
  return await res.json();
}

async function deleteEquipment(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${baseUrl}/api/equipments/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error(`Erreur lors de la suppression : ${res.status}`);
  }
  return await res.json();
}

export default function EquipmentsPage() {
  const [equipments, setEquipments] = useState([]);
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null); // 'add', 'edit', 'delete', or null
  const [formData, setFormData] = useState({ name: '', status: true });
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getEquipments();
        setEquipments(data);
        setFilteredEquipments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = equipments.filter((equipment) =>
      equipment.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEquipments(filtered);
  }, [searchTerm, equipments]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openAddModal = () => {
    setModal('add');
    setFormData({ name: '', status: true });
    setError(null);
  };

  const openEditModal = (equipment) => {
    setModal('edit');
    setFormData({ name: equipment.name, status: equipment.status });
    setSelectedEquipmentId(equipment.id);
    setError(null);
  };

  const openDeleteModal = (id) => {
    setModal('delete');
    setSelectedEquipmentId(id);
    setError(null);
  };

  const closeModal = () => {
    setModal(null);
    setFormData({ name: '', status: true });
    setSelectedEquipmentId(null);
    setError(null);
    setSuccessMessage(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      if (modal === 'add') {
        const newEquipment = await createEquipment(formData);
        setEquipments([...equipments, newEquipment.data]);
        setFilteredEquipments([...equipments, newEquipment.data]);
        setSuccessMessage('Équipement ajouté avec succès');
      } else if (modal === 'edit') {
        const updatedEquipment = await updateEquipment(selectedEquipmentId, formData);
        setEquipments(equipments.map((eq) => (eq.id === selectedEquipmentId ? updatedEquipment.data : eq)));
        setFilteredEquipments(filteredEquipments.map((eq) => (eq.id === selectedEquipmentId ? updatedEquipment.data : eq)));
        setSuccessMessage('Équipement mis à jour avec succès');
      }
      setTimeout(closeModal, 1500); // Close modal after success
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      setError(null);
      await deleteEquipment(selectedEquipmentId);
      setEquipments(equipments.filter((eq) => eq.id !== selectedEquipmentId));
      setFilteredEquipments(filteredEquipments.filter((eq) => eq.id !== selectedEquipmentId));
      setSuccessMessage('Équipement supprimé avec succès');
      setTimeout(closeModal, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Chargement des équipements...
        </div>
      </div>
    );
  }

  if (error && !modal) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-4 text-red-600 bg-red-100 rounded-lg">
          Erreur : {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Liste des équipements</h1>
        <button
          onClick={openAddModal}
          className="flex items-center px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          Ajouter un équipement
        </button>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Rechercher un équipement..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 pr-10 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute text-gray-400 right-3 top-3" />
      </div>

      {filteredEquipments.length === 0 ? (
        <div className="text-center text-gray-600">
          Aucun équipement trouvé.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEquipments.map((equipment) => (
            <div key={equipment.id} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="mb-2 text-xl font-bold text-gray-800">{equipment.name}</h2>
              <p className="text-gray-600">{equipment.status ? 'Disponible' : 'Indisponible'}</p>
              <div className="flex justify-between mt-4">
                <Link
                  href={`/dashboard/admin/equipments/${equipment.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Lire plus
                </Link>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(equipment)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                    aria-label={`Modifier ${equipment.name}`}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => openDeleteModal(equipment.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                    aria-label={`Supprimer ${equipment.name}`}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add/Edit */}
      {(modal === 'add' || modal === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {modal === 'add' ? 'Ajouter un équipement' : 'Modifier l’équipement'}
              </h2>
              <button onClick={closeModal} className="p-2 text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom de l’équipement
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
                  {modal === 'add' ? 'Ajouter' : 'Mettre à jour'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Delete Confirmation */}
      {modal === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Confirmer la suppression</h2>
              <button onClick={closeModal} className="p-2 text-gray-500 hover:text-gray-700">
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
    </div>
  );
}