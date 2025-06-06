"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '/src/hooks/auth';

export default function UserManager() {
  const { user, token } = useAuth();

  const [activeTab, setActiveTab] = useState('animators');
  const [animators, setAnimators] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);

  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Charger tous les utilisateurs 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        });

        if (!res.ok) throw new Error(`Erreur : ${res.status}`);
        const data = await res.json();
        setUsers(data.data || []);
      } catch (err) {
        console.error("Erreur chargement users:", err);
      }
    };

    fetchUsers();
  }, [token, apiUrl]);

  // Charger animators & students
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data || [];
        setAnimators(data.filter(u => u.role === 'teacher'));
        setStudents(data.filter(u => u.role === 'student'));
      } catch (err) {
        console.error("Erreur chargement rôles:", err);
      }
    };

    fetchRoles();
  }, [token, apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const payload = { ...formData, role: activeTab === 'animators' ? 'teacher' : 'student' };

      if (isEditing && selectedUser) {
        const response = await axios.put(`${apiUrl}/users/${selectedUser.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        updateUserInList(response.data);
      } else {
        const response = await axios.post(`${apiUrl}/users`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        addUserToList(response.data);
      }

      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const updateUserInList = (user) => {
    if (user.role === 'teacher') {
      setAnimators(animators.map(u => (u.id === user.id ? user : u)));
    } else {
      setStudents(students.map(u => (u.id === user.id ? user : u)));
    }
  };

  const addUserToList = (user) => {
    if (user.role === 'teacher') {
      setAnimators(prev => [...prev, user]);
    } else {
      setStudents(prev => [...prev, user]);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Confirmer suppression ?')) return;

    try {
      await axios.delete(`${apiUrl}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (activeTab === 'animators') {
        setAnimators(animators.filter(u => u.id !== id));
      } else {
        setStudents(students.filter(u => u.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    try {
      const response = await axios.put(`${apiUrl}/users/${user.id}`, {
        ...user,
        status: newStatus,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      updateUserInList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (user = null) => {
    setModalOpen(true);
    setIsEditing(!!user);
    setSelectedUser(user);
    if (user) {
      setFormData({ ...user, confirmPassword: user.password });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
      });
    }
  };

  const resetForm = () => {
    setModalOpen(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
    });
    setSelectedUser(null);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const userList = activeTab === 'animators' ? animators : students;

  return (
    <div className="p-4">

      {/* Liste utilisateurs*/}
      <div>
        <h1 className="mb-6 text-2xl font-bold">Liste des utilisateurss</h1>
        <div className="grid gap-6">
          {users.map((user) => (
            <div key={user.id} className="p-4 bg-gray-100 rounded shadow">
              <p><strong>Nom :</strong> {user.name}</p>
              <p><strong>Email :</strong> {user.email}</p>
              <p><strong>Rôle :</strong> {user.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-4 space-x-4 mt-6">
        <button onClick={() => setActiveTab('animators')} className={activeTab === 'animators' ? 'font-bold' : ''}>Animateurs</button>
        <button onClick={() => setActiveTab('students')} className={activeTab === 'students' ? 'font-bold' : ''}>Apprenants</button>
        <button onClick={() => openModal()} className="px-4 py-2 ml-auto text-white bg-blue-500 rounded">Ajouter</button>
      </div>

      {/* Tableau utilisateurs */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Nom</th>
            <th>Email</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => toggleStatus(user)} className="px-2 py-1 text-sm bg-gray-200 rounded">
                  {user.status === 'active' ? '🟢 Actif' : '⚫ Inactif'}
                </button>
              </td>
              <td>
                <button onClick={() => openModal(user)} className="mr-2 text-blue-500">Modifier</button>
                <button onClick={() => handleDelete(user.id)} className="text-red-500">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal formulaire */}
      {modalOpen && (
        <form onSubmit={handleSubmit} className="p-4 mt-4 bg-white border rounded shadow">
          <h2 className="mb-2 text-xl font-bold">{isEditing ? 'Modifier' : 'Ajouter'} un utilisateur</h2>
          <div className="mb-2">
            <label className="block">Nom</label>
            <input name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border" />
          </div>
          <div className="mb-2">
            <label className="block">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border" />
          </div>
          <div className="mb-2">
            <label className="block">Mot de passe</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required={!isEditing} className="w-full p-2 border" />
          </div>
          <div className="mb-2">
            <label className="block">Confirmer mot de passe</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required={!isEditing} className="w-full p-2 border" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded">{isEditing ? 'Modifier' : 'Créer'}</button>
            <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 rounded">Annuler</button>
          </div>
        </form>
      )}
    </div>
  );
}
