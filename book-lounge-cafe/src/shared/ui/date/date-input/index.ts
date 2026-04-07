import { AppDateInput } from "./date-input"
import { AppDateSegment } from "./date-input-segment"

export type { AppDateInputProps as DateInputProps } from "./date-input"
export type { AppDateSegmentProps as DateInputSegmentProps } from "./date-input-segment"

export const DateInput = Object.assign(AppDateInput, {
  Segment: AppDateSegment,
})
