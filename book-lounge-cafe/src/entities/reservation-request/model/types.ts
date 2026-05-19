export type ReservationRequestStatus = "pending" | "confirmed" | "cancelled"

export type ReservationRequest = {
  id: number
  status: ReservationRequestStatus
  customerName: string
  customerPhone: string
  /**
   * ISO-строка с датой создания заявки.
   * На момент разработки бэк её не возвращает (поля нет ни в свагере,
   * ни в реальном ответе), поэтому здесь обычно `null`.
   * Парсер уже умеет читать поля `createdAt` / `createdDate`,
   * чтобы при появлении на сервере ничего больше не править.
   */
  createdAt: string | null
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

function coerceIsoString(value: unknown): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  if (!trimmed) return null
  const parsed = new Date(trimmed)
  return Number.isNaN(parsed.getTime()) ? null : trimmed
}

export function parseReservationRequest(raw: unknown): ReservationRequest | null {
  if (!raw || typeof raw !== "object") return null
  const obj = raw as {
    id?: unknown
    status?: unknown
    customerName?: unknown
    customerPhone?: unknown
    createdAt?: unknown
    createdDate?: unknown
    created_at?: unknown
  }

  const id = coerceId(obj.id)
  if (id == null) return null

  const createdAt =
    coerceIsoString(obj.createdAt) ??
    coerceIsoString(obj.createdDate) ??
    coerceIsoString(obj.created_at)

  return {
    id,
    status: parseReservationRequestStatus(obj.status),
    customerName:
      typeof obj.customerName === "string" ? obj.customerName : "",
    customerPhone:
      typeof obj.customerPhone === "string" ? obj.customerPhone : "",
    createdAt,
  }
}
