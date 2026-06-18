import { useCallback, useEffect, useState } from "react"
import { fetchSpaceState } from "../api/get-space-state"
import { parseAtmosphereFromResponse, type ParsedAtmospherePatch } from "../model/space-state"

const POLL_INTERVAL_MS = 30_000

export function useAtmosphere() {
  const [data, setData] = useState<ParsedAtmospherePatch | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async (options?: { silent?: boolean }) => {
    const silent = options?.silent ?? false

    if (!silent) {
      setLoading(true)
      setError(null)
    }

    try {
      const response = await fetchSpaceState()
      const patch = parseAtmosphereFromResponse(response)
      setData(patch)
      if (silent) {
        setError(null)
      }
    } catch (err) {
      if (!silent) {
        setData(null)
        setError(
          err instanceof Error && err.message
            ? err.message
            : "Не удалось загрузить данные о зале.",
        )
      }
    } finally {
      if (!silent) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    void load()

    const intervalId = setInterval(() => {
      void load({ silent: true })
    }, POLL_INTERVAL_MS)

    return () => {
      clearInterval(intervalId)
    }
  }, [load])

  return {
    data,
    loading,
    error,
    refetch: () => load(),
  }
}
