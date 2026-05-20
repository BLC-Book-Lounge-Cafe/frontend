import { z } from "zod"

export const editBookFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Введите название книги")
    .max(255, "Название не длиннее 255 символов"),
  author: z
    .string()
    .trim()
    .min(1, "Введите имя и фамилию автора")
    .max(255, "Имя автора не длиннее 255 символов"),
  imageUrl: z
    .string()
    .trim()
    .min(1, "Добавьте ссылку на изображение")
    .max(2048, "Ссылка слишком длинная"),
})

export type EditBookFormValues = z.infer<typeof editBookFormSchema>

export function bookToEditFormValues(book: {
  title: string
  author: string
  cover: string
}): EditBookFormValues {
  return {
    name: book.title,
    author: book.author,
    imageUrl: book.cover,
  }
}
