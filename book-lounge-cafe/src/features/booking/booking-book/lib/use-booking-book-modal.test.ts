import { act, renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { useBookingBookModal } from "./use-booking-book-modal"

describe("useBookingBookModal", () => {
  it("open/close и onOpenChange управляют isOpen", () => {
    const { result } = renderHook(() => useBookingBookModal())

    act(() => {
      result.current.open()
    })
    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.close()
    })
    expect(result.current.isOpen).toBe(false)

    act(() => {
      result.current.onOpenChange(true)
    })
    expect(result.current.isOpen).toBe(true)
  })
})
