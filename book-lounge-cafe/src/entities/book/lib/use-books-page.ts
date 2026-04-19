import { useCallback, useMemo, useState } from "react"
import { useBooksPageQuery } from "api/graphql/generated/graphql"
import { useDebounce } from "shared/lib/use-debounce"
import { buildBooksPageQueryVariables, BOOKS_PAGE_SIZE } from "./books-page-query"
import { mapBookDtoToBook } from "./map-book-dto"
import type { Book, BookFilterField, BookSortField } from "../model/types"

const SEARCH_DEBOUNCE_MS = 500

type PageState = { filterKey: string; page: number }

export function useBooksPage() {
  const [searchQuery, setSearchQueryState] = useState("")
  const [searchField, setSearchFieldState] = useState<BookFilterField>("name")
  const [sortBy, setSortByState] = useState<BookSortField>("author")

  const debouncedSearchRaw = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS)
  const debouncedSearchTrimmed = debouncedSearchRaw.trim()

  const filterKey = useMemo(
    () => `${debouncedSearchTrimmed}|${searchField}|${sortBy}`,
    [debouncedSearchTrimmed, searchField, sortBy],
  )

  const [pageState, setPageState] = useState<PageState>(() => ({
    filterKey: `|name|author`,
    page: 1,
  }))

  if (pageState.filterKey !== filterKey) {
    setPageState({ filterKey, page: 1 })
  }

  const pageForQuery =
    pageState.filterKey !== filterKey ? 1 : pageState.page

  const setSearchQuery = useCallback((value: string) => {
    setSearchQueryState(value)
  }, [])

  const setSearchField = useCallback((value: BookFilterField) => {
    setSearchFieldState(value)
  }, [])

  const setSortBy = useCallback((value: BookSortField) => {
    setSortByState(value)
  }, [])

  const setCurrentPage = useCallback(
    (page: number) => {
      const next = Math.max(1, Math.trunc(page))
      setPageState((prev) => ({ ...prev, filterKey, page: next }))
    },
    [filterKey],
  )

  const variables = useMemo(
    () =>
      buildBooksPageQueryVariables(
        pageForQuery,
        debouncedSearchTrimmed,
        searchField,
        sortBy,
      ),
    [pageForQuery, debouncedSearchTrimmed, searchField, sortBy],
  )

  const { data, loading, error } = useBooksPageQuery({
    variables,
    fetchPolicy: "network-only",
  })

  const segment = data?.books
  const totalCount = segment?.totalCount ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / BOOKS_PAGE_SIZE))
  const pageForUi = Math.min(pageForQuery, totalPages)

  const books: Book[] = useMemo(() => {
    const items = segment?.items
    if (!items?.length) return []
    return items.map(mapBookDtoToBook)
  }, [segment?.items])

  return {
    books,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    searchField,
    setSearchField,
    sortBy,
    setSortBy,
    currentPage: pageForUi,
    setCurrentPage,
    totalPages,
    totalBooks: totalCount,
    pageSize: BOOKS_PAGE_SIZE,
  }
}
