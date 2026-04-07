import type {
  CalendarGridProps as AriaCalendarGridProps } from "react-aria-components"
import {
  CalendarGrid as AriaCalendarGrid,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarGridBody as AriaCalendarGridBody,
} from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"
// local
import { CalendarHeaderCell } from "./calendar-header-cell"
import { CalendarCell } from "./calendar-cell"

type CalendarGridProps = (
  Omit<AriaCalendarGridProps, "children" | "className" | "style">
  & UnsafeStyles & {}
)

export function CalendarGrid(props: CalendarGridProps) {
  const {
    UNSAFE_style,
    UNSAFE_className,
    weekdayStyle = "short",
    ...restProps
  } = props

  return (
    <AriaCalendarGrid
      {...restProps}
      weekdayStyle={weekdayStyle}
      style={UNSAFE_style}
      className={classes(
        "w-full border-collapse border-spacing-0 isolate [&_td]:p-0",
        "table-fixed w-full [&_td]:p-0",
        UNSAFE_className,
      )}
    >
      <AriaCalendarGridHeader>
        {(day) => <CalendarHeaderCell children={day} />}
      </AriaCalendarGridHeader>
      <AriaCalendarGridBody className="[&_td]:py-0.5">
        {(date) => <CalendarCell date={date} />}
      </AriaCalendarGridBody>
    </AriaCalendarGrid>
  )
}
