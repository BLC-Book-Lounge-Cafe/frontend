import { onCLS, onINP, onLCP, type Metric } from "web-vitals/attribution"
import { getFaro } from "./faro"
import { getVitalsContext } from "./vitals-context"

function extractTarget(metric: Metric): string {
  const attribution = (
    metric as unknown as { attribution?: Record<string, unknown> }
  ).attribution

  if (!attribution || typeof attribution !== "object") return ""

  const candidate =
    attribution.interactionTarget ??
    attribution.largestShiftTarget ??
    attribution.element ??
    attribution.url

  return candidate ? String(candidate) : ""
}

function report(metric: Metric): void {
  const ctx = getVitalsContext()
  const faro = getFaro()

  if (faro) {
    faro.api.pushMeasurement(
      {
        type: "web-vitals",
        values: { [metric.name.toLowerCase()]: metric.value },
      },
      {
        context: {
          metric: metric.name,
          id: metric.id,
          rating: metric.rating,
          navigation_type: metric.navigationType ?? "",
          is_admin: String(ctx.isAdmin),
          route: ctx.route,
          page: ctx.page,
          modal: ctx.modal ?? "",
          target: extractTarget(metric),
        },
      },
    )
    return
  }

  if (import.meta.env.DEV) {
    console.debug(`[web-vitals] ${metric.name}`, Math.round(metric.value), {
      rating: metric.rating,
      isAdmin: ctx.isAdmin,
      route: ctx.route,
      page: ctx.page,
      modal: ctx.modal,
      target: extractTarget(metric),
    })
  }
}

/**
 * Подписывается на LCP, INP и CLS и отправляет каждый замер в Grafana Faro
 * вместе с контекстом (isAdmin / route / adminModal). Вызывать один раз
 * при старте приложения.
 */
export function reportWebVitals(): void {
  onLCP(report)
  onINP(report)
  onCLS(report)
}
