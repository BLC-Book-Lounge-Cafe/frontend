import React from "react"
// shared
import { useBreakpoints, type Breakpoint } from "shared/lib/breakpoints"

export type MediaQueryManager = {
  min: (key: Breakpoint) => boolean
  max: (key: Breakpoint) => boolean
  between: (min: Breakpoint, max: Breakpoint) => boolean
  only: (key: Breakpoint) => boolean
  not: (key: Breakpoint) => boolean
}

export function useMediaQuery(): MediaQueryManager {
  const breakpoints = useBreakpoints()
  return React.useMemo(() => ({
    min(key) {
      return breakpoints.matched.has(key)
    },
    max(key) {
      return !breakpoints.matched.has(key)
    },
    between(min, max) {
      return this.min(min) && this.max(max)
    },
    only(key) {
      return breakpoints.current === key
    },
    not(key) {
      return breakpoints.current !== key
    },
  } satisfies MediaQueryManager), [breakpoints])
}
