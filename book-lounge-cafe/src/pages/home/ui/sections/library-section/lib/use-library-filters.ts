import { useState, useMemo } from "react"
import type { Book } from "../model/books-data"

type SortOption = "author" | "title"

export function useLibraryFilters(books: Book[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("author")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const filteredAndSortedBooks = useMemo(() => {
    let result = [...books]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      )
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "author") {
        return a.author.localeCompare(b.author, "ru")
      } else {
        return a.title.localeCompare(b.title, "ru")
      }
    })

    return result
  }, [books, searchQuery, sortBy])

  const totalPages = Math.ceil(filteredAndSortedBooks.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedBooks = filteredAndSortedBooks.slice(startIndex, startIndex + itemsPerPage)

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedBooks,
    totalBooks: filteredAndSortedBooks.length,
  }
}
