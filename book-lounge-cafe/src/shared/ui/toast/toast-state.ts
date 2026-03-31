import type { ToastOptions, Toast } from "./types"

class ToastState {
  private subscribers = new Set<Function>()
  private toasts = new Map<string, Toast>()

  public subscribe = (cb: Function): Function => {
    this.subscribers.add(cb)
    return () => this.subscribers.delete(cb)
  }

  public getAll = (): Toast[] => {
    return [...this.toasts.values()]
  }

  public add = (options: ToastOptions): string => {
    const toast = this.create(options)
    this.toasts.set(toast.id, toast)
    this.notify()
    return toast.id
  }

  public remove = (id: string): void => {
    this.toasts.delete(id)
    this.notify()
  }

  private notify = (): void => {
    for (const sub of this.subscribers) {
      sub()
    }
  }

  private create = (options: ToastOptions): Toast => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    return {
      ...options,
      id,
      duration: options.duration ?? 5000,
    }
  }
}

export const toastState = new ToastState()

