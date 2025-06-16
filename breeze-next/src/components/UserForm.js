'use client     '
// components/UserForm.js

import { useState } from 'react';

export  function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    gender: 'male',
    birth_date: '',
    address: '',
    phone: '',
    role: 'teacher'
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Si votre API nécessite une authentification :
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Utilisateur créé avec succès!');
        // Réinitialiser le formulaire si nécessaire
        setFormData({
          name: '',
          surname: '',
          email: '',
          password: '',
          gender: 'male',
          birth_date: '',
          address: '',
          phone: '',
          role: 'teacher'
        });
      } else {
        setMessage(data.message || 'Erreur lors de la création');
      }
    } catch (error) {
      setMessage('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Créer un nouvel utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Genre:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>
        </div>
        
        <div>
          <label>Date de naissance:</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Adresse:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Téléphone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Rôle:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="teacher">Enseignant</option>
            <option value="student">Étudiant</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Envoi en cours...' : 'Créer utilisateur'}
        </button>
      </form>
      
      {message && <p>{message}</p>}
    </div>
  );
}