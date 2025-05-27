'use client';
import { useState } from 'react';
import {
  FaHome,
  FaUser,
  FaChalkboardTeacher,
  FaVideo,
  FaBars,
  FaTimes,
  FaCog,
  FaUsers,
  FaTools,
  FaGraduationCap,
} from 'react-icons/fa';
import Link from 'next/link';

const navItems = [
  { label: 'Profil', icon: <FaUser />, href: '/dashboard/admin/profile' },
  { label: 'Supervision générale', icon: <FaCog />, href: '/supervision' },
  { label: 'Gestion des comptes', icon: <FaUsers />, href: '/dashboard/admin/account_management' },
  { label: 'Gestion des équipements', icon: <FaTools />, href: '/equipments' },
  { label: 'Gestion des formations', icon: <FaGraduationCap />, href: '/formations' },
  { label: 'Gestion des formateurs', icon: <FaChalkboardTeacher />, href: '/formateurs' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* Header mobile avec bouton menu */}
      <div className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
        <div className="text-lg font-bold text-blue-600">JaspeAcademy</div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 text-gray-700 transition-colors rounded-lg hover:text-blue-600 hover:bg-gray-100"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {open ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Overlay pour mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:h-screen md:bg-white md:border-r md:border-gray-200 md:shadow-sm">
        <div className="flex-1">
          {/* En-tête du menu */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-800">
              Mon Menu
            </h1>
          </div>

          {/* Navigation */}
          <nav className="px-4 py-6">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="flex items-center px-3 py-3 space-x-3 text-gray-700 transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Sidebar Mobile */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* En-tête mobile */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-blue-600">Menu</h2>
          <button
            onClick={closeSidebar}
            className="p-2 text-gray-500 transition-colors rounded-lg hover:text-gray-700 hover:bg-gray-100"
            aria-label="Fermer le menu"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation mobile */}
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={closeSidebar}
                  className="flex items-center px-3 py-3 space-x-3 text-gray-700 transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}