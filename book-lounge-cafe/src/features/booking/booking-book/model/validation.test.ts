import { describe, expect, it } from "vitest"

import {
  bookingBookFormSchema,
  bookingDateFromField,
  reservationDateToIsoDateTime,
} from "./validation"

describe("bookingDateFromField", () => {
  it("парсит день и дату-время", () => {
    expect(bookingDateFromField("")).toBeNull()
    expect(bookingDateFromField("2024-03-02")).not.toBeNull()
    expect(bookingDateFromField("2024-03-02T14:30:00")).not.toBeNull()
    expect(bookingDateFromField("невалид")).toBeNull()
  })
})

describe("reservationDateToIsoDateTime", () => {
  it("конвертирует валидное значение в ISO", () => {
    const iso = reservationDateToIsoDateTime("2099-06-15T12:30:00")
    expect(iso).toContain("2099-06-15")
    expect(() => reservationDateToIsoDateTime("")).toThrow("Invalid reservation date")
  })
})

describe("bookingBookFormSchema", () => {
  it("принимает будущую дату и корректный телефон", () => {
    const r = bookingBookFormSchema.safeParse({
      customerName: "Пётр",
      customerPhone: "+79991234567",
      reservationDate: "2099-12-31T15:00:00",
    })
    expect(r.success).toBe(true)
  })

  it("отклоняет пустые поля и неверный формат даты", () => {
    expect(
      bookingBookFormSchema.safeParse({
        customerName: "",
        customerPhone: "+79991234567",
        reservationDate: "2099-12-31T15:00:00",
      }).success,
    ).toBe(false)
    expect(
      bookingBookFormSchema.safeParse({
        customerName: "A",
        customerPhone: "+79991234567",
        reservationDate: "not-datetime",
      }).success,
    ).toBe(false)
  })
})
