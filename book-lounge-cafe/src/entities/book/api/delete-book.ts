import { axiosInstance } from "api/axios-instance"

export async function deleteBook(id: number): Promise<void> {
  await axiosInstance.delete(`/books/${id}`)
}
