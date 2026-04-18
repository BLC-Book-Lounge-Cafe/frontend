// shared
import { useResponsive, type Responsive } from "shared/lib/responsive"
import { Button } from "shared/ui/button"
import Icon from "shared/ui/Icon"
// local
import type { IPaginationOptions } from "./types"
import { PAGINATION_TYPE_MAP } from "./utils/constants"
import { usePagination } from "./usePagination"

type ResponsiveProperties<T> = {
  [K in keyof T]: Responsive<T[K]>
}

type PaginationProps = (
  ResponsiveProperties<IPaginationOptions> & {
    /**
     * Callback fired when the page is changed.
    */
    onChange: (page: number) => void
  }
)

export function Pagination(props: PaginationProps) {
  const { onChange } = props

  const count = useResponsive(props.count)
  const currentPage = useResponsive(props.currentPage)
  const boundaryCount = useResponsive(props.boundaryCount, { base: 0, sm: 1 })
  const siblingCount = useResponsive(props.siblingCount, { base: 1, sm: 2 })
  const showFirstButton = useResponsive(props.showFirstButton, false)
  const showBackwardButton = useResponsive(props.showBackwardButton, true)
  const showForwardButton = useResponsive(props.showForwardButton, true)
  const showLastButton = useResponsive(props.showLastButton, false)

  const paginationRange = usePagination({
    count,
    currentPage,
    siblingCount,
    boundaryCount,
    showFirstButton,
    showBackwardButton,
    showForwardButton,
    showLastButton,
  })

  // console.log(paginationRange)

  const isBackwardDisabled = currentPage <= 1
  const isForwardDisabled = currentPage >= count

  const handleFirstPress = () => {
    onChange(1)
  }

  const handleBackwardPress = () => {
    onChange(currentPage - 1)
  }

  const handlePagePress = (page: number) => {
    onChange(page)
  }

  const handleForwardPress = () => {
    onChange(currentPage + 1)
  }

  const handleLastPress = () => {
    onChange(count)
  }

  return (
    <div className="flex space-x-2">
      <div className="flex items-center space-x-2 min-w-0">
        {paginationRange?.map((key) => {
          if (key === PAGINATION_TYPE_MAP.first) {
            return showFirstButton ? (
              <Button
                UNSAFE_className="min-w-7 min-h-7"
                key={key}
                size="sm"
                variant="tinted"
                aria-label="В начало"
                isDisabled={isBackwardDisabled}
                onPress={handleFirstPress}
              >
                <Icon name="chevronLeftWithStick" />
              </Button>
            ) : null
          }

          if (key === PAGINATION_TYPE_MAP.backward) {
            return showBackwardButton ? (
              <Button
                UNSAFE_className="min-w-7 min-h-7"
                key={key}
                size="sm"
                variant="plain"
                aria-label="Назад"
                isDisabled={isBackwardDisabled}
                onPress={handleBackwardPress}
              >
                <Icon name="chevronLeft" />
              </Button>
            ) : null
          }

          if (key === PAGINATION_TYPE_MAP.startEllipsis) {
            return (showBackwardButton || !!boundaryCount) ? (
              <div key={key} className="relative flex flex-col">
                <Button size="sm" UNSAFE_className="invisible" /> {/* placeholder */}
                <span className="absolute inset-center">…</span>
              </div>
            ) : null
          }

          if (key === PAGINATION_TYPE_MAP.endEllipsis) {
            return (showForwardButton || !!boundaryCount) ? (
              <div key={key} className="relative flex flex-col">
                <Button size="sm" UNSAFE_className="invisible" /> {/* placeholder */}
                <span className="absolute inset-center">…</span>
              </div>
            ) : null
          }

          if (key === PAGINATION_TYPE_MAP.forward) {
            return showForwardButton ? (
              <Button
                UNSAFE_className="min-w-7 min-h-7"
                key={key}
                size="sm"
                variant="plain"
                aria-label="Вперед"
                isDisabled={isForwardDisabled}
                onPress={handleForwardPress}
              >
                <Icon name="chevronRight" />
              </Button>
            ) : null
          }

          if (key === PAGINATION_TYPE_MAP.last) {
            return showLastButton ? (
              <Button
                UNSAFE_className="min-w-7 min-h-7"
                key={key}
                size="sm"
                variant="tinted"
                aria-label="В конец"
                isDisabled={isForwardDisabled}
                onPress={handleLastPress}
              >
                <Icon name="chevronRightWithStick" />
              </Button>
            ) : null
          }

          return (
            <Button
              UNSAFE_className="min-w-7 min-h-7"
              key={key}
              size="sm"
              variant={key === currentPage ? "filled" : "tinted"}
              onPress={() => handlePagePress(key as number)}>
              {key}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
