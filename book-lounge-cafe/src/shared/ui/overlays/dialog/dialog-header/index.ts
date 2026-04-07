import { AppDialogHeader } from "./dialog-header"
import { AppDialogHeaderTitle } from "./dialog-header-title"

export type { AppDialogHeaderProps } from "./dialog-header"
export type { AppDialogHeaderTitleProps } from "./dialog-header-title"

const _AppDialogHeader = Object.assign(AppDialogHeader, {
  Title: AppDialogHeaderTitle,
})

export { _AppDialogHeader as AppDialogHeader }

