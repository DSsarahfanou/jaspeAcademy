
///home/danae/stage_jaspe/breeze-next/src/app/(app)/Navigation.js
'use client'

import ApplicationLogo from '/src/components/ApplicationLogo'
import Dropdown from '/src/components/Dropdown'
import Link from 'next/link'
import NavLink from '/src/components/NavLink'
import ResponsiveNavLink, { ResponsiveNavButton } from '/src/components/ResponsiveNavLink'
import { DropdownButton } from '/src/components/DropdownLink'
import { useAuth } from '/src/hooks/auth'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import UserAvatar from '/src/components/UserAvatar'
import { useRouter } from 'next/navigation'

const Navigation = ({ user }) => {
    const { logout } = useAuth()
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    return (
        <nav className="bg-white border-b border-gray-100 ">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo + Lien dashboard */}
                    <div className="flex items-center -ml-16">
                        {/* <Link
                            className="flex items-center gap-2 text-2xl font-bold text-blue-600 transition-transform hover:scale-105"
                            href="/">
                            <ApplicationLogo />
                        </Link> */}

                    </div>

                    {/* Avatar & Menu */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <Dropdown
                            align="right"
                            width="48"
                            trigger={
                                <button className="flex items-center gap-2 focus:outline-none">
                                    <UserAvatar user={user} size={40} />
                                    <svg
                                        className="w-4 h-4 text-gray-500 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            }>
                            <DropdownButton onClick={() => router.push('/dashboard/profile')}>
                                Profile
                            </DropdownButton>

                            <DropdownButton onClick={logout}>Déconnexion</DropdownButton>
                        </Dropdown>
                    </div>

                    {/* Hamburger (mobile) */}
                    <div className="flex items-center -mr-2 sm:hidden">
                        <button
                            onClick={() => setOpen(o => !o)}
                            className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                {open ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {open && (
                <div className="sm:hidden">
                    {/* <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href="/dashboard" active={pathname === '/dashboard'}>
                            Tableau de bord
                        </ResponsiveNavLink>
                    </div> */}

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="flex items-center px-4 space-x-3">
                            <UserAvatar user={user} size={40} />
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavButton  onClick={() => router.push('/dashboard/profile')} > 
                                Profile
                            </ResponsiveNavButton>
                            <ResponsiveNavButton onClick={logout}>
                                Déconnexion
                            </ResponsiveNavButton>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navigation
