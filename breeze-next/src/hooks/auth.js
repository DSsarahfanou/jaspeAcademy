//src/hooks/auth.js
'use client' 
import useSWR from 'swr'
import axios from '/src/lib/axios'
import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response?.status === 409) {
                    router.push('/verify-email')
                }
                throw error
            })
    )

    const getRedirectPath = (role) => {
        const paths = {
            admin: '/dashboard/admin',
            teacher: '/dashboard/animateur',
            student: '/dashboard/apprenant'
        }
        return paths[role] || '/dashboard/apprenant'
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        try {
            await axios.get('/sanctum/csrf-cookie')
            const loginResponse = await axios.post('/login', props)
            
            // Récupère l'utilisateur avec son rôle
            const userResponse = await axios.get('/api/user')
            await mutate()
            
            const role = userResponse.data.role || 'student'
            router.push(getRedirectPath(role))
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            }
            throw error
        }
    }

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }
    

    useEffect(() => {
        if (middleware === 'guest' && user && redirectIfAuthenticated) {
            axios.get('/api/user')
                .then(res => {
                    const role = res.data.role || 'student'
                    router.push(getRedirectPath(role))
                })
        }

        if (middleware === 'auth' && error) {
            logout()
        }
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}

