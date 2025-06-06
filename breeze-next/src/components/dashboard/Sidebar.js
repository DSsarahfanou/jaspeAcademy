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
  FaFileAlt,
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimesCircle,
} from 'react-icons/fa';
import Link from 'next/link';

const navItems = [
  {
    label: 'Profil',
    icon: <FaUser />,
    href: '/dashboard/admin/profile',
  },
  {
    label: 'Supervision générale',
    icon: <FaCog />,
    href: '/dashboard/admin/',
  },
  {
    label: 'Gestion des comptes',
    icon: <FaUsers />,
    href: '/dashboard/admin/account_management',
  },
  {
    label: 'Gestion des équipements',
    icon: <FaTools />,
    href: '/dashboard/admin/equipments',
  },
  {
    label: 'Gestion des formations',
    icon: <FaGraduationCap />,
    subItems: [
      { label: 'Ajouter', icon: <FaPlus />, href: '/dashboard/admin//frmations/add' },
      { label: 'Supprimer', icon: <FaTrash />, href: '/dashboard/admin/formations/delete' },
      { label: 'Modifier', icon: <FaEdit />, href: '/dashboard/admin/formations/edit' },
      { label: 'Associer équipements', icon: <FaTools />, href: '/dashboard/admin/formations/equipments' },
      { label: 'Gérer modules/leçons', icon: <FaVideo />, href: '/dashboard/admin/formations/modules' },
      { label: 'Préparer quiz', icon: <FaFileAlt />, href: '/formations/quiz' },
    ],
  },
  {
    label: 'Gestion des formateurs',
    icon: <FaChalkboardTeacher />,
    subItems: [
      { label: 'Assigner formations', icon: <FaPlus />, href: '/formateurs/assign' },
      { label: 'Voir élèves', icon: <FaUsers />, href: '/formateurs/students' },
      { label: 'Retirer formateurs', icon: <FaMinus />, href: '/formateurs/remove' },
    ],
  },
  {
    label: 'Gestion des demandes de stage',
    icon: <FaFileAlt />,
    subItems: [
      { label: 'Consulter demandes', icon: <FaFileAlt />, href: '/stages/consult' },
      { label: 'Accepter/Rejeter', icon: <FaCheck />, href: '/stages/manage' },
    ],
  },
  {
    label: 'Gestion des commandes',
    icon: <FaShoppingCart />,
    subItems: [
      { label: 'Voir commandes', icon: <FaFileAlt />, href: '/commands/view' },
      { label: 'Valider commandes', icon: <FaCheck />, href: '/commands/validate' },
    ],
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleSubMenu = (index) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
      <aside className="hidden h-screen md:flex md:flex-col md:w-64 md:bg-white md:border-r md:border-gray-200 md:shadow-sm">
        <div className="flex-1">
          {/* En-tête du menu */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-800">Mon Menu</h1>
          </div>

          {/* Navigation */}
          <nav className="px-4 py-6">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleSubMenu(index)}
                        className="flex items-center w-full px-3 py-3 space-x-3 text-gray-700 transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                      {openSubMenus[index] && (
                        <ul className="ml-6 space-y-1">
                          {item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.href}
                                className="flex items-center px-3 py-2 space-x-3 text-gray-600 transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                              >
                                <span className="text-base">{subItem.icon}</span>
                                <span className="text-sm">{subItem.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-3 py-3 space-x-3 text-gray-700 transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  )}
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
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleSubMenu(index)}
                      className="flex items-center w-full px-3 py-3 space-x-3 text-gray-700 transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                    {openSubMenus[index] && (
                      <ul className="ml-6 space-y-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={subItem.href}
                              onClick={closeSidebar}
                              className="flex items-center px-3 py-2 space-x-3 text-gray-600 transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                              <span className="text-base">{subItem.icon}</span>
                              <span className="text-sm">{subItem.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeSidebar}
                    className="flex items-center px-3 py-3 space-x-3 text-gray-700 transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}