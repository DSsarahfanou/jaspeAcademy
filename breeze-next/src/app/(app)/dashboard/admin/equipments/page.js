'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { FaEdit, FaTrash} from 'react-icons/fa';

export default function EquipmentPage() {
  const [equipments, setEquipments] = useState([]);

  const [editingEquipmentId, setEditingEquipmentId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    description: '',
    details: '',
    status: true,
    picture: null,
  });

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/equipments', {
          withCredentials: true,
        });
        setEquipments(res.data.data);
      } catch (error) {
        toast.error('Erreur lors du chargement des équipements.');
      }
    };

    fetchEquipments();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, picture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('quantity', formData.quantity);
    submitData.append('price', formData.price);
    submitData.append('status', formData.status ? 1 : 0);
    submitData.append('description', formData.description || '');
    submitData.append('details', formData.details || '');
    if (formData.picture) {
      submitData.append('picture', formData.picture);
    }

    try {
      if (editingequipmentId) {
        await axios.put(`http://localhost:8000/api/equipments/${editingequipmentId}`, formData, {
          withCredentials: true,
        });
        toast.success('Utilisateur modifié avec succès');
      } else {      
        await axios.post('http://localhost:8000/api/equipments', submitData, {
          withCredentials: true,
        });
     }
      toast.success("Équipement ajouté avec succès !");
      setFormData({
        name: '',
        quantity: '',
        price: '',
        description: '',
        details: '',
        status: true,
        picture: null,
      });
      setEditingequipmentId(null);
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error.response?.data || error.message);
      toast.error("Échec de l'ajout de l’équipement.");
    }
  };


  //ma fonction pour modifier 
    const handleEdit = (equipment) => {
    setEditingEquipmentId(equipment.id);
    setFormData({
      name: equipment.name || '',
      quantity: equipment.quantity|| '',
      price: equipment.price || '',
      status : equipment.status || '',
      descriptione: equipment.description || '',
      details: equipment.details || '',
      picture : equipment.picture || '',
    });
  };

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <Toaster position="top-right" />
     
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Liste des équipements</h2>
        <a href="#addEquiment">
          <button className="px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700">
            Ajouter un équipement
          </button>
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {equipments.map((eq) => (
          <div key={eq.id} className="p-4 bg-white rounded shadow">
            {eq.picture ? (
              <img
                src={`http://localhost:8000/storage/${eq.image  }`}
                alt={eq.name}
                className="object-cover w-full h-40 mb-4 rounded"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-40 mb-4 text-gray-500 bg-gray-200 rounded">
                Pas d’image
              </div>
            )}
            <h2 className="text-lg font-semibold">{eq.name}</h2>
            <p className="text-sm text-gray-600">{eq.description || 'Aucune description'}</p>
            <p className="mt-2 font-bold">Quantité : {eq.quantity}</p>
            <p className="text-sm">Prix : {eq.price} FCFA</p>
            <p className={`mt-1 text-sm font-semibold ${eq.status ? 'text-green-600' : 'text-red-600'}`}>
              {eq.status ? 'Disponible' : 'Indisponible'}
            </p>
            <Link
              href={`/dashboard/admin/equipments/${eq.id}`}
              className="text-blue-500 hover:underline"
            >
              Lire plus
            </Link>
                  <button
                    className="text-yellow-600 hover:text-yellow-800"
                    onClick={() => handleEdit(eq)}
                  >
                    <FaEdit />
                  </button>            
          </div>
          
        ))}
      </div>

      {/* Formulaire d'ajout */}
      <h2 className="mt-12 mb-4 text-xl font-bold"> {editingEquipmentId ? "Modifier votre équipement" : "Ajouter un équipement"}</h2>
      <form id="addEquiment" onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-4 mb-8 bg-white rounded shadow md:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantité"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Prix (FCFA)"
          value={formData.price}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="file"
          name="picture"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border rounded md:col-span-2"
        />
        <textarea
          name="details"
          placeholder="Détails"
          value={formData.details}
          onChange={handleChange}
          className="p-2 border rounded md:col-span-2"
        />
        <label className="flex items-center col-span-2 gap-2">
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
          Disponible
        </label>
        <button
          type="submit"
          className="py-2 text-white bg-blue-600 rounded md:col-span-2 hover:bg-blue-700"
        >
          {editingEquipmentId ? 'Modifier' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
}
