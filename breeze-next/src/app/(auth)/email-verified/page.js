'use client'

import { useEffect } from 'react'
import { useAuth } from '/src/hooks/auth'
import { useRouter } from 'next/navigation'

export default function EmailVerified() {
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()

    useEffect(() => {
        if (user?.email_verified_at) {
            router.push('/dashboard')
        }
    }, [user])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold">Email vérifié avec succès!</h1>
                <p>Redirection en cours...</p>
            </div>
        </div>
    )
}