import { type Breakpoint } from "shared/lib/breakpoints"

export type Responsive<T> = T | Partial<Record<Breakpoint, T>>

export type Static<T> = T extends Responsive<infer U> ? U : T
