import type { AppProgressCircleProps } from "./progress-circle"
import type { AppProgressBarTone, AppProgressBarProps } from "./progress-bar"
import { AppProgressCircle } from "./progress-circle"
import { AppProgressBar } from "./progress-bar"

const Progress = {
  Bar: AppProgressBar,
  Circle: AppProgressCircle,
}

export {
  Progress,
  type AppProgressCircleProps as ProgressCircleProps,
  type AppProgressBarProps as ProgressBarProps,
  type AppProgressBarTone as ProgressBarTone,
}

