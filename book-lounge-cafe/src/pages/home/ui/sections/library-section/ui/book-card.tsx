import type { Book } from "../model/books-data"

type BookCardProps = {
  book: Book
  onClick: () => void
}

export function BookCard(props: BookCardProps) {
  const { book, onClick } = props

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
      <h3 className="text-body-small font-bold mt-3 line-clamp-2">{book.title}</h3>
      <p className="text-caption text-secondary mt-1">{book.author}</p>
    </article>
  )
}
