'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function UserManagementPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    password_confirmation: '',
    gender: '',
    birth_date: '',
    address: '',
    phone: '',
    role: '',
  });
  const [errors, setErrors] = useState({});
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/users', {
        withCredentials: true,
      });
      setUsers(res.data || []);
    } catch (error) {
      toast.error('Erreur lors du chargement des utilisateurs.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });

      if (editingUserId) {
        await axios.put(`http://localhost:8000/api/users/${editingUserId}`, formData, {
          withCredentials: true,
        });
        toast.success('Utilisateur modifié avec succès');
      } else {
        await axios.post('http://localhost:8000/api/users', formData, {
          withCredentials: true,
        });
        toast.success('Utilisateur créé avec succès');
      }

      setFormData({
        name: '',
        surname: '',
        email: '',
        password: '',
        password_confirmation: '',
        gender: '',
        birth_date: '',
        address: '',
        phone: '',
        role: '',
      });
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
        toast.error('Veuillez corriger les erreurs.');
      } else {
        toast.error("Erreur lors de l'envoi.");
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name || '',
      surname: user.surname || '',
      email: user.email || '',
      password: '',
      password_confirmation: '',
      gender: user.gender || '',
      birth_date: user.birth_date || '',
      address: user.address || '',
      phone: user.phone || '',
      role: user.role || '',
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${id}`, {
          withCredentials: true,
        });
        toast.success('Utilisateur supprimé');
        fetchUsers();
      } catch (error) {
        toast.error("Erreur lors de la suppression.");
      }
    }
  };

  const renderUsersByRole = (role) => {
    const roleUsers = users.filter((u) => u.role === role);
    if (roleUsers.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-semibold capitalize">{role}s</h3>
        <table className="min-w-full text-sm bg-white rounded shadow">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-2">Nom</th>
              <th className="p-2">Prénom</th>
              <th className="p-2">Email</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roleUsers.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.surname}</td>
                <td className="p-2">{user.email}</td>
                <td className="flex items-center gap-2 p-2">
                  <button
                    className="text-yellow-600 hover:text-yellow-800"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-5xl p-6 mx-auto">
      <Toaster position="top-right" />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Gestion des utilisateurs</h2>
        <a href="#addUser">
          <button className="px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700">
            Ajouter un utilisateur
          </button>
        </a>
      </div>

      {/* Groupes */}
      {renderUsersByRole('teacher')}
      {renderUsersByRole('student')}
      {renderUsersByRole('admin')}

      <h2 className="mt-10 mb-4 text-2xl font-bold">{editingUserId ? "Modifier" : "Ajouter"} un utilisateur</h2>
      <form
        id="addUser"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 p-4 bg-white rounded shadow md:grid-cols-2"
      >
        {[
          { label: 'Nom', name: 'name', type: 'text' },
          { label: 'Prénom', name: 'surname', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' }, 
          { label: 'Genre', name: 'gender', type: 'text' },
          { label: 'Date de naissance', name: 'birth_date', type: 'date' },
          { label: 'Adresse', name: 'address', type: 'text' },
          { label: 'Téléphone', name: 'phone', type: 'text' },
        ].map((f) => (
          <div key={f.name}>
            <input
              type={f.type}
              name={f.name}
              placeholder={f.label}
              value={formData[f.name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors[f.name] && <p className="text-sm text-red-500">{errors[f.name]}</p>}
          </div>
        ))}

        {/* Champ mot de passe */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 pr-10 border rounded"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>

        {/* Champ confirmation mot de passe */}
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="password_confirmation"
            placeholder="Confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="w-full p-2 pr-10 border rounded"
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password_confirmation && (
            <p className="text-sm text-red-500">{errors.password_confirmation}</p>
          )}
        </div>


        <div>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Rôle --</option>
            <option value="student">Étudiant</option>
            <option value="teacher">Enseignant</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
        </div>

        <div className="md:col-span-2">
          <button className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700" type="submit">
            {editingUserId ? 'Modifier' : 'Créer'}
          </button>
        </div>
      </form>
    </div>
  );
}
