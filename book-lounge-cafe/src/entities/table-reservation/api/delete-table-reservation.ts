import { axiosInstance } from "api/axios-instance"

export async function deleteTableReservation(id: number): Promise<void> {
  await axiosInstance.delete(`/table-reservations/${id}`)
}
