import { afterEach, describe, expect, it, vi } from "vitest"

import { toastManager } from "./toast-manager"
import { toastState } from "./toast-state"

afterEach(() => {
  for (const t of toastState.getAll()) {
    toastState.remove(t.id)
  }
})

describe("toastManager.show", () => {
  it("добавляет тост в стор и возвращает валидный id", () => {
    const id = toastManager.show({ title: "Готово", color: "success" })

    expect(id).toMatch(/^toast-/)
    expect(toastState.getAll()).toHaveLength(1)
    expect(toastState.getAll()[0]).toMatchObject({ id, title: "Готово", color: "success" })
  })

  it("применяет duration 5000 по умолчанию", () => {
    toastManager.show({ title: "x", color: "accent" })

    expect(toastState.getAll()[0].duration).toBe(5000)
  })

  it("сохраняет кастомный duration", () => {
    toastManager.show({ title: "x", color: "negative", duration: 2000 })

    expect(toastState.getAll()[0].duration).toBe(2000)
  })

  it("уведомляет подписчиков при добавлении", () => {
    const fn = vi.fn()
    const unsub = toastState.subscribe(fn)

    toastManager.show({ title: "x", color: "accent" })
    expect(fn).toHaveBeenCalledOnce()

    unsub()
  })
})

describe("toastManager.dismiss", () => {
  it("удаляет тост из стора по id", () => {
    const id = toastManager.show({ title: "Удалить", color: "success" })
    expect(toastState.getAll()).toHaveLength(1)

    toastManager.dismiss(id)
    expect(toastState.getAll()).toHaveLength(0)
  })

  it("уведомляет подписчиков при удалении", () => {
    const id = toastManager.show({ title: "a", color: "accent" })
    const fn = vi.fn()
    const unsub = toastState.subscribe(fn)

    toastManager.dismiss(id)
    expect(fn).toHaveBeenCalledOnce()

    unsub()
  })

  it("не выбрасывает ошибку при несуществующем id", () => {
    expect(() => toastManager.dismiss("non-existent-id")).not.toThrow()
    expect(toastState.getAll()).toHaveLength(0)
  })
})
