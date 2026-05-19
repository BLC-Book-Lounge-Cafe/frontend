import { useCallback, useState } from "react"
import type { CafeTable } from "entities/table"

type InitialCustomer = {
  customerName?: string
  customerPhone?: string
}

export function useBookingTableModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [table, setTable] = useState<CafeTable | null>(null)
  const [initialCustomer, setInitialCustomer] = useState<InitialCustomer | null>(
    null,
  )

  const open = useCallback((next: CafeTable) => {
    setTable(next)
    setInitialCustomer(null)
    setIsOpen(true)
  }, [])

  const openForCustomer = useCallback((customer: InitialCustomer) => {
    setTable(null)
    setInitialCustomer(customer)
    setIsOpen(true)
  }, [])

  const onOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setTable(null)
      setInitialCustomer(null)
    }
  }, [])

  return {
    isOpen,
    table,
    initialCustomer,
    open,
    openForCustomer,
    onOpenChange,
  }
}
