import { describe, expect, it } from "vitest"

import type { BookDto } from "api/graphql/generated/graphql"

import { mapBookDtoToBook } from "./map-book-dto"

describe("mapBookDtoToBook", () => {
  it("маппит DTO в модель карточки", () => {
    const dto: BookDto = {
      __typename: "BookDto",
      id: 7,
      name: "Имя книги",
      author: "Автор",
      imageUrl: "https://example.com/cover.jpg",
      isReserved: false,
    }
    expect(mapBookDtoToBook(dto)).toEqual({
      id: 7,
      title: "Имя книги",
      author: "Автор",
      cover: "https://example.com/cover.jpg",
      available: true,
    })
  })

  it("available=false при isReserved", () => {
    const dto: BookDto = {
      __typename: "BookDto",
      id: 1,
      name: "x",
      author: "y",
      imageUrl: "",
      isReserved: true,
    }
    expect(mapBookDtoToBook(dto).available).toBe(false)
  })
})
