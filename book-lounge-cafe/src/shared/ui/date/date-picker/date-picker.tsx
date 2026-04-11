import React, { useContext } from "react"
import type { HelpTextProps } from "@react-types/shared"
import { CalendarDateTime, Time } from "@internationalized/date"
import type {
  DatePickerProps,
  DateValue,
  ContextValue,
  TimeValue } from "react-aria-components"
import {
  DatePicker,
  DatePickerContext,
  DateField,
  useContextProps,
  Provider,
  CalendarContext,
  DatePickerStateContext,
} from "react-aria-components"
// shared
import Icon from "shared/ui/Icon"
import { Button } from "shared/ui/button"
import { Calendar } from "shared/ui/date/calendar"
import { DateInput } from "shared/ui/date/date-input"
import { Field } from "shared/ui/field"
import { Dialog } from "shared/ui/overlays/dialog"
import { Popover } from "shared/ui/overlays/popover"
import { classes } from "shared/lib/classes"
import { useMediaQuery } from "shared/lib/media-query"
import type { Nullable } from "shared/model/types/nullable"
// local
import { HoursPicker } from "./hours-picker"

export type AppDatePickerProps<T extends DateValue> = Omit<
  DatePickerProps<T>,
  "validationBehavior" | "validate"
> &
HelpTextProps & {
  isDisabledDateInput?: boolean
  isBold?: boolean
  isRequired?: boolean
  label?: React.ReactNode
  description?: React.ReactNode
  errorMessage?: React.ReactNode
}

const AppDatePickerContext = DatePickerContext as React.Context<
  ContextValue<Partial<AppDatePickerProps<any>>, HTMLDivElement>
>

function AppDatePicker<T extends DateValue>(
  props: AppDatePickerProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  [props, ref] = useContextProps(props, ref, AppDatePickerContext)

  const {
    label,
    isBold,
    isRequired,
    description,
    errorMessage,
    isDisabledDateInput,
    className,
  } = props

  return (
    <DatePicker
      {...props}
      ref={ref}
      validationBehavior="aria"
      className={classes("inline-flex flex-col min-w-[unset]", className)}
    >
      {(dateState) => (
        <>
          <Field.Label isBold={isBold} isRequired={isRequired}>{label}</Field.Label>

          <Field.Group UNSAFE_className="pl-0 cursor-auto">
            <Button
              variant="plain"
              size="sm"
              UNSAFE_className="p-0.5 shrink-0 ml-1.5"
            >
              <Icon name="calendar" />
            </Button>
            <DateField
              className={(state) =>
                classes(
                  state.isDisabled &&
                  "pointer-events-none",
                )}
              isDisabled={isDisabledDateInput}
            >
              <DateInput UNSAFE_className="flex-1 flex items-center h-full pl-3">
                {(segment) => (
                  <DateInput.Segment
                    UNSAFE_className={classes(
                      isDisabledDateInput && "pointer-events-none",
                    )}
                    segment={segment}
                  />
                )}
              </DateInput>
            </DateField>
          </Field.Group>

          {(errorMessage || description) && (
            <div className="min-h-[20px]">
              {!dateState.isInvalid ? (
                <Field.Description>{description}</Field.Description>
              ) : (
                <Field.Error>{errorMessage}</Field.Error>
              )}
            </div>
          )}

          <Popover showArrow={false}>
            <CalendarDialog {...props} />
          </Popover>
        </>
      )}
    </DatePicker>
  )
}

interface CalendarDialogProps<T extends DateValue> extends AppDatePickerProps<T> {}

function CalendarDialog<T extends DateValue>(props: CalendarDialogProps<T>) {
  const mediaQuery = useMediaQuery()
  const isMediaXs = mediaQuery.max("sm")

  const datePickerState = useContext(DatePickerStateContext)

  const [dateValue, setDateValue] = React.useState<Nullable<DateValue>>(() =>
    datePickerState?.dateValue ?? null,
  )

  const [timeValue, setTimeValue] = React.useState<Nullable<TimeValue>>(() => {
    if (datePickerState?.dateValue && "hour" in datePickerState.dateValue) {
      return new Time(
        datePickerState.dateValue.hour,
        datePickerState.dateValue.minute,
      )
    }
    return null
  })

  const handleApply = React.useCallback(() => {
    if (dateValue) {
      let finalDate: DateValue = dateValue

      if (props.granularity === "minute" && timeValue) {
        finalDate = new CalendarDateTime(
          dateValue.year,
          dateValue.month,
          dateValue.day,
          timeValue.hour,
          timeValue.minute,
        )
      }

      datePickerState?.setValue(finalDate)
      datePickerState?.close()
    }
  }, [dateValue, timeValue, props.granularity, datePickerState])

  const handleReset = () => {
    datePickerState?.setValue(null)
    datePickerState?.close()
  }

  return (
    <Provider
      values={[
        [CalendarContext, {
          onChange: (value) => {
            setDateValue(value)
            // Если granularity="minute", сбрасываем время при изменении даты
            if (props.granularity === "minute") {
              setTimeValue((prev) => prev ?? new Time(0, 0))
            }
          },
          value: dateValue,
        }],
      ]}
    >
      <Dialog
        rounded={1}
        UNSAFE_className={
          props.granularity === "minute" && !isMediaXs ? "w-xs" : "w-[18.75rem]"
        }
      >
        <div className="flex flex-col gap-2 sm:flex-row mb-2">
          <Calendar />
          {props.granularity === "minute" && (
            <HoursPicker value={timeValue} onChange={setTimeValue} />
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="plain"
            fullWidth
            onPress={handleReset}>
            Сбросить
          </Button>
          <Button fullWidth onPress={handleApply}>
            Применить
          </Button>
        </div>
      </Dialog>
    </Provider>
  )
}

const _AppDatePicker = Object.assign(React.forwardRef(AppDatePicker), {
  Context: AppDatePickerContext,
})

export { _AppDatePicker as AppDatePicker }
