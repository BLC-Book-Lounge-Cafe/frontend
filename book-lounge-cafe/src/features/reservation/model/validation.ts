import { z } from "zod"

/** Согласовано с ReservationRequestService.CustomerNumberRegex в LRMS. */
const customerPhoneRegex = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d- ]{7,10}$/

export const reservationFormSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(1, "Укажите имя")
    .max(255, "Имя не длиннее 255 символов"),
  customerPhone: z
    .string()
    .trim()
    .min(1, "Укажите телефон")
    .regex(customerPhoneRegex, "Номер не соответствует формату"),
})

export type ReservationFormValues = z.infer<typeof reservationFormSchema>
