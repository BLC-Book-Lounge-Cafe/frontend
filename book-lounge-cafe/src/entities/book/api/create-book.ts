import { axiosInstance } from "api/axios-instance"
import type { BookDto, CreateBookCommand } from "api/api-client/api"

export type CreateBookPayload = {
  name: string
  author: string
  imageUrl: string
}

export async function createBook(payload: CreateBookPayload): Promise<BookDto> {
  const body: CreateBookCommand = {
    name: payload.name,
    author: payload.author,
    imageUrl: payload.imageUrl,
  }
  const { data } = await axiosInstance.post<BookDto>("/books", body)
  return data
}
