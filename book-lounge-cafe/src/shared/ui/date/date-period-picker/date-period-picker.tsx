import React from "react"
import type {
  DateRangePickerProps as AriaDateRangePickerProps,
  DateValue } from "react-aria-components"
import {
  DateRangePicker as AriaDateRangePicker,
} from "react-aria-components"
import type { LabelableProps } from "@react-types/shared"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import type { Responsive } from "shared/lib/responsive"
import { useResponsive } from "shared/lib/responsive"
import { classes } from "shared/lib/classes"
import { Field } from "shared/ui/field"
import { Popover } from "shared/ui/overlays/popover"
// local
import { DatePeriodAdapter } from "./date-period-adapter"
import { DatePeriodSelect } from "./date-period-select"
import { DatePeriodSegments } from "./date-period-segments"
import { DatePeriodPickerDialog } from "./date-period-dialog"

type DatePeriodPickerProps<T extends DateValue> = (
  LabelableProps
  & UnsafeStyles
  & AriaDateRangePickerProps<T> & {
    layout?: Responsive<"compact" | "default">
    /**
     * The error message to display when the calendar is invalid.
     */
    errorMessage?: React.ReactNode
  }
)

function DatePeriodPicker<T extends DateValue>(props: DatePeriodPickerProps<T>, ref: React.ForwardedRef<HTMLDivElement>) {
  const {
    label = "Период",
    layout: _layout,
    granularity = "day",
    errorMessage,
    ...restProps
  } = props

  const layout = useResponsive(_layout, { base: "compact", md: "default" })

  return (
    <AriaDateRangePicker
      {...restProps}
      ref={ref}
      granularity={granularity}
      style={props.UNSAFE_style}
      className={classes(
        "flex flex-col",
        props.UNSAFE_className,
      )}
    >
      <DatePeriodAdapter>
        <Field.Label>
          {label}
        </Field.Label>
        <div className="flex-1 flex">
          {layout === "compact" ? (
            <DatePeriodSelect
              isInvalid={props.isInvalid}
            />
          ) : (
            <DatePeriodSegments />
          )}
        </div>
        <Popover
          showArrow={false}
          placement="bottom right">
          <DatePeriodPickerDialog />
        </Popover>
        {props.isInvalid && (
          <Field.Error>
            {errorMessage}
          </Field.Error>
        )}
      </DatePeriodAdapter>
    </AriaDateRangePicker>
  )
}

const _DatePeriodPicker = React.forwardRef(DatePeriodPicker)
export { _DatePeriodPicker as DatePeriodPicker }

