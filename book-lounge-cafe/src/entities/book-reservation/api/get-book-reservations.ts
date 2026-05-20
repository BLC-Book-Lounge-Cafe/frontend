import { axiosInstance } from "api/axios-instance"
import { parseBookReservation, type BookReservation } from "../model/types"

export type GetBookReservationsParams = {
  bookId?: number
  /** Фильтр по дате бронирования (date-time). */
  date?: string
  pageNumber?: number
  pageSize?: number
}

export type GetBookReservationsResult = {
  items: BookReservation[]
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

/** Только явно заданные query — bookId не уходит в URL без фильтра по книге. */
function toBookReservationsQuery(
  params: GetBookReservationsParams,
): Record<string, string | number> {
  const query: Record<string, string | number> = {}
  if (params.bookId != null && params.bookId > 0) {
    query.bookId = params.bookId
  }
  const date = params.date?.trim()
  if (date) {
    query.date = date
  }
  if (params.pageNumber != null && params.pageNumber >= 1) {
    query.pageNumber = params.pageNumber
  }
  if (params.pageSize != null && params.pageSize >= 1) {
    query.pageSize = params.pageSize
  }
  return query
}

export async function fetchBookReservations(
  params: GetBookReservationsParams = {},
): Promise<GetBookReservationsResult> {
  const { data } = await axiosInstance.get<unknown>("/book-reservations", {
    params: toBookReservationsQuery(params),
  })

  const root = (data && typeof data === "object" ? data : {}) as Record<string, unknown>
  const rawList = pickArray(root, ["bookReservations", "BookReservations"])
  const items = rawList
    .map(parseBookReservation)
    .filter((x): x is BookReservation => x !== null)

  return {
    items,
    pageNumber: pickInt(root, ["pageNumber", "PageNumber"]),
    pageSize: pickInt(root, ["pageSize", "PageSize"]),
    totalEntries: pickInt(root, ["totalEntries", "TotalEntries"]),
    totalPages: pickInt(root, ["totalPages", "TotalPages"]),
  }
}
