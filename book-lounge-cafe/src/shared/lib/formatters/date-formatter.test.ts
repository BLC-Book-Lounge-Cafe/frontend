import { afterEach, describe, expect, it, vi } from "vitest"

import { dateFormatter } from "./date-formatter"

afterEach(() => {
  vi.restoreAllMocks()
})

describe("dateFormatter", () => {
  it("возвращает сообщение для некорректной даты", () => {
    expect(dateFormatter.format("not-a-date")).toBe("Некорректная дата")
    expect(dateFormatter.format(new Date("invalid"))).toBe("Некорректная дата")
  })

  it("форматирует валидную дату", () => {
    const d = new Date(Date.UTC(2024, 0, 15, 12, 0, 0))
    expect(dateFormatter.format(d)).toMatch(/2024/)
    expect(dateFormatter.format(d, { day: "2-digit", month: "2-digit" })).toMatch(/15/)
  })

  it("formatIso парсит ISO-строку", () => {
    expect(dateFormatter.formatIso("2024-06-01T00:00:00.000Z", { year: "numeric" })).toBe("2024")
  })

  it("formatYear и formatMonth", () => {
    const iso = "2024-03-10T00:00:00.000Z"
    expect(dateFormatter.formatYear(iso)).toBe("2024")
    expect(dateFormatter.formatMonth(iso)).toMatch(/март/i)
    expect(dateFormatter.formatYear(new Date(Date.UTC(2024, 2, 15, 12, 0, 0)))).toBe("2024")
    expect(dateFormatter.formatMonth(new Date(Date.UTC(2024, 2, 15, 12, 0, 0)))).toMatch(/март/i)
  })

  it("toIsoLocal учитывает getTimezoneOffset", () => {
    const spy = vi.spyOn(Date.prototype, "getTimezoneOffset").mockReturnValue(0)
    expect(dateFormatter.toIsoLocal("2024-01-15T10:00:00.000Z")).toMatch(/^2024-01-15T10:00:00\.000$/)
    spy.mockRestore()
  })
})
