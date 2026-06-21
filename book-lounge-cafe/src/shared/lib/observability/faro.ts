import {
  ErrorsInstrumentation,
  initializeFaro,
  SessionInstrumentation,
  type Faro,
} from "@grafana/faro-web-sdk"

let faro: Faro | null = null

export function initFaro(): Faro | null {
  if (faro) return faro
  if (typeof window === "undefined") return null

  const url = import.meta.env.VITE_FARO_COLLECTOR_URL
  if (!url) {
    if (import.meta.env.DEV) {
      console.warn(
        "[web-vitals] VITE_FARO_COLLECTOR_URL не задан — метрики не отправляются в Grafana Faro (только лог в консоль).",
      )
    }
    return null
  }

  faro = initializeFaro({
    url,
    app: {
      name: import.meta.env.VITE_FARO_APP_NAME ?? "book-lounge-cafe",
      version: import.meta.env.VITE_FARO_APP_VERSION ?? "0.0.0",
      environment: import.meta.env.MODE,
    },
    instrumentations: [
      new ErrorsInstrumentation(),
      new SessionInstrumentation(),
    ],
  })

  return faro
}

export function getFaro(): Faro | null {
  return faro
}
