import { create } from "zustand"
import { fetchCurrentUser } from "../api/get-current-user"
import type { User } from "./user"

type UserStoreState = {
  user: User | null
  loading: boolean
  error: string | null
  loadUser: () => Promise<void>
  setUser: (user: User | null) => void
  reset: () => void
}

let inFlight: Promise<void> | null = null

export const useUserStore = create<UserStoreState>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  loadUser: () => {
    if (inFlight) return inFlight
    if (get().user) return Promise.resolve()

    set({ loading: true, error: null })

    inFlight = (async () => {
      try {
        const user = await fetchCurrentUser()
        set({ user, loading: false, error: null })
      } catch (err) {
        set({
          user: null,
          loading: false,
          error:
            err instanceof Error && err.message
              ? err.message
              : "Не удалось загрузить пользователя.",
        })
      } finally {
        inFlight = null
      }
    })()

    return inFlight
  },

  setUser: (user) => set({ user, error: null }),
  reset: () => {
    inFlight = null
    set({ user: null, loading: false, error: null })
  },
}))
