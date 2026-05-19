import { axiosInstance } from "api/axios-instance"
import type { GetReservationRequestsResponse } from "api/api-client/api"
import {
  parseReservationRequest,
  type ReservationRequest,
  type ReservationRequestStatus,
} from "../model/types"

export type GetReservationRequestsParams = {
  status?: ReservationRequestStatus
  createdDate?: string
  pageNumber?: number
  pageSize?: number
}

export type GetReservationRequestsResult = {
  items: ReservationRequest[]
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

export async function fetchReservationRequests(
  params: GetReservationRequestsParams = {},
): Promise<GetReservationRequestsResult> {
  const { data } = await axiosInstance.get<GetReservationRequestsResponse>(
    "/reservation-requests",
    {
      params: {
        status: params.status,
        createdDate: params.createdDate,
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
      },
    },
  )

  const items = (data.reservationRequests ?? [])
    .map(parseReservationRequest)
    .filter((x): x is ReservationRequest => x !== null)

  return {
    items,
    pageNumber: coerceInt(data.pageNumber),
    pageSize: coerceInt(data.pageSize),
    totalEntries: coerceInt(data.totalEntries),
    totalPages: coerceInt(data.totalPages),
  }
}
