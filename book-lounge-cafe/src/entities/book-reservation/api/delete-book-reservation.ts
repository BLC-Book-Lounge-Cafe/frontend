import { axiosInstance } from "api/axios-instance"

export async function deleteBookReservation(id: number): Promise<void> {
  await axiosInstance.delete("/book-reservations", {
    params: { id },
  })
}
