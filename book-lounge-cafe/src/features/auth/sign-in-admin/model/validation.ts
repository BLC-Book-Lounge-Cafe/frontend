import { z } from "zod"

export const adminSignInFormSchema = z.object({
  login: z
    .string()
    .trim()
    .min(1, "Введите логин")
    .max(255, "Логин не длиннее 255 символов"),
  password: z
    .string()
    .min(1, "Введите пароль")
    .max(255, "Пароль не длиннее 255 символов"),
})

export type AdminSignInFormValues = z.infer<typeof adminSignInFormSchema>
