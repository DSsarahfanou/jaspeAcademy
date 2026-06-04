"use client"

import Button from '/src/components/Button'
import { useAuth } from '/src/hooks/auth'
import { useState, useEffect } from 'react'

export default function Page() {
    const { user, logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState(null)

    // Rediriger si l'email est déjà vérifié
    useEffect(() => {
        if (user?.email_verified_at) {
            window.location.href = '/dashboard'
        }
    }, [user])

// src/app/verify-email/page.jsx
// 'use client'
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Button from '/src/components/Button'
// import { useAuth } from '/src/hooks/auth'

// export default function VerifyEmail() {
//        const { user, logout, resendEmailVerification } = useAuth()
//        const [status, setStatus] = useState(null)



// useEffect(() => {
//   if (typeof window !== 'undefined') {
//     const params = new URL(window.location.href).searchParams
//     const token = params.get('token')
    
//     if (token) {
//       localStorage.setItem('token', token)
//       router.push('/dashboard')
//     }
//   }
// }, [])



    return (
        <>
            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just
                emailed to you? If you didn't receive the email, we will gladly
                send you another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <div className="flex items-center justify-between mt-4">
                <Button onClick={() => resendEmailVerification({ setStatus })}>
                    Resend Verification Email
                </Button>

                <button
                    type="button"
                    className="text-sm text-gray-600 underline hover:text-gray-900"
                    onClick={logout}>
                    Logout
                </button>
            </div>
        </>
    )
}
