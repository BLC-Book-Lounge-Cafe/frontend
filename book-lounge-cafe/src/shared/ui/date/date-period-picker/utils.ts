import type { DateRange, DateValue } from "react-aria-components"
import type { TimeFields } from "@internationalized/date"
import { now, getLocalTimeZone, isSameDay, isSameMonth, isSameYear, startOfMonth, startOfWeek, endOfWeek, startOfYear, endOfMonth, endOfYear } from "@internationalized/date"
// shared
import type { Nullable } from "shared/model/types/nullable"
import { dateFormatter } from "shared/lib/formatters/date-formatter"
import { DatePeriod } from "./types"

const startFields: TimeFields = {
  hour: 0, minute: 0, second: 0, millisecond: 0,
}

const endFields: TimeFields = {
  hour: 23, minute: 59, second: 59, millisecond: 999,
}

type DatePeriodHandler = {
  is(period: DatePeriod): boolean
  start(date: DateValue): DateValue
  end(date: DateValue): DateValue
  same(dateRange: DateRange): boolean
  range(): DateRange
  format(dateRange?: Nullable<DateRange>): string
}

const datePeriodHandlers: Record<DatePeriod, DatePeriodHandler> = {
  day: {
    is(period) {
      return period === DatePeriod.day
    },
    start(date) {
      return date.set(startFields)
    },
    end(date) {
      return date.set(endFields)
    },
    same(dateRange) {
      return (
        isSameDay(dateRange.start, dateRange.end)
        && this.start(dateRange.start).compare(dateRange.start) === 0
        && this.end(dateRange.end).compare(dateRange.end) === 0
      )
    },
    range() {
      const today = now(getLocalTimeZone())
      return { start: this.start(today), end: this.end(today) }
    },
    format(): string {
      const range = this.range()
      return dateFormatter.format(range.start.toDate(getLocalTimeZone()), { day: "2-digit", month: "short" })
    },
  },
  week: {
    is(period) {
      return period === DatePeriod.week
    },
    start(date) {
      return startOfWeek(date, "ru").set(startFields)
    },
    end(date) {
      return endOfWeek(date, "ru").set(endFields)
    },
    same(dateRange) {
      return (
        dateRange.start.compare(this.start(dateRange.start)) === 0
        && dateRange.end.compare(this.end(dateRange.start)) === 0
      )
    },
    range() {
      const today = now(getLocalTimeZone())
      return { start: this.start(today), end: this.end(today) }
    },
    format(): string {
      const range = this.range()
      return [
        dateFormatter.format(range.start.toDate(getLocalTimeZone()), { day: "2-digit" }),
        dateFormatter.format(range.end.toDate(getLocalTimeZone()), { day: "2-digit", month: "short" }),
      ].join(" - ")
    },
  },
  month: {
    is(period) {
      return period === DatePeriod.month
    },
    start(date) {
      return startOfMonth(date).set(startFields)
    },
    end(date) {
      return endOfMonth(date).set(endFields)
    },
    same(dateRange) {
      return (
        isSameMonth(dateRange.start, dateRange.end)
        && this.start(dateRange.start).compare(dateRange.start) === 0
        && this.end(dateRange.end).compare(dateRange.end) === 0
      )
    },
    range() {
      const today = now(getLocalTimeZone())
      return { start: this.start(today), end: this.end(today) }
    },
    format() {
      const range = this.range()
      return [
        dateFormatter.format(range.start.toDate(getLocalTimeZone()), { day: "2-digit", month: "short" }),
        dateFormatter.format(range.end.toDate(getLocalTimeZone()), { day: "2-digit", month: "short" }),
      ].join(" - ")
    },
  },
  quarter: {
    is(period) {
      return period === DatePeriod.quarter
    },
    start(date) {
      const month = date.month
      const firstMonthOfQuarter = month - ((month - 1) % 3)
      return startOfMonth(date.set({ month: firstMonthOfQuarter })).set(startFields)
    },
    end(date) {
      const month = date.month
      const lastMonthOfQuarter = month - ((month - 1) % 3) + 2
      return endOfMonth(date.set({ month: lastMonthOfQuarter })).set(endFields)
    },
    same(dateRange) {
      return (
        dateRange.start.compare(this.start(dateRange.start)) === 0
        && dateRange.end.compare(this.end(dateRange.start)) === 0
      )
    },
    range() {
      const today = now(getLocalTimeZone())
      return { start: this.start(today), end: this.end(today) }
    },
    format() {
      const range = this.range()
      return [
        dateFormatter.format(range.start.toDate(getLocalTimeZone()), { day: "2-digit", month: "short" }),
        dateFormatter.format(range.end.toDate(getLocalTimeZone()), { day: "2-digit", month: "short" }),
      ].join(" - ")
    },
  },
  year: {
    is(period) {
      return period === DatePeriod.year
    },
    start(date) {
      return startOfYear(date).set(startFields)
    },
    end(date) {
      return endOfYear(date).set(endFields)
    },
    same(dateRange) {
      return (
        isSameYear(dateRange.start, dateRange.end)
        && this.start(dateRange.start).compare(dateRange.start) === 0
        && this.end(dateRange.end).compare(dateRange.end) === 0
      )
    },
    range() {
      const today = now(getLocalTimeZone())
      return { start: this.start(today), end: this.end(today) }
    },
    format() {
      const range = this.range()
      return [
        dateFormatter.format(range.start.toDate(getLocalTimeZone()), { dateStyle: "short" }),
        dateFormatter.format(range.end.toDate(getLocalTimeZone()), { dateStyle: "short" }),
      ].join(" - ")
    },
  },
  custom: {
    is(period) {
      return period === DatePeriod.custom
    },
    start(date) {
      return date.set(startFields)
    },
    end(date) {
      return date.set(endFields)
    },
    same(dateRange) {
      return true
    },
    range() {
      const today = now(getLocalTimeZone())
      return { start: this.start(today), end: this.end(today) }
    },
    format(dateRange) {
      const start = this.start(dateRange!.start)
      const end = this.start(dateRange!.end)
      return [
        dateFormatter.format(start.toDate(getLocalTimeZone()), { dateStyle: "short" }),
        dateFormatter.format(end.toDate(getLocalTimeZone()), { dateStyle: "short" }),
      ].join(" - ")
    },
  },
}

export function dateRangeToPeriod(dateRange: DateRange): DatePeriod {
  return (Object.values(DatePeriod).find(
    (period) => datePeriodHandlers[period].same(dateRange),
  ) ?? DatePeriod.custom) as DatePeriod
}

export function periodToDateRange(period: DatePeriod): DateRange {
  return datePeriodHandlers[period].range()
}

export function formatPeriodDate(
  period: typeof DatePeriod.custom,
  dateRange: Nullable<DateRange>
): string
export function formatPeriodDate(
  period: Exclude<DatePeriod, typeof DatePeriod.custom>,
  dateRange?: never
): string
export function formatPeriodDate(
  period: DatePeriod,
  dateRange?: Nullable<DateRange>,
): string {
  if (period === DatePeriod.custom && (!dateRange?.start || !dateRange?.end)) {
    return "--- / ---"
  } return datePeriodHandlers[period].format(dateRange)
}

export type DatePeriodOption = {
  id: DatePeriod
  label: string
}

export const datePeriodOptions: DatePeriodOption[] = [
  { id: DatePeriod.day, label: "Сегодня" },
  { id: DatePeriod.week, label: "Неделя" },
  { id: DatePeriod.month, label: "Месяц" },
  { id: DatePeriod.quarter, label: "Квартал" },
  { id: DatePeriod.year, label: "Год" },
  { id: DatePeriod.custom, label: "Произвольно" },
]
