import { describe, expect, it } from "vitest"

import { numberFormatter } from "./number-formatter"

describe("numberFormatter", () => {
  it("форматирует число по умолчанию (ru-RU, до 2 знаков)", () => {
    expect(numberFormatter.format(1234.5)).toMatch(/1[\s\u00A0]234,5/)
    expect(numberFormatter.format(7)).toBe("7")
  })

  it("учитывает переданные опции Intl", () => {
    expect(numberFormatter.format(3.14159, { maximumFractionDigits: 3 })).toMatch(/3,142/)
    expect(numberFormatter.format(1000, { style: "currency", currency: "RUB", maximumFractionDigits: 0 }))
      .toMatch(/1[\s\u00A0]000/)
  })
})
