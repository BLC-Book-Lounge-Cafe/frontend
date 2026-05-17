import type { Book } from "entities/book"
import { CardActionButton } from "shared/ui/card-action-button"

type BookCardProps = {
  book: Book
  onClick: () => void
  isAdmin?: boolean
  onEdit?: (book: Book) => void
  onDelete?: (book: Book) => void
}

export function BookCard(props: BookCardProps) {
  const { book, onClick, isAdmin = false, onEdit, onDelete } = props

  return (
    <article
      className="cursor-pointer hover:scale-105 transition-transform group"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-1 shadow-md group-hover:shadow-lg transition-shadow">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full aspect-[2/3] object-cover"
          loading="lazy"
        />
        {!book.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-negative text-white px-3 py-1 rounded-full text-caption font-semibold">
              Забронирована
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-end gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-body-small font-bold line-clamp-2">{book.title}</h3>
          <p className="text-caption text-secondary mt-1 truncate">{book.author}</p>
        </div>

        {isAdmin && (
          <div className="flex shrink-0 items-center gap-3">
            <CardActionButton
              icon="pencil"
              label={`Редактировать книгу ${book.title}`}
              onClick={() => onEdit?.(book)}
            />
            <CardActionButton
              icon="trash"
              label={`Удалить книгу ${book.title}`}
              onClick={() => onDelete?.(book)}
            />
          </div>
        )}
      </div>
    </article>
  )
}
