import { useEffect, useState } from "react"
import { fetchTables } from "../api/get-tables"
import type { CafeTable } from "../model/types"

export function useTables() {
  const [tables, setTables] = useState<CafeTable[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const list = await fetchTables()
        if (cancelled) return
        setTables(list)
        setError(null)
      } catch (err) {
        if (!cancelled) {
          setTables([])
          setError(
            err instanceof Error && err.message
              ? err.message
              : "Не удалось загрузить список столов.",
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

  return { tables, loading, error }
}
