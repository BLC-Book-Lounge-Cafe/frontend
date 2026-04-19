import { describe, expect, it } from "vitest"

import { classes } from "./classes"

describe("classes", () => {
  it("склеивает классы", () => {
    expect(classes("a", "b")).toBe("a b")
  })

  it("поддерживает условные классы", () => {
    expect(classes("base", false && "hidden", true && "block")).toBe("base block")
  })

  it("мерджит конфликтующие tailwind-классы", () => {
    expect(classes("px-2", "px-4")).toBe("px-4")
  })
})

describe("classes.match", () => {
  it("возвращает значение по ключу", () => {
    expect(classes.match("sm", { sm: "w-4", md: "w-8" })).toBe("w-4")
  })

  it("возвращает пустую строку при отсутствии ключа", () => {
    expect(classes.match(null, { sm: "w-4" })).toBe("")
    expect(classes.match("lg", { sm: "w-4" })).toBe("")
  })
})
