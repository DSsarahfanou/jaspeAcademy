'use client'

import Button from '/src/components/Button'
import Input from '/src/components/Input'
import InputError from '/src/components/InputError'
import Label from '/src/components/Label'
import Link from 'next/link'
import { useAuth } from '/src/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '/src/app/(auth)/AuthSessionStatus'
// src/app/(auth)/login/page.tsx


const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
//        redirectIfAuthenticated: ,
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <>
            <AuthSessionStatus className="mb-4" status={status} />
                {/* Section gauche avec image */}
                <div className="flex-col items-center justify-center hidden w-1/2 p-8 bg-blue-500 md:flex">
                    <img
                    src="/image/login.png"
                    alt="Étudiante Jaspe"
                    className="object-cover w-full h-full shadow-md"
                    />          
                </div>

                {/* Section droite avec formulaire */}
                <div className="flex flex-col justify-center w-full p-8 md:w-1/2">
                    <div className="mb-6 text-center">
                    
                    <h2 className="text-2xl font-bold text-blue-700">Connexion</h2>
                    <p className="mt-1 text-sm text-gray-500">Veuillez entrer vos informations pour continuer</p>
                    </div>
                    <form onSubmit={submitForm}>
                        {/* Email Address */}
                        <div>
                            <Label htmlFor="email">Email</Label>

                            <Input
                                id="email"
                                type="email"
                                value={email}
                                className="block w-full mt-1"
                                onChange={event => setEmail(event.target.value)}
                                required
                                autoFocus
                            />

                            <InputError messages={errors.email} className="mt-2" />
                        </div>

                        {/* Password */}
                        <div className="mt-4">
                            <Label htmlFor="password">Password</Label>

                            <Input
                                id="password"
                                type="password"
                                value={password}
                                className="block w-full mt-1"
                                onChange={event => setPassword(event.target.value)}
                                required
                                autoComplete="current-password"
                            />

                            <InputError
                                messages={errors.password}
                                className="mt-2"
                            />
                        </div>

                        {/* Remember Me */}
                        <div className="block mt-4">
                            <label
                                htmlFor="remember_me"
                                className="inline-flex items-center">
                                <input
                                    id="remember_me"
                                    type="checkbox"
                                    name="remember"
                                    className="text-indigo-600 border-gray-300 rounded shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    onChange={event =>
                                        setShouldRemember(event.target.checked)
                                    }
                                />

                                <span className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-green-500 underline hover:text-gray-900">
                                Forgot your password?
                            </Link>

                            <Button className="ml-3 bg-blue-500">Login</Button>
                        </div>


                        <div className="flex items-center justify-start mt-4">
                            <Link
                                href="/register"
                                className="text-sm text-blue-500 underline hover:text-gray-900">
                                You don't have an account? Register now
                            </Link>  
                        </div>                 
                    </form>
                </div>

        </>
    )
}

export default Login
