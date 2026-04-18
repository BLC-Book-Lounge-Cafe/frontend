import type { BookDto } from "api/graphql/generated/graphql"
import type { Book } from "../model/types"

export function mapBookDtoToBook(dto: BookDto): Book {
  return {
    id: dto.id,
    title: dto.name,
    author: dto.author,
    cover: dto.imageUrl,
    available: !dto.isReserved,
  }
}
