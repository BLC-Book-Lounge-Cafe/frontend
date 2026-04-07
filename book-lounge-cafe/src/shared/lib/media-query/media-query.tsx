import React from "react"
// shared
import { type Breakpoint } from "shared/lib/breakpoints"
// local
import { useMediaQuery, type MediaQueryManager } from "./use-media-query"

type MediaQueryContextValue = {
  mediaQuery: MediaQueryManager
}

const MediaQueryContext = React.createContext(
  {} as MediaQueryContextValue,
)

function useMediaQueryContext() {
  const context = React.useContext(MediaQueryContext)
  if (!context) throw new Error("useMediaQueryContext must be used within a <MediaQueryProvider>")
  return context
}

export type MediaQueryProps = {
  children?: React.ReactNode
}

function MediaQuery(props: MediaQueryProps) {
  const mediaQuery = useMediaQuery()
  return (
    <MediaQueryContext.Provider
      value={{ mediaQuery }}>
      {props.children}
    </MediaQueryContext.Provider>
  )
}

function MediaQueryMin(props: React.PropsWithChildren<{ query: Breakpoint }>) {
  const { mediaQuery } = useMediaQueryContext()
  return <>{mediaQuery.min(props.query) && props.children}</>
}

function MediaQueryMax(props: React.PropsWithChildren<{ query: Breakpoint }>) {
  const { mediaQuery } = useMediaQueryContext()
  return <>{mediaQuery.max(props.query) && props.children}</>
}

function MediaQueryBetween(props: React.PropsWithChildren<{ query: { min: Breakpoint, max: Breakpoint } }>) {
  const { mediaQuery } = useMediaQueryContext()
  return <>{mediaQuery.between(props.query.min, props.query.max) && props.children}</>
}

function MediaQueryOnly(props: React.PropsWithChildren<{ query: Breakpoint }>) {
  const { mediaQuery } = useMediaQueryContext()
  return <>{mediaQuery.only(props.query) && props.children}</>
}

function MediaQueryNot(props: React.PropsWithChildren<{ query: Breakpoint }>) {
  const { mediaQuery } = useMediaQueryContext()
  return <>{mediaQuery.not(props.query) && props.children}</>
}

const _MediaQuery = Object.assign(MediaQuery, {
  Min: MediaQueryMin,
  Max: MediaQueryMax,
  Between: MediaQueryBetween,
  Only: MediaQueryOnly,
  Not: MediaQueryNot,
})

export { _MediaQuery as MediaQuery }

