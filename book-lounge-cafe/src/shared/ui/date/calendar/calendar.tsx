import React from "react"
import type { CalendarProps, CalendarRenderProps, DateValue, ContextValue } from "react-aria-components"
import { Calendar, CalendarGrid, CalendarGridHeader, CalendarHeaderCell, CalendarGridBody, CalendarCell, CalendarContext, useContextProps, GroupContext } from "react-aria-components"
// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"
// local
import { CalendarMonthPicker } from "./calendar-month-picker"
import { CalendarYearPicker } from "./calendar-year-picker"

export type AppCalendarProps<T extends DateValue> = (
  Omit<CalendarProps<T>, "className" | "style">
  & UnsafeStyles<CalendarRenderProps> & {}
)

const AppCalendarContext = CalendarContext as React.Context<
  ContextValue<Partial<AppCalendarProps<any>>, HTMLDivElement>
>

function AppCalendar<T extends DateValue>(props: AppCalendarProps<T>, ref: React.ForwardedRef<HTMLDivElement>) {
  [props, ref] = useContextProps(props, ref, AppCalendarContext)

  return (
    <Calendar
      {...props}
      ref={ref}
      style={props.UNSAFE_style}
      className={classes(
        "flex flex-col gap-4",
        props.UNSAFE_className,
      )}
    >
      <GroupContext.Provider value={null}>
        <header className="flex items-center gap-4">
          <CalendarMonthPicker label="Месяц" fullWidth />
          <CalendarYearPicker label="Год" fullWidth />
        </header>
      </GroupContext.Provider>
      <CalendarGrid weekdayStyle="short">
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell className="pb-1 capitalize font-normal text-caption text-accent">
              {day}
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>
        <CalendarGridBody className="[&_td]:w-14 [&_td]:max-w-full [&_td]:p-0.5">
          {(date) => (
            <CalendarCell
              date={date}
              className={(state) => classes(
                "relative w-full pt-[100%] outline-none rounded",
                state.isOutsideMonth && "text-tertiary cursor-default",
                state.isDisabled && "text-secondary cursor-not-allowed",
              )}
            >
              {(state) => (
                <div className={classes(
                  "absolute inset-0 flex items-center justify-center rounded leading-none transition-colors duration-75",
                  state.isHovered && "bg-accent/10 text-accent",
                  state.isFocusVisible && "ring ring-accent/50",
                  state.isSelected && "!text-white !bg-accent",
                  state.isDisabled && "text-secondary cursor-default",
                )}>
                  {state.defaultChildren}
                </div>
              )}
            </CalendarCell>
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </Calendar>
  )
}

const _AppCalendar = Object.assign(React.forwardRef(AppCalendar), {
  Context: AppCalendarContext,
})

export { _AppCalendar as AppCalendar }
