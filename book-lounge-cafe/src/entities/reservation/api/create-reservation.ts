import { axiosInstance } from "api/axios-instance"
import type { CreateReservationRequestCommand } from "api/api-client/api"

export async function createReservation(payload: CreateReservationRequestCommand) {
  await axiosInstance.post("/reservation-requests", payload)
}
