import React from "react"
// shared
import { useBreakpoints } from "shared/lib/breakpoints"
// local
import type { Responsive, Static } from "./types"
import { responsive } from "./responsive"

export function useResponsive<T, P extends Responsive<T>>(
  value: P
): Static<P>
export function useResponsive<T, P extends Responsive<T>, F extends Responsive<P>>(
  value: P,
  fallback: F
): NonNullable<Static<P>>
export function useResponsive<T, P extends Responsive<T>, F extends Responsive<P> | undefined = undefined>(
  value: P,
  fallback?: F,
): NonNullable<Static<P>> | Static<P> {
  const breakpoints = useBreakpoints()
  return React.useMemo(() => (
    responsive.resolve(
      breakpoints.matched,
      value,
      // Функция `resolve` корректно обрабатывает случай, когда `fallback` не передан.
      // Утверждение нужно для обхода некоторых трудностей при типизации перегрузок.
      fallback!,
    )
  ), [breakpoints.matched, value, fallback])
}
