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
import AuthCard from '/src/app/(auth)/AuthCard'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Lottie from "lottie-react";
import loadingAnimation from "/public/loading.json"; 


const Login = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const { login } = useAuth({
        middleware: 'guest',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [showPassword, setShowPassword] = useState(false);

    const getRedirectPath = (role) => {
        const paths = {
            admin: '/dashboard/admin',
            teacher: '/dashboard/animateur',
            student: '/dashboard/apprenant',
        };
        return paths[role] || '/dashboard/apprenant';
    };

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    }, [router.reset, errors])

    const submitForm = async event => {
        event.preventDefault();
        setLoading(true);

        const user = await login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        });

        // petite pause pour laisser le loader s’afficher
        setTimeout(() => {
            const role = user.role || 'student';
            router.push(getRedirectPath(role));
        }, 500);
    };


    return (
        <AuthCard image="/image/login.png">
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-blue-700">Connexion</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Veuillez entrer vos informations pour continuer
                </p>
            </div>

            <AuthSessionStatus className="mb-4" status={status} />

            {loading ? (
                <div className="flex justify-center">
                    <Lottie animationData={loadingAnimation} loop={true} className="w-32 h-32" />
                </div>
                ) : (

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
                    <div className="relative mt-4">
                        <Label htmlFor="password">Mot de passe</Label>

                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            className="block w-full mt-1"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer right-3 top-2/3"
                        >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>                    
                        <InputError messages={errors.password} className="mt-2" />
                    </div>

                    {/* Remember Me */}
                    <div className="block mt-4">
                        <label htmlFor="remember_me" className="inline-flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="text-indigo-600 border-gray-300 rounded shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={event => setShouldRemember(event.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-green-500 underline hover:text-gray-900"
                        >
                            Mot de passe oublié ?
                        </Link>

                        <Button className="ml-3 bg-blue-500">Connexion</Button>
                    </div>

                    <div className="flex items-center justify-start mt-4">
                        <Link
                            href="/register"
                            className="text-sm text-blue-500 underline hover:text-gray-900"
                        >
                            Pas encore de compte ? Inscrivez-vous
                        </Link>
                    </div>
                </form>
            )}    
        </AuthCard>
    )
}

export default Login
