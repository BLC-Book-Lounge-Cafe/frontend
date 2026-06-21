import { useEffect } from "react"
import { useUserStore } from "entities/user"
import { setActiveModal, setVitalsAdmin, setVitalsPage } from "./vitals-context"

export function useWebVitalsContext(): void {
  const isAdmin = useUserStore((s) => s.user?.isAdmin ?? false)

  useEffect(() => {
    setVitalsAdmin(isAdmin)
  }, [isAdmin])
}

export function usePageVitals(name: string): void {
  useEffect(() => {
    setVitalsPage(name)
    return () => setVitalsPage("")
  }, [name])
}

export function useModalVitals(name: string, isOpen: boolean): void {
  useEffect(() => {
    if (!isOpen) return
    setActiveModal(name)
    return () => setActiveModal(null)
  }, [name, isOpen])
}
