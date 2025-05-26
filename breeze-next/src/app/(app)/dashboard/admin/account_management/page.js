"use client"
import React, { useState } from 'react';
import { 
  FaUser, 
  FaGraduationCap, 
  FaUsers, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaSearch,
  FaFilter,
  FaTimes,
  FaSave,
  FaUserPlus
} from 'react-icons/fa';

const AccountManagement = () => {
  const [activeTab, setActiveTab] = useState('animators');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add', 'edit', 'view'
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // États pour les données
  const [animators, setAnimators] = useState([
    {
      id: 1,
      surname: 'Dupont',
      first_name: 'Jean',
      gender: 'M',
      address: '123 Rue de la Paix, Paris',
      phone: '+33123456789',
      password: '••••••••',
      picture: '/api/placeholder/50/50',
      created_at: '2024-01-15',
      updated_at: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      surname: 'Martin',
      first_name: 'Sophie',
      gender: 'F',
      address: '456 Avenue des Champs, Lyon',
      phone: '+33987654321',
      password: '••••••••',
      picture: '/api/placeholder/50/50',
      created_at: '2024-01-20',
      updated_at: '2024-01-20',
      status: 'active'
    }
  ]);

  const [students, setStudents] = useState([
    {
      id: 1,
      surname: 'Leroux',
      first_name: 'Marie',
      gender: 'F',
      address: '789 Boulevard Saint-Michel, Marseille',
      phone: '+33147258369',
      password: '••••••••',
      picture: '/api/placeholder/50/50',
      created_at: '2024-02-01',
      updated_at: '2024-02-01',
      status: 'active'
    },
    {
      id: 2,
      surname: 'Durand',
      first_name: 'Pierre',
      gender: 'M',
      address: '321 Rue de Rivoli, Toulouse',
      phone: '+33963852741',
      password: '••••••••',
      picture: '/api/placeholder/50/50',
      created_at: '2024-02-05',
      updated_at: '2024-02-05',
      status: 'inactive'
    }
  ]);

  const [formData, setFormData] = useState({
    surname: '',
    first_name: '',
    gender: '',
    picture: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const resetForm = () => {
    setFormData({
      surname: '',
      first_name: '',
      gender: '',
      picture: '',
      address: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user);
    if (user && (type === 'edit' || type === 'view')) {
      setFormData({
        surname: user.surname,
        first_name: user.first_name,
        gender: user.gender,
        picture: user.picture,
        address: user.address,
        phone: user.phone,
        password: '',
        confirmPassword: ''
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    const userData = {
      ...formData,
      id: modalType === 'edit' ? selectedUser.id : Date.now(),
      created_at: modalType === 'edit' ? selectedUser.created_at : new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    if (modalType === 'add') {
      if (activeTab === 'animators') {
        setAnimators(prev => [...prev, userData]);
      } else {
        setStudents(prev => [...prev, userData]);
      }
    } else if (modalType === 'edit') {
      if (activeTab === 'animators') {
        setAnimators(prev => prev.map(item => 
          item.id === selectedUser.id ? { ...userData, password: formData.password || item.password } : item
        ));
      } else {
        setStudents(prev => prev.map(item => 
          item.id === selectedUser.id ? { ...userData, password: formData.password || item.password } : item
        ));
      }
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
      if (activeTab === 'animators') {
        setAnimators(prev => prev.filter(item => item.id !== id));
      } else {
        setStudents(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  const toggleStatus = (id) => {
    if (activeTab === 'animators') {
      setAnimators(prev => prev.map(item => 
        item.id === id ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' } : item
      ));
    } else {
      setStudents(prev => prev.map(item => 
        item.id === id ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' } : item
      ));
    }
  };

  const currentData = activeTab === 'animators' ? animators : students;
  const filteredData = currentData.filter(item => {
    const matchesSearch = item.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.first_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Gestion des Comptes</h1>
        <p className="text-gray-600">Gérez les comptes des animateurs et apprenants</p>
      </div>

      {/* Onglets */}
      <div className="mb-6 bg-white rounded-lg shadow-sm">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('animators')}
            className={`flex items-center px-6 py-3 space-x-2 font-medium transition-colors ${
              activeTab === 'animators'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <FaUsers />
            <span>Animateurs</span>
            <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
              {animators.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center px-6 py-3 space-x-2 font-medium transition-colors ${
              activeTab === 'students'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <FaGraduationCap />
            <span>Apprenants</span>
            <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
              {students.length}
            </span>
          </button>
        </div>

        {/* Barre d'outils */}
        <div className="p-6 border-b">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
              {/* Recherche */}
              <div className="relative">
                <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher par nom..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Filtre par statut */}
              <div className="relative">
                <FaFilter className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={16} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="py-2 pl-10 pr-8 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
            </div>

            {/* Bouton d'ajout */}
            <button
              onClick={() => openModal('add')}
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <FaUserPlus size={16} />
              <span>Ajouter {activeTab === 'animators' ? 'un animateur' : 'un apprenant'}</span>
            </button>
          </div>
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Statut
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Date de création
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="object-cover w-10 h-10 rounded-full"
                          src={user.picture}
                          alt={`${user.first_name} ${user.surname}`}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.first_name} {user.surname}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.gender === 'M' ? 'Masculin' : 'Féminin'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.phone}</div>
                    <div className="max-w-xs text-sm text-gray-500 truncate">
                      {user.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {user.status === 'active' ? 'Actif' : 'Inactif'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(user.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => openModal('view', user)}
                        className="p-2 text-blue-600 transition-colors rounded-lg hover:text-blue-900 hover:bg-blue-50"
                        title="Voir"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => openModal('edit', user)}
                        className="p-2 text-green-600 transition-colors rounded-lg hover:text-green-900 hover:bg-green-50"
                        title="Modifier"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-600 transition-colors rounded-lg hover:text-red-900 hover:bg-red-50"
                        title="Supprimer"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredData.length === 0 && (
            <div className="py-12 text-center">
              <FaUser className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun utilisateur trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Aucun résultat ne correspond à vos critères de recherche'
                  : `Commencez par ajouter ${activeTab === 'animators' ? 'un animateur' : 'un apprenant'}`
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-2xl max-h-screen overflow-y-auto bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                {modalType === 'add' && `Ajouter ${activeTab === 'animators' ? 'un animateur' : 'un apprenant'}`}
                {modalType === 'edit' && `Modifier ${activeTab === 'animators' ? 'l\'animateur' : 'l\'apprenant'}`}
                {modalType === 'view' && `Détails ${activeTab === 'animators' ? 'de l\'animateur' : 'de l\'apprenant'}`}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 transition-colors rounded-lg hover:text-gray-600 hover:bg-gray-100"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Nom */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    required
                    disabled={modalType === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Prénom */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                    disabled={modalType === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Genre */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Genre <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    disabled={modalType === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="">Sélectionnez</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                  </select>
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    disabled={modalType === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Adresse */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Adresse <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    disabled={modalType === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Photo */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    URL de la photo
                  </label>
                  <input
                    type="url"
                    name="picture"
                    value={formData.picture}
                    onChange={handleInputChange}
                    disabled={modalType === 'view'}
                    placeholder="https://exemple.com/photo.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Mot de passe (uniquement pour ajout/modification) */}
                {modalType !== 'view' && (
                  <>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Mot de passe {modalType === 'add' && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required={modalType === 'add'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {modalType === 'edit' && (
                        <p className="mt-1 text-xs text-gray-500">
                          Laissez vide pour conserver le mot de passe actuel
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Confirmer le mot de passe {modalType === 'add' && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required={modalType === 'add' || formData.password}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Boutons d'action */}
              {modalType !== 'view' && (
                <div className="flex items-center justify-end pt-6 mt-8 space-x-4 border-t">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(e);
                    }}
                    className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    <FaSave size={16} />
                    <span>{modalType === 'add' ? 'Ajouter' : 'Modifier'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;