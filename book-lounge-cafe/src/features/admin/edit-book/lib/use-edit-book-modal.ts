import { useCallback, useState } from "react"
import type { Book } from "entities/book"

export function useEditBookModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [book, setBook] = useState<Book | null>(null)

  const open = useCallback((next: Book) => {
    setBook(next)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setBook(null)
  }, [])

  const onOpenChange = useCallback((next: boolean) => {
    setIsOpen(next)
    if (!next) setBook(null)
  }, [])

  return { isOpen, book, open, close, onOpenChange }
}
