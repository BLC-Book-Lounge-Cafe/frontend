import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "shared/ui/button"
import { TextField } from "shared/ui/text-field"
import {
  adminSignInFormSchema,
  type AdminSignInFormValues,
} from "../model/validation"

type AdminSignInFormProps = {
  onSubmit: (data: AdminSignInFormValues) => void | Promise<void>
  isLoading: boolean
}

export function AdminSignInForm(props: AdminSignInFormProps) {
  const form = useForm<AdminSignInFormValues>({
    defaultValues: { login: "", password: "" },
    resolver: zodResolver(adminSignInFormSchema),
  })

  const onSubmit: SubmitHandler<AdminSignInFormValues> = async (values) => {
    await props.onSubmit(values)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={form.control}
        name="login"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Логин"
            fullWidth
            placeholder="Введите логин"
            autoComplete="username"
            isRequired
            isInvalid={Boolean(fieldState.invalid && fieldState.error)}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="password"
            label="Пароль"
            fullWidth
            placeholder="Введите пароль"
            autoComplete="current-password"
            isRequired
            isInvalid={Boolean(fieldState.invalid && fieldState.error)}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <div className="pt-2">
        <Button type="submit" fullWidth isDisabled={props.isLoading}>
          {props.isLoading ? "Вход…" : "Войти"}
        </Button>
      </div>
    </form>
  )
}
