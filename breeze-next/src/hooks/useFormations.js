'use client'

import useSWR from 'swr'
import axios from '/src/lib/axios'
import { useState } from 'react'

export const useFormations = () => {
  const { data, error, mutate } = useSWR('/api/formations', () =>
    axios.get('/api/formations').then(res => res.data.data)
  )

  
  const [loading, setLoading] = useState(false)

  const deleteFormation = async (id) => {
    setLoading(true)
    try {
      await axios.delete(`/api/formations/${id}`)
      mutate()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return {
    formations: data,
    loading: !data && !error,
    error,
    deleteFormation,
    mutateFormations: mutate
  }
}
