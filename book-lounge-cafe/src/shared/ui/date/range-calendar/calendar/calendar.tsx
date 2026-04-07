import React from "react"
import type {
  CalendarProps as AriaCalendarProps,
  DateValue } from "react-aria-components"
import {
  Calendar as AriaCalendar,
  CalendarContext as AriaCalendarContext,
  Header as AriaHeader,
  HeaderContext as AriaHeaderContext,
  HeadingContext as AriaHeadingContext,
  Provider as AriaProvider,
  useContextProps,
} from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import type { Responsive } from "shared/lib/responsive"
import { useResponsive } from "shared/lib/responsive"
import { classes } from "shared/lib/classes"
import Icon from "shared/ui/Icon"
// local
import { CalendarButton } from "./calendar-button"
import { CalendarHeading } from "./calendar-heading"
import { CalendarGrid } from "./calendar-grid"

type CalendarProps<T extends DateValue> = (
  Omit<AriaCalendarProps<T>, "className" | "style" | "children" | "visibleDuration">
  & UnsafeStyles & {
    /**
     * The number of months to display at once.
     * @default 1
     */
    visibleMonths?: Responsive<number>
    /**
     * The error message to display when the calendar is invalid.
     */
    errorMessage?: React.ReactNode
  }
)

function Calendar<T extends DateValue>(props: CalendarProps<T>, ref: React.ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, AriaCalendarContext)

  const {
    UNSAFE_style,
    UNSAFE_className,
    errorMessage,
    visibleMonths: _visibleMonths,
    isInvalid,
    ...otherProps
  } = props

  const visibleMonths = useResponsive(_visibleMonths, 1)

  return (
    <AriaCalendar
      {...otherProps}
      visibleDuration={{ months: visibleMonths }}
      style={UNSAFE_style}
      className={classes(
        "",
        UNSAFE_className,
      )}
    >
      {(state) => (
        <React.Fragment>
          <AriaProvider values={[
            [AriaHeaderContext, null],
            [AriaHeadingContext, null],
          ]}>
            <AriaHeader>
              <CalendarButton slot="previous">
                <Icon name="chevronLeft" />
              </CalendarButton>
              <CalendarHeading />
              <CalendarButton slot="next">
                <Icon name="chevronRight" />
              </CalendarButton>
            </AriaHeader>
          </AriaProvider>
          <div className="flex flex-row items-start gap-6 w-full">
            {Array.from({ length: visibleMonths }, (_, index) => (
              <CalendarGrid key={index} offset={{ months: index }} />
            ))}
          </div>
          {state.isInvalid && (
            <span
              slot="errorMessage"
              className="mt-1 text-negative break-words">
              {errorMessage}
            </span>
          )}
        </React.Fragment>
      )}
    </AriaCalendar>
  )
}

const _Calendar = Object.assign(
  React.forwardRef(Calendar),
  { Context: AriaCalendarContext },
)

export { _Calendar as Calendar }
