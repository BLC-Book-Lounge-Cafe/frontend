import React from "react"
import type { DateRange } from "react-aria-components"
import { DateRangePickerStateContext as AriaDateRangePickerStateContext } from "react-aria-components"
// shared
import type { Nullable } from "shared/model/types/nullable"
// local
import { DatePeriod } from "./types"
import { formatPeriodDate } from "./utils"

type DatePeriodSelectedValueProps = {
  period?: DatePeriod
}

export function DatePeriodSelectedValue(props: DatePeriodSelectedValueProps) {
  const { period = DatePeriod.custom } = props
  const rangePickerState = React.useContext(AriaDateRangePickerStateContext)
  const formattedRange = period === DatePeriod.custom
    ? formatPeriodDate(DatePeriod.custom, rangePickerState?.value as Nullable<DateRange>)
    : formatPeriodDate(period)

  return (
    <div className="flex flex-col">
      <span className="text-right tabular-nums">
        {formattedRange}
      </span>
    </div>
  )
}
