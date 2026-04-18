import { useCallback, useState } from "react"
import type { CafeTable } from "entities/table"

export function useBookingTableModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [table, setTable] = useState<CafeTable | null>(null)

  const open = useCallback((next: CafeTable) => {
    setTable(next)
    setIsOpen(true)
  }, [])

  const onOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
    if (!open) setTable(null)
  }, [])

  return { isOpen, table, open, onOpenChange }
}
