'use client';

import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaSearch, FaTimes, FaPlus, FaMinus, FaTrash, FaInfoCircle, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } from 'kkiapay';

export default function Equipements() {
  const [activeFormation, setActiveFormation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [panier, setPanier] = useState([]);
  const [panierOuvert, setPanierOuvert] = useState(false);
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/formations');
        if (!response.ok) throw new Error('Erreur lors de la récupération des données');
        const data = await response.json();
        if (data.status === "success") {
          setFormations(data.data);
          setActiveFormation(data.data[0]?.id || null);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFormations();
  }, []);

  const totalPanier = panier.reduce((total, item) => total + (item.price * item.quantite), 0);

  const ajouterAuPanier = (equipment) => {
    setPanier(panierActuel => {
      const articleExiste = panierActuel.find(item => item.id === equipment.id);
      
      if (articleExiste) {
        return panierActuel.map(item => 
          item.id === equipment.id 
            ? { ...item, quantite: item.quantite + 1 } 
            : item
        );
      } else {
        return [...panierActuel, { 
          ...equipment, 
          quantite: 1,
          picture: equipment.picture ? `http://127.0.0.1:8000/storage/${equipment.picture}` : '/default-equipment.jpg'
        }];
      }
    });
  };

  const supprimerDuPanier = (articleId) => {
    setPanier(panierActuel => panierActuel.filter(item => item.id !== articleId));
  };

  const updateQuantite = (articleId, nouvelleQuantite) => {
    if (nouvelleQuantite < 1) return;
    setPanier(panierActuel => 
      panierActuel.map(item => 
        item.id === articleId 
          ? { ...item, quantite: nouvelleQuantite } 
          : item
      )
    );
  };

  const openPayment = () => {
    openKkiapayWidget({
      amount: totalPanier,
      api_key: "a2b855004b5811f0a02f6db188e41c43",
      sandbox: true,
      phone: "97000000",
      position: "right"
    });

    addKkiapayListener('success', (response) => {
      console.log('Payment successful!', response);
      setPanier([]);
      setPanierOuvert(false);
      // Vous pouvez ajouter une notification de succès ici
    });

    addKkiapayListener('error', (error) => {
      console.error('Payment error:', error);
      // Gérer les erreurs de paiement
    });

    addKkiapayListener('cancel', () => {
      console.log('Payment cancelled');
    });
  };

  const filteredFormations = formations
    .map(formation => ({
      ...formation,
      equipments: formation.equipments?.filter(equipment =>
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (equipment.description && equipment.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }))
    .filter(formation => formation.equipments?.length > 0);

  const formaterPrix = (prix) => {
    return new Intl.NumberFormat('fr-FR').format(prix) + ' FCFA';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
      <img src="/loading.gif" alt="Chargement..." className="w-32 h-32 mb-4" />
      <p>Chargement...</p> 
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 text-red-600 bg-red-100 rounded-lg">
          Erreur: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 mt-20 bg-gradient-to-b from-blue-50 to-white min-h-screen max-w-7xl">
      {/* En-tête améliorée */}
      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="mb-4 text-4xl font-bold text-blue-800 md:text-5xl">
          Équipements Recommandés
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez le matériel professionnel nécessaire pour suivre nos formations dans les meilleures conditions
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mt-8"
        >
          <div className="relative w-full max-w-xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FaSearch className="text-gray-400 text-lg" />
            </div>
            <input
              type="text"
              className="w-full py-3 pl-12 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              placeholder="Rechercher un équipement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="text-lg" />
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Bouton du panier amélioré */}
      <motion.div 
        className="fixed z-50 top-20 right-4 md:right-8"
        whileHover={{ scale: 1.1 }}
      >
        <button 
          className={`relative p-4 text-white bg-blue-600 rounded-full shadow-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center ${
            panier.length > 0 ? 'ring-2 ring-blue-400 ring-offset-2' : ''
          }`}
          onClick={() => setPanierOuvert(!panierOuvert)}
        >
          <FaShoppingCart className="w-6 h-6" />
          {panier.length > 0 && (
            <span className="absolute flex items-center justify-center w-7 h-7 text-sm font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
              {panier.reduce((total, item) => total + item.quantite, 0)}
            </span>
          )}
        </button>
      </motion.div>

      {/* Panier amélioré */}
      <AnimatePresence>
        {panierOuvert && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 z-40 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-2xl top-24 sm:right-6"
          >
            <div className="flex items-center justify-between p-4 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-lg">
              <span className="text-lg">Votre panier</span>
              <button 
                onClick={() => setPanierOuvert(false)}
                className="p-1 rounded-full hover:bg-blue-700"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[70vh]">
              {panier.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <FaShoppingCart className="mx-auto text-5xl text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Votre panier est vide</p>
                  <p className="text-gray-400 text-sm mt-2">Ajoutez des équipements pour commencer</p>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-gray-100">
                    {panier.map((article) => (
                      <div key={article.id} className="flex items-center py-4">
                        <img 
                          src={article.picture} 
                          alt={article.name} 
                          className="w-16 h-16 mr-4 rounded-lg object-cover border border-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{article.name}</p>
                          <p className="text-sm font-semibold text-blue-600">
                            {formaterPrix(article.price)}
                          </p>
                        </div>
                        
                        <div className="flex items-center ml-4 space-x-2">
                          <button 
                            className="flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                            onClick={() => updateQuantite(article.id, article.quantite - 1)}
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="w-8 text-base font-medium text-center">{article.quantite}</span>
                          <button 
                            className="flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                            onClick={() => updateQuantite(article.id, article.quantite + 1)}
                          >
                            <FaPlus size={12} />
                          </button>
                          <button 
                            className="ml-2 p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors"
                            onClick={() => supprimerDuPanier(article.id)}
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="sticky bottom-0 pt-4 mt-4 bg-white border-t border-gray-200">
                    <div className="flex justify-between text-lg font-bold mb-4">
                      <span>Total:</span>
                      <span className="text-blue-600">{formaterPrix(totalPanier)}</span>
                    </div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all flex items-center justify-center"
                      onClick={openPayment}
                    >
                      Payer maintenant
                      <FaChevronRight className="ml-2" />
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto">
        {searchTerm ? (
          <div className="space-y-12">
            {filteredFormations.length > 0 ? (
              filteredFormations.map((formation) => (
                <motion.div 
                  key={formation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="pb-3 mb-8 text-2xl font-bold text-gray-800 border-b border-gray-200">
                    {formation.name}
                  </h2>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {formation.equipments.map((equipment) => (
                      <EquipementCard 
                        key={equipment.id} 
                        equipment={equipment} 
                        ajouterAuPanier={ajouterAuPanier}
                      />
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center"
              >
                <div className="inline-flex items-center px-6 py-4 text-lg text-blue-800 bg-blue-100 rounded-xl">
                  <FaInfoCircle className="mr-3 text-xl" />
                  Aucun équipement ne correspond à votre recherche.
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <>
            {/* Onglets améliorés */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex pb-2 space-x-2 border-b border-gray-200">
                {formations.map((formation) => (
                  <motion.button
                    key={formation.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-6 py-3 rounded-t-lg font-semibold whitespace-nowrap transition-all duration-300 ${
                      activeFormation === formation.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-blue-50'
                    }`}
                    onClick={() => setActiveFormation(formation.id)}
                  >
                    {formation.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Contenu des formations */}
            {formations.map((formation) => (
              formation.id === activeFormation && (
                <motion.div 
                  key={formation.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                      {formation.name}
                    </h2>
                    {formation.formation_details && (
                      <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
                        {formation.formation_details}
                      </p>
                    )}
                  </div>

                  {formation.equipments?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {formation.equipments.map((equipment) => (
                        <EquipementCard 
                          key={equipment.id} 
                          equipment={equipment} 
                          ajouterAuPanier={ajouterAuPanier}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center bg-gray-50 rounded-xl">
                      <div className="inline-flex items-center px-6 py-4 text-lg text-gray-600 bg-white rounded-lg shadow-sm">
                        <FaInfoCircle className="mr-3 text-blue-500" />
                        Aucun équipement disponible pour cette formation.
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function EquipementCard({ equipment, ajouterAuPanier }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      <div className="relative h-56 overflow-hidden group">
        <img
          src={`http://127.0.0.1:8000/storage/${equipment.picture}`}
          alt={equipment.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = '/default-equipment.jpg';
          }}
        />
        <div className="absolute right-0 px-4 py-1 text-sm font-bold text-white bg-blue-600 shadow-lg top-3 rounded-l-full">
          {new Intl.NumberFormat('fr-FR').format(equipment.price)} FCFA
        </div>
      </div>

      <div className="p-5">
        <h5 className="mb-3 text-xl font-bold text-gray-800">{equipment.name}</h5>
        {equipment.description && (
          <p className="mb-4 text-gray-600 line-clamp-2">
            {equipment.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            <FaInfoCircle className="mr-2" />
            {showDetails ? 'Masquer détails' : 'Voir détails'}
          </button>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => ajouterAuPanier(equipment)}
            className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaShoppingCart className="mr-2" />
            Ajouter
          </motion.button>
        </div>
      </div>

      {showDetails && (
        <div className="px-5 pb-5 border-t border-gray-100 bg-gray-50">
          <h6 className="mb-3 font-semibold text-gray-800">Détails techniques:</h6>
          <div className="text-sm text-gray-700 space-y-2">
            {equipment.details ? (
              <p className="whitespace-pre-line">{equipment.details}</p>
            ) : (
              <p className="text-gray-500">Aucun détail technique disponible</p>
            )}
            <div className="pt-2 mt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                <span className="font-medium">Disponibilité:</span> {equipment.quantity > 0 ? 
                  <span className="text-green-600">En stock ({equipment.quantity} unités)</span> : 
                  <span className="text-red-600">Rupture de stock</span>}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}