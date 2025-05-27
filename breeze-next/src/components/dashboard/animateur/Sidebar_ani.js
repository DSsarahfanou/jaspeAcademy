"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaUserGraduate,
  FaUsers,
  FaComments,
  FaChalkboardTeacher,
  FaBars,
} from "react-icons/fa";

const links = [
  { href: "/dashboard/animateur/infoStudent", label: "Infos Étudiants", icon: FaUserGraduate },
  { href: "/dashboard/animateur/myStudent", label: "Mes Étudiants", icon: FaUsers },
  { href: "/dashboard/animateur/meet", label: "Rencontres", icon: FaComments },
  { href: "/dashboard/animateur/modules", label: "Modules", icon: FaChalkboardTeacher },
];

export default function SidebarFormateur() {
  const [open, setOpen] = useState(true);

  return (
    <div className={`h-screen bg-green-900 text-white ${open ? "w-64" : "w-16"} transition-all duration-300 flex flex-col`}>
      <div className="flex items-center justify-between p-4 border-b border-green-800">
        {open && <span className="text-lg font-bold">Jaspe</span>}
        <button
          onClick={() => setOpen(!open)}
          className="text-white focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center p-4 transition-all duration-200 hover:bg-green-800"
          >
            <Icon className="text-xl" />
            {open && <span className="ml-3">{label}</span>}
          </Link>
        ))}
      </nav>

      {open && (
        <div className="p-4 text-sm text-center text-green-200">
          Merci de former l'élite de demain 💡
        </div>
      )}
    </div>
  );
}
