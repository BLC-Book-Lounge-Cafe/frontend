import { axiosInstance } from "api/axios-instance"
import type { TableReservationDto } from "api/api-client/api"

export async function createTableReservation(payload: TableReservationDto) {
  await axiosInstance.post("/table-reservations", payload)
}
