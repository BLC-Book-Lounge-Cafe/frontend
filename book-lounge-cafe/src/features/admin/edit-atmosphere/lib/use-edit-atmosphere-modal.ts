import { useCallback, useState } from "react"

export function useEditAtmosphereModal() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const onOpenChange = useCallback((next: boolean) => {
    setIsOpen(next)
  }, [])

  return { isOpen, open, close, onOpenChange }
}
