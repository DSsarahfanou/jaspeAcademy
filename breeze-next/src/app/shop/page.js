'use client';

import React, { useState, useEffect } from 'react';
//import AOS from 'aos';
//import 'aos/dist/aos.css';

const equipements = [
  {
    id: 1,
    module: "Module 1 - Introduction aux réseaux",
    description: "Équipements essentiels pour comprendre les bases des réseaux informatiques",
    items: [
      {
        id: 101,
        nom: "Switch Cisco Catalyst 2960",
        prix: 120000,
        prixAffiche: "120 000 FCFA",
        image: "/image/switch.jpeg",
        description: "Switch de niveau 2 idéal pour l'apprentissage des concepts de commutation"
      },
      {
        id: 102,
        nom: "Routeur MikroTik RB750Gr3",
        prix: 45000,
        prixAffiche: "45 000 FCFA",
        image: "/image/router.jpeg",
        description: "Routeur performant pour les exercices de routage et configuration réseau"
      },
      {
        id: 103,
        nom: "Routeur MikroTik RB750Gr3",
        prix: 45000,
        prixAffiche: "45 000 FCFA",
        image: "/image/router.jpeg",
        description: "Routeur performant pour les exercices de routage et configuration réseau"
      },
    ],
  },
  {
    id: 2,
    module: "Module 2 - Sécurité réseau",
    description: "Matériel spécialisé pour apprendre à sécuriser vos infrastructures",
    items: [
      {
        id: 201,
        nom: "Pare-feu FortiGate 30E",
        prix: 250000,
        prixAffiche: "250 000 FCFA",
        image: "/image/fortigate.jpg",
        description: "Solution de sécurité tout-en-un pour protéger votre réseau"
      },
      {
        id: 202,
        nom: "Pare-feu FortiGate 30E",
        prix: 250000,
        prixAffiche: "250 000 FCFA",
        image: "/image/fortigate.jpg",
        description: "Solution de sécurité tout-en-un pour protéger votre réseau"
      },
      {
        id: 203,
        nom: "Pare-feu FortiGate 30E",
        prix: 250000,
        prixAffiche: "250 000 FCFA",
        image: "/image/fortigate.jpg",
        description: "Solution de sécurité tout-en-un pour protéger votre réseau"
      },
    ],
  },
  // Vous pouvez ajouter d'autres modules
];

export default function Equipements() {
  const [activeModule, setActiveModule] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [panier, setPanier] = useState([]);
  const [panierOuvert, setPanierOuvert] = useState(false);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    //AOS.init({ duration: 1000, once: true });
  }, []);

  // Calculer le total du panier
  const totalPanier = panier.reduce((total, item) => total + (item.prix * item.quantite), 0);

  // Ajouter un article au panier
  const ajouterAuPanier = (article) => {
    setPanier(panierActuel => {
      // Vérifier si l'article est déjà dans le panier
      const articleExiste = panierActuel.find(item => item.id === article.id);
      
      if (articleExiste) {
        // Augmenter la quantité
        return panierActuel.map(item => 
          item.id === article.id 
            ? { ...item, quantite: item.quantite + 1 } 
            : item
        );
      } else {
        // Ajouter le nouvel article
        return [...panierActuel, { ...article, quantite: 1 }];
      }
    });
    
    // Animation du panier
    setAnimation(true);
    setTimeout(() => setAnimation(false), 700);
  };

  // Supprimer un article du panier
  const supprimerDuPanier = (articleId) => {
    setPanier(panierActuel => 
      panierActuel.filter(item => item.id !== articleId)
    );
  };

  // Mettre à jour la quantité d'un article
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

  // Procéder au paiement
  const procederAuPaiement = () => {
    // Ici, vous connecterez votre API de paiement
    console.log("Données pour l'API de paiement:", {
      articles: panier,
      total: totalPanier,
      date: new Date().toISOString()
    });
    
    alert("Redirection vers la page de paiement...");
    // Exemple de redirection: window.location.href = '/paiement?total=' + totalPanier;
  };

  const filteredEquipements = equipements.map(module => ({
    ...module,
    items: module.items.filter(item =>
      item.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(module => module.items.length > 0);

  // Formater le prix en FCFA
  const formaterPrix = (prix) => {
    return prix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
  };

  return (
<>
    <div className="container px-4 py-10 mx-auto mt-10 bg-">
      {/* En-tête avec titre et barre de recherche */}
      <div className="mb-10 text-center" data-aos="fade-down">
        <h1 className="mb-3 text-4xl font-bold text-blue-600">Équipements Recommandés</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Découvrez le matériel professionnel pour chaque module de formation</p>

        <div className="flex justify-center mt-6">
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 p-1 text-white bg-blue-500 rounded-full" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM10 16a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Rechercher un équipement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bouton du panier */}
      <div className="fixed z-50 top-4 right-4">
        <button 
          className={`bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg flex items-center ${animation ? 'animate-bounce' : ''}`}
          onClick={() => setPanierOuvert(!panierOuvert)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {panier.length > 0 && (
            <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
              {panier.reduce((total, item) => total + item.quantite, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Mini-panier */}
      {panierOuvert && (
        <div className="fixed right-0 z-40 overflow-hidden bg-white border border-blue-100 rounded-lg shadow-xl top-16 w-80">
          <div className="flex items-center justify-between p-4 font-semibold text-white bg-blue-600">
            <span>Votre panier</span>
            <button onClick={() => setPanierOuvert(false)}>×</button>
          </div>
          
          <div className="p-4 overflow-y-auto max-h-96">
            {panier.length === 0 ? (
              <p className="py-4 text-center text-gray-500">Votre panier est vide</p>
            ) : (
              <>
                {panier.map((article) => (
                  <div key={article.id} className="flex items-center justify-between py-2 border-b">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{article.nom}</p>
                      <p className="text-sm font-semibold text-blue-600">{formaterPrix(article.prix)}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        className="flex items-center justify-center w-6 h-6 text-blue-600 bg-blue-100 rounded-full"
                        onClick={() => updateQuantite(article.id, article.quantite - 1)}
                      >-</button>
                      <span className="w-6 text-sm text-center">{article.quantite}</span>
                      <button 
                        className="flex items-center justify-center w-6 h-6 text-blue-600 bg-blue-100 rounded-full"
                        onClick={() => updateQuantite(article.id, article.quantite + 1)}
                      >+</button>
                      <button 
                        className="ml-2 text-red-500"
                        onClick={() => supprimerDuPanier(article.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="pt-2 mt-4 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-blue-600">{formaterPrix(totalPanier)}</span>
                  </div>
                  
                  <button 
                    className="w-full py-2 mt-4 text-white transition duration-300 transform bg-blue-600 rounded-md shadow-md hover:bg-blue-700 hover:-translate-y-1"
                    onClick={procederAuPaiement}
                  >
                    Procéder au paiement
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {searchTerm ? (
        // Affichage des résultats de recherche
        <div className="space-y-10">
          {filteredEquipements.length > 0 ? (
            filteredEquipements.map((module) => (
              <div key={module.id} data-aos="fade-up">
                <h2 className="pb-2 mb-4 text-2xl font-semibold text-gray-700 border-b dark:text-gray-200">{module.module}</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {module.items.map((item) => (
                    <EquipementCard 
                      key={item.id} 
                      item={item} 
                      ajouterAuPanier={ajouterAuPanier}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center">
              <div className="relative px-4 py-3 text-blue-700 bg-blue-100 rounded" role="alert">
                Aucun équipement ne correspond à votre recherche.
              </div>
            </div>
          )}
        </div>
      ) : (
        // Affichage normal avec onglets
        <>
          <div className="mb-6 overflow-x-auto">
            <div className="flex pb-2 space-x-4 border-b">
              {equipements.map((module) => (
                <button
                  key={module.id}
                  className={`px-4 py-2 rounded-t-md font-medium whitespace-nowrap transition duration-300 ${
                    activeModule === module.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-blue-100'
                  }`}
                  onClick={() => setActiveModule(module.id)}
                >
                  {module.module.split(' - ')[0]}
                </button>
              ))}
            </div>
          </div>

          {equipements.map((module) => (
            module.id === activeModule && (
              <div key={module.id} data-aos="fade-up">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{module.module}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{module.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {module.items.map((item) => (
                    <EquipementCard 
                      key={item.id} 
                      item={item} 
                      ajouterAuPanier={ajouterAuPanier}
                    />
                  ))}
                </div>
              </div>
            )
          ))}
        </>
      )}
    </div>
</>
  );
}

function EquipementCard({ item, ajouterAuPanier }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-md dark:bg-gray-800 hover:-translate-y-1 hover:shadow-lg"
      data-aos="zoom-in"
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.nom}
          className="object-cover w-full h-48"
        />
        <div className="absolute right-0 px-3 py-1 text-sm font-semibold text-white bg-blue-600 shadow-md top-2 rounded-l-md">
          {item.prixAffiche}
        </div>
      </div>

      <div className="p-4">
        <h5 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">{item.nom}</h5>
        <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
      </div>

      <div className="flex items-center justify-between px-4 pb-4">
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="px-2 text-sm font-medium text-blue-600 transition duration-300 border-blue-300 border-solid rounded-full hover:underline hover:text-white"
        >
           {showDetails ? 'Masquer les détails' : 'Voir les détails'}
        </button>

        <button 
          onClick={() => ajouterAuPanier(item)}
          className="flex items-center px-4 py-2 space-x-1 text-sm font-medium text-white transition duration-300 bg-blue-600 rounded-full hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Ajouter au panier</span>
        </button>
      </div>

      {showDetails && (
        <div className="px-4 pb-4 border-t border-blue-100 bg-blue-50 dark:bg-blue-900 dark:border-blue-800">
          <h6 className="mb-2 font-semibold text-blue-800 dark:text-blue-200">Spécifications techniques:</h6>
          <ul className="text-sm text-gray-700 list-disc list-inside dark:text-gray-300">
            <li>Garantie: 12 mois</li>
            <li>Support technique inclus</li>
            <li>Livraison disponible</li>
            <li>Documentation complète fournie</li>
          </ul>
        </div>
      )}
    </div>
  );
}





























