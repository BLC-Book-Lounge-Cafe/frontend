import { useCallback, useState } from "react"
import type { MenuViewCategory } from "entities/menu"

export function useEditMenuCategoryModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [category, setCategory] = useState<MenuViewCategory | null>(null)

  const open = useCallback((next: MenuViewCategory) => {
    setCategory(next)
    setIsOpen(true)
  }, [])

  const onOpenChange = useCallback((next: boolean) => {
    setIsOpen(next)
    if (!next) setCategory(null)
  }, [])

  return { isOpen, category, open, onOpenChange }
}
