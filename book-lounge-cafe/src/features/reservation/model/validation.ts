import { z } from "zod"

export const phoneMask = "+7 (___) ___-__-__"

export const reservationFormSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(1, "Укажите имя")
    .max(255, "Имя не длиннее 255 символов"),
  customerPhone: z
    .string()
    .trim()
    .min(phoneMask.length, "Укажите телефон")
})

export type ReservationFormValues = z.infer<typeof reservationFormSchema>
