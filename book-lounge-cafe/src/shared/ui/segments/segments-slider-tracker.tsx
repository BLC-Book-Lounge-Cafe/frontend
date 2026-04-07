import React from "react"
import { ToggleGroupStateContext, Provider } from "react-aria-components"

/** @private */ type InternalSegmentSliderTrackerContextValue = {
  prevRef: React.MutableRefObject<HTMLDivElement | null>
  currentRef: React.MutableRefObject<HTMLDivElement | null>
}

/** @private */ const InternalSegmentSliderTrackerContext = React.createContext(
  {} as InternalSegmentSliderTrackerContextValue,
)

/** @private */ type SegmentSliderTrackerProps = {
  containerRef: React.RefObject<HTMLDivElement>
  children: React.ReactNode
}

/** @private */ function SegmentSliderTracker(props: SegmentSliderTrackerProps) {
  const { containerRef, children } = props

  const state = React.useContext(ToggleGroupStateContext)
  const selectedKey = state?.selectedKeys.values().next().value

  const prevRef = React.useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement | null>
  const currentRef = React.useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement | null>

  React.useLayoutEffect(() => {
    const selector = `[data-key=${selectedKey}][aria-checked=true]`
    prevRef.current = containerRef.current?.querySelector(selector) as HTMLDivElement | null
  }, [selectedKey])

  return (
    <Provider values={[
      [InternalSegmentSliderTrackerContext, { prevRef, currentRef }],
    ]}>
      {children}
    </Provider>
  )
}

const _SegmentSliderTracker = Object.assign(SegmentSliderTracker, {
  Context: InternalSegmentSliderTrackerContext,
})

export { _SegmentSliderTracker as SegmentSliderTracker }
