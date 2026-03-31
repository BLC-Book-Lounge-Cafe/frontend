import React from "react"
import { ToastItem } from "./toast-item"
import { toastState } from "./toast-state"
import { toastManager } from "./toast-manager"
import type { Toast } from "./types"

export function ToastContainer() {
  const [toasts, setToasts] = React.useState<Toast[]>(toastState.getAll())

  React.useEffect(() => {
    const update = () => {
      setToasts([...toastState.getAll()])
    }
    const unsubscribe = toastState.subscribe(update)
    return () => {
      unsubscribe()
    }
  }, [])

  if (toasts.length === 0) {
    return null
  }

  return (
    <div
      className="fixed top-4 right-4 flex flex-col items-end pr-1 z-[9999999] max-h-[80vh] overflow-y-auto overflow-x-hidden"
    >
      {toasts.map((toast) => (
        <div key={toast.id}>
          <ToastItem toast={toast} onDismiss={toastManager.dismiss} />
        </div>
      ))}
    </div>
  )
}

