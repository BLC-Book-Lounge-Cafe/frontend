import { AxiosError } from "axios"
import { describe, expect, it } from "vitest"

import { parseBookingBookSubmitError } from "./booking/booking-book/lib/parse-submit-error"
import { parseBookingTableSubmitError } from "./booking/booking-table/lib/parse-submit-error"
import { parseReservationSubmitError } from "./reservation/lib/parse-submit-error"

function axiosErr(message: string, data?: { message?: string }) {
  return new AxiosError(message, "ERR", undefined, undefined, {
    status: 400,
    data,
  })
}

describe("parseBookingTableSubmitError", () => {
  it("читает message из ответа axios", () => {
    expect(parseBookingTableSubmitError(axiosErr("x", { message: "Стол занят" }))).toBe("Стол занят")
  })

  it("fallback на текст ошибки и дефолт", () => {
    expect(parseBookingTableSubmitError(axiosErr("Сеть"))).toBe("Сеть")
    expect(parseBookingTableSubmitError(new Error("Ошибка"))).toBe("Ошибка")
    expect(parseBookingTableSubmitError("строка")).toContain("Не удалось забронировать стол")
  })
})

describe("parseBookingBookSubmitError", () => {
  it("дефолтное сообщение отличается от стола", () => {
    expect(parseBookingBookSubmitError({})).toContain("книгу")
  })
})

describe("parseReservationSubmitError", () => {
  it("дефолтное сообщение про заявку", () => {
    expect(parseReservationSubmitError({})).toContain("заявку")
  })
})
