import { AppSelect } from "./select"
import { AppSelectItem } from "./select-item"

export type { AppSelectProps as SelectProps } from "./select"
export type { AppSelectItemProps as SelectItemProps } from "./select-item"

export const Select = Object.assign(AppSelect, {
  Item: AppSelectItem,
})
