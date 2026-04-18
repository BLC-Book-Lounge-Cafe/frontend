import {
  getLocalTimeZone,
  now,
  parseDate,
  parseDateTime,
  Time,
  toCalendarDateTime,
  toZoned,
  type CalendarDateTime,
} from "@internationalized/date"
import { z } from "zod"

/** Согласовано с ReservationRequestService.CustomerNumberRegex в LRMS. */
const customerPhoneRegex = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d- ]{7,10}$/

/**
 * Строка из формы: ISO date+time без таймзоны (`CalendarDateTime#toString()`)
 * или устаревший только день `YYYY-MM-DD`.
 */
export function bookingDateFromField(value: string): CalendarDateTime | null {
  if (!value) return null
  try {
    if (/^\d{4}-\d{2}-\d{2}T/.test(value)) {
      return parseDateTime(value)
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return toCalendarDateTime(parseDate(value), new Time(0, 0))
    }
    return null
  } catch {
    return null
  }
}

function zonedReservationFromField(value: string) {
  const dt = bookingDateFromField(value)
  return dt ? toZoned(dt, getLocalTimeZone()) : null
}

export const bookingBookFormSchema = z.object({
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
  reservationDate: z
    .string()
    .min(1, "Укажите дату и время")
    .refine((val) => bookingDateFromField(val) !== null, "Неверный формат даты и времени")
    .refine((val) => {
      const zoned = zonedReservationFromField(val)
      return zoned ? zoned.compare(now(getLocalTimeZone())) >= 0 : false
    }, "Нельзя выбрать прошедшее время"),
})

export type BookingBookFormValues = z.infer<typeof bookingBookFormSchema>

export function reservationDateToIsoDateTime(value: string): string {
  const zoned = zonedReservationFromField(value)
  if (!zoned) throw new Error("Invalid reservation date")
  return zoned.toDate().toISOString()
}
