import { describe, expect, it } from "vitest"

import { reservationFormSchema } from "./validation"

describe("reservationFormSchema", () => {
  it("принимает валидные имя и телефон", () => {
    const r = reservationFormSchema.safeParse({
      customerName: " Анна ",
      customerPhone: "8 (999) 123-45-67",
    })
    expect(r.success).toBe(true)
    if (r.success) {
      expect(r.data.customerName).toBe("Анна")
    }
  })

  it("отклоняет пустое имя и неверный телефон", () => {
    expect(
      reservationFormSchema.safeParse({
        customerName: "   ",
        customerPhone: "+79991234567",
      }).success,
    ).toBe(false)
    expect(
      reservationFormSchema.safeParse({
        customerName: "Имя",
        customerPhone: "123",
      }).success,
    ).toBe(false)
  })
})
