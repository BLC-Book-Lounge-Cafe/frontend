import type {
  CalendarCellProps as AriaCalendarCellProps } from "react-aria-components"
import {
  CalendarCell as AriaCalendarCell,
} from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

type CalendarCellProps = (
  Omit<AriaCalendarCellProps, "children" | "style" | "className">
  & UnsafeStyles & {}
)

export function CalendarCell(props: CalendarCellProps) {
  const {
    UNSAFE_style,
    UNSAFE_className,
  } = props

  return (
    <AriaCalendarCell
      style={UNSAFE_style}
      date={props.date}
      className={(state) => classes(
        "relative w-full pt-[100%] transition-colors duration-[50ms] outline-none",
        state.isOutsideMonth ? [
          "invisible",
        ] : state.isDisabled ? [
          "text-tertiary cursor-default",
        ] : [
          state.isSelected && "bg-accent/10 rounded-0",
          state.isSelectionStart && "text-white rounded-s-3 *:bg-accent",
          state.isSelectionEnd && "text-white rounded-e-3 *:bg-accent",
          state.isHovered && "text-white *:bg-accent/50",
          state.isFocusVisible && "*:ring",
          state.isUnavailable && "text-tertiary *:bg-transparent *:line-through cursor-default",
          state.isInvalid && [
            state.isSelected && "text-negative bg-negative/10",
            state.isSelectionStart && "text-white *:bg-negative",
            state.isSelectionEnd && "text-white *:bg-negative",
            state.isHovered && "text-white *:bg-negative/50",
            state.isFocusVisible && "*:ring-negative/50",
          ],
        ],
        UNSAFE_className,
      )}
    >
      {(state) => (
        <div className={classes(
          "absolute inset-0.5 flex items-center justify-center",
          "leading-none text-body-small xs:text-body rounded-2.5",
          "transition-[inherit] duration-[inherit]",
        )}>
          {state.formattedDate}
        </div>
      )}
    </AriaCalendarCell>
  )
}
