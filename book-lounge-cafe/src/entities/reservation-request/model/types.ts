export type ReservationRequestStatus = "pending" | "confirmed" | "cancelled"

export type ReservationRequest = {
  id: number
  status: ReservationRequestStatus
  customerName: string
  customerPhone: string
}

const KNOWN_STATUSES: ReservationRequestStatus[] = [
  "pending",
  "confirmed",
  "cancelled",
]

export function parseReservationRequestStatus(
  value: unknown,
): ReservationRequestStatus {
  if (typeof value !== "string") return "pending"
  const normalized = value.trim().toLowerCase()
  return (KNOWN_STATUSES as string[]).includes(normalized)
    ? (normalized as ReservationRequestStatus)
    : "pending"
}

function coerceId(value: unknown): number | null {
  if (value == null) return null
  if (typeof value === "number" && Number.isFinite(value)) return Math.trunc(value)
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value)
    return Number.isFinite(n) ? Math.trunc(n) : null
  }
  return null
}

export function parseReservationRequest(raw: unknown): ReservationRequest | null {
  if (!raw || typeof raw !== "object") return null
  const obj = raw as {
    id?: unknown
    status?: unknown
    customerName?: unknown
    customerPhone?: unknown
  }

  const id = coerceId(obj.id)
  if (id == null) return null

  return {
    id,
    status: parseReservationRequestStatus(obj.status),
    customerName:
      typeof obj.customerName === "string" ? obj.customerName : "",
    customerPhone:
      typeof obj.customerPhone === "string" ? obj.customerPhone : "",
  }
}
