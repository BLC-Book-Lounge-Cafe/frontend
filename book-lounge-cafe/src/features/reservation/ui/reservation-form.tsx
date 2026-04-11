import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "shared/ui/button"
import { TextField } from "shared/ui/text-field"
import { reservationFormSchema, type ReservationFormValues } from "../model/validation"

type ReservationFormProps = {
  onSubmit: (data: ReservationFormValues) => void | Promise<void>
  isLoading: boolean
}

export function ReservationForm(props: ReservationFormProps) {
  const form = useForm<ReservationFormValues>({
    defaultValues: { customerName: "", customerPhone: "" },
    resolver: zodResolver(reservationFormSchema),
  })

  const onSubmit: SubmitHandler<ReservationFormValues> = async (values) => {
    await props.onSubmit(values)
  }

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
            label="Телефон"
            fullWidth
            placeholder="+7 (999) 123-45-67"
            isRequired
            isInvalid={Boolean(fieldState.invalid && fieldState.error)}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <div className="flex justify-end pt-2">
        <Button type="submit" isDisabled={props.isLoading}>
          {props.isLoading ? "Отправка…" : "Отправить заявку"}
        </Button>
      </div>
    </form>
  )
}
