import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("api/graphql/generated/graphql", () => ({
  useBooksPageQuery: vi.fn(),
}))

import { useBooksPageQuery } from "api/graphql/generated/graphql"
import { BOOKS_PAGE_SIZE } from "./books-page-query"
import { useBooksPage } from "./use-books-page"

const mockQuery = vi.mocked(useBooksPageQuery)

type BookDtoStub = {
  __typename: "BookDto"
  id: number
  name: string
  author: string
  imageUrl: string
  isReserved: boolean
}

function setupQuery(totalCount: number, items: BookDtoStub[] = []) {
  mockQuery.mockReturnValue({
    data: { books: { totalCount, items } },
    loading: false,
    error: undefined,
  } as ReturnType<typeof useBooksPageQuery>)
}

describe("useBooksPage — начальное состояние", () => {
  beforeEach(() => {
    setupQuery(0)
  })

  it("страница 1, пустой запрос, сортировка по автору", () => {
    const { result } = renderHook(() => useBooksPage())

    expect(result.current.currentPage).toBe(1)
    expect(result.current.searchQuery).toBe("")
    expect(result.current.searchField).toBe("name")
    expect(result.current.sortBy).toBe("author")
    expect(result.current.pageSize).toBe(BOOKS_PAGE_SIZE)
  })

  it("пустой каталог: totalPages = 1, totalBooks = 0, books = []", () => {
    const { result } = renderHook(() => useBooksPage())

    expect(result.current.totalPages).toBe(1)
    expect(result.current.totalBooks).toBe(0)
    expect(result.current.books).toEqual([])
  })
})

describe("useBooksPage — вычисление totalPages", () => {
  it("ceil(totalCount / pageSize), минимум 1", () => {
    const cases: [number, number][] = [
      [0, 1],
      [1, 1],
      [12, 1],
      [13, 2],
      [24, 2],
      [25, 3],
    ]

    for (const [totalCount, expectedPages] of cases) {
      setupQuery(totalCount)
      const { result } = renderHook(() => useBooksPage())
      expect(result.current.totalPages, `totalCount=${totalCount}`).toBe(expectedPages)
    }
  })
})

describe("useBooksPage — setCurrentPage", () => {
  beforeEach(() => {
    setupQuery(36) // 3 страницы
  })

  it("обрезает дробную часть через trunc", () => {
    const { result } = renderHook(() => useBooksPage())

    act(() => {
      result.current.setCurrentPage(2.9)
    })

    expect(result.current.currentPage).toBe(2)
  })

  it("не опускается ниже 1 при отрицательном значении", () => {
    const { result } = renderHook(() => useBooksPage())

    act(() => {
      result.current.setCurrentPage(-5)
    })

    expect(result.current.currentPage).toBe(1)
  })

  it("currentPage клампится к totalPages когда данных стало меньше", () => {
    const { result, rerender } = renderHook(() => useBooksPage())

    act(() => {
      result.current.setCurrentPage(3)
    })
    expect(result.current.currentPage).toBe(3)

    // После перезапроса вернулось всего 5 книг — 1 страница
    setupQuery(5)
    rerender()

    expect(result.current.currentPage).toBe(1) // Math.min(3, 1)
  })
})

describe("useBooksPage — маппинг книг из DTO", () => {
  it("маппит поля DTO в модель Book", () => {
    setupQuery(1, [
      {
        __typename: "BookDto",
        id: 7,
        name: "Мастер и Маргарита",
        author: "Булгаков",
        imageUrl: "https://example.com/cover.jpg",
        isReserved: false,
      },
    ])

    const { result } = renderHook(() => useBooksPage())

    expect(result.current.books).toHaveLength(1)
    expect(result.current.books[0]).toMatchObject({
      id: 7,
      title: "Мастер и Маргарита",
      author: "Булгаков",
      cover: "https://example.com/cover.jpg",
      available: true,
    })
  })

  it("isReserved: true → available: false", () => {
    setupQuery(1, [
      {
        __typename: "BookDto",
        id: 2,
        name: "Война и мир",
        author: "Толстой",
        imageUrl: "",
        isReserved: true,
      },
    ])

    const { result } = renderHook(() => useBooksPage())

    expect(result.current.books[0].available).toBe(false)
  })
})
