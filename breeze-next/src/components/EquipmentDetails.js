'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EquipmentDetails({ id }) {
  const [equipment, setEquipment] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/equipments/${id}`)
      .then((res) => {
        setEquipment(res.data);
      })
      .catch(() => {
        setError(true);
      });
  }, [id]);

  if (error) return <p className="text-red-600">Erreur lors du chargement...</p>;
  if (!equipment) return <p>Chargement...</p>;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">{equipment.name}</h1>
      <p>{equipment.status ? 'Disponible' : 'Indisponible'}</p>
      <p className="mt-2 text-gray-700">{equipment.description}</p>
      <p className="mt-1 text-sm text-gray-500">{equipment.details}</p>
      <p className="mt-2 font-semibold">Quantité: {equipment.quantity}</p>
      <p className="mt-1 font-semibold">Prix: {equipment.price} FCFA</p>
    </div>
  );
}
