import type { BookFilterField } from "./types"

type SearchFieldItem = {
  id: BookFilterField
  label: string
}

export const searchFieldOptions: SearchFieldItem[] = [
  { id: "name", label: "По названию" },
  { id: "author", label: "По автору" },
]
