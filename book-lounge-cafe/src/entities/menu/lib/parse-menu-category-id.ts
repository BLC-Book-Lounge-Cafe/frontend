export function parseMenuCategoryId(id: string): number | null {
  const n = Number(id)
  if (!Number.isFinite(n) || n < 1) return null
  return Math.trunc(n)
}
