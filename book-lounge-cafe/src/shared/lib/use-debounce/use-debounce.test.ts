import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { useDebounce } from "./use-debounce"

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("сразу возвращает начальное значение", () => {
    const { result } = renderHook(() => useDebounce("a", 300))
    expect(result.current).toBe("a")
  })

  it("обновляет значение после задержки", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: "a" },
    })

    rerender({ value: "b" })
    expect(result.current).toBe("a")

    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current).toBe("b")
  })

  it("сбрасывает таймер при быстрых изменениях", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: "a" },
    })

    rerender({ value: "b" })
    act(() => {
      vi.advanceTimersByTime(200)
    })
    rerender({ value: "c" })
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(result.current).toBe("a")

    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current).toBe("c")
  })

  it("использует переданный delay", () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 0, delay: 100 },
    })

    rerender({ value: 1, delay: 100 })
    act(() => {
      vi.advanceTimersByTime(99)
    })
    expect(result.current).toBe(0)

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(result.current).toBe(1)
  })

  it("перепланирует при смене delay", () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: "x", delay: 500 },
    })

    rerender({ value: "y", delay: 500 })
    act(() => {
      vi.advanceTimersByTime(200)
    })
    rerender({ value: "y", delay: 1000 })
    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(result.current).toBe("x")

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(result.current).toBe("y")
  })
})
