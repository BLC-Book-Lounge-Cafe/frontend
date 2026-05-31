import React from "react"
import type { Key } from "@react-types/shared"
import * as Aria from "react-aria-components"
import { startOfYear, isSameYear, endOfYear } from "@internationalized/date"
import type { CalendarDate } from "@internationalized/date"
// shared
import { dateFormatter } from "shared/lib/formatters/date-formatter"
import type { SelectProps } from "shared/ui/pickers/select"
import { Select } from "shared/ui/pickers/select"

type MonthItem = { key: number; date: CalendarDate }

type CalendarMonthPickerProps = (
  Omit<SelectProps<MonthItem>, "children" | "items"> & {}
)

export function CalendarMonthPicker(props: CalendarMonthPickerProps) {
  const state = React.useContext(Aria.CalendarStateContext)!

  const startDate = React.useMemo(() => {
    if (!state?.minValue) return startOfYear(state.focusedDate)
    if (isSameYear(state.focusedDate, state.minValue)) return state.minValue
    const isFocusedDateOutOfRange = state.focusedDate.compare(state.minValue) < 0
    return isFocusedDateOutOfRange ? state.minValue : startOfYear(state.focusedDate)
  }, [state])

  const endDate = React.useMemo(() => {
    if (!state?.maxValue) return endOfYear(state.focusedDate)
    if (isSameYear(state.focusedDate, state.maxValue)) return state.maxValue
    const isFocusedDateOutOfRange = state.focusedDate.compare(state.maxValue) > 0
    return isFocusedDateOutOfRange ? state.maxValue : endOfYear(state.focusedDate)
  }, [state])

  const months = React.useMemo(() => {
    const monthsCountIncludingCurrent = Math.abs(startDate.month - endDate.month) + 1
    return Array.from({ length: monthsCountIncludingCurrent }, (_, index) => {
      const date = startDate.add({ months: index })
      return { key: date.month, date }
    })
  }, [endDate.month, startDate])

  const handleSelectionChange = React.useCallback((key: Key | Key[] | null) => {
    if (key == null || Array.isArray(key)) return
    state?.setFocusedDate(state.focusedDate.set({ month: Number(key) }))
  }, [state])

  return (
    <Select
      {...props}
      items={months}
      value={state?.focusedDate?.month}
      onChange={handleSelectionChange}
      aria-label="Месяц"
      placeholder="Выберите месяц"
    >
      {(item) => {
        const month = item as MonthItem
        return (
        <Select.Item key={month.key}>
          <span className="capitalize">
            {dateFormatter.formatMonth(month.date.toDate(state.timeZone))}
          </span>
        </Select.Item>
        )
      }}
    </Select>
  )
}
