'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaHome,
  FaUser,
  FaBookOpen,
  FaGraduationCap,
  FaFileAlt,
  FaEnvelopeOpenText,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaVideo,
  FaShopify,
  FaShoppingBag,
} from "react-icons/fa";
import { useAuth } from "/src/hooks/auth";
import { useRouter } from "next/navigation";

const links = [
  { href: "/dashboard/apprenant", label: "Tableau de bord", icon: FaHome },
  { href: "/dashboard/apprenant/profil", label: "Profil", icon: FaUser },
  { href: "/dashboard/apprenant/catalogue", label: "Catalogue", icon: FaBookOpen },
  { href: "/dashboard/apprenant/mes-formations", label: "Mes formations", icon: FaGraduationCap },
  { href: "/dashboard/apprenant/certificats", label: "Attestations", icon: FaFileAlt },
  { href: "/dashboard/apprenant/demande-stage", label: "Demande de stage", icon: FaEnvelopeOpenText },
  { href: "/dashboard/apprenant/meet", label: "Réunions", icon: FaVideo },
  { href: "/dashboard/apprenant/shop", label: "Shop", icon: FaShoppingBag },
  { href: "/dashboard/apprenant/orders", label: "Commandes", icon: FaShopify },
];

export default function SidebarApprenant() {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setOpen(!mobile); // Fermé sur mobile, ouvert sur desktop par défaut
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (user.role !== 'student') {
    router.push('/unauthorized');
    return null;
  }

  const toggleSidebar = () => {
    if (isMobile) {
      setOpen(!open);
    } else {
      // Sur desktop, simplement réduire/étendre
      setOpen(!open);
    }
  };

  return (
    <>
      {/* Overlay pour mobile */}
      {isMobile && open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative z-50
        h-screen bg-blue-900 text-white 
        ${open ? "w-64" : "w-16"} 
        transition-all duration-300 flex flex-col
        ${isMobile ? (open ? "translate-x-0" : "-translate-x-full") : ""}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          {open && (
            <Link href="/" className="flex items-center gap-2 text-xl font-bold hover:scale-105 transition-transform">
              <FaGraduationCap className="text-white" />
              <span className="whitespace-nowrap">Jaspe Academy</span>
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
            aria-label={open ? "Réduire le menu" : "Étendre le menu"}
          >
            {open ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center p-4 hover:bg-blue-800 transition-colors"
              onClick={() => isMobile && setOpen(false)}
            >
              <Icon className="text-xl min-w-[24px]" />
              {open && <span className="ml-3 whitespace-nowrap">{label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div 
          className="p-4 border-t border-blue-700 flex items-center hover:text-white text-red-300 cursor-pointer"
          onClick={logout}
        >
          <FaSignOutAlt className="text-xl min-w-[24px]" />
          {open && <span className="ml-3">Déconnexion</span>}
        </div>

        {open && (
          <div className="p-4 text-sm text-center text-blue-200">
            Bonne formation avec JASPE Academy !
          </div>
        )}
      </div>

      {/* Bouton toggle pour mobile */}
      {isMobile && !open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 left-4 z-40 bg-blue-900 text-white p-3 rounded-full shadow-lg md:hidden"
          aria-label="Ouvrir le menu"
        >
          <FaChevronRight />
        </button>
      )}
    </>
  );
}
