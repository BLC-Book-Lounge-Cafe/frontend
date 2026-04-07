import React from "react"
import {
  CalendarStateContext,
  RangeCalendarStateContext,
  Heading as AriaHeading,
} from "react-aria-components"
import { useDateFormatter } from "@react-aria/i18n"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

type CalendarHeadingProps = UnsafeStyles & {}

export function CalendarHeading(props: CalendarHeadingProps) {
  const { UNSAFE_style, UNSAFE_className } = props

  const calendarStateContext = React.useContext(CalendarStateContext)
  const rangeCalendarStateContext = React.useContext(RangeCalendarStateContext)
  const { visibleRange, timeZone } = calendarStateContext ?? rangeCalendarStateContext ?? {}

  const monthFormatter = useDateFormatter({
    month: "long",
    year: "numeric",
    calendar: visibleRange?.start.calendar.identifier,
    timeZone,
  })

  const months = React.useMemo(() => {
    if (!visibleRange) {
      return []
    }
    const months: string[] = []
    for (let i = visibleRange.start; i.compare(visibleRange.end) <= 0; i = i.add({ months: 1 })) {
      if (i.month === visibleRange.start.month) {
        i = i.add({ weeks: 1 })
      }
      months.push(monthFormatter.format(i.toDate(timeZone!)))
    }
    return months
  }, [visibleRange, monthFormatter, timeZone])

  return (
    <AriaHeading
      style={UNSAFE_style}
      className={classes(
        "flex items-center justify-between w-full m-0 font-bold",
        UNSAFE_className,
      )}
    >
      {months.map((month, i) => {
        if (i === 0) {
          return (
            <React.Fragment key={month}>
              <div className="grow shrink-0 basis-0 min-w-0 text-center">
                {month}
              </div>
            </React.Fragment>
          )
        } else {
          return (
            // Spacers to account for Next/Previous buttons and gap, spelled out to show the math
            <React.Fragment key={month}>
              <div className="invisible w-9" />
              <div className="invisible w-6" />
              <div className="invisible w-9" />
              <div className="grow shrink-0 basis-0 min-w-0 text-center">{month}</div>
            </React.Fragment>
          )
        }
      })}
    </AriaHeading>
  )
}
