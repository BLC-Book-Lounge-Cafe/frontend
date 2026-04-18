import type { IPaginationOptions } from "./types"
import { PAGINATION_TYPE_MAP } from "./utils/constants"
import { range } from "./utils/range"

export function usePagination(options: IPaginationOptions) {
  const {
    boundaryCount = 1,
    count,
    currentPage,
    siblingCount = 1,
    showFirstButton,
    showLastButton,
    showBackwardButton,
    showForwardButton,
  } = options

  const startPages = range(1, Math.min(boundaryCount, count))
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count)

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      currentPage - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1,
    ),
    // Greater than startPages
    boundaryCount + 2,
  )

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      currentPage + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2,
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1,
  )

  // Basic list of items to render
  // e.g. itemList = ['first', 'backward', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'forward', 'last']
  const itemList = [
    ...(showFirstButton ? [PAGINATION_TYPE_MAP.first] : []),
    ...(showBackwardButton ? [PAGINATION_TYPE_MAP.backward] : []),
    ...startPages,

    // Start ellipsis
    ...(siblingsStart > boundaryCount + 2
      ? [PAGINATION_TYPE_MAP.startEllipsis]
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...(siblingsEnd < count - boundaryCount - 1
      ? [PAGINATION_TYPE_MAP.endEllipsis]
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),

    ...endPages,
    ...(showForwardButton ? [PAGINATION_TYPE_MAP.forward] : []),
    ...(showLastButton ? [PAGINATION_TYPE_MAP.last] : []),
  ]

  return itemList
}
