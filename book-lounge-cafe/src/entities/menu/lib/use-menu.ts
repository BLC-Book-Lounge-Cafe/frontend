import { useCallback, useEffect, useState } from "react"
import { fetchMenu } from "../api/get-menu"
import { parseMenuFromResponse, type MenuViewCategory } from "../model/menu-view"

export function useMenu() {
  const [categories, setCategories] = useState<MenuViewCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    const data = await fetchMenu()
    setCategories(parseMenuFromResponse(data))
    setError(null)
  }, [])

  const refetch = useCallback(async () => {
    setLoading(true)
    try {
      await load()
    } catch (err) {
      setCategories([])
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Не удалось загрузить меню.",
      )
    } finally {
      setLoading(false)
    }
  }, [load])

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        await load()
      } catch (err) {
        if (!cancelled) {
          setCategories([])
          setError(
            err instanceof Error && err.message
              ? err.message
              : "Не удалось загрузить меню.",
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [load])

  return {
    categories,
    loading,
    error,
    refetch,
  }
}
