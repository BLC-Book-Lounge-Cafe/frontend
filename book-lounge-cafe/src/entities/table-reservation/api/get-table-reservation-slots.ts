import { axiosInstance } from "api/axios-instance"
import type { GetTableReservationSlotsResponse, ReservationSlotDto } from "api/api-client/api"

export type TableReservationSlot = {
  startTime: string
  endTime: string
  isReserved: boolean
}

function normalizeSlot(raw: ReservationSlotDto): TableReservationSlot | null {
  const startTime = raw.startTime
  const endTime = raw.endTime
  if (typeof startTime !== "string" || typeof endTime !== "string") return null
  return {
    startTime,
    endTime,
    isReserved: Boolean(raw.isReserved),
  }
}

export async function fetchTableReservationSlots(tableId: number, dateIso: string) {
  const { data } = await axiosInstance.post<GetTableReservationSlotsResponse>("/table-reservations/slots", {
    tableId,
    date: dateIso,
  })
  const list = data.reservationSlots ?? []
  return list
    .map((s) => normalizeSlot(s))
    .filter((s): s is TableReservationSlot => s !== null)
}
