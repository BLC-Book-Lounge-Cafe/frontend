import React from "react"
import * as Aria from "react-aria-components"
// shared
import type { SelectProps } from "shared/ui/pickers/select"
import { Select } from "shared/ui/pickers/select"
import { dateFormatter } from "shared/lib/formatters/date-formatter"

type CalendarYearPickerProps<T extends object> = (
  Omit<SelectProps<T>, "children" | "items"> & {}
)

export function CalendarYearPicker<T extends object>(props: CalendarYearPickerProps<T>) {
  const state = React.useContext(Aria.CalendarStateContext)!
  const range = 50

  const startDate = React.useMemo(() => {
    if (state.minValue) return state.minValue
    return state.focusedDate.subtract({ years: range })
  }, [state]) // FIXME: лишний ререндер

  const endDate = React.useMemo(() => {
    if (state.maxValue) return state.maxValue
    return state.focusedDate.add({ years: range })
  }, [state]) // FIXME: лишний ререндер

  const years = React.useMemo(() => {
    const yearsCountIncludingCurrent = Math.abs(startDate.year - endDate.year) + 1 // include current year
    return Array.from({ length: yearsCountIncludingCurrent }, (_, index) => {
      const date = endDate.subtract({ years: index })
      return { key: date.year, date }
    })
  }, [endDate, startDate.year]) // FIXME: лишний ререндер

  const handleSelectionChange = (key: Key | null) => {
    state?.setFocusedDate(state.focusedDate.set({ year: Number(key) }))
  }

  return (
    <Select
      {...props}
      items={years}
      value={state?.focusedDate?.year}
      onChange={handleSelectionChange}
      placeholder="Выберите год"
    >
      {(item) => (
        <Select.Item id={item.key}>
          {dateFormatter.formatYear(item.date.toDate(state.timeZone))}
        </Select.Item>
      )}
    </Select>
  )
}
