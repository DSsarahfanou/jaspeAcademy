"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaBook,
  FaChartLine,
  FaClipboardCheck,
  FaUserGraduate,
  FaBars,
} from "react-icons/fa";

const links = [
  { href: "/dashboard/apprenant/cours", label: "Cours", icon: FaBook },
  { href: "/dashboard/apprenant/modules", label: "Modules", icon: FaClipboardCheck },
  { href: "/dashboard/apprenant/quiz", label: "Quiz", icon: FaUserGraduate },
  { href: "/dashboard/apprenant/progression", label: "Progression", icon: FaChartLine },
];

export default function SidebarApprenant() {
  const [open, setOpen] = useState(true);

  return (
    <div className={`h-screen bg-blue-900 text-white ${open ? "w-64" : "w-16"} transition-all duration-300 flex flex-col`}>
      <div className="flex items-center justify-between p-4 border-b border-blue-700">
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
            className="flex items-center p-4 transition-all duration-200 hover:bg-blue-800"
          >
            <Icon className="text-xl" />
            {open && <span className="ml-3">{label}</span>}
          </Link>
        ))}
      </nav>

      {open && (
        <div className="p-4 text-sm text-center text-blue-200">
          Bonne formation avec JaspeAcademy!
        </div>
      )}
    </div>
  );
}
