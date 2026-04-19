import { describe, expect, it } from "vitest"

import { BOOKS_PAGE_SIZE, buildBooksPageQueryVariables } from "./books-page-query"

describe("buildBooksPageQueryVariables", () => {
  it("считает skip/take по номеру страницы", () => {
    expect(buildBooksPageQueryVariables(1, "", "name", "author")).toEqual({
      skip: 0,
      take: BOOKS_PAGE_SIZE,
      filter: undefined,
      sorter: { propertyName: "author", descendingOrder: false },
    })
    expect(buildBooksPageQueryVariables(3, "", "name", "name").skip).toBe((3 - 1) * BOOKS_PAGE_SIZE)
  })

  it("добавляет filter при непустом поиске", () => {
    expect(
      buildBooksPageQueryVariables(1, "  толстой  ".trim(), "author", "name"),
    ).toMatchObject({
      filter: { propertyFilters: [{ fieldName: "author", value: "толстой" }] },
      sorter: { propertyName: "name", descendingOrder: false },
    })
  })
})
