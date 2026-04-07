import React from "react"
import { Provider, ToggleGroupStateContext } from "react-aria-components"

/** @private */ type InternalSegmentsSelectionTrackerContextValue = {
  register?: (value: Key, isDisabled?: boolean) => void
}

/** @private */ const InternalSegmentsSelectionTrackerContext = React.createContext(
  {} as InternalSegmentsSelectionTrackerContextValue,
)

/** @private */ type SegmentsSelectionTrackerProps = {
  value: Key | null | undefined
  defaultValue: Key | null | undefined
  children: React.ReactNode
}

/** @private */ function SegmentsSelectionTracker(props: SegmentsSelectionTrackerProps) {
  const state = React.useContext(ToggleGroupStateContext)
  const isRegistered = React.useRef(!(props.defaultValue == null && props.value == null))

  // default select the first available item
  const register = React.useCallback((key: Key) => {
    if (state && !isRegistered.current) {
      isRegistered.current = true
      state.toggleKey(key)
    }
  }, [])

  return (
    <Provider values={[
      [InternalSegmentsSelectionTrackerContext, { register }],
    ]}>
      {props.children}
    </Provider>
  )
}

const _SegmentsSelectionTracker = Object.assign(SegmentsSelectionTracker, {
  Context: InternalSegmentsSelectionTrackerContext,
})

export { _SegmentsSelectionTracker as SegmentsSelectionTracker }
