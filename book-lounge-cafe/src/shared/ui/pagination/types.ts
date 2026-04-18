export interface IPaginationOptions {
  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount?: number
  /**
   * The total number of pages.
   */
  count: number
  /**
   * The current page.
   */
  currentPage: number
  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount?: number
  /**
   * If `true`, show the backward-page button.
   * @default true
  */
  showBackwardButton?: boolean
  /**
   * If `true`, show the forward-page button.
   * @default true
   */
  showForwardButton?: boolean
  /**
  * If `true`, show the first-page button.
  * @default true
  */
  showFirstButton?: boolean
  /**
   * If `true`, show the last-page button.
   * @default true
   */
  showLastButton?: boolean
}
