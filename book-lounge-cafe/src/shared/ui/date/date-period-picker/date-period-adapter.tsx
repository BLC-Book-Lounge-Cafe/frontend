import React from "react"
import type {
  DateRange } from "react-aria-components"
import {
  DateRangePickerStateContext as AriaDateRangePickerStateContext,
  Provider as AriaProvider,
} from "react-aria-components"
import type { DatePeriodState } from "./context"
import { DatePeriodStateContext } from "./context"
import { DatePeriod } from "./types"
import { dateRangeToPeriod, periodToDateRange } from "./utils"

export function DatePeriodAdapter(props: React.PropsWithChildren) {
  const state = React.useContext(AriaDateRangePickerStateContext)
  const [period, setPeriod] = React.useState<DatePeriod>(DatePeriod.day)

  React.useEffect(() => {
    if (period && period !== DatePeriod.custom) {
      const dateRange = periodToDateRange(period)
      console.log("dateRange", period, dateRange)
      state?.setDateRange(dateRange)
    }
  }, [period])

  React.useEffect(() => {
    if (state?.value.start && state.value.end && !period) {
      const period = dateRangeToPeriod(state.value as DateRange)
      setPeriod(period)
    }
  }, [state?.value, period])

  React.useEffect(() => {
    if (!state?.value.start || !state.value.end) {
      const dateRange = periodToDateRange(DatePeriod.day)
      state?.setDateRange(dateRange)
      console.log("effect.setDateRange()", dateRange)
    }
  }, [state?.value])

  const periodState: DatePeriodState = {
    period,
    setPeriod,
    resetPeriod() {
      setPeriod(DatePeriod.day)
      state?.setValue(periodToDateRange(DatePeriod.day))
    },
  }

  return (
    <AriaProvider values={[
      [DatePeriodStateContext, periodState],
    ]}>
      {props.children}
    </AriaProvider>
  )
}
