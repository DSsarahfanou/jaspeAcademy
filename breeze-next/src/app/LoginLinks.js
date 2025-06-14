'use client'

import { useState } from 'react'
import { usePathname } from "next/navigation"
import Link from 'next/link'
import { useAuth } from '../hooks/auth'
import {
  FaHome,
  FaBook,
  FaSignInAlt,
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
  FaGraduationCap,
  FaBars,
  FaTimes
} from "react-icons/fa"

const linkClasses = (href, pathname) => {
  const isActive = pathname === href
  return `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? "bg-blue-100 text-blue-700"
      : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
  }`
}

const LoginLinks = () => {
  const { user, logout } = useAuth({ middleware: 'guest' })
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const getRedirectPath = (role) => {
    const paths = {
        admin: '/dashboard/admin',
        teacher: '/dashboard/animateur',
        student: '/dashboard/apprenant'
    }
    return paths[role] 
  }

  

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white border-b border-blue-500 shadow-sm">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600 transition-transform hover:scale-105"
        >
          <FaGraduationCap className="text-blue-500" />
          <span>
            Jaspe <span className="font-light text-gray-600">Academy</span>
          </span>
        </Link>

        {/* Toggle Button for mobile */}
        <button
          className="text-xl text-gray-600 sm:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className="items-center hidden gap-4 sm:flex">
          {user ? (
            <>
              <Link href= {getRedirectPath(user.role)}  className={linkClasses("/dashboard", pathname)}>
                <FaUserCircle />
                <span>Dashboard</span>
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-red-500 transition border border-red-200 rounded-lg hover:bg-red-50 hover:text-red-600"
              >
                <FaSignOutAlt /> Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/" className={linkClasses("/", pathname)}>
                <FaHome /> Accueil
              </Link>

              <Link href="/formations" className={linkClasses("/formations", pathname)}>
                <FaBook /> Formations
              </Link>

              <Link href="/shop" className={linkClasses("/shop", pathname)}>
                <FaShoppingCart /> Shop
              </Link>

              <Link
                href="/login"
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <FaSignInAlt /> Connexion
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="px-4 py-3 space-y-2 bg-white border-t border-gray-200 shadow-md sm:hidden">
          {user ? (
            <>
              <Link href= {getRedirectPath(user.role)}  onClick={toggleMenu} className={linkClasses("/dashboard", pathname)}>
                <FaUserCircle /> Dashboard
              </Link>

              <button
                onClick={() => {
                  logout()
                  toggleMenu()
                }}
                className="flex items-center w-full gap-2 px-4 py-2 text-red-500 transition border border-red-200 rounded-lg hover:bg-red-50 hover:text-red-600"
              >
                <FaSignOutAlt /> Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/" onClick={toggleMenu} className={linkClasses("/", pathname)}>
                <FaHome /> Accueil
              </Link>

              <Link href="/#formation" onClick={toggleMenu} className={linkClasses("/formations", pathname)}>
                <FaBook /> Formations
              </Link>

              <Link href="/shop" onClick={toggleMenu} className={linkClasses("/shop", pathname)}>
                <FaShoppingCart /> Shop
              </Link>

              <Link
                href="/login"
                onClick={toggleMenu}
                className="flex items-center w-full gap-2 px-5 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <FaSignInAlt /> Connexion
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default LoginLinks
