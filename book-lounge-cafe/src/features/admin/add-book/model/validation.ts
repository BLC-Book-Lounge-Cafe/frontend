import { z } from "zod"

export const addBookFormSchema = z.object({
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

export type AddBookFormValues = z.infer<typeof addBookFormSchema>

export const emptyAddBookValues: AddBookFormValues = {
  name: "",
  author: "",
  imageUrl: "",
}
