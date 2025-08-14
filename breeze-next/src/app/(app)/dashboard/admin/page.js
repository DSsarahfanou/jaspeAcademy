"use client";

import { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBoxOpen,
  FaCalendarAlt,
} from "react-icons/fa";
import CardStat from "/src/components/dashboard/CardStat";
import { useAuth } from "../../../../hooks/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function formatNumber(n) {
  if (n === null || n === undefined) return "—";
  return new Intl.NumberFormat("fr-FR").format(n);
}

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirection si non-admin
  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") router.push("/unauthorized");
  }, [user, router]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/admin/dashboard", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des données");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <img src="/loading.gif" alt="Chargement..." className="w-20 h-20 mb-4" />
        <p className="text-gray-500">Chargement du tableau de bord...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-20 text-red-600">
        Impossible de charger les statistiques.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Tableau de bord</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FaCalendarAlt />
          <span>
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Statistiques (QUE des valeurs réelles) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        <CardStat
          title="Commandes"
          value={formatNumber(stats.orders_count)}
          icon={<FaShoppingCart className="text-green-600" size={20} />}
        />
        <CardStat
          title="Utilisateurs"
          value={formatNumber(stats.users_count)}
          icon={<FaUsers className="text-blue-600" size={20} />}
        />
        <CardStat
          title="Étudiants"
          value={formatNumber(stats.students_count)}
          icon={<FaUserGraduate className="text-purple-600" size={20} />}
        />
        <CardStat
          title="Enseignants"
          value={formatNumber(stats.teachers_count)}
          icon={<FaChalkboardTeacher className="text-orange-600" size={20} />}
        />
        <CardStat
          title="Équipements"
          value={formatNumber(stats.equipments_count)}
          icon={<FaBoxOpen className="text-pink-600" size={20} />}
        />
      </div>

      {/* Commandes récentes */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Commandes récentes</h2>

        {Array.isArray(stats.recent_orders) && stats.recent_orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-2">ID</th>
                  <th className="py-2 px-2">Client</th>
                  <th className="py-2 px-2">Montant</th>
                  <th className="py-2 px-2">Statut</th>
                  <th className="py-2 px-2">Date</th>
                  <th className="py-2 px-2">Facture</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent_orders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-2 px-2 font-medium">#{order.id}</td>
                    <td className="py-2 px-2">
                      {order.student?.name} {order.student?.surname}
                    </td>
                    <td className="py-2 px-2">
                      {formatNumber(order.sum)}&nbsp;FCFA
                    </td>
                    <td className="py-2 px-2">
                      {order.order_status === 1 ? (
                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                          Payée/Livrée
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                          En attente
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-2">
                      {new Date(order.created_at).toLocaleString("fr-FR", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="py-2 px-2">
                      {order.path_facture ? (
                        <a
                          href={`http://localhost:8000/storage/${order.path_facture}`}
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Télécharger
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Aucune commande récente.</p>
        )}
      </div>
    </div>
  );
}
