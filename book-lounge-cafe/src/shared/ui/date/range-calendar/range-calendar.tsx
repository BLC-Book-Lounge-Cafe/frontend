import React from "react"
import type {
  RangeCalendarProps as AriaRangeCalendarProps,
  DateValue,
  ContextValue } from "react-aria-components"
import {
  RangeCalendar as AriaRangeCalendar,
  Provider as AriaProvider,
  Header as AriaHeader,
  HeaderContext as AriaHeaderContext,
  HeadingContext as AriaHeadingContext,
} from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import type { Responsive } from "shared/lib/responsive"
import { useResponsive } from "shared/lib/responsive"
import Icon from "shared/ui/Icon"
// local
import { CalendarHeading } from "./calendar/calendar-heading"
import { CalendarButton } from "./calendar/calendar-button"
import { CalendarGrid } from "./calendar/calendar-grid"

type RangeCalendarProps<T extends DateValue> = (
  Omit<AriaRangeCalendarProps<T>, "className" | "style" | "children" | "visibleDuration">
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

const RangeCalendarContext = React.createContext<
  ContextValue<Partial<RangeCalendarProps<any>>, HTMLDivElement>
>(null)

function RangeCalendar<T extends DateValue>(props: RangeCalendarProps<T>, ref: React.ForwardedRef<HTMLDivElement>) {
  const {
    UNSAFE_style,
    UNSAFE_className,
    errorMessage,
    visibleMonths: _visibleMonths,
    isInvalid,
    ...otherProps
  } = props

  const visibleMonths = useResponsive(_visibleMonths, { base: 1, sm: 2 })

  return (
    <AriaRangeCalendar
      {...otherProps}
      ref={ref}
      style={UNSAFE_style}
      className={UNSAFE_className}
      pageBehavior="single"
      visibleDuration={{ months: visibleMonths }}
    >
      {(state) => (
        <div className="flex flex-col gap-4 w-full h-full">
          <AriaProvider values={[
            [AriaHeaderContext, null],
            [AriaHeadingContext, null],
          ]}>
            <AriaHeader className="flex items-center justify-between w-full">
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
              <CalendarGrid
                key={index}
                offset={{ months: index }}
              />
            ))}
          </div>

          {state.isInvalid && (
            <span
              slot="errorMessage"
              className="text-negative break-words">
              {errorMessage}
            </span>
          )}
        </div>
      )}
    </AriaRangeCalendar>
  )
}

const _RangeCalendar = Object.assign(
  React.forwardRef(RangeCalendar),
  { Context: RangeCalendarContext },
)

export { _RangeCalendar as RangeCalendar }
