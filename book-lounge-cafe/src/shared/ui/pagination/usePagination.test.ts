import { describe, expect, it } from "vitest"

import { PAGINATION_TYPE_MAP } from "./utils/constants"
import { usePagination } from "./usePagination"

describe("usePagination", () => {
  it("возвращает навигацию и страницы с эллипсисами для средней страницы", () => {
    const result = usePagination({
      count: 10,
      currentPage: 5,
      boundaryCount: 1,
      siblingCount: 1,
      showFirstButton: false,
      showLastButton: false,
      showBackwardButton: true,
      showForwardButton: true,
    })

    expect(result).toEqual([
      PAGINATION_TYPE_MAP.backward,
      1,
      PAGINATION_TYPE_MAP.startEllipsis,
      4,
      5,
      6,
      PAGINATION_TYPE_MAP.endEllipsis,
      10,
      PAGINATION_TYPE_MAP.forward,
    ])
  })

  it("включает first и last при флагах", () => {
    const result = usePagination({
      count: 5,
      currentPage: 3,
      boundaryCount: 1,
      siblingCount: 1,
      showFirstButton: true,
      showLastButton: true,
      showBackwardButton: true,
      showForwardButton: true,
    })

    expect(result[0]).toBe(PAGINATION_TYPE_MAP.first)
    expect(result.at(-1)).toBe(PAGINATION_TYPE_MAP.last)
  })
})
