import type { BookSortField } from "./types"

type SortOptionItem = {
  id: BookSortField
  label: string
}

export const sortOptions: SortOptionItem[] = [
  { id: "author", label: "По автору" },
  { id: "name", label: "По названию" },
]
