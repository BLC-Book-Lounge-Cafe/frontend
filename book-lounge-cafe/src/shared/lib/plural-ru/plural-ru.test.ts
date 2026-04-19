import { describe, expect, it } from "vitest"

import { formatSeatsCount, pluralRu } from "./plural-ru"

const tableForms = ["стол", "стола", "столов"] as const

describe("pluralRu", () => {
  it("возвращает форму для 1, 21, 31 (кроме 11)", () => {
    expect(pluralRu(1, tableForms)).toBe("стол")
    expect(pluralRu(21, tableForms)).toBe("стол")
    expect(pluralRu(31, tableForms)).toBe("стол")
  })

  it("возвращает форму для 2–4 и 22–24 (кроме 12–14)", () => {
    expect(pluralRu(2, tableForms)).toBe("стола")
    expect(pluralRu(3, tableForms)).toBe("стола")
    expect(pluralRu(4, tableForms)).toBe("стола")
    expect(pluralRu(22, tableForms)).toBe("стола")
    expect(pluralRu(23, tableForms)).toBe("стола")
    expect(pluralRu(24, tableForms)).toBe("стола")
  })

  it("возвращает форму для 5–20 и 25–30", () => {
    expect(pluralRu(5, tableForms)).toBe("столов")
    expect(pluralRu(7, tableForms)).toBe("столов")
    expect(pluralRu(11, tableForms)).toBe("столов")
    expect(pluralRu(20, tableForms)).toBe("столов")
    expect(pluralRu(25, tableForms)).toBe("столов")
  })

  it("для 11–14 всегда третья форма", () => {
    expect(pluralRu(11, tableForms)).toBe("столов")
    expect(pluralRu(12, tableForms)).toBe("столов")
    expect(pluralRu(13, tableForms)).toBe("столов")
    expect(pluralRu(14, tableForms)).toBe("столов")
    expect(pluralRu(111, tableForms)).toBe("столов")
    expect(pluralRu(114, tableForms)).toBe("столов")
  })

  it("учитывает знак и дробную часть через trunc", () => {
    expect(pluralRu(-1, tableForms)).toBe("стол")
    expect(pluralRu(-4, tableForms)).toBe("стола")
    expect(pluralRu(-5, tableForms)).toBe("столов")
    expect(pluralRu(2.9, tableForms)).toBe("стола")
    expect(pluralRu(-11.2, tableForms)).toBe("столов")
  })
})

describe("formatSeatsCount", () => {
  it("склеивает целую часть и склонение «место»", () => {
    expect(formatSeatsCount(1)).toBe("1 место")
    expect(formatSeatsCount(2)).toBe("2 места")
    expect(formatSeatsCount(5)).toBe("5 мест")
    expect(formatSeatsCount(11)).toBe("11 мест")
    expect(formatSeatsCount(22)).toBe("22 места")
  })

  it("обрезает дробь по trunc", () => {
    expect(formatSeatsCount(2.7)).toBe("2 места")
    expect(formatSeatsCount(-1.8)).toBe("-1 место")
  })
})
