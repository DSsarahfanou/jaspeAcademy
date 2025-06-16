// Dans votre page
"use client"
import FormationsReseaux from "../../components/Formation";
import {useState, useEffect } from 'react';

export default function Page() {
  const [formations, setFormations] = useState([]);

  // Récupérer les formations depuis une API
  useEffect(() => {
    const fetchFormations = async () => {
      const response = await fetch('http://localhost:8000/api/formations/');
      const data = await response.json();
      setFormations(data);
    };

    fetchFormations();
  }, []);

  return (
    <FormationsReseaux formationsData={formations} />
  );
}