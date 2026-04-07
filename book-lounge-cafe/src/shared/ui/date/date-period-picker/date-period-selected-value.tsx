import React from "react"
import { DateRangePickerStateContext as AriaDateRangePickerStateContext } from "react-aria-components"
// local
import { DatePeriod } from "./types"
import { formatPeriodDate } from "./utils"

type DatePeriodSelectedValueProps = {
  period?: DatePeriod
}

export function DatePeriodSelectedValue(props: DatePeriodSelectedValueProps) {
  const { period = DatePeriod.custom } = props
  const rangePickerState = React.useContext(AriaDateRangePickerStateContext)
  const formattedRange = formatPeriodDate(period, rangePickerState?.value)

  return (
    <div className="flex flex-col">
      <span className="text-right tabular-nums">
        {formattedRange}
      </span>
    </div>
  )
}
