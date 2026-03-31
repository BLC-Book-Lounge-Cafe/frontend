import React from "react"
// local
import type { Breakpoint } from "./types"

export type BreakpointsContextValue = {
  matched: ReadonlySet<Breakpoint>
  current: Breakpoint
}

export const BreakpointsContext = React.createContext<BreakpointsContextValue>(
  {} as BreakpointsContextValue,
)

export function useBreakpoints() {
  return React.useContext(BreakpointsContext)
}
