import { useState, useCallback } from 'react'
import { submitQuizResult } from '../api/quizApi'

export function useSubmitQuiz() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = useCallback(async (payload) => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await submitQuizResult(payload)
      if (!data || data.mark === undefined) {
        throw new Error('No response received from the server.')
      }
      setResult(data)
      return data
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to submit quiz result. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
    setLoading(false)
  }, [])

  return { result, loading, error, submit, reset }
}