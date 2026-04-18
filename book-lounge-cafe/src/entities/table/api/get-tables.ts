import { axiosInstance } from "api/axios-instance"
import type { GetTablesResponse } from "api/api-client/api"
import type { CafeTable } from "../model/types"

function coerceUInt(value: unknown): number | null {
  if (value == null) return null
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, Math.floor(value))
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value)
    return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : null
  }
  return null
}

function coerceTableId(value: unknown): number | null {
  if (value == null) return null
  if (typeof value === "number" && Number.isFinite(value)) return Math.trunc(value)
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value)
    return Number.isFinite(n) ? Math.trunc(n) : null
  }
  return null
}

export function parseTablesResponse(data: GetTablesResponse): CafeTable[] {
  const raw = data.tables ?? []
  const out: CafeTable[] = []
  for (const row of raw) {
    const id = coerceTableId((row as { id?: unknown }).id)
    if (id == null) continue
    const seats = coerceUInt((row as { seatsCount?: unknown }).seatsCount) ?? 0
    out.push({ id, seatsCount: seats })
  }
  return out
}

export async function fetchTables() {
  const { data } = await axiosInstance.get<GetTablesResponse>("/tables")
  return parseTablesResponse(data)
}
