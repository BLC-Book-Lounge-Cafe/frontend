import { useLayoutEffect, useRef, useState } from "react"
import { Collection } from "react-aria-components"
import { Container } from "shared/ui/container"
import { Notice } from "shared/ui/notice"
import { Pagination } from "shared/ui/pagination"
import { Select } from "shared/ui/pickers/select"
import type { Book, BookFilterField, BookSortField } from "entities/book"
import { useBooksPage, sortOptions, searchFieldOptions } from "entities/book"
import { BookCard } from "./ui/book-card"
import { BookingBookModal, useBookingBookModal } from "features/booking/booking-book"
import { SearchField } from "shared/ui/search-field"
import { Progress } from "shared/ui/progress"

const LOADING_EXTRA_DELAY_MS = 150

export function LibrarySection() {
  const {
    books,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    searchField,
    setSearchField,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    totalBooks,
  } = useBooksPage()

  const bookingModal = useBookingBookModal()
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  /** Держим спиннер ещё 2 с после того, как `loading` стал `false` (искусственная задержка). */
  const [lingerSpinner, setLingerSpinner] = useState(false)
  const hadLoadingRef = useRef(false)

  /* Синхронный setState до paint, иначе на один кадр виден контент при уже `loading === false`. */
  /* eslint-disable react-hooks/set-state-in-effect */
  useLayoutEffect(() => {
    if (loading) {
      hadLoadingRef.current = true
      setLingerSpinner(false)
      return
    }
    if (!hadLoadingRef.current) return
    setLingerSpinner(true)
    const hideId = window.setTimeout(() => setLingerSpinner(false), LOADING_EXTRA_DELAY_MS)
    return () => window.clearTimeout(hideId)
  }, [loading])
  /* eslint-enable react-hooks/set-state-in-effect */

  const loadingWithDelay = loading || lingerSpinner

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
          <div className="flex flex-col md:flex-row gap-4 flex-wrap items-end">
            <SearchField
              fullWidth
              type="text"
              label="Поиск"
              placeholder="Введите текст для поиска…"
              value={searchQuery}
              onChange={(value) => setSearchQuery(value)}
              UNSAFE_className="min-w-52 flex-1"
            />

            <Select
              label="Фильтр для поиска"
              items={searchFieldOptions}
              isDisabled={loading}
              value={searchField}
              onChange={(key) => setSearchField(key as BookFilterField)}
              UNSAFE_className="min-w-[11rem] w-full md:w-fit"
            >
              <Collection items={searchFieldOptions}>
                {(item) => (
                  <Select.Item id={item.id} textValue={item.label}>
                    {item.label}
                  </Select.Item>
                )}
              </Collection>
            </Select>

            <Select
              label="Сортировка"
              items={sortOptions}
              isDisabled={loading}
              value={sortBy}
              onChange={(key) => setSortBy(key as BookSortField)}
              UNSAFE_className="min-w-[11rem] w-full md:w-fit"
            >
              <Collection items={sortOptions}>
                {(item) => (
                  <Select.Item id={item.id} textValue={item.label}>
                    {item.label}
                  </Select.Item>
                )}
              </Collection>
            </Select>
          </div>

        </div>

        {loadingWithDelay ? (
            <div className="flex justify-center items-center py-36">
              <Progress.Circle isIndeterminate />
            </div>
          ) : (
            <>
              <p className="text-caption text-secondary my-6 text-center">
                Найдено книг: {totalBooks}
              </p>

              {!error && books.length > 0 ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                      {books.map((book) => (
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

                    <div className="mt-8 flex justify-center">
                      <Pagination
                        count={totalPages}
                        currentPage={currentPage}
                        onChange={setCurrentPage}
                      />
                    </div>
                  </>
                ) : null}
            </>
          )}

        {error ? (
          <Notice tone="negative" variant="tinted" UNSAFE_className="max-w-xl mx-auto">
            {error.message || "Не удалось загрузить книги."}
          </Notice>
        ) : null}

      </Container>
    </section>
  )
}
