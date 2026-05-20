import { useCallback, useState } from "react"
import type { Book } from "entities/book"

export function useDeleteBookModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [book, setBook] = useState<Book | null>(null)

  const open = useCallback((next: Book) => {
    setBook(next)
    setIsOpen(true)
  }, [])

  const onOpenChange = useCallback((next: boolean) => {
    setIsOpen(next)
    if (!next) setBook(null)
  }, [])

  return { isOpen, book, open, onOpenChange }
}
