'use client';
import { useState } from "react";
import Link from "next/link";
import {
  FaHome,
  FaUser,
  FaBookOpen,
  FaGraduationCap,
  FaFileAlt,
  FaEnvelopeOpenText,
  FaSignOutAlt,
  FaBars,
  FaViadeoSquare,
  FaVideo,
} from "react-icons/fa";
import { useAuth } from "/src/hooks/auth";

const links = [
  { href: "/dashboard/apprenant", label: "Tableau de bord", icon: FaHome },
  { href: "/dashboard/apprenant/profil", label: "Profil", icon: FaUser },
  { href: "/dashboard/apprenant/catalogue", label: "Catalogue de formations", icon: FaBookOpen },
  { href: "/dashboard/apprenant/mes-formations", label: "Mes formations", icon: FaGraduationCap },
  { href: "/dashboard/apprenant/certificats", label: "Mes certificats", icon: FaFileAlt },
  { href: "/dashboard/apprenant/demande-stage", label: "Demande de stage", icon: FaEnvelopeOpenText },
   { href: "/dashboard/apprenant/meet", label: "Réunions", icon: FaVideo },
];

export default function SidebarApprenant() {

  const { logout } = useAuth()
  const [open, setOpen] = useState(true);

  return (
    <div className={`h-screen bg-blue-900 text-white ${open ? "w-64" : "w-16"} transition-all duration-300 flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-700">
        {open &&
          <span className="text-lg font-bold">
            <Link
              className="flex items-center gap-2 text-xl font-bold  transition-transform hover:scale-105"
              href="/">
                  <FaGraduationCap className="text-white" />
                  Jaspe <span className="font-light  text-white">Academy</span>
            </Link>   
          </span>}
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
            className="flex items-center p-4 transition-all duration-200 hover:bg-blue-800"
          >
            <Icon className="text-xl" />
            {open && <span className="ml-3">{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-700 flex items-center text-red-300 transition hover:text-white" onClick={logout}>
          <FaSignOutAlt className="text-xl" />
          {open && <span className="ml-3" >Déconnexion</span>}
      </div>

      {open && (
        <div className="p-4 text-sm text-center text-blue-200">
          Bonne formation avec JASPE Academy !
        </div>
      )}
    </div>
  );
}
