import { useCallback, useEffect, useState } from "react"
import { fetchSpaceState } from "../api/get-space-state"
import { parseAtmosphereFromResponse, type ParsedAtmospherePatch } from "../model/space-state"

export function useAtmosphere() {
  const [data, setData] = useState<ParsedAtmospherePatch | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchSpaceState()
      const patch = parseAtmosphereFromResponse(response)
      setData(patch)
    } catch (err) {
      setData(null)
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Не удалось загрузить данные о зале.",
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const response = await fetchSpaceState()
        if (cancelled) return

        const patch = parseAtmosphereFromResponse(response)
        setData(patch)
        setError(null)
      } catch (err) {
        if (!cancelled) {
          setData(null)
          setError(
            err instanceof Error && err.message
              ? err.message
              : "Не удалось загрузить данные о зале.",
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return {
    data,
    loading,
    error,
    refetch: load,
  }
}
