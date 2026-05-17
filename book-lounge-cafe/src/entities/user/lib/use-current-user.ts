import { useEffect } from "react"
import { useUserStore } from "../model/user-store"

export function useCurrentUser() {
  const user = useUserStore((s) => s.user)
  const loading = useUserStore((s) => s.loading)
  const error = useUserStore((s) => s.error)
  const loadUser = useUserStore((s) => s.loadUser)

  useEffect(() => {
    void loadUser()
  }, [loadUser])

  return {
    user,
    isAdmin: user?.isAdmin ?? false,
    loading,
    error,
  }
}
