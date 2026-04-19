import { describe, expect, it } from "vitest"

import type { Breakpoint } from "shared/lib/breakpoints"

import { responsive } from "./responsive"

function matchedSet(...bps: Breakpoint[]): ReadonlySet<Breakpoint> {
  return new Set(bps)
}

describe("responsive", () => {
  describe("isResponsive", () => {
    it("распознаёт объект с ключом брейкпоинта", () => {
      expect(responsive.isResponsive({ base: 1 })).toBe(true)
      expect(responsive.isResponsive({ md: "a", base: "b" })).toBe(true)
    })

    it("возвращает false для примитива и массива", () => {
      expect(responsive.isResponsive(10)).toBe(false)
      expect(responsive.isResponsive("x")).toBe(false)
      expect(responsive.isResponsive([1, 2])).toBe(false)
      expect(responsive.isResponsive({ foo: 1 })).toBe(false)
    })
  })

  describe("resolve", () => {
    it("возвращает значение как есть, если оно не адаптивное", () => {
      expect(responsive.resolve(matchedSet("md"), 42)).toBe(42)
    })

    it("возвращает null", () => {
      expect(responsive.resolve(matchedSet("md"), null)).toBeNull()
    })

    it("при value === null не подставляет fallback", () => {
      expect(responsive.resolve(matchedSet("md"), null, { base: 1 })).toBeNull()
    })

    it("при value === undefined использует fallback и base", () => {
      expect(responsive.resolve(matchedSet("md"), undefined, { base: 2 })).toBe(2)
    })

    it("выбирает последнее совпадение по порядку matched (с конца)", () => {
      const value = { base: "a", md: "b", lg: "c" }
      expect(responsive.resolve(matchedSet("base", "md", "lg"), value)).toBe("c")
      expect(responsive.resolve(matchedSet("base", "md"), value)).toBe("b")
      expect(responsive.resolve(matchedSet("base"), value)).toBe("a")
    })
  })
})
