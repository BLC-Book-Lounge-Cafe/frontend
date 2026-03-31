import { AppFieldLabel } from "./field-label"
import { AppFieldGroup } from "./field-group"
import { AppFieldInput } from "./field-input"
import { AppFieldDescription } from "./field-description"
import { AppFieldError } from "./field-error"
import { AppFieldTextArea } from "./field-text-area"
import { AppFieldLabelWithLimit } from "./field-label-with-limit"

export type { AppFieldLabelWithLimitProps as FieldLabelWithLimitProps } from "./field-label-with-limit"
export type { AppFieldLabelProps as FieldLabelProps } from "./field-label"
export type { AppFieldGroupProps as FieldGroupProps } from "./field-group"
export type { AppFieldInputProps as FieldInputProps } from "./field-input"
export type { AppFieldTextAreaProps as FieldTextAreaProps } from "./field-text-area"
export type { AppFieldDescriptionProps as FieldDescriptionProps } from "./field-description"
export type { AppFieldErrorProps as FieldErrorProps } from "./field-error"

export const Field = {
  Label: AppFieldLabel,
  LabelWithLimit: AppFieldLabelWithLimit,
  Group: AppFieldGroup,
  Input: AppFieldInput,
  TextArea: AppFieldTextArea,
  Description: AppFieldDescription,
  Error: AppFieldError,
}
