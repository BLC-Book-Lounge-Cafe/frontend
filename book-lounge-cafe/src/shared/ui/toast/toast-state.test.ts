import { afterEach, describe, expect, it, vi } from "vitest"

import { toastState } from "./toast-state"

function clearToasts() {
  for (const t of toastState.getAll()) {
    toastState.remove(t.id)
  }
}

afterEach(() => {
  clearToasts()
})

describe("toastState", () => {
  it("add возвращает id и кладёт тост в getAll", () => {
    const id = toastState.add({ title: "Готово", color: "success" })
    expect(id.startsWith("toast-")).toBe(true)
    const list = toastState.getAll()
    expect(list).toHaveLength(1)
    expect(list[0]).toMatchObject({
      id,
      title: "Готово",
      color: "success",
      duration: 5000,
    })
  })

  it("remove удаляет тост", () => {
    const id = toastState.add({ title: "x", color: "accent" })
    toastState.remove(id)
    expect(toastState.getAll()).toHaveLength(0)
  })

  it("subscribe вызывается при add и remove", () => {
    const fn = vi.fn()
    const unsub = toastState.subscribe(fn)
    const id = toastState.add({ title: "a", color: "negative" })
    expect(fn).toHaveBeenCalled()
    fn.mockClear()
    toastState.remove(id)
    expect(fn).toHaveBeenCalled()
    unsub()
    fn.mockClear()
    toastState.add({ title: "b", color: "accent" })
    expect(fn).not.toHaveBeenCalled()
    clearToasts()
  })
})
