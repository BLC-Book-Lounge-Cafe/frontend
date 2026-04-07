import React from "react"
// local
import type { DatePeriod } from "./types"

export type DatePeriodState = {
  period: DatePeriod
  setPeriod(period: DatePeriod): void
  resetPeriod(): void
}

export const DatePeriodStateContext = React.createContext<DatePeriodState | null>(null)
