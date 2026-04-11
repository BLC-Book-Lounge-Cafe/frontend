import { useEffect, useState } from "react"
import { fetchSpaceState } from "../api/get-space-state"
import { parseAtmosphereFromResponse, type ParsedAtmospherePatch } from "../model/space-state"

export function useAtmosphere() {
  const [data, setData] = useState<ParsedAtmospherePatch  | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const data = await fetchSpaceState()
        if (cancelled) return

        const patch = parseAtmosphereFromResponse(data)
        if (!patch) {
          if (!cancelled) setError(null)
          setLoading(false)
          return
        }

        if (!cancelled) {
          setData(patch);
          setError(null)
        }

      } catch (err) {
        if (!cancelled) {
          setData(null);
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
  }
}
