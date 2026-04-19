import { act, renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { useReservationModal } from "./use-reservation-modal"

describe("useReservationModal", () => {
  it("open/close переключают isOpen", () => {
    const { result } = renderHook(() => useReservationModal())

    act(() => result.current.open())
    expect(result.current.isOpen).toBe(true)

    act(() => result.current.close())
    expect(result.current.isOpen).toBe(false)
  })
})
