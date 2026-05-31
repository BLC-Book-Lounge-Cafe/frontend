import React from "react"
import type { Key } from "@react-types/shared"
import * as Aria from "react-aria-components"
import type { CalendarDate } from "@internationalized/date"
// shared
import type { SelectProps } from "shared/ui/pickers/select"
import { Select } from "shared/ui/pickers/select"
import { dateFormatter } from "shared/lib/formatters/date-formatter"

type YearItem = { key: number; date: CalendarDate }

type CalendarYearPickerProps = (
  Omit<SelectProps<YearItem>, "children" | "items"> & {}
)

export function CalendarYearPicker(props: CalendarYearPickerProps) {
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

  const handleSelectionChange = (key: Key | Key[] | null) => {
    if (key == null || Array.isArray(key)) return
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
      {(item) => {
        const year = item as YearItem
        return (
        <Select.Item id={year.key}>
          {dateFormatter.formatYear(year.date.toDate(state.timeZone))}
        </Select.Item>
        )
      }}
    </Select>
  )
}
