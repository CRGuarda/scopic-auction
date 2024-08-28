import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const useMutate = (path: string, method: 'POST' | 'PUT' | 'DELETE') => {
  const [isLoading, setIsLoading] = useState(false)
  const [randomKey, setRandomKey] = useState(0)
  const [isSuccess, setIsSuccess] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const handleMutate = async (formData?: FormData) => {
    setIsLoading(true)
    await fetch(path, {
      method,
      ...(method !== 'DELETE' ? { body: formData } : {}),
    })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data)
        }
        return data
      })
      .then((data) => {
        setIsSuccess(true)
        setRandomKey(Math.random())
        setData(data)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    data && toast('✅ Success!')
    error && toast('❌ Error! ' + error)
    setError('')
    setData(null)
  }, [data, error])

  return { isLoading, isSuccess, handleMutate, error, randomKey }
}
