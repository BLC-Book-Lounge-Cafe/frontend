export type BookReservation = {
  id: number
  bookId: number
  /** ISO-8601 дата бронирования. */
  date: string
  customerName: string
  customerPhone: string
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

function coerceIsoString(value: unknown): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  if (!trimmed) return null
  const parsed = new Date(trimmed)
  return Number.isNaN(parsed.getTime()) ? null : trimmed
}

function pickFirst<T>(
  obj: Record<string, unknown>,
  keys: string[],
  coerce: (v: unknown) => T | null,
): T | null {
  for (const key of keys) {
    const out = coerce(obj[key])
    if (out != null) return out
  }
  return null
}

function pickString(obj: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = obj[key]
    if (typeof value === "string") return value
  }
  return ""
}

export function parseBookReservation(raw: unknown): BookReservation | null {
  if (!raw || typeof raw !== "object") return null
  const obj = raw as Record<string, unknown>

  const id = pickFirst(obj, ["id", "Id"], coerceInt)
  const bookId = pickFirst(obj, ["bookId", "BookId"], coerceInt)
  const date = pickFirst(obj, ["date", "Date"], coerceIsoString)
  if (id == null || bookId == null || !date) return null

  return {
    id,
    bookId,
    date,
    customerName: pickString(obj, ["customerName", "CustomerName"]),
    customerPhone: pickString(obj, ["customerPhone", "CustomerPhone"]),
  }
}
