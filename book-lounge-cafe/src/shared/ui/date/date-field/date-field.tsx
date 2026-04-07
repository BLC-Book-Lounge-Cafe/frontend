import React from "react"
import type {
  DateFieldProps as AriaDateFieldProps,
  DateValue } from "react-aria-components"
import {
  DateField as AriaDateField,
} from "react-aria-components"
import type { LabelableProps } from "@react-types/shared"

import { Field } from "shared/ui/field"
import { DateInput } from "shared/ui/date/date-input"
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"

export type DateFieldProps<T extends DateValue> = (
  UnsafeStyles
  & LabelableProps
  & Omit<AriaDateFieldProps<T>, "className" | "style" | "children"> & {}
)

function DateField<T extends DateValue>(props: DateFieldProps<T>, ref: React.ForwardedRef<HTMLDivElement>) {
  const {
    UNSAFE_style,
    UNSAFE_className,
    label,
  } = props

  return (
    <AriaDateField
      {...props}
      ref={ref}
      style={UNSAFE_style}
      className={classes(UNSAFE_className)}
    >
      <Field.Label>
        {label}
      </Field.Label>
      <Field.Group>
        <DateInput>
          {(segment) => <DateInput.Segment segment={segment} />}
        </DateInput>
      </Field.Group>
    </AriaDateField>
  )
}

const _DateField = React.forwardRef(DateField)
export { _DateField as DateField }
