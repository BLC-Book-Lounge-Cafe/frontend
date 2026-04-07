import React from "react"
import type {
  DateRange,
  DateValue } from "react-aria-components"
import {
  RangeCalendarContext as AriaRangeCalendarContext,
  GroupContext as AriaGroupContext,
  DateFieldContext as AriaDateFieldContext,
  DateRangePickerStateContext as AriaDateRangePickerStateContext,
  OverlayTriggerStateContext as AriaOverlayTriggerStateContext,
  Provider as AriaProvider,
} from "react-aria-components"
// shared
import { Dialog } from "shared/ui/overlays/dialog"
import type { Nullable } from "shared/model/types/nullable"
import { RangeCalendar } from "shared/ui/date/range-calendar"
import { Button } from "shared/ui/button"
import { DateField } from "shared/ui/date/date-field"
// local
import { DatePeriod } from "./types"
import { DatePeriodStateContext } from "./context"

export function DatePeriodPickerDialog() {
  const rangePickerState = React.useContext(AriaDateRangePickerStateContext)
  const datePeriodState = React.useContext(DatePeriodStateContext)
  const [dateRange, setDateRange] = React.useState<Nullable<DateRange>>(rangePickerState?.value as Nullable<DateRange>)

  const handleChange = (key: keyof DateRange, value: Nullable<DateValue>) => {
    setDateRange((prev) => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    datePeriodState?.resetPeriod()
    rangePickerState?.close()
  }

  const handleApply = () => {
    if (dateRange) {
      rangePickerState?.setDateRange(dateRange)
      datePeriodState?.setPeriod(DatePeriod.custom)
      rangePickerState?.close()
    }
  }

  return (
    <Dialog UNSAFE_className="max-w-xxs md:max-w-sm">
      <AriaProvider values={[
        [AriaDateRangePickerStateContext, null],
        [AriaRangeCalendarContext, null],
        [AriaGroupContext, null],
        [AriaDateFieldContext, null],
        [AriaOverlayTriggerStateContext, null],
      ]}>
        <Dialog.Content>
          <div className="flex flex-col gap-4">
            <div>
              <RangeCalendar
                value={dateRange?.start && dateRange.end ? dateRange : null}
                onChange={setDateRange}
                visibleMonths={{ base: 1, md: 2 }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-center font-bold">Выбранный период</p>
              <div className="flex items-center gap-2">
                <DateField
                  granularity="day"
                  value={dateRange?.start}
                  onChange={(value) => handleChange("start", value)}
                  UNSAFE_className="flex-1"
                />
                <span>-</span>
                <DateField
                  granularity="day"
                  value={dateRange?.end}
                  onChange={(value) => handleChange("end", value)}
                  UNSAFE_className="flex-1"
                />
              </div>
            </div>
          </div>
        </Dialog.Content>
        <Dialog.Footer>
          <div className="flex justify-end gap-4 w-full">
            <Button
              variant="plain"
              onPress={handleReset}>
              Сбросить
            </Button>
            <Button
              variant="filled"
              onPress={handleApply}>
              Применить
            </Button>
          </div>
        </Dialog.Footer>
      </AriaProvider>
    </Dialog>
  )
}
