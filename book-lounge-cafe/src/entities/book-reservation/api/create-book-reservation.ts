import { axiosInstance } from "api/axios-instance"
import type { BookReservationDto } from "api/api-client/api"

export async function createBookReservation(payload: BookReservationDto) {
  await axiosInstance.post("/book-reservations", payload)
}
