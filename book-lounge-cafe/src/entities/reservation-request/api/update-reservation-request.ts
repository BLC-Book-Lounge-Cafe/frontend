import { axiosInstance } from "api/axios-instance"
import {
  parseReservationRequest,
  type ReservationRequest,
  type ReservationRequestStatus,
} from "../model/types"

export async function updateReservationRequestStatus(
  id: number,
  status: ReservationRequestStatus,
): Promise<ReservationRequest> {
  const { data } = await axiosInstance.put(`/reservation-requests/${id}`, {
    status,
  })

  const parsed = parseReservationRequest(data)
  if (parsed) return parsed

  return {
    id,
    status,
    customerName: "",
    customerPhone: "",
  }
}
