import type React from "react"

type Resolver<State, T> = State extends void
  ? T
  : T | ((state: State) => T)

export type UnsafeStyles<State = void> = {
  UNSAFE_className?: Resolver<State, string>
  UNSAFE_style?: Resolver<State, React.CSSProperties>
}
