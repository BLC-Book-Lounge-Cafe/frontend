import React from "react"
import {
  DateRangePickerStateContext as AriaDateRangePickerStateContext,
  PopoverContext,
  useSlottedContext,
} from "react-aria-components"
// shared
import { Segments } from "shared/ui/segments"
import Icon from "shared/ui/Icon"
// local
import { DatePeriod } from "./types"
import { datePeriodOptions } from "./utils"
import { DatePeriodStateContext } from "./context"
import { DatePeriodSelectedValue } from "./date-period-selected-value"

export function DatePeriodSegments() {
  const rangePickerState = React.useContext(AriaDateRangePickerStateContext)
  const periodState = React.useContext(DatePeriodStateContext)
  const popoverContext = useSlottedContext(PopoverContext)

  const handleSegmentChange = (key: Key) => {
    const period = key as DatePeriod
    if (period !== DatePeriod.custom) {
      periodState?.setPeriod(period)
    } else {
      rangePickerState?.open()
    }
  }

  return (
    <Segments.Group
      layout="stretch"
      selectedKey={periodState?.period}
      onSelectionChange={handleSegmentChange}
      UNSAFE_className="flex-1"
    >
      {datePeriodOptions.map((option) => {
        if (option.id !== DatePeriod.custom) {
          return (
            <Segments.Item
              key={option.id}
              id={option.id}>
              {option.label}
            </Segments.Item>
          )
        } else {
          return (
            <>
              <div className="h-full border-r" />

              <Segments.Item
                key={option.id}
                ref={popoverContext?.triggerRef}
                id={option.id}
                UNSAFE_className="!flex-[unset]"
              >
                <span className="flex items-center gap-2">
                  <DatePeriodSelectedValue />
                  <Icon name="calendar" />
                </span>
              </Segments.Item>
            </>
          )
        }
      })}
    </Segments.Group>
  )
}
