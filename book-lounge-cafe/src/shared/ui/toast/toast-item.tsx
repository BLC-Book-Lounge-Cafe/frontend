import React from "react"
import type { Nullable } from "shared/model/types/nullable"
import { Button } from "shared/ui/button"
import { Progress } from "shared/ui/progress"
import Icon from "shared/ui/Icon"
import { classes } from "shared/lib/classes"
import type { Toast } from "./types"

const progressMaxValue = 100
const progressParts = 5
const progressPartValue = progressMaxValue / progressParts

type ToastItemProps = {
  toast: Toast
  onDismiss: (id: string) => void
}

export function ToastItem(props: ToastItemProps) {
  const { toast, onDismiss } = props

  const duration = toast.duration || 5000

  const [progress, setProgress] = React.useState(0)
  const [isVisible, setIsVisible] = React.useState(false)

  const progressIntervalRef = React.useRef<Nullable<NodeJS.Timeout>>(null)
  const startTimeRef = React.useRef<number>(Date.now())
  const pausedTimeRef = React.useRef<number>(0)

  const handleClose = React.useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      onDismiss(toast.id)
    }, 300) // Временная задержка для анимации закрытия
  }, [onDismiss, toast.id])

  const startTimer = React.useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    const now = Date.now()
    startTimeRef.current = now - pausedTimeRef.current

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const rawProgress = Math.min((elapsed / duration) * progressMaxValue, progressMaxValue)

      const currentPart = Math.floor(rawProgress / progressPartValue)
      const discreteProgress = currentPart * progressPartValue

      setProgress(discreteProgress)

      if (rawProgress >= progressMaxValue) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
        }
        handleClose()
      }
    }, 50) // Обновляем каждые 50ms для плавности
  }, [duration, handleClose])

  const pauseTimer = React.useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }

    pausedTimeRef.current = Date.now() - startTimeRef.current
  }, [])

  React.useEffect(() => {
    setIsVisible(true)
    startTimer()

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [startTimer])

  return (
    <div
      className={classes(
        "transition-all duration-300 ease-in-out transform mb-3",
        isVisible
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0",
      )}
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
    >
      <div
        className={classes(
          "flex items-center gap-5 p-4 border-l-4 rounded-r-2 bg-surface-primary shadow-md max-w-[31.25rem]",
          classes.match(toast.color, {
            "success": "border-positive",
            "accent": "border-accent",
            "negative": "border-negative",
          }),
        )}
      >
        <div className="relative flex flex-shrink-0 self-start w-fit h-fit rounded-full">
          <Progress.Circle value={progress} tone={toast.color === "accent" ? "accent" : toast.color === "success" ? "success" : "negative"} />
          <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
            <div
              className={classes(
                "flex items-start justify-center h-8 w-8 rounded-full",
                classes.match(toast.color, {
                  accent: "bg-accent/10",
                  negative: "bg-negative/10",
                  success: "bg-positive/10",
                }),
              )}
            >
              <p className="pt-1">
                {Math.max(0, progressParts - Math.floor(progress / progressPartValue))}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          {toast.title && (
            <h3 className="font-bold line-clamp-3">
              {toast.title}
            </h3>
          )}
          {toast.message && (
            <p className="line-clamp-6">
              {toast.message}
            </p>
          )}
        </div>

        <Button
          UNSAFE_className="p-0 min-h-6 min-w-6 self-start rounded-2"
          variant="tinted"
          onPress={handleClose}
        >
          <Icon name="xmark" />
        </Button>
      </div>
    </div>
  )
}

