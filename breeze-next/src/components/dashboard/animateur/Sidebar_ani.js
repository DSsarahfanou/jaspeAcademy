"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaChalkboardTeacher,
  FaUser,
  FaUsers,
  FaVideo,
  FaBook,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const links = [
  {
    href: "/dashboard/animateur",
    label: "Tableau de bord",
    icon: FaChalkboardTeacher,
  },
  {
    href: "/dashboard/animateur/profil",
    label: "Mon Profil",
    icon: FaUser,
  },
  {
    href: "/dashboard/animateur/reunions",
    label: "Mes Réunions",
    icon: FaVideo,
  },
  {
    href: "/dashboard/animateur/formation",
    label: "Mes Formations",
    icon: FaBook,
  },
  {
    href: "/dashboard/animateur/apprenants",
    label: "Mes Apprenants",
    icon: FaUsers,
  },
];

export default function SidebarAnimateur() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-purple-900 text-white ${
        open ? "w-64" : "w-16"
      } transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-800">
        {open && <span className="text-lg font-bold">JASPE Academy</span>}
        <button
          onClick={() => setOpen(!open)}
          className="text-white focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center p-4 transition-all duration-200 hover:bg-purple-800"
          >
            <Icon className="text-xl" />
            {open && <span className="ml-3">{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-purple-800">
        <Link
          href="/logout"
          className="flex items-center text-red-300 hover:text-white transition"
        >
          <FaSignOutAlt className="text-xl" />
          {open && <span className="ml-3">Déconnexion</span>}
        </Link>
      </div>

      {open && (
        <div className="p-4 text-sm text-center text-purple-200">
          Merci de guider les talents de demain 🚀
        </div>
      )}
    </div>
  );
}
