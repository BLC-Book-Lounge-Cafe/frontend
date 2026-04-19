import { getLocalTimeZone, today } from "@internationalized/date"
import { describe, expect, it } from "vitest"

import {
  bookingTableFormSchema,
  calendarDateStringFromField,
  reservationDayToIsoStart,
} from "./validation"

describe("calendarDateStringFromField", () => {
  it("возвращает null для пустой или невалидной строки", () => {
    expect(calendarDateStringFromField("")).toBeNull()
    expect(calendarDateStringFromField("32-13-01")).toBeNull()
  })

  it("нормализует валидную дату в строку календаря", () => {
    expect(calendarDateStringFromField("2024-05-01")).toBe("2024-05-01")
  })
})

describe("reservationDayToIsoStart", () => {
  it("возвращает валидный ISO UTC для календарного дня", () => {
    const iso = reservationDayToIsoStart("2024-06-10")
    expect(iso.endsWith("Z")).toBe(true)
    expect(iso).toMatch(/^2024-06-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
    expect(Number.isNaN(Date.parse(iso))).toBe(false)
  })
})

describe("bookingTableFormSchema", () => {
  const base = {
    tableId: 1,
    slotStart: "12:00",
    customerName: "Иван",
    customerPhone: "+79991234567",
  }

  it("принимает валидные данные на сегодня", () => {
    const day = today(getLocalTimeZone()).toString()
    const r = bookingTableFormSchema.safeParse({
      ...base,
      reservationDate: day,
    })
    expect(r.success).toBe(true)
  })

  it("отклоняет прошедшую дату", () => {
    const past = today(getLocalTimeZone()).subtract({ days: 3 }).toString()
    const r = bookingTableFormSchema.safeParse({
      ...base,
      reservationDate: past,
    })
    expect(r.success).toBe(false)
  })

  it("отклоняет невалидный телефон и tableId", () => {
    expect(
      bookingTableFormSchema.safeParse({ ...base, tableId: 0 }).success,
    ).toBe(false)
    expect(
      bookingTableFormSchema.safeParse({ ...base, customerPhone: "abc" }).success,
    ).toBe(false)
  })
})
