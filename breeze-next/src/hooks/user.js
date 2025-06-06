// src/hooks/useUser.js
'use client'

import useSWR from 'swr'
import axios from '/src/lib/axios'
import { useState } from 'react'

export const useUser = () => {
  const { data, error, mutate } = useSWR('/api/users', () =>
    axios.get('/users').then(res => res.data.data)
  )

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [status, setStatus] = useState(null)

  const addUser = async (newUser) => {
    setLoading(true)
    setErrors(null)
    setStatus(null)

    try {
      await axios.post('/api/users', newUser)
      await mutate()
      setStatus('Utilisateur ajouté avec succès.')
    } catch (error) {
      setErrors(error.response?.data?.errors || 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id) => {
    setLoading(true)
    setErrors(null)

    try {
      await axios.delete(`/api/users/${id}`)
      await mutate()
      setStatus('Utilisateur supprimé avec succès.')
    } catch (error) {
      setErrors(error.response?.data?.errors || 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (id, updatedData) => {
    setLoading(true)
    setErrors(null)

    try {
      await axios.put(`/api/users/${id}`, updatedData)
      await mutate()
      setStatus('Utilisateur mis à jour.')
    } catch (error) {
      setErrors(error.response?.data?.errors || 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  return {
    users: data,
    error,
    loading,
    errors,
    status,
    addUser,
    deleteUser,
    updateUser,
    mutateusers: mutate,
  }
}
