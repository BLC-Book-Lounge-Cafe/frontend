import { Button } from "shared/ui/button"

type PaginationProps = {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
}

export function Pagination(props: PaginationProps) {
  const { currentPage, totalPages, onChange } = props

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        rounded
        isDisabled={currentPage === 1}
        onPress={() => onChange(currentPage - 1)}
      >
        ←
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "filled" : "outline"}
          size="sm"
          rounded
          onPress={() => onChange(page)}
          UNSAFE_className="min-w-10"
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        rounded
        isDisabled={currentPage === totalPages}
        onPress={() => onChange(currentPage + 1)}
      >
        →
      </Button>
    </div>
  )
}
