import { useCallback, useState } from "react"

export function useReservationModal() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const onOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  return { isOpen, open, close, onOpenChange }
}
