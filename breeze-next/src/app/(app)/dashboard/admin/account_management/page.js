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
        <h3 className="text-xl font-semibold mb-2 capitalize">{role}s</h3>
        <table className="min-w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
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
                <td className="p-2 flex items-center gap-2">
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
    <div className="p-6 max-w-5xl mx-auto">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestion des utilisateurs</h2>
        <a href="#addUser">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Ajouter un utilisateur
          </button>
        </a>
      </div>

      {/* Groupes */}
      {renderUsersByRole('teacher')}
      {renderUsersByRole('student')}
      {renderUsersByRole('admin')}

      <h2 className="text-2xl font-bold mt-10 mb-4">{editingUserId ? "Modifier" : "Ajouter"} un utilisateur</h2>
      <form
        id="addUser"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow"
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
            {errors[f.name] && <p className="text-red-500 text-sm">{errors[f.name]}</p>}
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
            className="w-full p-2 border rounded pr-10"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Champ confirmation mot de passe */}
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="password_confirmation"
            placeholder="Confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="w-full p-2 border rounded pr-10"
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm">{errors.password_confirmation}</p>
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
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </div>

        <div className="md:col-span-2">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded" type="submit">
            {editingUserId ? 'Modifier' : 'Créer'}
          </button>
        </div>
      </form>
    </div>
  );
}
