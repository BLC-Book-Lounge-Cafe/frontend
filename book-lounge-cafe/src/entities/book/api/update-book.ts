import { axiosInstance } from "api/axios-instance"
import type { UpdateBookCommand } from "api/api-client/api"

export type UpdateBookPayload = {
  name: string
  author: string
  imageUrl: string
}

export async function updateBook(id: number, payload: UpdateBookPayload): Promise<void> {
  const body: UpdateBookCommand = {
    name: payload.name,
    author: payload.author,
    imageUrl: payload.imageUrl,
  }
  await axiosInstance.put(`/books/${id}`, body)
}
