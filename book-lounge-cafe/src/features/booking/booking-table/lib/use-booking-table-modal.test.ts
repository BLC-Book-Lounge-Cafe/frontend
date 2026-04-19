import { act, renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import type { CafeTable } from "entities/table"

import { useBookingTableModal } from "./use-booking-table-modal"

const table: CafeTable = { id: 3, seatsCount: 4 }

describe("useBookingTableModal", () => {
  it("open задаёт стол и открывает модалку, onOpenChange(false) сбрасывает стол", () => {
    const { result } = renderHook(() => useBookingTableModal())

    expect(result.current.isOpen).toBe(false)
    expect(result.current.table).toBeNull()

    act(() => {
      result.current.open(table)
    })
    expect(result.current.isOpen).toBe(true)
    expect(result.current.table).toEqual(table)

    act(() => {
      result.current.onOpenChange(false)
    })
    expect(result.current.isOpen).toBe(false)
    expect(result.current.table).toBeNull()
  })
})
