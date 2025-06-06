// src/app/(app)/dashboard/admin/page.js
"use client"
import { useState, useEffect } from 'react';
import { FaChartLine, FaShoppingCart, FaUsers, FaEuroSign, FaCalendarAlt, FaBoxOpen, FaRegClock, FaRegChartBar } from 'react-icons/fa';
import CardStat from '/src/components/dashboard/CardStat';

const fetchData = async (endpoint, token) => {
    try {
        const response = await fetch(`http://your-laravel-api/api/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error(`Erreur ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Erreur lors de la récupération de ${endpoint}:`, error);
        return null;
    }
};

// export const metadata = {
//     title: 'Tableau de bord - Supervision',
// };

const Dashboard = () => {
    const [statsData, setStatsData] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Assure-toi que le token est stocké après la connexion
        const loadData = async () => {
            const usersData = await fetchData('users', token);
            const formationsData = await fetchData('formations', token);
            const ordersData = await fetchData('orders', token);
            const equipmentsData = await fetchData('equipments', token);

            setStatsData([
                {
                    title: 'Revenus',
                    value: `${(ordersData?.data?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0)}€`,
                    growth: '+2.65%', // À calculer dynamiquement si possible
                    icon: <FaEuroSign className="text-blue-500" size={20} />,
                    trend: 'up',
                },
                {
                    title: 'Commandes',
                    value: ordersData?.data?.length || 0,
                    growth: '-0.82%', // À calculer dynamiquement
                    icon: <FaShoppingCart className="text-green-500" size={20} />,
                    trend: 'down',
                },
                {
                    title: 'Utilisateurs',
                    value: usersData?.data?.length || 0,
                    growth: '+6.24%', // À calculer dynamiquement
                    icon: <FaUsers className="text-purple-500" size={20} />,
                    trend: 'up',
                },
                {
                    title: 'Équipements',
                    value: equipmentsData?.data?.length || 0,
                    growth: '+3.51%', // À calculer dynamiquement
                    icon: <FaBoxOpen className="text-orange-500" size={20} />,
                    trend: 'up',
                },
            ]);

            // Exemple pour les activités récentes (à adapter selon ton API)
            const activities = ordersData?.data?.slice(0, 5).map((order, index) => ({
                id: index,
                action: `Nouvelle commande #${order.id}`,
                time: new Date(order.created_at).toLocaleTimeString('fr-FR'),
                icon: <FaShoppingCart />,
            })) || [];
            setRecentActivities(activities);

            setLoading(false);
        };
        loadData();
    }, []);

    if (loading) return <div>Chargement...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Tableau de bord</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FaCalendarAlt />
                    <span>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>

            {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statsData.map((stat, index) => (
                    <CardStat
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        growth={stat.growth}
                        icon={stat.icon}
                        trend={stat.trend}
                    />
                ))}
            </div>

            {/* Graphique et activités récentes */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Graphique principal */}
                <div className="p-6 bg-white rounded-lg shadow-sm lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium text-gray-800">Performance des ventes</h2>
                        <select className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option>7 derniers jours</option>
                            <option>30 derniers jours</option>
                            <option>3 derniers mois</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center h-64 rounded-md bg-gray-50">
                        <div className="text-center text-gray-400">
                            <FaRegChartBar size={40} className="mx-auto mb-2" />
                            <p>Graphique des performances (à intégrer)</p>
                        </div>
                    </div>
                </div>

                {/* Activités récentes */}
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h2 className="mb-4 text-lg font-medium text-gray-800">Activités récentes</h2>
                    <div className="space-y-4">
                        {recentActivities.map(activity => (
                            <div key={activity.id} className="flex items-start space-x-3">
                                <div className="p-2 mt-1 text-white bg-blue-500 rounded-full">
                                    {activity.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <FaRegClock className="mr-1" size={12} />
                                        <span>{activity.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 text-sm font-medium text-blue-600 hover:text-blue-800">
                        Voir toutes les activités
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;