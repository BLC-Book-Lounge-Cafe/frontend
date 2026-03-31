import type { ToastOptions } from "./types"
import { toastState } from "./toast-state"

export const toastManager = Object.freeze({
  show: (options: ToastOptions): string => {
    return toastState.add(options)
  },

  dismiss: (id: string): void => {
    toastState.remove(id)
  },
})

