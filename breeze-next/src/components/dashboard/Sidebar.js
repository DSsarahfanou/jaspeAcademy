'use client'
import React, { useState } from 'react';
import {
  FaUser,
  FaChartBar,
  FaUsers,
  FaTools,
  FaGraduationCap,
  FaBookOpen,
  FaFileAlt,
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaChevronDown,
  FaChevronRight,
  FaBars,
  FaTimes,
  FaCalendarAlt,
} from 'react-icons/fa';

const navItems = [
  {
    label: 'Profil',
    icon: <FaUser size={20} />,
    href: '/dashboard/admin/profile',
  },
  {
    label: 'Supervision générale',
    icon: <FaChartBar size={20} />,
    href: '/dashboard/admin/',
  },
  {
    label: 'Gestion des comptes',
    icon: <FaUsers size={20} />,
    href: '/dashboard/admin/account_management',
  },
  {
    label: 'Gestion des équipements',
    icon: <FaTools size={20} />,
    href: '/dashboard/admin/equipments',
  },
  {
    label: 'Gestion des formations',
    icon: <FaGraduationCap size={20} />,
    href: '/dashboard/admin/formations/',
  },
  {
    label: 'Gestion des formateurs',
    icon: <FaBookOpen size={20} />,
    subItems: [
      { label: 'Assigner formations', icon: <FaPlus size={16} />, href: '/formateurs/assign' },
      { label: 'Voir élèves', icon: <FaUsers size={16} />, href: '/formateurs/students' },
      { label: 'Retirer formateurs', icon: <FaMinus size={16} />, href: '/formateurs/remove' },
    ],
  },
  {
    label: 'Gestion des demandes de stage',
    icon: <FaFileAlt size={20} />,
    href: '/dashboard/admin/stages/consult',
  },
  {
    label: 'Gestion des commandes',
    icon: <FaShoppingCart size={20} />,
    href: '/dashboard/admin/orders',
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleSubMenu = (index) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <aside className={`bg-white border-r ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
      <div className="items-center p-4">
        <button onClick={toggleSidebar} className="flex items-center gap-96">
          {isOpen ? (
            <div className="flex items-center justify-between gap-9">
              <span className="text-xl font-bold">Menu</span>
              <p className='gap-96'> </p>
              <p className='gap-96'> </p>
              <p className='gap-96'> </p>
              <FaTimes size={22} />
            </div>
          ) : (
            <FaBars size={22} />
          )}
        </button>

      </div>
      <ul className="px-4 space-y-2">
        {navItems.map((item, index) => (
          <li key={index}>
            {item.subItems ? (
              <>
                <button
                  onClick={() => toggleSubMenu(index)}
                  className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100"
                >
                  <span className="flex items-center space-x-2">
                    {item.icon}
                    {isOpen && <span>{item.label}</span>}
                  </span>
                  {isOpen && (
                    openSubMenus[index] ? <FaChevronDown size={16} /> : <FaChevronRight size={16} />
                  )}
                </button>
                {openSubMenus[index] && (
                  <ul className="pl-6 mt-1 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <a
                          href={subItem.href}
                          className="flex items-center p-2 space-x-2 text-sm rounded hover:bg-gray-100"
                        >
                          {subItem.icon}
                          {isOpen && <span>{subItem.label}</span>}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <a
                href={item.href}
                className="flex items-center p-2 space-x-2 rounded hover:bg-gray-100"
              >
                {item.icon}
                {isOpen && <span>{item.label}</span>}
              </a>
            )}
          </li>
        ))}
      </ul>
      <div className="p-4 mt-4 text-sm text-gray-600 border-t">
        <div className="flex items-center space-x-2">
          <FaCalendarAlt size={16} />
          {isOpen && <span>{new Date().toLocaleDateString()}</span>}
        </div>
      </div>
    </aside>
  );
}
