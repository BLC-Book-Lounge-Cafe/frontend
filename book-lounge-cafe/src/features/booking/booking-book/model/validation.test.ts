import { describe, expect, it } from "vitest"

import {
  bookingBookFormSchema,
  bookingDateFromField,
  reservationDateToIsoDateTime,
} from "./validation"

describe("bookingDateFromField", () => {
  it("парсит только дату в формате YYYY-MM-DD", () => {
    expect(bookingDateFromField("")).toBeNull()
    expect(bookingDateFromField("2024-03-02")).not.toBeNull()
    expect(bookingDateFromField("2024-03-02T14:30:00")).toBeNull()
    expect(bookingDateFromField("невалид")).toBeNull()
  })
})

describe("reservationDateToIsoDateTime", () => {
  it("возвращает строку YYYY-MM-DD", () => {
    const result = reservationDateToIsoDateTime("2099-06-15")
    expect(result).toBe("2099-06-15")
    expect(() => reservationDateToIsoDateTime("")).toThrow("Invalid reservation date")
  })
})

describe("bookingBookFormSchema", () => {
  it("принимает будущую дату и корректный телефон", () => {
    const r = bookingBookFormSchema.safeParse({
      customerName: "Пётр",
      customerPhone: "+79991234567",
      reservationDate: "2099-12-31",
    })
    expect(r.success).toBe(true)
  })

  it("отклоняет пустые поля и неверный формат даты", () => {
    expect(
      bookingBookFormSchema.safeParse({
        customerName: "",
        customerPhone: "+79991234567",
        reservationDate: "2099-12-31",
      }).success,
    ).toBe(false)
    expect(
      bookingBookFormSchema.safeParse({
        customerName: "A",
        customerPhone: "+79991234567",
        reservationDate: "not-a-date",
      }).success,
    ).toBe(false)
  })
})
