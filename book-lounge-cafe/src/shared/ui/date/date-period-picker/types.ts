export type DatePeriod = typeof DatePeriod[keyof typeof DatePeriod]
export const DatePeriod = {
  day: "day",
  week: "week",
  month: "month",
  quarter: "quarter",
  year: "year",
  custom: "custom",
} as const
