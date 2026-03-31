import classNames, { type ArgumentArray, type Argument } from "classnames"
// shared
import type { Nullable } from "shared/model/types/nullable"
// local
import { twMerge } from "./tailwind-merge-config"

function classes(...args: ArgumentArray): string {
  return twMerge(classNames(...args))
}

function match<K extends string>(key: Nullable<K>, record: Partial<Record<K, Argument>>): Argument {
  return record[key] ?? ""
}

const _classes = Object.assign(classes, {
  match,
})

export { _classes as classes }
