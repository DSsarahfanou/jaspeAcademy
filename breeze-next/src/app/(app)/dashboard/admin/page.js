import { FaChartLine, FaShoppingCart, FaUsers, FaEuroSign, FaCalendarAlt, FaBoxOpen, FaRegClock, FaRegChartBar } from 'react-icons/fa';
import CardStat from "/src/components/dashboard/CardStat";

export const metadata = {
    title: 'Tableau de bord - Supervision',
}

const Dashboard = () => {
    // Données simulées pour les statistiques
    const statsData = [
        {
            title: "Revenus",
            value: "34 152€",
            growth: "+2.65%",
            icon: <FaEuroSign className="text-blue-500" size={20} />,
            trend: 'up'
        },
        {
            title: "Commandes",
            value: "5 643",
            growth: "-0.82%",
            icon: <FaShoppingCart className="text-green-500" size={20} />,
            trend: 'down'
        },
        {
            title: "Clients",
            value: "45 254",
            growth: "+6.24%",
            icon: <FaUsers className="text-purple-500" size={20} />,
            trend: 'up'
        },
        {
            title: "Produits",
            value: "1 248",
            growth: "+3.51%",
            icon: <FaBoxOpen className="text-orange-500" size={20} />,
            trend: 'up'
        }
    ];

    // Dernières activités
    const recentActivities = [
        { id: 1, action: "Nouvelle commande #4582", time: "2 min", icon: <FaShoppingCart /> },
        { id: 2, action: "Paiement reçu #4581", time: "10 min", icon: <FaEuroSign /> },
        { id: 3, action: "Nouveau client inscrit", time: "25 min", icon: <FaUsers /> },
        { id: 4, action: "Produit mis à jour", time: "1h", icon: <FaBoxOpen /> },
        { id: 5, action: "Promotion créée", time: "2h", icon: <FaChartLine /> }
    ];

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
                            <p>Graphique des performances</p>
                            <p className="text-sm">(Intégration avec une librairie de graphiques)</p>
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

            {/* Section supplémentaire */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-lg font-medium text-gray-800">Statistiques avancées</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <h3 className="flex items-center text-sm font-medium text-gray-800">
                            <FaChartLine className="mr-2 text-green-500" />
                            Taux de conversion
                        </h3>
                        <p className="mt-2 text-2xl font-bold">3.65%</p>
                        <p className="text-sm text-green-600">+0.5% vs période précédente</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <h3 className="flex items-center text-sm font-medium text-gray-800">
                            <FaUsers className="mr-2 text-blue-500" />
                            Clients actifs
                        </h3>
                        <p className="mt-2 text-2xl font-bold">1,248</p>
                        <p className="text-sm text-green-600">+12% vs période précédente</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <h3 className="flex items-center text-sm font-medium text-gray-800">
                            <FaShoppingCart className="mr-2 text-purple-500" />
                            Panier moyen
                        </h3>
                        <p className="mt-2 text-2xl font-bold">87.50€</p>
                        <p className="text-sm text-red-600">-2.3% vs période précédente</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;