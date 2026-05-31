import { useCallback, useState } from "react"

export function useAddMenuCategoryModal() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])

  const onOpenChange = useCallback((next: boolean) => {
    setIsOpen(next)
  }, [])

  return { isOpen, open, onOpenChange }
}
