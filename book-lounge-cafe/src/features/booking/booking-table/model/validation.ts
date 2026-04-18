import { getLocalTimeZone, parseDate, Time, today, toCalendarDateTime, toZoned } from "@internationalized/date"
import { z } from "zod"

/** Согласовано с TableReservationService.CustomerNumberRegex в LRMS. */
const customerPhoneRegex = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d- ]{7,10}$/

export function calendarDateStringFromField(value: string): string | null {
  if (!value) return null
  try {
    return parseDate(value).toString()
  } catch {
    return null
  }
}

/** Начало выбранного календарного дня в локальной таймзоне → ISO для API слотов. */
export function reservationDayToIsoStart(yyyyMmDd: string): string {
  const cal = parseDate(yyyyMmDd)
  const zoned = toZoned(toCalendarDateTime(cal, new Time(0, 0)), getLocalTimeZone())
  return zoned.toDate().toISOString()
}

export const bookingTableFormSchema = z.object({
  tableId: z.number().refine((n) => Number.isFinite(n) && n > 0, "Выберите стол"),
  reservationDate: z
    .string()
    .min(1, "Укажите дату")
    .refine((val) => calendarDateStringFromField(val) !== null, "Неверный формат даты")
    .refine((val) => {
      const d = parseDate(val)
      return d.compare(today(getLocalTimeZone())) >= 0
    }, "Нельзя выбрать прошедшую дату"),
  slotStart: z.string().min(1, "Выберите время"),
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

export type BookingTableFormValues = z.infer<typeof bookingTableFormSchema>
