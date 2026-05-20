import { axiosInstance } from "api/axios-instance"
import { parseTableReservation, type TableReservation } from "../model/types"

export type GetTableReservationsParams = {
  tableId?: number
  /** ISO дата или date-time (UTC). Бронь активна на этот момент/день. */
  activeAt?: string
  pageNumber?: number
  pageSize?: number
}

export type GetTableReservationsResult = {
  items: TableReservation[]
  pageNumber: number | null
  pageSize: number | null
  totalEntries: number | null
  totalPages: number | null
}

function coerceInt(value: unknown): number | null {
  if (value == null) return null
  if (typeof value === "number" && Number.isFinite(value)) return Math.trunc(value)
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value)
    return Number.isFinite(n) ? Math.trunc(n) : null
  }
  return null
}

function pickArray(obj: Record<string, unknown>, keys: string[]): unknown[] {
  for (const key of keys) {
    const value = obj[key]
    if (Array.isArray(value)) return value
  }
  return []
}

function pickInt(obj: Record<string, unknown>, keys: string[]): number | null {
  for (const key of keys) {
    const out = coerceInt(obj[key])
    if (out != null) return out
  }
  return null
}

export async function fetchTableReservations(
  params: GetTableReservationsParams = {},
): Promise<GetTableReservationsResult> {
  const { data } = await axiosInstance.get<unknown>("/table-reservations", {
    params: {
      tableId: params.tableId,
      activeAt: params.activeAt,
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
    },
  })

  const root = (data && typeof data === "object" ? data : {}) as Record<string, unknown>
  const rawList = pickArray(root, ["tableReservations", "TableReservations"])
  const items = rawList
    .map(parseTableReservation)
    .filter((x): x is TableReservation => x !== null)

  return {
    items,
    pageNumber: pickInt(root, ["pageNumber", "PageNumber"]),
    pageSize: pickInt(root, ["pageSize", "PageSize"]),
    totalEntries: pickInt(root, ["totalEntries", "TotalEntries"]),
    totalPages: pickInt(root, ["totalPages", "TotalPages"]),
  }
}
