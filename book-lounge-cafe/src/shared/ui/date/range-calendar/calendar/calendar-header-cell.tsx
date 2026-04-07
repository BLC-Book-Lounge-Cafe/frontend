import type {
  CalendarHeaderCellProps as AriaCalendarHeaderCellProps,
} from "react-aria-components"
import {
  CalendarHeaderCell as AriaCalendarHeaderCell,
} from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

type CalendarHeaderCellProps = (
  Omit<AriaCalendarHeaderCellProps, "children" | "className" | "style">
  & UnsafeStyles & {
    children?: React.ReactNode
  }
)

export function CalendarHeaderCell(props: Omit<CalendarHeaderCellProps, "children"> & React.PropsWithChildren) {
  const {
    UNSAFE_style,
    UNSAFE_className,
    children,
    ...rest
  } = props

  return (
    <AriaCalendarHeaderCell
      {...rest}
      style={UNSAFE_style}
      className={classes(
        "pb-1 uppercase font-normal text-caption text-accent/60 cursor-default",
        UNSAFE_className,
      )}
    >
      {children}
    </AriaCalendarHeaderCell>
  )
}
