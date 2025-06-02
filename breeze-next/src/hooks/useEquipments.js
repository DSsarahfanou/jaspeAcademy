// src/hooks/useEquipment.js
'use client'

import useSWR from 'swr'
import axios from '/src/lib/axios'
import { useState } from 'react'

export const useEquipment = () => {
  const { data, error, mutate } = useSWR('/api/equipments', () =>
    axios.get('/equipments').then(res => res.data.data)
  )

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [status, setStatus] = useState(null)

  const addEquipment = async (newEquipment) => {
    setLoading(true)
    setErrors(null)
    setStatus(null)

    try {
      await axios.post('/api/equipments', newEquipment)
      await mutate()
      setStatus('Équipement ajouté avec succès.')
    } catch (error) {
      setErrors(error.response?.data?.errors || 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  const deleteEquipment = async (id) => {
    setLoading(true)
    setErrors(null)

    try {
      await axios.delete(`/api/equipments/${id}`)
      await mutate()
      setStatus('Équipement supprimé avec succès.')
    } catch (error) {
      setErrors(error.response?.data?.errors || 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  const updateEquipment = async (id, updatedData) => {
    setLoading(true)
    setErrors(null)

    try {
      await axios.put(`/api/equipments/${id}`, updatedData)
      await mutate()
      setStatus('Équipement mis à jour.')
    } catch (error) {
      setErrors(error.response?.data?.errors || 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  return {
    equipments: data,
    error,
    loading,
    errors,
    status,
    addEquipment,
    deleteEquipment,
    updateEquipment,
    mutateEquipments: mutate,
  }
}
