import React from "react"
import type { DateRange } from "react-aria-components"
import { DateRangePickerStateContext as AriaDateRangePickerStateContext, Collection, useSlottedContext } from "react-aria-components"
// shared
import type { Nullable } from "shared/model/types/nullable"
import { Popover } from "shared/ui/overlays/popover"
import type { SelectProps } from "shared/ui/pickers/select"
import { Select } from "shared/ui/pickers/select"
import { Button } from "shared/ui/button"
import { Divider } from "shared/ui/divider"
import Icon from "shared/ui/Icon"
// local
import { classes } from "shared/lib/classes"
import { DatePeriodStateContext } from "./context"
import type { DatePeriodOption } from "./utils"
import { formatPeriodDate, datePeriodOptions } from "./utils"
import { DatePeriod } from "./types"

type DatePeriodSelectProps = (
  Omit<SelectProps<DatePeriodOption>, "children" | "items"> & {}
)

export function DatePeriodSelect(props: DatePeriodSelectProps) {
  const rangePickerState = React.useContext(AriaDateRangePickerStateContext)
  const datePeriodState = React.useContext(DatePeriodStateContext)
  const popoverContext = useSlottedContext(Popover.Context)

  const handleSelectionChange = (key: Nullable<Key>) => {
    const period = key as DatePeriod
    if (period !== DatePeriod.custom) {
      datePeriodState?.setPeriod(period)
    } else {
      rangePickerState?.open()
    }
  }

  return (
    <div className="flex-1 flex">
      <Select
        {...props}
        items={datePeriodOptions}
        value={datePeriodState?.period}
        onChange={handleSelectionChange}
        UNSAFE_className="w-full min-w-0 data-[group]:*:rounded-r-0"
      >
        <Collection
          items={datePeriodOptions}
          dependencies={[
            rangePickerState?.value.start,
            rangePickerState?.value.end,
            datePeriodState?.period,
          ]}
        >
          {(item) => {
            if (item.id !== DatePeriod.custom) {
              return (
                <Select.Item id={item.id}>
                  {item.label} {formatPeriodDate(item.id)}
                </Select.Item>
              )
            } else {
              const formattedDate = formatPeriodDate(
                DatePeriod.custom,
                rangePickerState?.value as DateRange,
              )
              return (
                <Select.Item
                  id={item.id}
                  key={datePeriodState?.period}
                  textValue={formattedDate}
                  UNSAFE_className="hidden">
                  {formattedDate}
                </Select.Item>
              )
            }
          }}
        </Collection>
      </Select>
      <Divider
        orientation="vertical"
        UNSAFE_className={classes(
          props.isInvalid && "border-negative/50",
        )}
      />
      <Button
        ref={popoverContext?.triggerRef}
        variant="tinted"
        tone={props.isInvalid ? "negative" : "accent"}
        size="md"
        UNSAFE_className="rounded-l-0"
        onClick={() => rangePickerState?.open()}
        aria-label="Произвольно">
        <Icon name="calendar" />
      </Button>
    </div>
  )
}
