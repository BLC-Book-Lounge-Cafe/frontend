import { getLocalTimeZone, now } from "@internationalized/date"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "shared/ui/button"
import { TextField } from "shared/ui/text-field"
import { DatePicker } from "shared/ui/date/date-picker"
import { bookingBookFormSchema, bookingDateFromField, phoneMask, type BookingBookFormValues } from "../model/validation"
import { useMask } from "@react-input/mask"

type BookingBookFormProps = {
  onSubmit: (data: BookingBookFormValues) => void | Promise<void>
  isLoading: boolean
}

export function BookingBookForm(props: BookingBookFormProps) {
  const form = useForm<BookingBookFormValues>({
    defaultValues: { customerName: "", customerPhone: "", reservationDate: "" },
    resolver: zodResolver(bookingBookFormSchema),
  })

  const onSubmit: SubmitHandler<BookingBookFormValues> = async (values) => {
    const formattedPhone = values.customerPhone.replace(/[^0-9+]/g, "")

    await props.onSubmit({ ...values, customerPhone: formattedPhone })
  }

  const phoneMaskRef = useMask({
    mask: phoneMask,
    replacement: { _: /\d/ },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={form.control}
        name="customerName"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Имя"
            fullWidth
            placeholder="Как к вам обращаться"
            isRequired
            isInvalid={Boolean(fieldState.invalid && fieldState.error)}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={form.control}
        name="customerPhone"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            inputRef={phoneMaskRef}
            label="Телефон"
            fullWidth
            placeholder={phoneMask}
            isRequired
            isInvalid={Boolean(fieldState.invalid && fieldState.error)}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={form.control}
        name="reservationDate"
        render={({ field, fieldState }) => (
          <DatePicker
            className="w-full"
            label="Дата бронирования"
            granularity="day"
            isDisabledDateInput
            isRequired
            minValue={now(getLocalTimeZone())}
            value={bookingDateFromField(field.value)}
            onChange={(date) => field.onChange(date ? date.toString() : "")}
            isInvalid={Boolean(fieldState.invalid && fieldState.error)}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <div className="flex justify-end pt-2">
        <Button type="submit" isDisabled={props.isLoading}>
          {props.isLoading ? "Отправка…" : "Забронировать"}
        </Button>
      </div>
    </form>
  )
}
