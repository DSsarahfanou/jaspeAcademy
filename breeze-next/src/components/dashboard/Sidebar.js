'use client';

import { useState } from 'react';
import {
  FaHome,
  FaUser,
  FaChalkboardTeacher,
  FaVideo,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import Link from 'next/link';

const navItems = [
  { label: 'Accueil', icon: <FaHome />, href: '/' },
  { label: 'Formations', icon: <FaChalkboardTeacher />, href: '/formations' },
  { label: 'Cours vidéo', icon: <FaVideo />, href: '/videos' },
  { label: 'Profil', icon: <FaUser />, href: '/profil' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bouton pour mobile */}
      <div className="flex items-center justify-between p-4 bg-white shadow md:hidden">
        <div className="text-lg font-bold text-blue-600">JaspeAcademy</div>
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-700 transition hover:text-blue-600"
        >
          {open ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar Desktop */}
      <div className="flex-col justify-between hidden w-64 h-screen bg-white border border-blue-600 shadow-xl md:flex">
        <div>

          {/* Avatar */}
          <div className="flex items-center px-6 space-x-3 text-blue-700">
              <h1 >
                  Mon Menu  
              </h1>
          </div>

          {/* Progression */}
          <div className="px-6 mt-4">
            <p className="text-xs text-gray-500">Progression</p>
            <div className="w-full h-2 mt-1 bg-gray-200 rounded-full">
              <div className="bg-blue-500 h-2 rounded-full w-[45%] transition-all duration-700"></div>
            </div>
            <p className="mt-1 text-xs text-right text-blue-500">45%</p>
          </div>

          {/* Liens de navigation */}
          <nav className="px-4 mt-6 space-y-2">
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="flex items-center px-3 py-2 space-x-3 text-gray-700 transition-all duration-300 rounded-lg hover:bg-blue-100 hover:text-blue-600"
              >
                <span>{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>


      </div>

      {/* Sidebar Mobile */}
      {open && (
        <div className="fixed top-0 left-0 z-50 flex flex-col w-64 h-full bg-white shadow-lg md:hidden animate-slide-in">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold text-blue-600">Menu</h2>
            <button onClick={() => setOpen(false)}>
              <FaTimes size={20} />
            </button>
          </div>
          <nav className="px-4 py-6 space-y-3">
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="flex items-center px-3 py-2 space-x-3 text-gray-700 transition-all duration-300 rounded-lg hover:bg-blue-100 hover:text-blue-600"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
