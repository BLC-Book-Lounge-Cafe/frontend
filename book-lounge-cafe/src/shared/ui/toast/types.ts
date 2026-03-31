export type ToastColor = "success" | "accent" | "negative"

export type ToastOptions = {
  title: string
  message?: string | null
  color: ToastColor
  duration?: number
}

export type Toast = ToastOptions & {
  id: string
}

