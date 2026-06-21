import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMask } from "@react-input/mask"
import { Button } from "shared/ui/button"
import { TextField } from "shared/ui/text-field"
import { reservationFormSchema, phoneMask, type ReservationFormValues } from "../model/validation"

type ReservationFormProps = {
  onSubmit: (data: ReservationFormValues) => void | Promise<void>
  isLoading: boolean
}

export function ReservationForm(props: ReservationFormProps) {
  const form = useForm<ReservationFormValues>({
    defaultValues: { customerName: "", customerPhone: "" },
    resolver: zodResolver(reservationFormSchema),
  })

  const phoneMaskRef = useMask({
    mask: phoneMask,
    replacement: { _: /\d/ },
  })

  const onSubmit: SubmitHandler<ReservationFormValues> = async (values) => {
    const { customerName, customerPhone } = values;

    const formattedPhone = customerPhone.replace(/[^0-9+]/g, "")

    await props.onSubmit({ customerName, customerPhone: formattedPhone })
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

      <div className="flex justify-end pt-2">
        <Button type="submit" isDisabled={props.isLoading}>
          {props.isLoading ? "Отправка…" : "Отправить заявку"}
        </Button>
      </div>
    </form>
  )
}
