/** Книга для карточки в UI (библиотека). */
export type Book = {
  id: number
  title: string
  author: string
  cover: string
  /** Можно оформить бронь (нет активной брони на сегодня). */
  available: boolean
}

/** Поле сортировки на сервере (GraphQL / BookDto): `name` или `author`. */
export type BookSortField = "name" | "author"

/** Поле фильтра при поиске: `name` или `author`. */
export type BookFilterField = "name" | "author"
