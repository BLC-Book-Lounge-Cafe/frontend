import { useState } from "react"
import { Container } from "shared/ui/container"
import { Field } from "shared/ui/field"
import { books, type Book } from "./model/books-data"
import { useLibraryFilters } from "./lib/use-library-filters"
import { BookCard } from "./ui/book-card"
import { Pagination } from "./ui/pagination"
import { BookingBookModal, useBookingBookModal } from "features/booking/booking-book"

export function LibrarySection() {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedBooks,
    totalBooks,
  } = useLibraryFilters(books)

  const bookingModal = useBookingBookModal()
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const handleBookClick = (book: Book) => {
    if (!book.available) return
    setSelectedBook(book)
    bookingModal.open()
  }

  const handleBookingModalOpenChange = (open: boolean) => {
    bookingModal.onOpenChange(open)
    if (!open) setSelectedBook(null)
  }

  return (
    <section id="library" className="py-section-mobile md:py-section">
      <Container>
        <h2 className="text-title-1 text-center mb-8">Библиотека</h2>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Field.Group>
                <Field.Input
                  placeholder="Поиск книги по названию или автору..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Field.Group>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "author" | "title")}
              className="px-4 py-2 rounded-1 border border-accent/30 bg-surface-primary text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="author">По автору</option>
              <option value="title">По названию</option>
            </select>
          </div>

          <p className="text-caption text-secondary mt-2 text-center">
            Найдено книг: {totalBooks}
          </p>
        </div>

        {paginatedBooks.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {paginatedBooks.map((book) => (
                <BookCard key={book.id} book={book} onClick={() => handleBookClick(book)} />
              ))}
            </div>

            {selectedBook ? (
              <BookingBookModal
                isOpen={bookingModal.isOpen}
                onOpenChange={handleBookingModalOpenChange}
                bookId={selectedBook.id}
                bookTitle={selectedBook.title}
              />
            ) : null}

            <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-body text-secondary">Книги не найдены</p>
          </div>
        )}

      </Container>
    </section>
  )
}
