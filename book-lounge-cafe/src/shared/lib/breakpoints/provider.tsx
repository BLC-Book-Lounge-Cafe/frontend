import React from "react"
import { useIsSSR } from "@react-aria/ssr"
// local
import type { Breakpoint } from "./types"
import { breakpoints } from "./constants"
import { BreakpointsContext, useBreakpoints, type BreakpointsContextValue } from "./context"

type BreakpointsProviderProps = {
  children: React.ReactNode
}

const breakpointsEntries = Object.entries(breakpoints).sort(([, a], [, b]) => (parseInt(a) > parseInt(b) ? 1 : -1)) as [Breakpoint, string][]
const mediaQueries = breakpointsEntries.map(([key, value]) => [key, `(min-width: ${value})`] as [Breakpoint, string])
const supportsMatchMedia = typeof window !== "undefined" && typeof window.matchMedia === "function"

const getMatchedBreakpoints = (): Breakpoint[] => {
  return mediaQueries.reduce<Breakpoint[]>((combined, entry) => {
    const isMatched = window.matchMedia(entry[1]).matches
    if (isMatched) combined.push(entry[0])
    return combined
  }, ["base"])
}

export function BreakpointsProvider(props: BreakpointsProviderProps) {
  const { children } = props

  const isSSR = useIsSSR()

  const [breakpoints, setBreakpoints] = React.useState<ReadonlySet<Breakpoint>>(() => (
    new Set(supportsMatchMedia ? getMatchedBreakpoints() : ["base" as const])
  ))

  // If in SSR, the media query should never match.
  // Once the page hydrates, this will update and the real value will be returned.
  const matched: ReadonlySet<Breakpoint> = React.useMemo(() => (
    isSSR ? new Set(["base"]) : breakpoints
  ), [breakpoints, isSSR])

  const current: Breakpoint = React.useMemo(() => (
    [...matched].pop() || "base"
  ), [matched])

  React.useEffect(() => {
    if (!supportsMatchMedia) return

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mediaQueriesList = mediaQueries.map(([_, query]) => window.matchMedia(query))

    const handleMediaQueryChange = () => {
      const matchedBreakpoints = getMatchedBreakpoints()
      setBreakpoints((prev) => {
        if (prev.size === matchedBreakpoints.length) return prev
        else return new Set(matchedBreakpoints)
      })
    }

    handleMediaQueryChange()

    // Добавление обработчиков медиазапросов
    mediaQueriesList.forEach((mql) => {
      mql.addEventListener("change", handleMediaQueryChange)
    })

    return () => {
      // Очистка обработчиков медиазапросов
      mediaQueriesList.forEach((mql) => {
        mql.removeEventListener("change", handleMediaQueryChange)
      })
    }
  }, [])

  const value: BreakpointsContextValue = React.useMemo(() => ({
    matched,
    current,
  }), [current, matched])

  return (
    <BreakpointsContext.Provider value={value}>
      {children}
      <BreakpointIndicator />
    </BreakpointsContext.Provider>
  )
}

/** @private */ function BreakpointIndicator() {
  const breakpoints = useBreakpoints()
  return (
    <div className="fixed z-[99999] top-1 left-1 px-1 text-white dark:text-black bg-black dark:bg-white rounded-1">
      {breakpoints.current}
    </div>
  )
}
