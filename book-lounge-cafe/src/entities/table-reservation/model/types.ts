export type TableReservation = {
  id: number
  tableId: number
  customerName: string
  customerPhone: string
  /** ISO-8601 строка времени начала. */
  startTime: string
  /** ISO-8601 строка времени окончания. */
  endTime: string
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

export function parseTableReservation(raw: unknown): TableReservation | null {
  if (!raw || typeof raw !== "object") return null
  const obj = raw as Record<string, unknown>

  const id = pickFirst(obj, ["id", "Id"], coerceInt)
  const tableId = pickFirst(obj, ["tableId", "TableId"], coerceInt)
  if (id == null || tableId == null) return null

  const startTime = pickFirst(obj, ["startTime", "StartTime"], coerceIsoString)
  const endTime = pickFirst(obj, ["endTime", "EndTime"], coerceIsoString)
  if (!startTime || !endTime) return null

  return {
    id,
    tableId,
    customerName: pickString(obj, ["customerName", "CustomerName"]),
    customerPhone: pickString(obj, ["customerPhone", "CustomerPhone"]),
    startTime,
    endTime,
  }
}
