import type { BookFilterField, BookSortField } from "../model/types"

export const BOOKS_PAGE_SIZE = 12

export function buildBooksPageQueryVariables(
  page: number,
  searchTrimmed: string,
  searchField: BookFilterField,
  sortField: BookSortField,
) {
  const skip = (page - 1) * BOOKS_PAGE_SIZE
  const take = BOOKS_PAGE_SIZE

  const filter =
    searchTrimmed.length > 0
      ? {
          propertyFilters: [{ fieldName: searchField, value: searchTrimmed }],
        }
      : undefined

  const sorter = {
    propertyName: sortField,
    descendingOrder: false,
  }

  return { skip, take, filter, sorter }
}
