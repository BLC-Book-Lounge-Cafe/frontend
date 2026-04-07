import { AppDialog } from "./dialog"
import { AppDialogHeader } from "./dialog-header"
import { AppDialogContent } from "./dialog-content"
import { AppDialogFooter } from "./dialog-footer"

export type { AppDialogProps as DialogProps } from "./dialog"
export type { AppDialogHeaderProps as DialogHeaderProps } from "./dialog-header"
export type { AppDialogHeaderTitleProps as DialogHeaderTitleProps } from "./dialog-header"
export type { AppDialogFooterProps as DialogFooterProps } from "./dialog-footer"

const _AppDialog = Object.assign(AppDialog, {
  Header: AppDialogHeader,
  Content: AppDialogContent,
  Footer: AppDialogFooter,
})

export { _AppDialog as Dialog }
