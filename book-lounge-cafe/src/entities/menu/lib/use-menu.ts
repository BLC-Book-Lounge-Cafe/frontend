import { useEffect, useState } from "react"
import { fetchMenu } from "../api/get-menu"
import { parseMenuFromResponse, type MenuViewCategory } from "../model/menu-view"

export function useMenu() {
  const [categories, setCategories] = useState<MenuViewCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const data = await fetchMenu()
        if (cancelled) return

        setCategories(parseMenuFromResponse(data))
        setError(null)
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
  }, [])

  return {
    categories,
    loading,
    error,
  }
}
