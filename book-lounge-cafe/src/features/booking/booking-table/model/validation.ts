import { getLocalTimeZone, parseDate, Time, today, toCalendarDateTime, toZoned } from "@internationalized/date"
import { z } from "zod"


export function calendarDateStringFromField(value: string): string | null {
  if (!value) return null
  try {
    return parseDate(value).toString()
  } catch {
    return null
  }
}

export const phoneMask = "+7 (___) ___-__-__"

/**
 * Форматирует сырой номер телефона (любой из форматов: +7…, 8…, 7…, 10 цифр)
 * в строку, совместимую с маской phoneMask: «+7 (XXX) XXX-XX-XX».
 * Если привести не получается — возвращает исходную строку.
 */
export function formatPhoneToMask(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "")
  const local =
    digits.length === 11 && (digits[0] === "7" || digits[0] === "8")
      ? digits.slice(1)
      : digits.length === 10
        ? digits
        : null

  if (!local) return phone

  return `+7 (${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6, 8)}-${local.slice(8, 10)}`
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
    .min(phoneMask.length, "Укажите телефон")
})

export type BookingTableFormValues = z.infer<typeof bookingTableFormSchema>
