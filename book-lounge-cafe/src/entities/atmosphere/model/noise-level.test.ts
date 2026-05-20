import { describe, expect, it } from "vitest"

import {
  getNoiseLevelLabel,
  noiseLevelToProgressPercent,
  parseNoiseLevel,
} from "./noise-level"

describe("parseNoiseLevel", () => {
  it("принимает число и строку 0–5", () => {
    expect(parseNoiseLevel(0)).toBe(0)
    expect(parseNoiseLevel("3")).toBe(3)
    expect(parseNoiseLevel(5)).toBe(5)
  })

  it("отклоняет значения вне диапазона", () => {
    expect(parseNoiseLevel(-1)).toBeUndefined()
    expect(parseNoiseLevel(6)).toBeUndefined()
    expect(parseNoiseLevel("x")).toBeUndefined()
  })
})

describe("getNoiseLevelLabel", () => {
  it("возвращает подписи NoiseLevelType", () => {
    expect(getNoiseLevelLabel(0)).toBe("Очень тихо")
    expect(getNoiseLevelLabel(2)).toBe("Умеренный шум")
    expect(getNoiseLevelLabel(4)).toBe("Заметно оживленно")
    expect(getNoiseLevelLabel(5)).toBe("Концерт с живой музыкой")
  })

  it("возвращает fallback для неизвестного уровня", () => {
    expect(getNoiseLevelLabel(99)).toBe("Не определена")
  })
})

describe("noiseLevelToProgressPercent", () => {
  it("масштабирует 0–5 в 0–100", () => {
    expect(noiseLevelToProgressPercent(0)).toBe(0)
    expect(noiseLevelToProgressPercent(3)).toBe(60)
    expect(noiseLevelToProgressPercent(5)).toBe(100)
  })
})
